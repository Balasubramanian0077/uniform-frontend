// src/pages/DistributionPage.js
import React, { useState } from 'react';

export default function DistributionPage() {
  const [selectedStandard, setSelectedStandard] = useState('1');
  const [selectedSection, setSelectedSection] = useState('');

  // Mock Data for Distribution (Client will pack these)
  const mockDistributionData = {
    'LKG': {
      'A': [{ name: 'Arul', top: '22', bottom: '24', house: 'Yellow', packed: false }],
      'B': [{ name: 'Kavi', top: '24', bottom: '26', house: 'Red', packed: false }]
    },
    'UKG': {
      'A': [{ name: 'Ravi', top: '26', bottom: '28', house: 'Green', packed: false }]
    },
    '1': {
      'A': [
        { name: 'Aruljothi', top: '28', bottom: '30', house: 'Yellow', packed: false },
        { name: 'Suresh', top: '28', bottom: '30', house: 'Red', packed: false }
      ],
      'B': [{ name: 'Kavi', top: '32', bottom: '36', house: 'Green', packed: false }],
      'C': [{ name: 'Dhaneri', top: '34', bottom: '38', house: 'Red', packed: false }]
    },
    '2': {
      'A': [{ name: 'Vijay', top: '30', bottom: '32', house: 'Sky Blue', packed: false }]
    }
  };

  // Generate list of standards
  const standardOptions = ['LKG', 'UKG', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];

  // Get available sections for the selected standard
  const availableSections = mockDistributionData[selectedStandard] ? Object.keys(mockDistributionData[selectedStandard]) : [];

  // Get students for the selected standard and section
  const currentStudents = (mockDistributionData[selectedStandard] && selectedSection) 
    ? mockDistributionData[selectedStandard][selectedSection] 
    : [];

  return (
    <div className="page-container">
      <div style={{ marginBottom: '32px' }}>
        <h1 className="page-title">Distribution Module</h1>
        <p className="page-subtitle">Pack and distribute uniforms section-wise.</p>
      </div>

      <div className="premium-card" style={{ marginBottom: '32px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
          
          {/* Standard Dropdown */}
          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#475569', marginBottom: '8px' }}>Select Standard</label>
            <select 
              value={selectedStandard} 
              onChange={(e) => {
                setSelectedStandard(e.target.value);
                setSelectedSection(''); // Reset section when standard changes
              }}
              style={{ padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1', width: '100%', fontSize: '16px' }}
            >
              {standardOptions.map(std => (
                <option key={std} value={std}>{std === 'LKG' || std === 'UKG' ? std : `Standard ${std}`}</option>
              ))}
            </select>
          </div>

          {/* Section Dropdown / Pills */}
          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#475569', marginBottom: '8px' }}>Select Section</label>
            {availableSections.length === 0 ? (
              <div style={{ color: '#94a3b8', fontSize: '14px', fontStyle: 'italic' }}>No sections available for this standard.</div>
            ) : (
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                {availableSections.map(section => (
                  <button
                    key={section}
                    onClick={() => setSelectedSection(section)}
                    style={{
                      padding: '8px 20px',
                      borderRadius: '20px',
                      border: '1px solid #cbd5e1',
                      backgroundColor: selectedSection === section ? '#2563EB' : '#F1F5F9',
                      color: selectedSection === section ? 'white' : '#334155',
                      fontWeight: '600',
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}
                  >
                    Class {selectedStandard}-{section}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Distribution Table */}
      {selectedSection && (
        <div className="premium-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '700', color: '#1e293b' }}>
              Packing List: Class {selectedStandard}-{selectedSection}
            </h3>
            <span style={{ backgroundColor: '#DBEAFE', color: '#1E40AF', padding: '4px 12px', borderRadius: '20px', fontSize: '14px', fontWeight: '600' }}>
              {currentStudents.length} Students
            </span>
          </div>

          <table>
            <thead>
              <tr>
                <th>Student Name</th>
                <th>Top Size</th>
                <th>Bottom Size</th>
                <th>House</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {currentStudents.map((student, idx) => (
                <tr key={idx}>
                  <td style={{ fontWeight: '600' }}>{student.name}</td>
                  <td>{student.top}</td>
                  <td>{student.bottom}</td>
                  <td>{student.house}</td>
                  <td>
                    <button className="btn success" style={{ padding: '6px 12px', fontSize: '13px' }}>
                      Mark Packed
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}