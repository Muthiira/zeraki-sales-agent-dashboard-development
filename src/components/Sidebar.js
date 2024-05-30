import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Sidebar.css';
import HomeIcon from '@mui/icons-material/Home';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SchoolIcon from '@mui/icons-material/School';
import LockIcon from '@mui/icons-material/Lock';
import PersonAddIcon from '@mui/icons-material/PersonAdd';


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
    // navigate('/');
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
            <Link to="/">
              <HomeIcon /> Home
            </Link>
          </li>
          <li>
            <Link to="/dashboard">
              <DashboardIcon /> Dashboard
            </Link>
          </li>
          <li>
            <Link to="/schools">
              <SchoolIcon /> Schools
            </Link>
          </li>
        </ul>
      </nav>
      <div className="bottom-links">
		<Link to="/login" className="sidebar-link">
			<LockIcon /> Login
		</Link>
		<Link to="/signup" className="sidebar-link">
			<PersonAddIcon /> Signup
		</Link>
	  </div>
    </div>
  );
};

export default Sidebar;
