// Sidebar.js

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate hook
import './Sidebar.css';

const Sidebar = () => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate(); // Initialize the navigate function

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleBackHome = () => {
    navigate('/'); // Navigate to the home page
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
            <Link to="/">Home</Link> {/* Link to Home */}
          </li>
          <li>
            <Link to="/dashboard">Dashboard</Link> {/* Link to Dashboard */}
          </li>
          <li>
            <Link to="/schools">Schools</Link> {/* Link to Schools */}
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
