import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import '../../src/styles/navbar.css'; // Import CSS file

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">Tournament App</Link>
        <div className="navbar-links">
          <Link to="/tournament/view" className="navbar-link">View</Link>
          <Link to="/hostel/" className="navbar-link">Hostel</Link>
          <Link to="/admin" className="navbar-link">Admin</Link>
          <button className="logout-button">Logout</button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

