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
          <Link to="/hostel/login" className="navbar-link">HostelLogin</Link>
          <Link to="/admin/login" className="navbar-link">AdminLogin</Link>
          <Link to="/hostel/register" className="navbar-link">HostelRegister</Link>
          <Link to="/hostel/students/add" className="navbar-link">AddStudents</Link>
          <Link to="/hostel/students" className="navbar-link">ViewStudents</Link>
          <Link to="/hostel/tournament/register" className="navbar-link">RegisterStudents</Link>
          <Link to="/tournament/create" className="navbar-link">NewTournament</Link>
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

