import React, { useState } from 'react';
import LandingPage from './components/LandingPage';
import LoginPage from './components/LoginPage';
import Dashboard from './components/Dashboard';

function App() {
  const [currentPage, setCurrentPage] = useState('landing');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
    setCurrentPage('dashboard');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentPage('landing');
  };

  const handleBackToLanding = () => {
    setCurrentPage('landing');
  };

  const handleShowLogin = () => {
    setCurrentPage('login');
  };

  if (currentPage === 'landing') {
    return <LandingPage onLogin={handleShowLogin} />;
  }

  if (currentPage === 'login') {
    return <LoginPage onLogin={handleLogin} onBack={handleBackToLanding} />;
  }

  if (currentPage === 'dashboard' && isAuthenticated) {
    return <Dashboard onLogout={handleLogout} />;
  }

  return <LandingPage onLogin={handleShowLogin} />;
}

export default App;
