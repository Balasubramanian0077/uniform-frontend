// src/components/EmptyState.js
import React from 'react';

const EmptyState = ({ title, message }) => {
  return (
    <div className="card empty-state">
      <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📂</div>
      <h3>{title}</h3>
      <p>{message || 'No records available for this demo.'}</p>
    </div>
  );
};

export default EmptyState;