import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../AdminComponents/sidebar.js';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap
//import CreateTrackingData from '../AdminComponents/sidebar/CreateTrackingData.js';

function AdminPage() {
  const contentStyle = {
    background: 'linear-gradient(180deg, #1e3a8a, #000045)', // Gradient background for content area
    color: 'white', // Text color for content
    padding: '20px', // Add some padding
  };

  return (
    <div className="d-flex min-vh-100">
      {/* Sidebar column */}
      <div className="col-12 col-md-3 col-lg-2 p-0">
        <Sidebar />
      </div>
      {/* Main content area with gradient background */}
      <div className="col-12 col-md-9 col-lg-10 p-0">
        <div style={contentStyle}>
          <Outlet />

        </div>
      </div>
    </div>
  );
}

export default AdminPage;
