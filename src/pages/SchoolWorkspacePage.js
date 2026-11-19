import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';

const HOUSES = [
  { name: 'Yellow', color: '#EF9F27' },
  { name: 'Red', color: '#E24B4A' },
  { name: 'Green', color: '#639922' },
  { name: 'Sky Blue', color: '#378ADD' }
];

export default function SchoolWorkspacePage() {
  const { id: schoolId } = useParams(); 
  const navigate = useNavigate();

  const [school, setSchool] = useState(null);
  const [classes, setClasses] = useState([]);
  
  // Form States
  const [standard, setStandard] = useState('1');
  const [section, setSection] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [note, setNote] = useState(localStorage.getItem(`note-${schoolId}`) || '');

  // Dummy house data for UI (0 nu vachiruken, client-ku clear-ah theriyum)
  const mockHouseData = [
    { name: 'Yellow', total: 0, boys: 0, girls: 0 },
    { name: 'Red', total: 0, boys: 0, girls: 0 },
    { name: 'Green', total: 0, boys: 0, girls: 0 },
    { name: 'Sky Blue', total: 0, boys: 0, girls: 0 }
  ];

  // --- 1. FETCH DATA FROM BACKEND ---
  useEffect(() => {
    // School details fetch
    fetch(`http://localhost:8081/api/schools/${schoolId}`)
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch school');
        return res.json();
      })
      .then(data => setSchool(data))
      .catch(err => console.error("Error fetching school:", err));

    // Classes fetch
    fetchClasses();
  }, [schoolId]);

  const fetchClasses = () => {
    fetch(`http://localhost:8081/api/standards/school/${schoolId}`)
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch classes');
        return res.json();
      })
      .then(data => setClasses(data))
      .catch(err => console.error("Error fetching classes:", err));
  };

  // --- 2. CREATE CLASS (POST) ---
  const handleAddClass = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!section.trim()) {
      setError('Please enter a section (e.g., A, B).');
      return;
    }

    // Backend-la namma Map<String, Object> use pandrom, so intha format correct-ah irukanum
    const newClassData = {
      standardName: `Standard ${standard}`, 
      sectionName: section.trim().toUpperCase(), 
      status: 'Pending upload',
      school: { id: schoolId } // Inga parseInt thevai illa, direct-ah string-ah anupunga
    };

    fetch('http://localhost:8081/api/standards', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newClassData)
    })
    .then(async res => {
      if (!res.ok) {
        const errMsg = await res.text();
        throw new Error(errMsg);
      }
      return res.json();
    })
    .then(newClass => {
      setSuccess(`Class ${standard}-${section.toUpperCase()} created successfully!`);
      setSection('');
      fetchClasses(); // List-ah refresh pannuvom
      setTimeout(() => setSuccess(''), 3000);
    })
    .catch(err => {
      setError(err.message || 'Something went wrong');
    });
  };

  const handleNoteChange = (e) => {
    const val = e.target.value;
    setNote(val);
    localStorage.setItem(`note-${schoolId}`, val);
  };

  // Grouping classes by standard
  const groupedClasses = classes.reduce((acc, cls) => {
    const stdNumMatch = cls.standardName.match(/\d+/);
    const stdNum = stdNumMatch ? stdNumMatch[0] : cls.standardName;
    
    if (!acc[stdNum]) acc[stdNum] = [];
    acc[stdNum].push(cls);
    return acc;
  }, {});

  const sortedStandards = Object.keys(groupedClasses).sort((a, b) => Number(a) - Number(b));
  
  const totalClassesCount = classes.length;
  const countedClasses = classes.filter(c => c.status === 'Counted').length;

  return (
    <div className="page-container" style={{ paddingBottom: '60px' }}>
      
      {/* HEADER */}
      <div style={{ marginBottom: '32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
          <Link to="/dashboard" style={{ color: 'var(--primary)', textDecoration: 'none', fontWeight: '600', fontSize: '14px' }}>
            ← Back to Dashboard
          </Link>
        </div>
        <h1 className="page-title">{school?.name || 'Loading School...'}</h1>
        <p className="page-subtitle">📍 {school?.location || 'Location Not Available'}</p>
      </div>

      {/* TOP STATS */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '24px', marginBottom: '32px' }}>
        {/* Workspace Progress */}
        <div className="premium-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <h3 style={{ margin: '0 0 16px 0', fontSize: '16px', color: '#1e293b', fontWeight: '800' }}>📊 Workspace Progress</h3>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
            <span style={{ fontSize: '14px', color: '#64748b', fontWeight: '500' }}>Total Classes</span>
            <span style={{ fontSize: '16px', fontWeight: '700', color: '#0f172a' }}>{totalClassesCount}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
            <span style={{ fontSize: '14px', color: '#64748b', fontWeight: '500' }}>Sheets Uploaded</span>
            <span style={{ fontSize: '16px', fontWeight: '700', color: '#10b981' }}>{countedClasses}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '14px', color: '#64748b', fontWeight: '500' }}>Pending</span>
            <span style={{ fontSize: '16px', fontWeight: '700', color: '#f59e0b' }}>{totalClassesCount - countedClasses}</span>
          </div>
        </div>

        {/* House Summary */}
        <div className="premium-card" style={{ padding: '24px' }}>
          <h3 style={{ margin: '0 0 16px 0', fontSize: '16px', color: '#1e293b', fontWeight: '800' }}>🎨 House-wise Student Summary</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
            {mockHouseData.map(h => (
              <div key={h.name} style={{ borderLeft: `4px solid ${HOUSES.find(x => x.name === h.name)?.color}`, backgroundColor: '#f8fafc', padding: '16px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                <div style={{ fontSize: '13px', fontWeight: '700', color: '#475569', marginBottom: '8px' }}>{h.name}</div>
                <div style={{ fontSize: '24px', fontWeight: '800', color: '#0f172a', lineHeight: '1' }}>{h.total}</div>
                <div style={{ fontSize: '12px', color: '#64748b', marginTop: '6px', fontWeight: '500' }}>B: {h.boys} | G: {h.girls}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* MAIN CONTENT: Form & Notes on Left, Class List on Right */}
      <div style={{ display: 'grid', gridTemplateColumns: '350px 1fr', gap: '32px', alignItems: 'start' }}>
        
        {/* LEFT COLUMN */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* Add Class Form */}
          <div className="premium-card" style={{ padding: '24px' }}>
            <h2 style={{ fontSize: '18px', fontWeight: '800', color: '#0f172a', margin: '0 0 20px 0' }}>➕ Create Standard</h2>
            <form onSubmit={handleAddClass} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label>Standard</label>
                <select value={standard} onChange={(e) => setStandard(e.target.value)}>
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((num) => (
                    <option key={num} value={num}>Standard {num}</option>
                  ))}
                </select>
              </div>
              <div>
                <label>Section</label>
                <input type="text" placeholder="e.g. A" value={section} onChange={(e) => setSection(e.target.value)} style={{ textTransform: 'uppercase' }} maxLength={2} />
              </div>
              <button type="submit" className="btn" style={{ width: '100%' }}>Add Class</button>
            </form>
            {error && <div style={{ color: '#DC2626', marginTop: '16px', fontSize: '13px', backgroundColor: '#FEE2E2', padding: '10px', borderRadius: '8px', fontWeight: '500' }}>{error}</div>}
            {success && <div style={{ color: '#16A34A', marginTop: '16px', fontSize: '13px', backgroundColor: '#DCFCE7', padding: '10px', borderRadius: '8px', fontWeight: '500' }}>{success}</div>}
          </div>

          {/* Special Notes */}
          <div className="premium-card" style={{ padding: '24px', backgroundColor: '#FFFBEB', border: '1px solid #FDE68A' }}>
            <h3 style={{ margin: '0 0 12px 0', fontSize: '16px', color: '#92400E', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '8px' }}>
              📌 Special Instructions
            </h3>
            <textarea 
              placeholder="e.g., Name tag stitching required for all uniforms."
              value={note}
              onChange={handleNoteChange}
              style={{ width: '100%', height: '100px', padding: '12px', borderRadius: '8px', border: '1px solid #FCD34D', backgroundColor: '#FFFFFF', color: '#92400E', fontSize: '14px', resize: 'none', marginBottom: 0 }}
            />
            <p style={{ margin: '8px 0 0 0', fontSize: '12px', color: '#B45309', textAlign: 'right', fontWeight: '500' }}>Auto-saved locally</p>
          </div>
          
        </div>

        {/* RIGHT COLUMN: Workspace List */}
        <div>
          {sortedStandards.length === 0 ? (
            <div className="premium-card" style={{ textAlign: 'center', padding: '60px 20px', color: '#64748b' }}>
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>📁</div>
              <h3 style={{ margin: '0 0 8px 0', color: '#0f172a', fontSize: '20px', fontWeight: '800' }}>No classes created yet</h3>
              <p style={{ margin: 0, fontSize: '15px', fontWeight: '500' }}>Use the form on the left to add your first standard.</p>
            </div>
          ) : (
            sortedStandards.map((stdNum) => (
              <div key={stdNum} style={{ marginBottom: '40px' }}>
                <h2 style={{ fontSize: '20px', fontWeight: '800', color: '#1e293b', margin: '0 0 16px 0', display: 'flex', alignItems: 'center', gap: '12px' }}>
                  Standard {stdNum} Workspace
                  <span style={{ fontSize: '12px', backgroundColor: '#E2E8F0', color: '#475569', padding: '4px 12px', borderRadius: '20px', fontWeight: '600' }}>{groupedClasses[stdNum].length} Sections</span>
                </h2>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '16px' }}>
                  {groupedClasses[stdNum].map((cls) => (
                    <div key={cls.id} className="premium-card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 24px' }}>
                      
                      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                        <div style={{ width: '56px', height: '56px', borderRadius: '16px', backgroundColor: '#EFF6FF', color: '#2563EB', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px', fontWeight: '800' }}>
                          {cls.sectionName}
                        </div>
                        
                        <div>
                          <h3 style={{ margin: '0 0 6px 0', fontSize: '18px', fontWeight: '800', color: '#0f172a' }}>
                            Class {stdNum}-{cls.sectionName}
                          </h3>
                          <p style={{ margin: 0, fontSize: '14px', color: '#64748b', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '500' }}>
                            <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: cls.status === 'Counted' ? '#10B981' : '#F59E0B', boxShadow: `0 0 8px ${cls.status === 'Counted' ? '#10B981' : '#F59E0B'}` }}></span>
                            {cls.status === 'Counted' ? 'Sheet uploaded' : 'Pending upload'}
                          </p>
                        </div>
                      </div>

                      <Link to={`/class/${schoolId}/${cls.id}`} className="btn secondary" style={{ padding: '10px 20px', fontSize: '14px' }}>
                        {cls.status === 'Counted' ? 'View Details' : 'Upload Image'} ↗
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}