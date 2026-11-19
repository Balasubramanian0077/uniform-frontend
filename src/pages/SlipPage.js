import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function SlipPage() {
  const navigate = useNavigate();

  return (
    <div style={{ maxWidth: '800px', margin: '40px auto', padding: '20px' }}>
      
      {/* Page Actions (Hide when printing) */}
      <div className="no-print" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <button onClick={() => navigate(-1)} style={{ padding: '8px 16px', border: '1px solid #D1D5DB', borderRadius: '6px', cursor: 'pointer', background: 'white' }}>
          ← Back
        </button>
        <button onClick={() => window.print()} style={{ padding: '8px 16px', backgroundColor: '#2563EB', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
          Print Slip
        </button>
      </div>

      {/* Main Slip Container */}
      <div style={{ border: '1px solid #111827', backgroundColor: 'white', color: 'black' }}>
        
        {/* Header */}
        <div style={{ textAlign: 'center', padding: '16px', borderBottom: '1px solid #111827', fontSize: '18px', fontWeight: 'bold' }}>
          Part - A Slip
        </div>

        {/* Table Content */}
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
          <tbody>
            <tr style={{ borderBottom: '1px solid #111827' }}>
              <td style={{ width: '30%', padding: '12px', borderRight: '1px solid #111827', fontWeight: '500' }}>Unique No.</td>
              <td style={{ padding: '12px' }}>5120 1457 3422</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #111827' }}>
              <td style={{ padding: '12px', borderRight: '1px solid #111827', fontWeight: '500' }}>Entered Date</td>
              <td style={{ padding: '12px' }}>{new Date().toLocaleString('en-IN')}</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #111827' }}>
              <td style={{ padding: '12px', borderRight: '1px solid #111827', fontWeight: '500' }}>Entered By</td>
              <td style={{ padding: '12px' }}>33BTK PB869 3N1Z1 - BALAKUMAR</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #111827' }}>
              <td style={{ padding: '12px', borderRight: '1px solid #111827', fontWeight: '500' }}>Valid From:</td>
              <td style={{ padding: '12px', fontWeight: 'bold' }}>Not Valid for Movement as Part B is not entered [176Kms]</td>
            </tr>
            <tr style={{ borderBottom: '2px solid #111827' }}>
              <td style={{ padding: '12px', borderRight: '1px solid #111827', fontWeight: '500' }}>Portal:</td>
              <td style={{ padding: '12px' }}>1</td>
            </tr>
            
            {/* Sub Header */}
            <tr style={{ backgroundColor: '#F3F4F6', borderBottom: '1px solid #111827' }}>
              <td colSpan="2" style={{ padding: '8px 12px', fontWeight: 'bold' }}>Part - A</td>
            </tr>

            <tr style={{ borderBottom: '1px solid #111827' }}>
              <td style={{ padding: '12px', borderRight: '1px solid #111827', fontWeight: '500' }}>GSTIN of Supplier</td>
              <td style={{ padding: '12px' }}>33BTKPB8693N1Z1, D.R.Textile</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #111827' }}>
              <td style={{ padding: '12px', borderRight: '1px solid #111827', fontWeight: '500' }}>Place of Dispatch</td>
              <td style={{ padding: '12px' }}>Tiruppur, TAMIL NADU-641603</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #111827' }}>
              <td style={{ padding: '12px', borderRight: '1px solid #111827', fontWeight: '500' }}>GSTIN of Recipient</td>
              <td style={{ padding: '12px' }}>URP, GURUKULAM PRE SCHOOL</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #111827' }}>
              <td style={{ padding: '12px', borderRight: '1px solid #111827', fontWeight: '500' }}>Place of Delivery</td>
              <td style={{ padding: '12px' }}>Sholanganallur, TAMIL NADU-620102</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #111827' }}>
              <td style={{ padding: '12px', borderRight: '1px solid #111827', fontWeight: '500' }}>Document No.</td>
              <td style={{ padding: '12px' }}>DRT-004/26</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #111827' }}>
              <td style={{ padding: '12px', borderRight: '1px solid #111827', fontWeight: '500' }}>Document Date</td>
              <td style={{ padding: '12px' }}>02/06/2026</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #111827' }}>
              <td style={{ padding: '12px', borderRight: '1px solid #111827', fontWeight: '500' }}>Transaction Type:</td>
              <td style={{ padding: '12px' }}>Regular</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #111827' }}>
              <td style={{ padding: '12px', borderRight: '1px solid #111827', fontWeight: '500' }}>Value of Goods</td>
              <td style={{ padding: '12px' }}>52500</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #111827' }}>
              <td style={{ padding: '12px', borderRight: '1px solid #111827', fontWeight: '500' }}>HSN Code</td>
              <td style={{ padding: '12px' }}>6109 - T SHIRT</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #111827' }}>
              <td style={{ padding: '12px', borderRight: '1px solid #111827', fontWeight: '500' }}>Reason for Transportation</td>
              <td style={{ padding: '12px' }}>Outward - Supply</td>
            </tr>
            <tr style={{ borderBottom: '2px solid #111827' }}>
              <td style={{ padding: '12px', borderRight: '1px solid #111827', fontWeight: '500' }}>Transporter</td>
              <td style={{ padding: '12px' }}>33AAECA2701K1Z4 & AKR EXPRESS PRIVATE LIMITED</td>
            </tr>
          </tbody>
        </table>

        {/* Barcode Simulation */}
        <div style={{ textAlign: 'center', padding: '24px' }}>
          <div style={{ display: 'inline-block', height: '50px', width: '200px', background: 'repeating-linear-gradient(90deg, #000, #000 2px, #fff 2px, #fff 4px, #000 4px, #000 5px, #fff 5px, #fff 8px)' }}></div>
          <div style={{ fontSize: '12px', marginTop: '8px' }}>512014573422</div>
        </div>

        {/* Footer Note */}
        <div style={{ borderTop: '1px solid #111827', padding: '12px', fontSize: '12px', color: '#4B5563' }}>
          Note*: If any discrepancy in information please try after sometimes.
        </div>
      </div>
    </div>
  );
}