from fastapi import FastAPI, HTTPException, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import json
import random
import asyncio
from datetime import datetime, timedelta
import uuid
import joblib
import pandas as pd
import numpy as np
from sklearn.preprocessing import StandardScaler

# Load ML model at startup
try:
    model = joblib.load('model.pkl')
    scaler = joblib.load('scaler.pkl')
    print("✅ ML model loaded successfully!")
except Exception as e:
    print(f"⚠️  Warning: Could not load ML model: {e}")
    model = None
    scaler = None

app = FastAPI(title="TrialChain+ColdCare API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

trials_db = [
    {
        "batchID": "BATCH001",
        "drugName": "COVID-19 Vaccine (Moderna)",
        "expiry": "2024-12-31",
        "sender": "Moderna Pharmaceuticals",
        "receiver": "City General Hospital",
        "status": "approved",
        "timestamp": "2024-01-15T10:30:00Z",
        "approved_by": "Regulator_001",
        "approval_timestamp": "2024-01-15T11:45:00Z"
    },
    {
        "batchID": "BATCH002",
        "drugName": "Cancer Treatment Drug (Keytruda)",
        "expiry": "2025-06-30",
        "sender": "Merck & Co.",
        "receiver": "Oncology Center",
        "status": "approved",
        "timestamp": "2024-01-14T14:20:00Z",
        "approved_by": "Regulator_002",
        "approval_timestamp": "2024-01-14T16:10:00Z"
    },
    {
        "batchID": "BATCH003",
        "drugName": "Diabetes Medication (Ozempic)",
        "expiry": "2024-11-15",
        "sender": "Novo Nordisk",
        "receiver": "Regional Medical Center",
        "status": "pending",
        "timestamp": "2024-01-16T09:15:00Z"
    },
    {
        "batchID": "BATCH004",
        "drugName": "Antibiotic (Amoxicillin)",
        "expiry": "2025-03-31",
        "sender": "Pfizer Labs",
        "receiver": "Community Clinic",
        "status": "approved",
        "timestamp": "2024-01-13T13:45:00Z",
        "approved_by": "Regulator_001",
        "approval_timestamp": "2024-01-13T15:30:00Z"
    },
    {
        "batchID": "BATCH005",
        "drugName": "Pain Management (Oxycodone)",
        "expiry": "2024-08-20",
        "sender": "Purdue Pharma",
        "receiver": "Emergency Department",
        "status": "pending",
        "timestamp": "2024-01-16T11:30:00Z"
    }
]

coldchain_db = [
    {
        "batchID": "BATCH001",
        "temperature": 4.2,
        "humidity": 45.3,
        "timestamp": "2024-01-16T12:00:00Z"
    },
    {
        "batchID": "BATCH001",
        "temperature": 4.5,
        "humidity": 46.1,
        "timestamp": "2024-01-16T12:05:00Z"
    },
    {
        "batchID": "BATCH001",
        "temperature": 4.1,
        "humidity": 44.8,
        "timestamp": "2024-01-16T12:10:00Z"
    },
    {
        "batchID": "BATCH001",
        "temperature": 4.3,
        "humidity": 45.7,
        "timestamp": "2024-01-16T12:15:00Z"
    },
    {
        "batchID": "BATCH001",
        "temperature": 4.0,
        "humidity": 45.2,
        "timestamp": "2024-01-16T12:20:00Z"
    },
    {
        "batchID": "BATCH002",
        "temperature": 3.8,
        "humidity": 47.2,
        "timestamp": "2024-01-16T12:00:00Z"
    },
    {
        "batchID": "BATCH002",
        "temperature": 3.9,
        "humidity": 47.5,
        "timestamp": "2024-01-16T12:05:00Z"
    },
    {
        "batchID": "BATCH002",
        "temperature": 3.7,
        "humidity": 46.9,
        "timestamp": "2024-01-16T12:10:00Z"
    },
    {
        "batchID": "BATCH002",
        "temperature": 3.8,
        "humidity": 47.1,
        "timestamp": "2024-01-16T12:15:00Z"
    },
    {
        "batchID": "BATCH002",
        "temperature": 3.6,
        "humidity": 46.8,
        "timestamp": "2024-01-16T12:20:00Z"
    },
    {
        "batchID": "BATCH003",
        "temperature": 5.2,
        "humidity": 43.1,
        "timestamp": "2024-01-16T12:00:00Z"
    },
    {
        "batchID": "BATCH003",
        "temperature": 5.5,
        "humidity": 43.8,
        "timestamp": "2024-01-16T12:05:00Z"
    },
    {
        "batchID": "BATCH003",
        "temperature": 5.8,
        "humidity": 44.2,
        "timestamp": "2024-01-16T12:10:00Z"
    },
    {
        "batchID": "BATCH003",
        "temperature": 6.1,
        "humidity": 44.7,
        "timestamp": "2024-01-16T12:15:00Z"
    },
    {
        "batchID": "BATCH003",
        "temperature": 6.3,
        "humidity": 45.1,
        "timestamp": "2024-01-16T12:20:00Z"
    }
]
inventory_db = [
    {
        "id": 1,
        "name": "Amoxicillin 500mg",
        "category": "Antibiotics",
        "stock": 45,
        "maxStock": 50,
        "price": 45.99,
        "status": "low",
        "expiry": "2024-12-31",
        "supplier": "Pfizer Labs",
        "location": "Storage A"
    },
    {
        "id": 2,
        "name": "Surgical Gloves (Box)",
        "category": "Consumables",
        "stock": 156,
        "maxStock": 100,
        "price": 23.5,
        "status": "good",
        "expiry": "2025-06-30",
        "supplier": "Medical Supplies Co",
        "location": "Storage B"
    },
    {
        "id": 3,
        "name": "Insulin Pens",
        "category": "Diabetes Care",
        "stock": 12,
        "maxStock": 25,
        "price": 89.99,
        "status": "critical",
        "expiry": "2024-11-15",
        "supplier": "Novo Nordisk",
        "location": "Cold Storage"
    },
    {
        "id": 4,
        "name": "Blood Pressure Monitors",
        "category": "Equipment",
        "stock": 8,
        "maxStock": 5,
        "price": 129.99,
        "status": "good",
        "expiry": "2026-12-31",
        "supplier": "Omron Healthcare",
        "location": "Equipment Room"
    },
    {
        "id": 5,
        "name": "Paracetamol 500mg",
        "category": "Pain Management",
        "stock": 25,
        "maxStock": 30,
        "price": 12.99,
        "status": "low",
        "expiry": "2025-03-31",
        "supplier": "Generic Pharma",
        "location": "Storage A"
    }
]
alerts_db = [
    {
        "id": 1,
        "type": "low_stock",
        "message": "Amoxicillin 500mg is running low (45 units left)",
        "time": "5 min ago",
        "severity": "warning",
        "item_id": 1
    },
    {
        "id": 2,
        "type": "expiry",
        "message": "Insulin Pens expire in 30 days",
        "time": "1 hour ago",
        "severity": "warning",
        "item_id": 3
    },
    {
        "id": 3,
        "type": "critical",
        "message": "Insulin Pens below critical threshold (12 units)",
        "time": "2 hours ago",
        "severity": "critical",
        "item_id": 3
    }
]
blockchain_activity = [
    {
        "id": 1,
        "type": "stock_update",
        "hash": "0x1a2b3c4d",
        "item": "Amoxicillin 500mg",
        "action": "Quantity updated: 50 → 45",
        "time": "2 min ago",
        "block": "12847592"
    },
    {
        "id": 2,
        "type": "purchase_order",
        "hash": "0x5e6f7g8h",
        "item": "Surgical Gloves",
        "action": "Order created: 500 units",
        "time": "15 min ago",
        "block": "12847588"
    },
    {
        "id": 3,
        "type": "item_added",
        "hash": "0x9i0j1k2l",
        "item": "Blood Pressure Monitor",
        "action": "New item added to inventory",
        "time": "1 hour ago",
        "block": "12847585"
    }
]

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

class PredictionRequest(BaseModel):
    batch_id: str
    temp_c: float
    humidity: float

class PredictionResponse(BaseModel):
    batch_id: str
    risk: str

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

@app.post("/coldchain/predict")
async def predict_risk(request: PredictionRequest):
    if model is None or scaler is None:
        raise HTTPException(status_code=500, detail="ML model not loaded")
    
    try:
        # Prepare input data
        input_data = np.array([[request.temp_c, request.humidity]])
        
        # Scale the input data
        input_scaled = scaler.transform(input_data)
        
        # Make prediction
        prediction = model.predict(input_scaled)[0]
        
        return PredictionResponse(
            batch_id=request.batch_id,
            risk=prediction
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Prediction failed: {str(e)}")

@app.get("/coldchain/test")
async def test_ml_model():
    if model is None or scaler is None:
        raise HTTPException(status_code=500, detail="ML model not loaded")
    
    try:
        # Test with sample data
        test_data = np.array([
            [4.5, 70],  # Safe conditions
            [9.2, 65],  # Spoiled conditions
            [2.0, 75]   # Spoiled conditions
        ])
        
        # Scale the test data
        test_scaled = scaler.transform(test_data)
        
        # Make predictions
        predictions = model.predict(test_scaled)
        
        return {
            "message": "ML model is working correctly",
            "test_predictions": [
                {"temp_c": 4.5, "humidity": 70, "risk": predictions[0]},
                {"temp_c": 9.2, "humidity": 65, "risk": predictions[1]},
                {"temp_c": 2.0, "humidity": 75, "risk": predictions[2]}
            ]
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Test failed: {str(e)}")

# Inventory Management Endpoints
@app.get("/inventory")
async def get_inventory():
    return {"items": inventory_db}

@app.get("/inventory/{item_id}")
async def get_inventory_item(item_id: int):
    for item in inventory_db:
        if item["id"] == item_id:
            return item
    raise HTTPException(status_code=404, detail="Item not found")

@app.post("/inventory")
async def add_inventory_item(item: dict):
    item["id"] = len(inventory_db) + 1
    inventory_db.append(item)
    return {"message": "Item added successfully", "item": item}

# Alerts Endpoints
@app.get("/alerts")
async def get_alerts():
    return {"alerts": alerts_db}

@app.put("/alerts/{alert_id}/resolve")
async def resolve_alert(alert_id: int):
    for alert in alerts_db:
        if alert["id"] == alert_id:
            alert["resolved"] = True
            alert["resolved_at"] = datetime.now().isoformat()
            return {"message": f"Alert {alert_id} resolved"}
    raise HTTPException(status_code=404, detail="Alert not found")

# Blockchain Activity Endpoints
@app.get("/blockchain/activity")
async def get_blockchain_activity():
    return {"activities": blockchain_activity}

# Dashboard Stats
@app.get("/dashboard/stats")
async def get_dashboard_stats():
    total_items = len(inventory_db)
    low_stock_alerts = len([item for item in inventory_db if item["status"] in ["low", "critical"]])
    total_value = sum(item["stock"] * item["price"] for item in inventory_db)
    
    return {
        "total_items": total_items,
        "low_stock_alerts": low_stock_alerts,
        "total_value": round(total_value, 2),
        "active_alerts": len(alerts_db)
    }

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
async def startup_event():
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
