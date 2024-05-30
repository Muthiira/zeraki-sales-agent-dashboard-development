import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Sidebar.css';
import HomeIcon from '@material-ui/icons/Home';
import DashboardIcon from '@material-ui/icons/Dashboard';
import SchoolIcon from '@material-ui/icons/School';
import LockIcon from '@material-ui/icons/Lock';
import PersonAddIcon from '@material-ui/icons/PersonAdd';


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
