// App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Schools from './components/Schools';
import Sidebar from './components/Sidebar';
import SchoolDetails from './components/SchoolDetails';
import Home from './components/Home';

function App() {
  return (
    <Router>
      <div className="App">
        <Sidebar />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} /> Update to use Home component
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/schools" element={<Schools />} />
            <Route path="/schools/:id" element={<SchoolDetails />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
