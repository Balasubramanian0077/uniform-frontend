import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';

const HOUSES = [
  { name: 'Yellow', color: '#EF9F27' },
  { name: 'Red', color: '#E24B4A' },
  { name: 'Green', color: '#639922' },
  { name: 'Sky Blue', color: '#378ADD' }
];

export default function ClassWorkspacePage() {
  const { schoolId, classId } = useParams();
  const [imagePreview, setImagePreview] = useState(null);
  const [isReading, setIsReading] = useState(false);
  const [students, setStudents] = useState([]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl);
      simulateReading();
    }
  };

  const handleSampleSheet = () => {
    setImagePreview('https://via.placeholder.com/600x800?text=Sample+Sheet');
    simulateReading();
  };

  const simulateReading = () => {
    setIsReading(true);
    setStudents([]); 
    
    setTimeout(() => {
      const mockStudents = Array.from({ length: 32 }).map((_, i) => ({
        id: i,
        name: `Student ${i + 1}`,
        gender: i % 2 === 0 ? 'Boys' : 'Girls',
        house: HOUSES[i % 4].name,
        topSize: Math.floor(Math.random() * 6) * 2 + 24,
        bottomSize: Math.floor(Math.random() * 6) * 2 + 26,
      }));
      
      setStudents(mockStudents);
      saveDataToBackend(mockStudents);
      setIsReading(false);
    }, 1500);
  };

  const saveDataToBackend = (processedStudents) => {
    const houseCount = {};
    HOUSES.forEach(h => {
      houseCount[h.name] = processedStudents.filter(s => s.house === h.name).length;
    });

    const payload = {
      totalStudents: processedStudents.length,
      totalTops: processedStudents.length,
      totalBottoms: processedStudents.length,
      houseDetails: JSON.stringify(houseCount)
    };

    fetch(`http://localhost:8081/api/standards/${classId}/upload`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
    .then(res => {
      if(!res.ok) throw new Error('Failed to save data');
      return res.json();
    })
    .then(data => console.log('Data saved!', data))
    .catch(err => console.error(err));
  };

  return (
    <div className="page-container" style={{ paddingBottom: '60px' }}>
      <div style={{ marginBottom: '32px' }}>
        <Link to={`/school-workspace/${schoolId}`} style={{ color: 'var(--primary)', textDecoration: 'none', fontWeight: '600', fontSize: '14px' }}>
          ← Back to Workspace
        </Link>
        <h1 className="page-title" style={{ marginTop: '16px' }}>Class Measurement Upload</h1>
        <p className="page-subtitle">Upload the filled measurement sheet to process data.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '350px 1fr', gap: '32px', alignItems: 'start' }}>
        <div className="premium-card" style={{ padding: '24px', textAlign: 'center' }}>
          <h2 style={{ fontSize: '18px', fontWeight: '800', color: '#0f172a', margin: '0 0 20px 0' }}>📸 Upload Sheet</h2>
          
          <div style={{ border: '2px dashed #cbd5e1', borderRadius: '12px', padding: '20px', backgroundColor: '#f8fafc', marginBottom: '20px', minHeight: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
            {imagePreview ? (
              <img src={imagePreview} alt="Sheet Preview" style={{ maxWidth: '100%', maxHeight: '300px', borderRadius: '8px' }} />
            ) : (
               <>
                 <div style={{ fontSize: '48px', marginBottom: '16px' }}>📄</div>
                 <p style={{ color: '#64748b', margin: 0 }}>No image uploaded yet.</p>
               </>
            )}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <label className="btn" style={{ cursor: 'pointer', margin: 0 }}>
              Choose Photo
              <input type="file" accept="image/*" onChange={handleImageUpload} style={{ display: 'none' }} />
            </label>
            <button onClick={handleSampleSheet} className="btn secondary">Use Sample Sheet</button>
          </div>

          {isReading && (
            <div style={{ marginTop: '20px', color: 'var(--primary)', fontWeight: '600', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
              <span>⏳</span> Reading sheet...
            </div>
          )}
        </div>

        {students.length > 0 && !isReading && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
              <div className="premium-card" style={{ padding: '20px', borderLeft: '4px solid #3b82f6' }}>
                <div style={{ fontSize: '13px', fontWeight: '600', color: '#64748b' }}>Total Students</div>
                <div style={{ fontSize: '28px', fontWeight: '800', color: '#0f172a' }}>{students.length}</div>
              </div>
              <div className="premium-card" style={{ padding: '20px', borderLeft: '4px solid #10b981' }}>
                <div style={{ fontSize: '13px', fontWeight: '600', color: '#64748b' }}>Tops to Make</div>
                <div style={{ fontSize: '28px', fontWeight: '800', color: '#0f172a' }}>{students.length}</div>
              </div>
              <div className="premium-card" style={{ padding: '20px', borderLeft: '4px solid #f59e0b' }}>
                <div style={{ fontSize: '13px', fontWeight: '600', color: '#64748b' }}>Bottoms to Make</div>
                <div style={{ fontSize: '28px', fontWeight: '800', color: '#0f172a' }}>{students.length}</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}