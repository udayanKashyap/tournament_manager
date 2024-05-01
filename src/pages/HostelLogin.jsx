// THIS PAGE REGISTERS THE HOSTEL USER AND PASSWORD

import React, { useState } from 'react';
import "../styles/addHostel.css"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useHostelStore } from '../store/store';

function HostelLoginPage() {
  const [hostelName, setHostelName] = useState('');
  const [password, setPassword] = useState('');
  const router = useNavigate()
  const addHostel = useHostelStore(state => state.addHostel)
  const handleSubmit = async (event) => {
    event.preventDefault();
    // Here you can add code to submit the hostel registration data
    console.log('Hostel Name:', hostelName);
    try {
      const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/hostel/login`, {
        name: hostelName,
        password: password,
      })
      localStorage.setItem('token', res.data.token)
      addHostel(res.data.data.name, res.data.data.id)
      router("/hostel/students")
    } catch (error) {
      window.alert(error.message)
    }

    // Resetting the form fields after submission
    setHostelName('');
    setPassword('');
  };

  return (
    <div className='registration-container'>
      <h1>Hostel Login</h1>
      <form onSubmit={handleSubmit} className='registration-form'>
        <div className='form-group'>
          <label htmlFor="hostelName">Hostel Name:</label>
          <input
            type="text"
            id="hostelName"
            value={hostelName}
            onChange={(e) => setHostelName(e.target.value)}
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor="hostelPassword">Password:</label>
          <input
            type="password"
            id="hostelPassword"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className='submit-button'>Login</button>
      </form>
    </div>
  );
}

export default HostelLoginPage;
