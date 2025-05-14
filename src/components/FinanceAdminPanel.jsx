import { useState } from 'react';
import Sidebar from './Layout/Sidebar';
import Navbar from './Layout/Navbar';
import Dashboard from './DashboardAdmin/Dashboard';
import PagePlaceholder from './PagePlaceholder';

export default function FinanceAdminPanel() {
  
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activePage, setActivePage] = useState('dashboard');

  // Toggle sidebar visibility
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Left Sidebar */}
      <Sidebar 
        isOpen={sidebarOpen} 
        toggleSidebar={toggleSidebar} 
        activePage={activePage}
        setActivePage={setActivePage}
      />

      {/* Main Content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Top Navigation Bar */}
        <Navbar toggleSidebar={toggleSidebar} />

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-4 bg-gray-50">
          {activePage === 'dashboard' && <Dashboard />}
          {activePage === 'savings' && <PagePlaceholder title="Savings Management" />}
          {activePage === 'rd' && <PagePlaceholder title="Recurring Deposits Management" />}
          {activePage === 'fd' && <PagePlaceholder title="Fixed Deposits Management" />}
          {activePage === 'loan' && <PagePlaceholder title="Loan Management" />}
          {activePage === 'addCustomer' && <PagePlaceholder title="Add Customer" />}
          {activePage === 'createSaving' && <PagePlaceholder title="Create Savings Account" />}
          {activePage === 'createRd' && <PagePlaceholder title="Create RD Account" />}
          {activePage === 'createFd' && <PagePlaceholder title="Create FD Account" />}
          {activePage === 'applyLoan' && <PagePlaceholder title="Apply for Loan" />}
          {activePage === 'reports' && <PagePlaceholder title="Reports" />}
        </main>
      </div>
    </div>
  );
}