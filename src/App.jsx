import React, { useState } from 'react';
import Navbar from './components/layout/Navbar';
import AuthPage from './pages/AuthPage';
import DashboardPage from './pages/DashboardPage';
import EmployeesPage from './pages/EmployeesPage';

export default function App() {
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem('employee_mgmt_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [activeTab, setActiveTab] = useState('dashboard'); // 'dashboard' | 'employees'

  const handleLoginSuccess = (user) => {
    setCurrentUser(user);
    localStorage.setItem('employee_mgmt_user', JSON.stringify(user));
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('employee_mgmt_user');
  };

  if (!currentUser) {
    return <AuthPage onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-['Inter',sans-serif]">
      {/* Thanh điều hướng Navbar dùng chung */}
      <Navbar
        user={currentUser}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onLogout={handleLogout}
      />

      {/* Nội dung trang theo Tab */}
      <main className="flex-1 flex flex-col">
        {activeTab === 'dashboard' ? (
          <DashboardPage
            user={currentUser}
            onNavigateToEmployees={() => setActiveTab('employees')}
          />
        ) : (
          <EmployeesPage user={currentUser} />
        )}
      </main>
    </div>
  );
}
