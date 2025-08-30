# TrialChain+ColdCare

A comprehensive web application for clinical trial supply chain management and cold-chain monitoring with real-time IoT data visualization and AI-powered risk analysis.

## 🚀 Features

### Clinical Trial Supply Management
- **Drug Batch Logging**: Create and track drug batches with blockchain-style ledger
- **Regulator Approval System**: Secure approval workflow for batch shipments
- **Real-time Tracking**: Monitor shipment status and approval history
- **Audit Trail**: Complete blockchain-style ledger for transparency

### Cold-Chain Monitoring
- **Live Temperature Data**: Real-time temperature and humidity monitoring
- **AI Risk Analysis**: Intelligent risk assessment using machine learning
- **Safety Status Indicators**: Instant SAFE/SPOILED status updates
- **Interactive Charts**: Beautiful data visualization with Recharts
- **WebSocket Integration**: Real-time data streaming

## 🛠 Tech Stack

- **Frontend**: React 18 + Tailwind CSS + Recharts
- **Backend**: FastAPI + WebSocket + AsyncIO
- **Real-time Data**: WebSocket connections for live updates
- **AI Integration**: Risk analysis API with intelligent recommendations
- **UI/UX**: Modern, responsive design with beautiful gradients

## 📦 Installation

1. **Clone and navigate to the project**:
```bash
cd /workspace
```

2. **Install backend dependencies**:
```bash
cd backend
pip install -r requirements.txt
```

3. **Install frontend dependencies**:
```bash
cd ../frontend
npm install
```

## 🚀 Quick Start

### Option 1: Use the startup script (Recommended)
```bash
./start.sh
```

### Option 2: Manual startup

**Terminal 1 - Backend**:
```bash
cd backend
python -m uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

**Terminal 2 - Frontend**:
```bash
cd frontend
npm start
```

## 🌐 Access Points

- **Frontend Application**: http://localhost:3000
- **Backend API**: http://localhost:8000
- **API Documentation**: http://localhost:8000/docs
- **Interactive API Docs**: http://localhost:8000/redoc

## 📋 API Endpoints

### Clinical Trials
- `POST /trials` - Create new drug batch
- `GET /trials` - Get all batches
- `PUT /trials/{batch_id}/approve` - Approve batch (regulator role)

### Cold-Chain Monitoring
- `POST /coldchain` - Submit sensor data
- `GET /coldchain/risk?batch_id={id}` - Get AI risk analysis
- `GET /coldchain/data/{batch_id}` - Get batch sensor data
- `WS /ws` - WebSocket for real-time updates

## 🎯 Usage Guide

### Clinical Trial Supply Tab
1. **Log New Batch**: Fill out the form with drug details
2. **View Ledger**: See all batches in the blockchain-style table
3. **Approve Batches**: Click "Approve" button for regulator actions

### Cold-Chain Monitoring Tab
1. **Select Batch**: Choose from dropdown to monitor specific batches
2. **View Live Data**: Real-time temperature charts update every 5 seconds
3. **Monitor Status**: Check SAFE/SPOILED indicators and risk scores
4. **AI Insights**: Review recommendations from the AI model

## 🔧 Configuration

### Environment Variables
- `PORT`: Backend port (default: 8000)
- `FRONTEND_PORT`: Frontend port (default: 3000)

### Customization
- Modify temperature thresholds in `backend/main.py`
- Adjust risk scoring algorithm in the risk analysis endpoint
- Customize UI themes in `frontend/src/index.css`

## 🧪 Testing

### API Testing
```bash
# Test batch creation
curl -X POST "http://localhost:8000/trials" \
  -H "Content-Type: application/json" \
  -d '{"drugName":"Test Drug","expiry":"2024-12-31","sender":"Lab A","receiver":"Hospital B"}'

# Test risk analysis
curl "http://localhost:8000/coldchain/risk?batch_id=BATCH001"
```

### WebSocket Testing
```bash
# Connect to WebSocket for real-time data
wscat -c ws://localhost:8000/ws
```

## 📊 Data Flow

1. **IoT Sensors** → WebSocket → Frontend (real-time)
2. **User Input** → REST API → Database
3. **AI Model** → Risk Analysis → Safety Status
4. **Regulator Actions** → Approval Workflow → Ledger Update

## 🔒 Security Features

- CORS protection for cross-origin requests
- Input validation with Pydantic models
- Secure WebSocket connections
- Audit trail for all transactions

## 🚀 Deployment

### Production Setup
1. Set up PostgreSQL database
2. Configure environment variables
3. Use production WSGI server (Gunicorn)
4. Set up reverse proxy (Nginx)
5. Enable HTTPS

### Docker Deployment
```bash
# Build and run with Docker Compose
docker-compose up -d
```

## 🤝 Contributing

1. Fork the repository
2. Create feature branch
3. Make changes
4. Test thoroughly
5. Submit pull request

## 📄 License

MIT License - see LICENSE file for details

## 🆘 Support

For issues and questions:
1. Check the API documentation at `/docs`
2. Review the console logs
3. Verify WebSocket connections
4. Check network connectivity

---

**Built with ❤️ for the healthcare supply chain industry**
