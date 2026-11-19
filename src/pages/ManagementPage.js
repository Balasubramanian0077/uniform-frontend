// src/pages/ManagementPage.js
import React from 'react';

const ManagementPage = () => (
  <div className="module-page">
    <h2>Management Module</h2>
    <p>No data available.</p>
    <table className="empty-table">
      <thead>
        <tr>
          <th>Item</th>
          <th>Status</th>
          <th>Details</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td colSpan="3" style={{ textAlign: 'center' }}>
            No data available
          </td>
        </tr>
      </tbody>
    </table>
  </div>
);

export default ManagementPage;
