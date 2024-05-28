// App.js (Updated)

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Schools from './components/School';
import Home from './components/Home';
import Sidebar from './components/Sidebar';

function App() {
  return (
    <Router>
      <div className="App">
        <Sidebar />
        <div className="content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/schools" element={<Schools />} />
            <Route path="/home" element={<Home />} /> {/* Route to the ZerakiPage component */}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
