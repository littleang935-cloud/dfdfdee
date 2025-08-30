import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const ColdChainMonitoring = () => {
  const [sensorData, setSensorData] = useState([]);
  const [riskAnalysis, setRiskAnalysis] = useState({});
  const [selectedBatch, setSelectedBatch] = useState('BATCH001');

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8000/ws');
    
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'sensor_data') {
        setSensorData(prev => [...prev, data.data]);
        fetchRiskAnalysis(data.data.batchID);
      }
    };

    return () => ws.close();
  }, []);

  const fetchRiskAnalysis = async (batchId) => {
    try {
      const response = await fetch(`http://localhost:8000/coldchain/risk?batch_id=${batchId}`);
      const data = await response.json();
      setRiskAnalysis(prev => ({...prev, [batchId]: data}));
    } catch (error) {
      console.error('Error fetching risk analysis:', error);
    }
  };

  const getBatchData = (batchId) => {
    return sensorData.filter(data => data.batchID === batchId).slice(-20);
  };

  const currentBatchData = getBatchData(selectedBatch);
  const currentRisk = riskAnalysis[selectedBatch];

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Live Temperature Monitoring</h2>
          <select
            value={selectedBatch}
            onChange={(e) => setSelectedBatch(e.target.value)}
            className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="BATCH001">BATCH001</option>
            <option value="BATCH002">BATCH002</option>
            <option value="BATCH003">BATCH003</option>
          </select>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-6 text-white">
            <h3 className="text-lg font-semibold mb-2">Current Temperature</h3>
            <p className="text-3xl font-bold">
              {currentBatchData.length > 0 ? `${currentBatchData[currentBatchData.length - 1].temperature}°C` : 'N/A'}
            </p>
          </div>
          
          <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg p-6 text-white">
            <h3 className="text-lg font-semibold mb-2">Current Humidity</h3>
            <p className="text-3xl font-bold">
              {currentBatchData.length > 0 ? `${currentBatchData[currentBatchData.length - 1].humidity}%` : 'N/A'}
            </p>
          </div>
          
          <div className={`rounded-lg p-6 text-white ${
            currentRisk?.status === 'SAFE' 
              ? 'bg-gradient-to-r from-green-500 to-green-600' 
              : 'bg-gradient-to-r from-red-500 to-red-600'
          }`}>
            <h3 className="text-lg font-semibold mb-2">Status</h3>
            <p className="text-3xl font-bold">{currentRisk?.status || 'UNKNOWN'}</p>
          </div>
        </div>

        <div className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={currentBatchData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="timestamp" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="temperature" stroke="#3B82F6" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {currentRisk && (
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">AI Risk Analysis</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-lg font-semibold text-gray-700 mb-2">Risk Score</h4>
              <div className="bg-gray-200 rounded-full h-4">
                <div 
                  className={`h-4 rounded-full transition-all duration-300 ${
                    currentRisk.risk_score < 0.3 ? 'bg-green-500' : 
                    currentRisk.risk_score < 0.7 ? 'bg-yellow-500' : 'bg-red-500'
                  }`}
                  style={{ width: `${currentRisk.risk_score * 100}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-600 mt-1">{Math.round(currentRisk.risk_score * 100)}%</p>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold text-gray-700 mb-2">Recommendations</h4>
              <ul className="space-y-2">
                {currentRisk.recommendations.map((rec, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-red-500 mr-2">•</span>
                    <span className="text-sm text-gray-700">{rec}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ColdChainMonitoring;
