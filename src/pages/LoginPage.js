// src/pages/LoginPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      navigate('/dashboard');
    }, 1000);
  };

  return (
    <div className="login-page-wrapper" style={{ 
      display: 'flex', justifyContent: 'center', alignItems: 'center', 
      minHeight: '100vh', width: '100vw',
      background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)'
    }}>
      <div className="login-card">
        <div className="login-header">
          <h2>Uniform ERP</h2>
          <p>Client Portal Login</p>
        </div>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label>Username</label>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <button type="submit" className="login-btn" disabled={isLoading}>
            {isLoading ? 'Authenticating...' : 'Sign In'}
          </button>
        </form>
        <div className="login-footer">Demo Version</div>
      </div>
    </div>
  );
};

export default LoginPage;