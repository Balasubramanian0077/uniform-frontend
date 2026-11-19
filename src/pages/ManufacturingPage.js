import React, { useState, useMemo, useEffect } from 'react';

// --- House Colors ---
const HOUSES = [
  { name: 'Yellow', color: '#D97706', bgColor: '#FEF3C7' },
  { name: 'Red', color: '#DC2626', bgColor: '#FEE2E2' },
  { name: 'Green', color: '#059669', bgColor: '#D1FAE5' },
  { name: 'Sky Blue', color: '#2563EB', bgColor: '#DBEAFE' }
];
const SIZES = ['22', '24', '26', '28', '30', '32', '34', '36', '38', '40'];
const SCHOOLS = ['Green Valley School', 'Gurukulam Pre School'];

export default function ManufacturingPage() {
  // --- Data State ---
  const [studentsData, setStudentsData] = useState([]);
  
  // Filters State
  const [school, setSchool] = useState('');
  const [house, setHouse] = useState('');
  const [gender, setGender] = useState('');
  
  // Size States
  const [topSize, setTopSize] = useState('');
  const [bottomSize, setBottomSize] = useState('');
  
  // Special Category State
  const [isSpecialCategory, setIsSpecialCategory] = useState(false);
  
  const [isManufacturing, setIsManufacturing] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  // --- 1. LOAD DATA FROM LOCALSTORAGE OR BACKEND ---
  useEffect(() => {
    // Intha function real project-la backend API-ku maaranum.
    // Ippo namma client upload panna data-vah localStorage-la irunthu edukkurom.
    const loadedStudents = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key.startsWith('class-data-')) {
        const classStudents = JSON.parse(localStorage.getItem(key));
        // Ippo data-la school, garment, size ellame add pandrom
        classStudents.forEach(s => {
          loadedStudents.push({
            ...s,
            school: 'Green Valley School', // Ippo client single school use pandranga
            garment: s.gender === 'Boys' ? 'Top' : 'Bottom', // Gender base pandrom
            size: s.topSize.toString(),
            isSpecial: false // By default
          });
        });
      }
    }
    
    // Oru velai client upload pannalana, dummy data kaatuvom (Client demo-ku)
    if (loadedStudents.length === 0) {
       const dummy = Array.from({ length: 500 }).map((_, i) => ({
        id: i,
        school: SCHOOLS[i % 2],
        house: HOUSES[i % 4].name,
        gender: i % 2 === 0 ? 'Boys' : 'Girls',
        garment: i % 3 === 0 ? 'Bottom' : 'Top',
        size: SIZES[Math.floor(Math.random() * SIZES.length)],
        isSpecial: i % 7 === 0,
      }));
      setStudentsData(dummy);
    } else {
      setStudentsData(loadedStudents);
    }
  }, []);

  // --- 2. SMART FILTER LOGIC ---
  const filteredData = useMemo(() => {
    return studentsData.filter(student => {
      // Basic Dropdown Filters
      if (school && student.school !== school) return false;
      if (house && student.house !== house) return false;
      if (gender && student.gender !== gender) return false;
      
      // Special Category Filter
      if (student.isSpecial !== isSpecialCategory) return false;
      
      // Size Logic (Top/Bottom)
      if (topSize || bottomSize) {
        const matchesTop = topSize && student.garment === 'Top' && student.size === topSize;
        const matchesBottom = bottomSize && student.garment === 'Bottom' && student.size === bottomSize;
        
        if (!matchesTop && !matchesBottom) return false;
      }

      return true;
    });
  }, [studentsData, school, house, gender, topSize, bottomSize, isSpecialCategory]);

  const totalCount = filteredData.length;

  const handleStartManufacture = () => {
    if (totalCount === 0) return;
    setIsManufacturing(true);
    setTimeout(() => {
      setIsManufacturing(false);
      setSuccessMsg(`Successfully queued ${totalCount} items!`);
      setTimeout(() => setSuccessMsg(''), 4000);
    }, 1500);
  };

  return (
    <div style={{ backgroundColor: '#F3F4F6', minHeight: '100vh', padding: '32px', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        
        {/* Page Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '32px' }}>
          <div>
            <h1 style={{ fontSize: '32px', fontWeight: '800', color: '#111827', margin: '0 0 8px 0' }}>Manufacturing Dashboard</h1>
            <p style={{ color: '#4B5563', margin: 0, fontSize: '18px' }}>Paper-style color breakdown and production queue.</p>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '350px 1fr', gap: '32px', alignItems: 'start' }}>
          
          {/* LEFT SIDEBAR: Filters */}
          <div style={{ backgroundColor: 'white', padding: '28px', borderRadius: '16px', border: '2px solid #E5E7EB', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', position: 'sticky', top: '32px' }}>
            <h2 style={{ fontSize: '22px', fontWeight: '800', color: '#111827', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span>🔍</span> Filter Criteria
            </h2>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              
              <div>
                <label style={bigLabelStyle}>School</label>
                <select value={school} onChange={(e) => setSchool(e.target.value)} style={bigSelectStyle}>
                  <option value="">All Schools</option>
                  {SCHOOLS.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>

              <div>
                <label style={bigLabelStyle}>House Color</label>
                <select value={house} onChange={(e) => setHouse(e.target.value)} style={bigSelectStyle}>
                  <option value="">All Houses</option>
                  {HOUSES.map(h => <option key={h.name} value={h.name}>{h.name}</option>)}
                </select>
              </div>

              <div>
                <label style={bigLabelStyle}>Gender</label>
                <select value={gender} onChange={(e) => setGender(e.target.value)} style={bigSelectStyle}>
                  <option value="">Both</option>
                  <option value="Boys">Boys Only</option>
                  <option value="Girls">Girls Only</option>
                </select>
              </div>

              <hr style={{ border: 'none', borderTop: '2px dashed #E5E7EB', margin: '10px 0' }} />

              {/* NEW: SPECIAL CATEGORY CHECKBOX */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', backgroundColor: '#FEF2F2', padding: '16px', borderRadius: '12px', border: '2px solid #FECACA' }}>
                <input 
                  type="checkbox" 
                  id="specialCategory"
                  checked={isSpecialCategory}
                  onChange={(e) => setIsSpecialCategory(e.target.checked)}
                  style={{ width: '24px', height: '24px', cursor: 'pointer' }}
                />
                <label htmlFor="specialCategory" style={{ fontSize: '18px', fontWeight: '800', color: '#991B1B', cursor: 'pointer', margin: 0 }}>
                  Special Category
                </label>
              </div>

              {/* BIG SIZE INPUTS */}
              <div style={{ backgroundColor: '#F8FAFC', padding: '20px', borderRadius: '12px', border: '2px solid #CBD5E1' }}>
                <h3 style={{ margin: '0 0 16px 0', fontSize: '18px', color: '#0F172A', fontWeight: '800' }}>Enter Sizes</h3>
                
                <div style={{ display: 'flex', gap: '16px' }}>
                  <div style={{ flex: 1 }}>
                    <label style={{...bigLabelStyle, color: '#2563EB'}}>Top Size</label>
                    <input 
                      type="text" 
                      placeholder="Ex: 28" 
                      value={topSize} 
                      onChange={(e) => setTopSize(e.target.value)} 
                      style={{...bigSelectStyle, fontSize: '24px', textAlign: 'center', fontWeight: '800', borderColor: '#93C5FD'}} 
                    />
                  </div>
                  <div style={{ flex: 1 }}>
                    <label style={{...bigLabelStyle, color: '#059669'}}>Bottom Size</label>
                    <input 
                      type="text" 
                      placeholder="Ex: 30" 
                      value={bottomSize} 
                      onChange={(e) => setBottomSize(e.target.value)} 
                      style={{...bigSelectStyle, fontSize: '24px', textAlign: 'center', fontWeight: '800', borderColor: '#6EE7B7'}} 
                    />
                  </div>
                </div>
              </div>

              <button 
                onClick={() => { setSchool(''); setHouse(''); setGender(''); setTopSize(''); setBottomSize(''); setIsSpecialCategory(false); }}
                style={{ padding: '16px', backgroundColor: '#F3F4F6', color: '#374151', border: '2px solid #D1D5DB', borderRadius: '12px', cursor: 'pointer', fontWeight: '700', fontSize: '16px' }}
              >
                Clear All Filters
              </button>

              <div style={{ backgroundColor: '#EFF6FF', padding: '24px', borderRadius: '16px', border: '2px solid #BFDBFE', textAlign: 'center' }}>
                <div style={{ fontSize: '18px', color: '#1E3A8A', fontWeight: '700' }}>Total Items</div>
                <div style={{ fontSize: '64px', fontWeight: '900', color: '#1D4ED8', lineHeight: '1', margin: '16px 0' }}>
                  {totalCount}
                </div>
                <button 
                  onClick={handleStartManufacture}
                  disabled={isManufacturing || totalCount === 0}
                  style={{ 
                    width: '100%', padding: '16px', backgroundColor: isManufacturing || totalCount === 0 ? '#93C5FD' : '#2563EB', 
                    color: 'white', border: 'none', borderRadius: '12px', fontSize: '18px', fontWeight: '800',
                    cursor: isManufacturing || totalCount === 0 ? 'not-allowed' : 'pointer'
                  }}
                >
                  {isManufacturing ? 'Processing...' : 'Start Manufacture'}
                </button>
                {successMsg && <div style={{ marginTop: '16px', color: '#16A34A', fontSize: '16px', fontWeight: '700' }}>✓ {successMsg}</div>}
              </div>

            </div>
          </div>

          {/* RIGHT SIDE: PAPER STYLE TABLE */}
          <div style={{ backgroundColor: 'white', borderRadius: '16px', border: '2px solid #E5E7EB', overflow: 'hidden', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
            
            <div style={{ padding: '24px', borderBottom: '2px solid #E5E7EB', backgroundColor: '#F8FAFC', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h3 style={{ margin: 0, fontSize: '24px', fontWeight: '800', color: '#111827' }}>
                  {isSpecialCategory ? 'Special Category Breakdown' : 'Regular Category Breakdown'}
                </h3>
                <p style={{ margin: '4px 0 0 0', color: '#6B7280', fontSize: '16px' }}>Matches the measurement sheet layout</p>
              </div>
            </div>
            
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'center', fontSize: '18px' }}>
                
                <thead>
                  <tr style={{ backgroundColor: '#F3F4F6', borderBottom: '2px solid #E5E7EB' }}>
                    <th style={{ padding: '16px', fontWeight: '800', color: '#374151', textAlign: 'left', borderRight: '2px solid #E5E7EB', width: '150px' }}>House / Size</th>
                    {SIZES.map(size => (
                      <th key={size} style={{ padding: '16px 8px', fontWeight: '800', color: '#111827', borderRight: '1px solid #E5E7EB' }}>{size}</th>
                    ))}
                    <th style={{ padding: '16px', fontWeight: '800', color: '#111827', backgroundColor: '#E5E7EB' }}>TOTAL</th>
                  </tr>
                </thead>

                <tbody>
                  {HOUSES.map(houseInfo => {
                    const houseData = filteredData.filter(s => s.house === houseInfo.name);
                    const houseTotal = houseData.length;

                    return (
                      <tr key={houseInfo.name} style={{ borderBottom: '2px solid #E5E7EB' }}>
                        
                        <td style={{ 
                          padding: '16px', fontWeight: '800', color: houseInfo.color, 
                          backgroundColor: houseInfo.bgColor, textAlign: 'left', borderRight: '2px solid #E5E7EB', fontSize: '20px'
                        }}>
                          {houseInfo.name}
                        </td>

                        {SIZES.map(size => {
                          const tops = houseData.filter(s => s.size === size && s.garment === 'Top').length;
                          const bottoms = houseData.filter(s => s.size === size && s.garment === 'Bottom').length;
                          const sizeTotal = tops + bottoms;

                          return (
                            <td key={size} style={{ padding: '12px 4px', borderRight: '1px solid #E5E7EB', verticalAlign: 'middle' }}>
                              {sizeTotal > 0 ? (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                  {tops > 0 && <div style={{ color: '#2563EB', fontWeight: '700' }}>{tops} <span style={{fontSize: '12px'}}>T</span></div>}
                                  {bottoms > 0 && <div style={{ color: '#059669', fontWeight: '700' }}>{bottoms} <span style={{fontSize: '12px'}}>B</span></div>}
                                </div>
                              ) : (
                                <span style={{ color: '#D1D5DB' }}>-</span>
                              )}
                            </td>
                          );
                        })}

                        <td style={{ padding: '16px', fontWeight: '900', color: '#111827', backgroundColor: '#F8FAFC', fontSize: '22px' }}>
                          {houseTotal}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>

                <tfoot>
                  <tr style={{ backgroundColor: '#1E293B', color: 'white' }}>
                    <td style={{ padding: '16px', fontWeight: '800', textAlign: 'left', fontSize: '20px' }}>GRAND TOTAL</td>
                    <td colSpan={SIZES.length} style={{ padding: '16px', textAlign: 'right', fontWeight: '600', fontSize: '16px' }}>
                      Total Uniforms Needed Across All Houses
                    </td>
                    <td style={{ padding: '16px', fontWeight: '900', fontSize: '24px', color: '#FBBF24' }}>
                      {totalCount}
                    </td>
                  </tr>
                </tfoot>

              </table>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

// --- Styles ---
const bigLabelStyle = { fontSize: '16px', fontWeight: '700', color: '#374151', marginBottom: '8px', display: 'block' };
const bigSelectStyle = { padding: '14px 16px', borderRadius: '10px', border: '2px solid #D1D5DB', fontSize: '18px', color: '#111827', backgroundColor: '#F9FAFB', outline: 'none', width: '100%', cursor: 'pointer' };