// src/components/Navbar.js
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();

  const links = [
    { name: 'School', path: '/dashboard' },
    { name: 'Manufacturing', path: '/manufacturing' },
    { name: 'Distribution', path: '/distribution' },
    { name: 'Slip', path: '/slip' },
    { name: 'Billing', path: '/billing' },
    { name: 'Management', path: '/management' },
  ];

  return (
    <nav className="navbar">
      <div className="navbar-brand">Uniform ERP</div>
      <ul className="navbar-links">
        {links.map((link) => (
          <li key={link.name}>
            <Link 
              to={link.path} 
              className={location.pathname.startsWith(link.path) ? 'active' : ''}
            >
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;