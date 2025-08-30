import React, { useState } from 'react';
import ClinicalTrials from './components/ClinicalTrials';
import ColdChainMonitoring from './components/ColdChainMonitoring';

function App() {
  const [activeTab, setActiveTab] = useState('trials');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <header className="bg-white shadow-lg border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <h1 className="text-3xl font-bold text-gray-900">
                <span className="text-blue-600">Trial</span>
                <span className="text-green-600">Chain</span>
                <span className="text-blue-600">+</span>
                <span className="text-indigo-600">ColdCare</span>
              </h1>
            </div>
            <div className="flex space-x-4">
              <button onClick={() => setActiveTab('trials')} className={`px-4 py-2 rounded-lg font-medium transition-colors ${activeTab === 'trials' ? 'bg-blue-600 text-white shadow-md' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
                Clinical Trials
              </button>
              <button onClick={() => setActiveTab('coldchain')} className={`px-4 py-2 rounded-lg font-medium transition-colors ${activeTab === 'coldchain' ? 'bg-blue-600 text-white shadow-md' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
                Cold-Chain Monitoring
              </button>
            </div>
          </div>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'trials' ? <ClinicalTrials /> : <ColdChainMonitoring />}
      </main>
    </div>
  );
}

export default App;
