import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="home-background">
      <div className="sales-section">
        <div className="sales-section-content">
          <h1 className="sales-title">Sales Agent Dashboard</h1>
        </div>
      </div>
      <div className="home-container">
        <div className="home-content">
          <h1 className="home-title">Welcome...</h1>
          <p className="home-subtitle">committed to revolutionizing education across Africa...</p>
          <Link to="/dashboard" className="home-button">Get Started</Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
