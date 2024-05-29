import React from 'react';
import { Link } from 'react-router-dom'; // Import Link component
import './Home.css';

const Home = () => {
  return (
    <div>
      <div className="sales-section">
        <h1 className="sales-title">Sales Agent Development</h1>
      </div>
      <div className="home-container">
        <div className="home-content">
          <h1 className="home-title">Welcome...</h1>
          <p className="home-subtitle">Explore our school database</p>
          <Link to="/dashboard" className="home-button">Get Started</Link> {/* Use Link component */}
        </div>
      </div>
    </div>
  );
};

export default Home;
