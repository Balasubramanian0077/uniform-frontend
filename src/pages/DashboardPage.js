// src/pages/DashboardPage.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const DashboardPage = () => {
  const navigate = useNavigate();
  
  const [schools, setSchools] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const [formData, setFormData] = useState({ name: '', mobile: '', location: '' });

  // 1. Fetch Schools from Database
  const fetchSchools = async () => {
    try {
      const response = await fetch('http://localhost:8081/api/schools');
      if (response.ok) {
        const data = await response.json();
        setSchools(data);
      }
    } catch (error) {
      console.error('Error fetching schools:', error);
    }
  };

  // PAGE LOAD AAGUM POTHU MODAL AH FORCE AH CLOSE PANDROM
  useEffect(() => {
    fetchSchools();
    setIsModalOpen(false); 
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 2. Save new school to Database
  const handleCreateSchool = async (e) => {
    e.preventDefault();
    const newSchool = {
      name: formData.name,
      mobile: formData.mobile,
      location: formData.location,
    };

    try {
      const response = await fetch('http://localhost:8081/api/schools', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newSchool),
      });

      if (response.ok) {
        setFormData({ name: '', mobile: '', location: '' });
        setIsModalOpen(false);
        fetchSchools(); 
      } else {
        alert('Failed to create school in Backend.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Backend server is not running.');
    }
  };

  return (
    <div className="page-container" style={{ maxWidth: '1400px' }}>
      
      {/* Header Area */}
      <div className="dashboard-header-area">
        <div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: '700', color: '#0f172a', margin: '0 0 0.5rem 0' }}>School Dashboard</h1>
          <p style={{ color: '#64748b', margin: 0 }}>Manage your schools and uniform distribution.</p>
        </div>
        <button className="btn" onClick={() => setIsModalOpen(true)} style={{ padding: '0.75rem 1.5rem', fontSize: '1rem' }}>
          ＋ Create New School
        </button>
      </div>

      {/* KPI Cards */}
      <div className="kpi-container">
        <div className="kpi-card blue">
          <div className="kpi-label">Total Schools</div>
          <div className="kpi-value">{schools.length}</div>
        </div>
        <div className="kpi-card green">
          <div className="kpi-label">Total Students</div>
          <div className="kpi-value">1,250</div>
        </div>
        <div className="kpi-card orange">
          <div className="kpi-label">Pending Uploads</div>
          <div className="kpi-value">08</div>
        </div>
      </div>

      {/* School List */}
      <h2 style={{ fontSize: '1.25rem', color: '#1e293b', marginBottom: '1.5rem', fontWeight: '600' }}>Your Schools</h2>
      
      <div className="school-grid">
        {schools.length === 0 ? (
          <div style={{ textAlign: 'center', width: '100%', padding: '40px', color: '#64748b', backgroundColor: '#f8fafc', borderRadius: '8px', border: '1px dashed #cbd5e1' }}>
            <h3 style={{ margin: '0 0 8px 0', color: '#1e293b' }}>No schools found</h3>
            <p style={{ margin: 0 }}>Click "+ Create New School" to add one.</p>
          </div>
        ) : (
          schools.map((school) => (
            <div key={school.id} className="premium-school-card">
              <div className="psc-top">
                <div className="psc-icon">🏫</div>
                <div>
                  <h3 className="psc-title">{school.name}</h3>
                  <p className="psc-location">📍 {school.location}</p>
                </div>
              </div>

              <div className="psc-details">
                <div className="psc-detail-item">
                  <span className="psc-detail-label">Mobile Number</span>
                  <span className="psc-detail-value">{school.mobile}</span>
                </div>
              </div>

              <div className="psc-footer">
                <button className="psc-btn psc-btn-secondary">Edit</button>
                <button 
                  className="psc-btn psc-btn-primary"
                  onClick={() => navigate(`/school-workspace/${school.id}`)}
                >
                  Open Workspace
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Create School Modal */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Create New School</h2>
              <p>Enter the school details to set up a new workspace.</p>
            </div>
            
            <form onSubmit={handleCreateSchool}>
              <label>School Name</label>
              <input type="text" name="name" placeholder="e.g. Sunrise Public School" value={formData.name} onChange={handleInputChange} required />
              
              <label>Mobile Number</label>
              <input type="text" name="mobile" placeholder="e.g. 98765 43210" value={formData.mobile} onChange={handleInputChange} required />
              
              <label>Location</label>
              <input type="text" name="location" placeholder="e.g. Coimbatore, TN" value={formData.location} onChange={handleInputChange} required />
              
              <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
                <button type="submit" className="btn" style={{ flex: 1 }}>Create School</button>
                <button type="button" className="btn secondary" style={{ flex: 1 }} onClick={() => setIsModalOpen(false)}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardPage;