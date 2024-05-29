import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleBackHome = () => {
    navigate('/');
  };

  return (
    <div
      className={`sidebar ${isHovered ? 'open' : ''}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
          <li>
            <Link to="/schools">Schools</Link>
          </li>
        </ul>
      </nav>
      {/* Login and Signup links */}
      <div className="bottom-links">
        <Link to="/login" className="sidebar-link">Login</Link>
        <Link to="/signup" className="sidebar-link">Signup</Link>
      </div>
    </div>
  );
};

export default Sidebar;
