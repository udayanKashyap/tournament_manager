import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import '../../src/styles/navbar.css'; // Import CSS file
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const router = useNavigate()
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/tournament/view" className="navbar-brand">Tournament App</Link>
        <div className="navbar-links">
          <Link to="/tournament/view" className="navbar-link">View</Link>
          <Link to="/hostel/login" className="navbar-link">Hostel</Link>
          <Link to="/admin/login" className="navbar-link">Admin</Link>
          <button className="logout-button" onClick={() => {
            localStorage.removeItem("token");
            router("/tournament/view")
          }}>Logout</button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

