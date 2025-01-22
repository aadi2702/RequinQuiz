import React from 'react';
import Sidebar from '../components/Sidebar.js';

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="dashboard-content">
        <h1>Welcome to the Admin Dashboard</h1> 
        
      </div>
    </div> 
  );
};

export default Dashboard; 
