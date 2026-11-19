// src/App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import SchoolWorkspacePage from './pages/SchoolWorkspacePage';
import ClassWorkspacePage from './pages/ClassWorkspacePage'; // Puthu page import pandrom
import ManufacturingPage from './pages/ManufacturingPage';
import DistributionPage from './pages/DistributionPage';
import SlipPage from './pages/SlipPage';
import BillingPage from './pages/BillingPage';
import ManagementPage from './pages/ManagementPage';
import Navbar from './components/Navbar';

function App() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Routes>
        {/* 1. Login Route */}
        <Route path="/" element={<LoginPage />} />
        
        {/* 2. App Routes with Navbar & Footer */}
        <Route path="/*" element={
          <>
            <Navbar />
            <div style={{ flex: 1, backgroundColor: '#f8fafc', paddingBottom: '2rem' }}>
              <Routes>
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/school-workspace/:id" element={<SchoolWorkspacePage />} />
                
                {/* Puthu Route: Class Measurement Upload */}
                <Route path="/class/:schoolId/:classId" element={<ClassWorkspacePage />} />
                
                <Route path="/manufacturing" element={<ManufacturingPage />} />
                <Route path="/distribution" element={<DistributionPage />} />
                <Route path="/slip" element={<SlipPage />} />
                <Route path="/billing" element={<BillingPage />} />
                <Route path="/management" element={<ManagementPage />} />
              </Routes>
            </div>
            <footer style={{ 
              textAlign: 'center', 
              padding: '1.5rem', 
              backgroundColor: '#1e293b', 
              color: '#94a3b8',
              fontSize: '0.9rem',
              marginTop: 'auto'
            }}>
              © 2024 Uniform ERP - Client Portal. All rights reserved.
            </footer>
          </>
        } />
      </Routes>
    </div>
  );
}

export default App;