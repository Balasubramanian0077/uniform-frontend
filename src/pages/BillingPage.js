// src/pages/BillingPage.js
import React, { useState, useMemo } from 'react';

// --- Demo Data: Fixed Rate per Uniform ---
const FIXED_RATE = 500; // Rs. 500 per uniform

const SCHOOLS = ['Green Valley School', 'Gurukulam Pre School'];

// Mock database of students count per standard for each school
// Ithu ungaloda actual database la irunthu varum. Demo ku ipdi vaithiruken.
const MOCK_COUNTS = {
  'Green Valley School': {
    'LKG': 20, 'UKG': 15, '1': 35, '2': 42, '3': 30, '4': 28, '5': 25, '6': 40, '7': 38, '8': 32, '9': 45, '10': 50, '11': 48, '12': 45
  },
  'Gurukulam Pre School': {
    'LKG': 25, 'UKG': 22, '1': 30, '2': 32, '3': 28, '4': 25, '5': 20, '6': 0, '7': 0, '8': 0, '9': 0, '10': 0, '11': 0, '12': 0
  }
};

export default function BillingPage() {
  const [selectedSchool, setSelectedSchool] = useState('');
  
  // State to hold quantities for each standard. Initialized to 0.
  const [quantities, setQuantities] = useState({
    'LKG': 0, 'UKG': 0, '1': 0, '2': 0, '3': 0, '4': 0, '5': 0, '6': 0, '7': 0, '8': 0, '9': 0, '10': 0, '11': 0, '12': 0
  });

  // When school changes, auto-fill quantities based on mock database
  const handleSchoolChange = (e) => {
    const school = e.target.value;
    setSelectedSchool(school);
    if (school && MOCK_COUNTS[school]) {
      setQuantities(MOCK_COUNTS[school]);
    } else {
      setQuantities({ 'LKG': 0, 'UKG': 0, '1': 0, '2': 0, '3': 0, '4': 0, '5': 0, '6': 0, '7': 0, '8': 0, '9': 0, '10': 0, '11': 0, '12': 0 });
    }
  };

  // Handle manual quantity change
  const handleQuantityChange = (std, value) => {
    setQuantities({ ...quantities, [std]: Number(value) || 0 });
  };

  // Calculations
  const totalItems = useMemo(() => {
    return Object.values(quantities).reduce((sum, qty) => sum + qty, 0);
  }, [quantities]);

  const subTotal = totalItems * FIXED_RATE;
  const cgst = subTotal * 0.025; // 2.5%
  const sgst = subTotal * 0.025; // 2.5%
  const grandTotal = subTotal + cgst + sgst;

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(amount);
  };

  return (
    <div className="page-container" style={{ maxWidth: '1200px' }}>
      <div style={{ marginBottom: '32px' }}>
        <h1 className="page-title">Billing & Invoicing</h1>
        <p style={{ color: '#64748b', margin: 0 }}>Generate tax invoices based on school and student counts.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px', alignItems: 'start' }}>
        
        {/* LEFT SIDE: INPUT FORM */}
        <div className="premium-card" style={{ padding: '28px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: '800', color: '#0f172a', marginBottom: '24px' }}>Invoice Details</h2>
          
          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '700', color: '#475569', marginBottom: '8px' }}>Select School</label>
            <select 
              value={selectedSchool} 
              onChange={handleSchoolChange} 
              style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '2px solid #cbd5e1', fontSize: '16px' }}
            >
              <option value="">-- Select a School --</option>
              {SCHOOLS.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>

          <div style={{ backgroundColor: '#f8fafc', padding: '20px', borderRadius: '12px', border: '1px solid #e2e8f0', marginBottom: '24px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#1e293b', marginBottom: '16px' }}>Student Counts (Fixed Rate: ₹{FIXED_RATE}/unit)</h3>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              {/* LKG to 12th Standard Inputs */}
              {Object.keys(quantities).map(std => (
                <div key={std} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: 'white', padding: '8px 12px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                  <span style={{ fontWeight: '600', color: '#334155' }}>{std === 'LKG' || std === 'UKG' ? std : `Std ${std}`}</span>
                  <input 
                    type="number" 
                    value={quantities[std] || ''} 
                    onChange={(e) => handleQuantityChange(std, e.target.value)}
                    style={{ width: '70px', padding: '6px', textAlign: 'right', borderRadius: '6px', border: '1px solid #cbd5e1', fontWeight: '700' }}
                    placeholder="0"
                  />
                </div>
              ))}
            </div>
          </div>

          <div style={{ backgroundColor: '#eff6ff', padding: '20px', borderRadius: '12px', border: '1px solid #bfdbfe' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
              <span style={{ fontSize: '15px', color: '#475569', fontWeight: '600' }}>Total Items:</span>
              <span style={{ fontSize: '18px', fontWeight: '800', color: '#1e293b' }}>{totalItems}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
              <span style={{ fontSize: '15px', color: '#475569', fontWeight: '600' }}>Sub Total:</span>
              <span style={{ fontSize: '18px', fontWeight: '800', color: '#1e293b' }}>{formatCurrency(subTotal)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
              <span style={{ fontSize: '15px', color: '#475569', fontWeight: '600' }}>Tax (CGST + SGST):</span>
              <span style={{ fontSize: '18px', fontWeight: '800', color: '#1e293b' }}>{formatCurrency(cgst + sgst)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '2px dashed #cbd5e1', paddingTop: '12px', marginTop: '12px' }}>
              <span style={{ fontSize: '18px', color: '#0f172a', fontWeight: '800' }}>Grand Total:</span>
              <span style={{ fontSize: '24px', fontWeight: '900', color: '#2563EB' }}>{formatCurrency(grandTotal)}</span>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE: INVOICE PREVIEW (Like the Image) */}
        <div className="premium-card" style={{ padding: '32px', backgroundColor: 'white', border: '1px solid #cbd5e1', position: 'sticky', top: '32px' }}>
          
          {/* Invoice Header */}
          <div style={{ textAlign: 'center', borderBottom: '2px solid #1e293b', paddingBottom: '16px', marginBottom: '20px' }}>
            <h2 style={{ margin: 0, fontSize: '24px', fontWeight: '900', color: '#0f172a', textTransform: 'uppercase' }}>DR TEXTILE corp stitches</h2>
            <p style={{ margin: '4px 0', fontSize: '13px', color: '#475569' }}>42/1 SENBAGA NAGAR 1ST STREET<br/>PITCHAMPALAYAM-TIRUPUR - 641 603</p>
            <p style={{ margin: '4px 0', fontSize: '14px', fontWeight: '700' }}>PH: 9944337222</p>
            <p style={{ margin: '4px 0', fontSize: '14px', fontWeight: '700' }}>GSTIN: 33BTKPB8693N1Z1</p>
          </div>

          <div style={{ textAlign: 'center', backgroundColor: '#f1f5f9', padding: '8px', marginBottom: '20px' }}>
            <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '800', letterSpacing: '2px' }}>TAX INVOICE</h3>
          </div>

          {/* Bill To Details */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '24px', fontSize: '13px' }}>
            <div>
              <p style={{ margin: '0 0 4px 0', fontWeight: '700', color: '#64748b' }}>Billed To:</p>
              <p style={{ margin: 0, fontWeight: '800', fontSize: '15px', color: '#0f172a' }}>{selectedSchool || 'Select a School'}</p>
              <p style={{ margin: '4px 0 0 0', color: '#475569' }}>State: TAMIL NADU</p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <p style={{ margin: '0 0 4px 0', fontWeight: '700', color: '#64748b' }}>Invoice Date:</p>
              <p style={{ margin: 0, fontWeight: '600', color: '#0f172a' }}>{new Date().toLocaleDateString('en-GB')}</p>
            </div>
          </div>

          {/* Items Table */}
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', marginBottom: '24px' }}>
            <thead>
              <tr style={{ backgroundColor: '#f8fafc', borderTop: '1px solid #cbd5e1', borderBottom: '1px solid #cbd5e1' }}>
                <th style={{ padding: '10px', textAlign: 'left', fontWeight: '700' }}>Description</th>
                <th style={{ padding: '10px', textAlign: 'center', fontWeight: '700' }}>HSN</th>
                <th style={{ padding: '10px', textAlign: 'center', fontWeight: '700' }}>Qty</th>
                <th style={{ padding: '10px', textAlign: 'right', fontWeight: '700' }}>Rate</th>
                <th style={{ padding: '10px', textAlign: 'right', fontWeight: '700' }}>Total</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                <td style={{ padding: '12px 10px', fontWeight: '600' }}>School Uniforms (T-Shirts & Trousers)</td>
                <td style={{ padding: '12px 10px', textAlign: 'center' }}>6109</td>
                <td style={{ padding: '12px 10px', textAlign: 'center', fontWeight: '700' }}>{totalItems}</td>
                <td style={{ padding: '12px 10px', textAlign: 'right' }}>{FIXED_RATE.toFixed(2)}</td>
                <td style={{ padding: '12px 10px', textAlign: 'right', fontWeight: '700' }}>{subTotal.toFixed(2)}</td>
              </tr>
            </tbody>
          </table>

          {/* Bill Summary */}
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <div style={{ width: '250px', fontSize: '13px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0' }}>
                <span style={{ color: '#475569' }}>Total Amount before Tax:</span>
                <span style={{ fontWeight: '600' }}>{formatCurrency(subTotal)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0' }}>
                <span style={{ color: '#475569' }}>Add: CGST @ 2.5%:</span>
                <span style={{ fontWeight: '600' }}>{formatCurrency(cgst)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0' }}>
                <span style={{ color: '#475569' }}>Add: SGST @ 2.5%:</span>
                <span style={{ fontWeight: '600' }}>{formatCurrency(sgst)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderTop: '2px solid #0f172a', marginTop: '6px' }}>
                <span style={{ fontWeight: '800', fontSize: '14px', color: '#0f172a' }}>Total Amount:</span>
                <span style={{ fontWeight: '900', fontSize: '16px', color: '#2563EB' }}>{formatCurrency(grandTotal)}</span>
              </div>
            </div>
          </div>

          <div style={{ marginTop: '32px', borderTop: '1px solid #e2e8f0', paddingTop: '16px', fontSize: '11px', color: '#64748b' }}>
            <p style={{ margin: 0, fontWeight: '700' }}>Terms & Conditions:</p>
            <p style={{ margin: '4px 0' }}>01. Subject to Tirupur Jurisdiction</p>
            <p style={{ margin: '4px 0' }}>02. Goods once sold cannot be taken back</p>
          </div>

          <div style={{ textAlign: 'right', marginTop: '40px', fontSize: '13px', fontWeight: '700' }}>
            For DR TEXTILE corp stitches
          </div>

        </div>
      </div>
    </div>
  );
}