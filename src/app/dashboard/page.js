import Dashboard from '@/components/Dashboard';
import React from 'react';


const DashboardPage = () => {
  return (
    <div className="flex">
      <Dashboard />
      <div className="ml-64 p-6"> {/* Adjust margin to accommodate the sidebar */}
        <h1 className="text-2xl font-bold">Dashboard Content</h1>
        {/* Your main dashboard content goes here */}
      </div>
    </div>
  );
};

export default DashboardPage;
