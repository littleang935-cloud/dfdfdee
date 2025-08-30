import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BarChart3, 
  Package, 
  Thermometer, 
  Users, 
  Settings, 
  LogOut,
  Plus,
  Search,
  Filter,
  MoreVertical,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Clock,
  DollarSign,
  Database,
  Activity,
  Shield,
  Bell,
  TestTube,
  Zap
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

const Dashboard = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [user] = useState({ name: 'Dr. Sarah Johnson', role: 'Administrator' });
  
  // TrialChain+ColdCare state
  const [batches, setBatches] = useState([]);
  const [sensorData, setSensorData] = useState([]);
  const [riskAnalysis, setRiskAnalysis] = useState({});
  const [selectedBatch, setSelectedBatch] = useState('BATCH001');
  const [formData, setFormData] = useState({
    drugName: '',
    expiry: '',
    sender: '',
    receiver: ''
  });
  const [loading, setLoading] = useState(false);
  const [ws, setWs] = useState(null);

  const batchIds = ['BATCH001', 'BATCH002', 'BATCH003'];

  // Mock data
  const inventoryItems = [
    { id: 1, name: 'Amoxicillin 500mg', category: 'Antibiotics', stock: 45, maxStock: 50, price: 45.99, status: 'low' },
    { id: 2, name: 'Surgical Gloves (Box)', category: 'Consumables', stock: 156, maxStock: 100, price: 23.5, status: 'good' },
    { id: 3, name: 'Insulin Pens', category: 'Diabetes Care', stock: 12, maxStock: 25, price: 89.99, status: 'critical' },
    { id: 4, name: 'Blood Pressure Monitors', category: 'Equipment', stock: 8, maxStock: 5, price: 129.99, status: 'good' },
    { id: 5, name: 'Paracetamol 500mg', category: 'Pain Management', stock: 25, maxStock: 30, price: 12.99, status: 'low' },
  ];

  const alerts = [
    { id: 1, type: 'low_stock', message: 'Amoxicillin 500mg is running low (45 units left)', time: '5 min ago', severity: 'warning' },
    { id: 2, type: 'expiry', message: 'Insulin Pens expire in 30 days', time: '1 hour ago', severity: 'warning' },
    { id: 3, type: 'critical', message: 'Insulin Pens below critical threshold (12 units)', time: '2 hours ago', severity: 'critical' },
  ];

  const blockchainActivity = [
    { id: 1, type: 'stock_update', hash: '0x1a2b3c4d', item: 'Amoxicillin 500mg', action: 'Quantity updated: 50 → 45', time: '2 min ago', block: '12847592' },
    { id: 2, type: 'purchase_order', hash: '0x5e6f7g8h', item: 'Surgical Gloves', action: 'Order created: 500 units', time: '15 min ago', block: '12847588' },
    { id: 3, type: 'item_added', hash: '0x9i0j1k2l', item: 'Blood Pressure Monitor', action: 'New item added to inventory', time: '1 hour ago', block: '12847585' },
  ];

  const analyticsData = [
    { month: 'Jan', items: 1200, value: 45000 },
    { month: 'Feb', items: 1250, value: 48000 },
    { month: 'Mar', items: 1300, value: 52000 },
    { month: 'Apr', items: 1247, value: 47320 },
    { month: 'May', items: 1280, value: 49000 },
    { month: 'Jun', items: 1320, value: 51000 },
  ];

  const pieData = [
    { name: 'Antibiotics', value: 35, color: '#3B82F6' },
    { name: 'Consumables', value: 25, color: '#10B981' },
    { name: 'Equipment', value: 20, color: '#F59E0B' },
    { name: 'Pain Management', value: 15, color: '#EF4444' },
    { name: 'Diabetes Care', value: 5, color: '#8B5CF6' },
  ];

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'inventory', label: 'Inventory', icon: Package },
    { id: 'clinical-trials', label: 'Clinical Trials', icon: TestTube },
    { id: 'coldchain', label: 'Cold Chain', icon: Thermometer },
    { id: 'analytics', label: 'Analytics', icon: TrendingUp },
    { id: 'alerts', label: 'Alerts', icon: Bell },
    { id: 'blockchain', label: 'Blockchain', icon: Shield },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  // TrialChain+ColdCare API functions
  const fetchBatches = async () => {
    try {
      const response = await fetch('http://localhost:8000/trials');
      const data = await response.json();
      setBatches(data.batches);
    } catch (error) {
      console.error('Error fetching batches:', error);
    }
  };

  const handleSubmitBatch = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await fetch('http://localhost:8000/trials', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (response.ok) {
        setFormData({
          drugName: '',
          expiry: '',
          sender: '',
          receiver: ''
        });
        fetchBatches();
      }
    } catch (error) {
      console.error('Error creating batch:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleApproveBatch = async (batchId) => {
    try {
      const response = await fetch(`http://localhost:8000/trials/${batchId}/approve`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (response.ok) {
        fetchBatches();
      }
    } catch (error) {
      console.error('Error approving batch:', error);
    }
  };

  const fetchRiskAnalysis = async (batchId) => {
    try {
      const response = await fetch(`http://localhost:8000/coldchain/risk?batch_id=${batchId}`);
      if (response.ok) {
        const analysis = await response.json();
        setRiskAnalysis(analysis);
      }
    } catch (error) {
      console.error('Error fetching risk analysis:', error);
    }
  };

  // WebSocket setup for real-time data
  useEffect(() => {
    if (activeTab === 'coldchain') {
      const websocket = new WebSocket('ws://localhost:8000/ws');
      
      websocket.onopen = () => {
        console.log('WebSocket connected');
      };

      websocket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        if (data.type === 'sensor_data') {
          setSensorData(prev => {
            const newData = [...prev, data.data];
            return newData.slice(-20);
          });
        }
      };

      websocket.onerror = (error) => {
        console.error('WebSocket error:', error);
      };

      setWs(websocket);

      return () => {
        websocket.close();
      };
    }
  }, [activeTab]);

  useEffect(() => {
    if (activeTab === 'clinical-trials') {
      fetchBatches();
    }
  }, [activeTab]);

  useEffect(() => {
    if (activeTab === 'coldchain') {
      fetchRiskAnalysis(selectedBatch);
    }
  }, [selectedBatch, activeTab]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'good': return 'text-green-500 bg-green-100';
      case 'low': return 'text-yellow-500 bg-yellow-100';
      case 'critical': return 'text-red-500 bg-red-100';
      default: return 'text-gray-500 bg-gray-100';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'good': return 'good';
      case 'low': return 'low';
      case 'critical': return 'critical';
      default: return 'unknown';
    }
  };

  const getStatusColorColdChain = (status) => {
    return status === 'SAFE' ? 'text-green-600' : 'text-red-600';
  };

  const getStatusBgColorColdChain = (status) => {
    return status === 'SAFE' ? 'bg-green-100' : 'bg-red-100';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <div className="text-2xl font-bold text-gray-900">
                <span className="text-blue-600">Med</span>
                <span className="text-green-600">Chain</span>
              </div>
              <div className="h-6 w-px bg-gray-300"></div>
              <div className="text-sm text-gray-600">
                Welcome back, <span className="font-semibold">{user.name}</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                <Bell size={20} />
              </button>
              <button 
                onClick={onLogout}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                <LogOut size={16} />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tab Navigation */}
        <div className="flex space-x-1 bg-white rounded-lg p-1 shadow-sm mb-8 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              <tab.icon size={16} />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === 'overview' && (
              <div className="space-y-8">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Total Items</p>
                        <p className="text-2xl font-bold text-gray-900">1,247</p>
                        <p className="text-sm text-green-600 flex items-center mt-1">
                          <TrendingUp size={14} className="mr-1" />
                          +12% from last month
                        </p>
                      </div>
                      <div className="p-3 bg-blue-100 rounded-lg">
                        <Database className="w-6 h-6 text-blue-600" />
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Low Stock Alerts</p>
                        <p className="text-2xl font-bold text-gray-900">23</p>
                        <p className="text-sm text-red-600 flex items-center mt-1">
                          <AlertTriangle size={14} className="mr-1" />
                          +5 today
                        </p>
                      </div>
                      <div className="p-3 bg-red-100 rounded-lg">
                        <AlertTriangle className="w-6 h-6 text-red-600" />
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Monthly Usage</p>
                        <p className="text-2xl font-bold text-gray-900">$47,832</p>
                        <p className="text-sm text-green-600 flex items-center mt-1">
                          <TrendingUp size={14} className="mr-1" />
                          +8.2% from last month
                        </p>
                      </div>
                      <div className="p-3 bg-green-100 rounded-lg">
                        <DollarSign className="w-6 h-6 text-green-600" />
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Inventory Value</p>
                        <p className="text-2xl font-bold text-gray-900">$284,391</p>
                        <p className="text-sm text-red-600 flex items-center mt-1">
                          <TrendingUp size={14} className="mr-1" />
                          -2.1% from last month
                        </p>
                      </div>
                      <div className="p-3 bg-purple-100 rounded-lg">
                        <Activity className="w-6 h-6 text-purple-600" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Charts */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Inventory Trends</h3>
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={analyticsData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="items" stroke="#3B82F6" strokeWidth={2} />
                        <Line type="monotone" dataKey="value" stroke="#10B981" strokeWidth={2} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>

                  <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Category Distribution</h3>
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={pieData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {pieData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
                  <div className="space-y-4">
                    {blockchainActivity.slice(0, 5).map((activity) => (
                      <div key={activity.id} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                        <div className="p-2 bg-blue-100 rounded-lg">
                          <Shield className="w-4 h-4 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">{activity.item}</p>
                          <p className="text-xs text-gray-600">{activity.action}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-gray-500">{activity.time}</p>
                          <p className="text-xs text-blue-600 font-mono">{activity.hash}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'inventory' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-gray-900">Inventory Management</h2>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
                    <Plus size={16} />
                    <span>Add Item</span>
                  </button>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                  <div className="p-6 border-b border-gray-200">
                    <div className="flex items-center space-x-4">
                      <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                          type="text"
                          placeholder="Search inventory..."
                          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                        <Filter size={20} />
                      </button>
                    </div>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {inventoryItems.map((item) => (
                          <tr key={item.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div>
                                <div className="text-sm font-medium text-gray-900">{item.name}</div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">{item.category}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">{item.stock}/{item.maxStock}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">${item.price}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(item.status)}`}>
                                {getStatusText(item.status)}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                              <div className="flex space-x-2">
                                <button className="text-blue-600 hover:text-blue-900">List</button>
                                <button className="text-gray-600 hover:text-gray-900">View</button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'alerts' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900">Active Alerts</h2>
                <div className="space-y-4">
                  {alerts.map((alert) => (
                    <div key={alert.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-4">
                          <div className={`p-3 rounded-lg ${
                            alert.severity === 'critical' ? 'bg-red-100' : 'bg-yellow-100'
                          }`}>
                            <AlertTriangle className={`w-6 h-6 ${
                              alert.severity === 'critical' ? 'text-red-600' : 'text-yellow-600'
                            }`} />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-900">{alert.message}</p>
                            <p className="text-xs text-gray-500 mt-1">{alert.time}</p>
                          </div>
                        </div>
                        <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                          Resolve
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'blockchain' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900">Recent Blockchain Activity</h2>
                <div className="space-y-4">
                  {blockchainActivity.map((activity) => (
                    <div key={activity.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-4">
                          <div className="p-3 bg-blue-100 rounded-lg">
                            <Shield className="w-6 h-6 text-blue-600" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <span className="text-sm font-medium text-gray-900">{activity.type.replace('_', ' ').toUpperCase()}</span>
                              <span className="text-xs text-gray-500">•</span>
                              <span className="text-xs text-gray-500">{activity.time}</span>
                            </div>
                            <p className="text-sm text-gray-900 mb-1">{activity.item}</p>
                            <p className="text-sm text-gray-600">{activity.action}</p>
                            <div className="flex items-center space-x-4 mt-2">
                              <span className="text-xs text-blue-600 font-mono">{activity.hash}</span>
                              <span className="text-xs text-gray-500">Block #{activity.block}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'clinical-trials' && (
              <div className="space-y-8">
                {/* Form Section */}
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Log New Drug Batch</h2>
                  <form onSubmit={handleSubmitBatch} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Drug Name
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.drugName}
                          onChange={(e) => setFormData({...formData, drugName: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Enter drug name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Expiry Date
                        </label>
                        <input
                          type="date"
                          required
                          value={formData.expiry}
                          onChange={(e) => setFormData({...formData, expiry: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Sender
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.sender}
                          onChange={(e) => setFormData({...formData, sender: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Enter sender name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Receiver
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.receiver}
                          onChange={(e) => setFormData({...formData, receiver: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Enter receiver name"
                        />
                      </div>
                    </div>
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                    >
                      {loading ? 'Creating Batch...' : 'Create Batch'}
                    </button>
                  </form>
                </div>

                {/* Blockchain Ledger Section */}
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Blockchain Ledger - Approved Shipments</h2>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Batch ID
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Drug Name
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Expiry
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Sender
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Receiver
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {batches.map((batch) => (
                          <tr key={batch.batchID} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              {batch.batchID}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {batch.drugName}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {new Date(batch.expiry).toLocaleDateString()}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {batch.sender}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {batch.receiver}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                batch.status === 'approved' 
                                  ? 'bg-green-100 text-green-800' 
                                  : 'bg-yellow-100 text-yellow-800'
                              }`}>
                                {batch.status}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {batch.status === 'pending' && (
                                <button
                                  onClick={() => handleApproveBatch(batch.batchID)}
                                  className="bg-green-600 text-white px-3 py-1 rounded-md text-xs hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                                >
                                  Approve (Regulator)
                                </button>
                              )}
                              {batch.status === 'approved' && batch.approved_by && (
                                <span className="text-xs text-gray-500">
                                  Approved by {batch.approved_by}
                                </span>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    {batches.length === 0 && (
                      <div className="text-center py-8 text-gray-500">
                        No batches found. Create a new batch to see it here.
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'coldchain' && (
              <div className="space-y-8">
                {/* Batch Selection */}
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Cold-Chain Monitoring</h2>
                  <div className="flex space-x-4">
                    {batchIds.map((batchId) => (
                      <button
                        key={batchId}
                        onClick={() => setSelectedBatch(batchId)}
                        className={`px-4 py-2 rounded-md font-medium ${
                          selectedBatch === batchId
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                      >
                        {batchId}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Live Temperature Graph */}
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Live Temperature Data - {selectedBatch}</h3>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={sensorData.filter(d => d.batchID === selectedBatch)}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis 
                          dataKey="timestamp" 
                          tickFormatter={(value) => new Date(value).toLocaleTimeString()}
                        />
                        <YAxis 
                          domain={[0, 10]}
                          label={{ value: 'Temperature (°C)', angle: -90, position: 'insideLeft' }}
                        />
                        <Tooltip 
                          labelFormatter={(value) => new Date(value).toLocaleString()}
                          formatter={(value, name) => [value, name === 'temperature' ? 'Temperature (°C)' : 'Humidity (%)']}
                        />
                        <Legend />
                        <Line 
                          type="monotone" 
                          dataKey="temperature" 
                          stroke="#3B82F6" 
                          strokeWidth={2}
                          dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
                          activeDot={{ r: 6 }}
                        />
                        <Line 
                          type="monotone" 
                          dataKey="humidity" 
                          stroke="#10B981" 
                          strokeWidth={2}
                          dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
                          activeDot={{ r: 6 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* AI Risk Analysis */}
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">AI Risk Analysis - {selectedBatch}</h3>
                  
                  {riskAnalysis.status ? (
                    <div className="space-y-4">
                      {/* Status Indicator */}
                      <div className="flex items-center space-x-4">
                        <span className="text-lg font-medium text-gray-700">Status:</span>
                        <div className={`px-4 py-2 rounded-full ${getStatusBgColorColdChain(riskAnalysis.status)}`}>
                          <span className={`font-bold text-lg ${getStatusColorColdChain(riskAnalysis.status)}`}>
                            {riskAnalysis.status}
                          </span>
                        </div>
                      </div>

                      {/* Risk Score */}
                      <div className="flex items-center space-x-4">
                        <span className="text-lg font-medium text-gray-700">Risk Score:</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-32 bg-gray-200 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full ${
                                riskAnalysis.risk_score < 0.3 ? 'bg-green-500' : 
                                riskAnalysis.risk_score < 0.7 ? 'bg-yellow-500' : 'bg-red-500'
                              }`}
                              style={{ width: `${riskAnalysis.risk_score * 100}%` }}
                            ></div>
                          </div>
                          <span className="text-sm font-medium text-gray-600">
                            {(riskAnalysis.risk_score * 100).toFixed(1)}%
                          </span>
                        </div>
                      </div>

                      {/* Recommendations */}
                      {riskAnalysis.recommendations && riskAnalysis.recommendations.length > 0 && (
                        <div>
                          <span className="text-lg font-medium text-gray-700 block mb-2">Recommendations:</span>
                          <ul className="list-disc list-inside space-y-1">
                            {riskAnalysis.recommendations.map((rec, index) => (
                              <li key={index} className="text-gray-600">{rec}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      Loading risk analysis...
                    </div>
                  )}
                </div>

                {/* Real-time Data Feed */}
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Real-time Sensor Data Feed</h3>
                  <div className="space-y-2 max-h-60 overflow-y-auto">
                    {sensorData
                      .filter(d => d.batchID === selectedBatch)
                      .slice(-10)
                      .reverse()
                      .map((data, index) => (
                        <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
                          <div className="flex space-x-4">
                            <span className="text-sm text-gray-600">
                              {new Date(data.timestamp).toLocaleTimeString()}
                            </span>
                            <span className="text-sm font-medium">
                              Temp: {data.temperature}°C
                            </span>
                            <span className="text-sm font-medium">
                              Humidity: {data.humidity}%
                            </span>
                          </div>
                          <div className={`px-2 py-1 rounded text-xs font-medium ${
                            data.temperature >= 2 && data.temperature <= 8 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {data.temperature >= 2 && data.temperature <= 8 ? 'SAFE' : 'WARNING'}
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'analytics' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900">Analytics & Reports</h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Usage Trends</h3>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={analyticsData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="value" fill="#3B82F6" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>

                  <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Inventory Value Distribution</h3>
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={pieData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {pieData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'users' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900">User Management</h2>
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <p className="text-gray-600">User management features coming soon...</p>
                </div>
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900">Settings</h2>
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <p className="text-gray-600">Settings panel coming soon...</p>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Dashboard;