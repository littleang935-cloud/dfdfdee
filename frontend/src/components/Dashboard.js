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
  Bell
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

const Dashboard = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [user] = useState({ name: 'Dr. Sarah Johnson', role: 'Administrator' });

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
    { id: 'coldchain', label: 'Cold Chain', icon: Thermometer },
    { id: 'analytics', label: 'Analytics', icon: TrendingUp },
    { id: 'alerts', label: 'Alerts', icon: Bell },
    { id: 'blockchain', label: 'Blockchain', icon: Shield },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

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

            {activeTab === 'coldchain' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900">Cold Chain Monitoring</h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Temperature Monitoring</h3>
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={analyticsData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="items" stroke="#3B82F6" strokeWidth={2} name="Temperature (°C)" />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>

                  <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Current Status</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                        <div>
                          <p className="text-sm font-medium text-gray-900">Vaccine Storage</p>
                          <p className="text-sm text-gray-600">Temperature: 4.2°C</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="w-5 h-5 text-green-600" />
                          <span className="text-sm font-medium text-green-600">SAFE</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg">
                        <div>
                          <p className="text-sm font-medium text-gray-900">Insulin Storage</p>
                          <p className="text-sm text-gray-600">Temperature: 7.8°C</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <AlertTriangle className="w-5 h-5 text-yellow-600" />
                          <span className="text-sm font-medium text-yellow-600">WARNING</span>
                        </div>
                      </div>
                    </div>
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