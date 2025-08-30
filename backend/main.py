from fastapi import FastAPI, HTTPException, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import json
import random
import asyncio
from datetime import datetime, timedelta
import uuid

app = FastAPI(title="TrialChain+ColdCare API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

trials_db = []
coldchain_db = []

class DrugBatch(BaseModel):
    batchID: Optional[str] = None
    drugName: str
    expiry: str
    sender: str
    receiver: str
    status: str = "pending"
    timestamp: str = datetime.now().isoformat()
    approved_by: Optional[str] = None

class SensorData(BaseModel):
    batchID: str
    temperature: float
    humidity: float
    timestamp: str = datetime.now().isoformat()

class RiskAnalysis(BaseModel):
    batchID: str
    risk_score: float
    status: str
    recommendations: List[str]

class ConnectionManager:
    def __init__(self):
        self.active_connections: List[WebSocket] = []

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.append(websocket)

    def disconnect(self, websocket: WebSocket):
        self.active_connections.remove(websocket)

    async def broadcast(self, message: str):
        for connection in self.active_connections:
            try:
                await connection.send_text(message)
            except:
                pass

manager = ConnectionManager()

@app.post("/trials")
async def create_batch(batch: DrugBatch):
    batch.batchID = str(uuid.uuid4())[:8].upper()
    batch.timestamp = datetime.now().isoformat()
    trials_db.append(batch.dict())
    return {"message": "Batch created successfully", "batch": batch.dict()}

@app.get("/trials")
async def get_all_batches():
    return {"batches": trials_db}

@app.put("/trials/{batch_id}/approve")
async def approve_batch(batch_id: str, regulator: str = "Regulator_001"):
    for batch in trials_db:
        if batch["batchID"] == batch_id:
            batch["status"] = "approved"
            batch["approved_by"] = regulator
            batch["approval_timestamp"] = datetime.now().isoformat()
            return {"message": f"Batch {batch_id} approved by {regulator}"}
    raise HTTPException(status_code=404, detail="Batch not found")

@app.post("/coldchain")
async def submit_sensor_data(data: SensorData):
    coldchain_db.append(data.dict())
    await manager.broadcast(json.dumps({
        "type": "sensor_data",
        "data": data.dict()
    }))
    return {"message": "Sensor data recorded"}

@app.get("/coldchain/risk")
async def get_risk_analysis(batch_id: str):
    batch_data = [d for d in coldchain_db if d["batchID"] == batch_id]
    
    if not batch_data:
        raise HTTPException(status_code=404, detail="No data found for batch")
    
    temperatures = [d["temperature"] for d in batch_data]
    avg_temp = sum(temperatures) / len(temperatures)
    temp_variance = sum((t - avg_temp) ** 2 for t in temperatures) / len(temperatures)
    
    risk_score = 0.0
    if avg_temp > 8 or avg_temp < 2:
        risk_score += 0.6
    if temp_variance > 2:
        risk_score += 0.4
    
    status = "SAFE" if risk_score < 0.5 else "SPOILED"
    
    recommendations = []
    if avg_temp > 8:
        recommendations.append("Temperature too high - check refrigeration")
    elif avg_temp < 2:
        recommendations.append("Temperature too low - risk of freezing")
    if temp_variance > 2:
        recommendations.append("Temperature fluctuations detected")
    
    analysis = RiskAnalysis(
        batchID=batch_id,
        risk_score=risk_score,
        status=status,
        recommendations=recommendations
    )
    
    return analysis

@app.get("/coldchain/data/{batch_id}")
async def get_batch_data(batch_id: str):
    batch_data = [d for d in coldchain_db if d["batchID"] == batch_id]
    return {"data": batch_data}

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await manager.connect(websocket)
    try:
        while True:
            data = await websocket.receive_text()
            await manager.send_personal_message(f"Message received: {data}", websocket)
    except WebSocketDisconnect:
        manager.disconnect(websocket)

@app.on_event("startup")
async def start_fake_data_generator():
    asyncio.create_task(generate_fake_sensor_data())

async def generate_fake_sensor_data():
    while True:
        batch_ids = ["BATCH001", "BATCH002", "BATCH003"]
        for batch_id in batch_ids:
            base_temp = 5.0
            variation = random.uniform(-2, 2)
            temperature = base_temp + variation
            humidity = random.uniform(40, 60)
            
            sensor_data = SensorData(
                batchID=batch_id,
                temperature=round(temperature, 2),
                humidity=round(humidity, 2)
            )
            
            coldchain_db.append(sensor_data.dict())
            
            await manager.broadcast(json.dumps({
                "type": "sensor_data",
                "data": sensor_data.dict()
            }))
        
        await asyncio.sleep(5)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
