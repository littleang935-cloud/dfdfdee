# 🏥 MedChain - Healthcare Inventory Management System

A comprehensive blockchain-powered healthcare inventory management system with integrated clinical trial supply tracking and cold-chain monitoring capabilities.

## 🌟 Features

### 🏠 Landing Page
- **Modern, responsive design** with dynamic moving background
- **Light/Dark mode toggle** (bottom-right corner)
- **Professional healthcare branding** with MedChain logo
- **Animated elements**: floating particles, gradient orbs, moving lines
- **Call-to-action sections** with testimonials and statistics

### 🔐 Authentication
- **Dummy login system** for demonstration
- **Credentials**: `admin` / `admin123`
- **Secure session management**

### 📊 Dashboard Overview
- **Total Items**: 1,247 tracked items
- **Low Stock Alerts**: Real-time notifications
- **Monthly Usage**: $47,832 analytics
- **Inventory Value**: $284,391 tracking
- **Clinical Trials Status**: Active trial monitoring
- **Cold Chain Monitoring**: Real-time temperature tracking

### 📦 Inventory Management
- **Add/Edit Items**: Complete CRUD operations
- **Stock Tracking**: Real-time inventory levels
- **Category Management**: Antibiotics, Consumables, Diabetes Care, Equipment, Pain Management
- **Status Indicators**: Good, Low, Critical stock levels
- **Price Tracking**: Complete financial management

### 🧪 Clinical Trials Supply
- **Drug Batch Logging**: Complete batch information
- **Blockchain Ledger**: Approved shipments tracking
- **Regulator Approval**: Role-based approval system
- **Batch Status**: Pending, Approved states
- **Audit Trail**: Complete transaction history

### 🌡️ Cold-Chain Monitoring
- **Live Temperature Data**: Real-time graph with dual Y-axis
- **AI Risk Analysis**: Dynamic risk assessment using ML model
- **ML Model Integration**: Logistic Regression classifier for risk prediction
- **Real-time Sensor Feed**: Live data updates every 3 seconds
- **Batch-specific Monitoring**: Individual batch tracking
- **Status Indicators**: SAFE, WARNING, CRITICAL states
- **ML Predictions**: Real-time Safe/Spoiled classification

### 🔔 Active Alerts System
- **Low Stock Alerts**: Automated notifications
- **Expiry Warnings**: Proactive expiry management
- **Critical Thresholds**: Emergency notifications
- **Real-time Updates**: Live alert system

### ⛓️ Blockchain Activity
- **Transaction History**: Complete audit trail
- **Block Numbers**: Blockchain integration
- **Hash Tracking**: Cryptographic verification
- **Activity Logging**: All system activities

### 📈 Analytics & Reports
- **Usage Analytics**: Monthly and trend analysis
- **Inventory Reports**: Comprehensive reporting
- **Performance Metrics**: System performance tracking

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- Python 3.8+
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd MedChain
```

2. **Backend Setup**
```bash
cd backend
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt

# Train the ML model
python3 train_model.py
```

3. **Frontend Setup**
```bash
cd frontend
npm install
```

4. **Start the Application**
```bash
# Option 1: Use the start script
chmod +x start.sh
./start.sh

# Option 2: Start manually
# Terminal 1 (Backend)
cd backend
source venv/bin/activate
uvicorn main:app --reload --host 0.0.0.0 --port 8000

# Terminal 2 (Frontend)
cd frontend
npm start
```

5. **Access the Application**
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000
- **API Documentation**: http://localhost:8000/docs

## 📡 API Routes & Structure

### 🔐 Authentication Routes
```http
POST /auth/login
Content-Type: application/json

{
  "username": "admin",
  "password": "admin123"
}
```

### 📦 Inventory Management Routes

#### Get All Inventory Items
```http
GET /inventory/items
Response: Array of inventory items with stock levels, prices, and status
```

#### Add New Item
```http
POST /inventory/items
Content-Type: application/json

{
  "name": "Amoxicillin 500mg",
  "category": "Antibiotics",
  "stock": 50,
  "price": 45.99,
  "description": "Broad-spectrum antibiotic"
}
```

#### Update Item
```http
PUT /inventory/items/{item_id}
Content-Type: application/json

{
  "stock": 45,
  "price": 42.99
}
```

#### Delete Item
```http
DELETE /inventory/items/{item_id}
```

### 🧪 Clinical Trials Routes

#### Get All Batches
```http
GET /trials
Response: Array of drug batches with approval status
```

#### Add New Batch
```http
POST /trials
Content-Type: application/json

{
  "drugName": "COVID-19 Vaccine (Moderna)",
  "expiry": "2024-12-31",
  "sender": "Moderna Pharmaceuticals",
  "receiver": "City General Hospital"
}
```

#### Approve Batch (Regulator Role)
```http
PUT /trials/{batch_id}/approve
Content-Type: application/json

{
  "approved_by": "Regulator_001",
  "approval_notes": "All safety checks passed"
}
```

#### Get Batch Details
```http
GET /trials/{batch_id}
Response: Complete batch information with approval history
```

### 🌡️ Cold-Chain Monitoring Routes

#### Get Sensor Data for Batch
```http
GET /coldchain/data/{batch_id}
Response: Array of temperature and humidity readings
```

#### Get Risk Analysis
```http
GET /coldchain/risk?batch_id={batch_id}
Response: AI risk assessment with recommendations
```

#### Post Sensor Data
```http
POST /coldchain/data
Content-Type: application/json

{
  "batchID": "BATCH001",
  "temperature": 4.2,
  "humidity": 45.3
}
```

#### ML Model Prediction
```http
POST /coldchain/predict
Content-Type: application/json

{
  "batch_id": "BATCH001",
  "temp_c": 4.5,
  "humidity": 70
}
Response: {
  "batch_id": "BATCH001",
  "risk": "Safe"
}
```

#### Test ML Model
```http
GET /coldchain/test
Response: Test predictions with sample data to verify model functionality
```

### 🔔 Alerts Routes

#### Get Active Alerts
```http
GET /alerts
Response: Array of active alerts with severity levels
```

#### Create Alert
```http
POST /alerts
Content-Type: application/json

{
  "type": "low_stock",
  "message": "Amoxicillin 500mg is running low",
  "severity": "warning",
  "item_id": "item_123"
}
```

#### Resolve Alert
```http
PUT /alerts/{alert_id}/resolve
```

### ⛓️ Blockchain Routes

#### Get Blockchain Activity
```http
GET /blockchain/activity
Response: Array of blockchain transactions
```

#### Get Transaction Details
```http
GET /blockchain/transaction/{hash}
Response: Detailed transaction information
```

## 📊 Data Models

### Drug Batch Model
```json
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
}
```

### Sensor Data Model
```json
{
  "batchID": "BATCH001",
  "temperature": 4.2,
  "humidity": 45.3,
  "timestamp": "2024-01-16T12:00:00Z"
}
```

### Risk Analysis Model
```json
{
  "status": "SAFE",
  "risk_score": 0.12,
  "recommendations": [
    "Temperature stable at 4.2°C",
    "Humidity levels optimal",
    "Continue standard monitoring"
  ]
}
```

### Inventory Item Model
```json
{
  "id": "item_123",
  "name": "Amoxicillin 500mg",
  "category": "Antibiotics",
  "stock": 45,
  "max_stock": 50,
  "price": 45.99,
  "status": "low",
  "description": "Broad-spectrum antibiotic"
}
```

## 🎨 UI Components

### Landing Page Features
- **Responsive Design**: Mobile-first approach
- **Dynamic Background**: Animated particles and gradients
- **Theme Toggle**: Light/Dark mode switching
- **Smooth Animations**: Framer Motion integration

### Dashboard Features
- **Tab Navigation**: 8 main sections
- **Real-time Updates**: Live data streaming
- **Interactive Charts**: Recharts integration
- **Status Indicators**: Color-coded alerts

### Cold-Chain Monitoring
- **Live Temperature Graph**: Real-time updates every 3 seconds
- **Dual Y-axis**: Temperature and humidity tracking
- **AI Risk Analysis**: Dynamic risk assessment
- **Current Values Display**: Real-time sensor readings

## 🔧 Technical Stack

### Frontend
- **React 18**: Modern React with hooks
- **Tailwind CSS**: Utility-first CSS framework
- **Framer Motion**: Smooth animations
- **Recharts**: Data visualization
- **Lucide React**: Icon library

### Backend
- **FastAPI**: Modern Python web framework
- **Uvicorn**: ASGI server
- **Pydantic**: Data validation
- **WebSocket**: Real-time communication
- **scikit-learn**: Machine learning library
- **pandas**: Data manipulation
- **joblib**: Model serialization
- **Logistic Regression**: ML model for risk prediction

### Development Tools
- **npm**: Package management
- **Python venv**: Virtual environment
- **Git**: Version control

## 🚀 Deployment

### Environment Variables
```bash
# Backend
DATABASE_URL=postgresql://user:password@localhost/medchain
SECRET_KEY=your-secret-key
DEBUG=True

# Frontend
REACT_APP_API_URL=http://localhost:8000
REACT_APP_WS_URL=ws://localhost:8000/ws
```

### Production Build
```bash
# Frontend
cd frontend
npm run build

# Backend
cd backend
pip install -r requirements.txt
uvicorn main:app --host 0.0.0.0 --port 8000
```

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📞 Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the API documentation at `/docs`

---

**MedChain** - Revolutionizing healthcare inventory management with blockchain technology and real-time monitoring. 🏥✨
