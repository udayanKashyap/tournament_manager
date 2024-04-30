// THIS PAGE REGISTERS THE HOSTEL USER AND PASSWORD

import React, { useState } from 'react';
import "../styles/addHostel.css"
import axios from 'axios';

function HostelRegistration() {
  const [hostelName, setHostelName] = useState('');
  const [numBoarders, setNumBoarders] = useState(0);
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Here you can add code to submit the hostel registration data
    console.log('Hostel Name:', hostelName);
    console.log('Number of Boarders:', numBoarders);
    const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/hostel`, {
      name: hostelName,
      password: password,
    });
    console.log(res.data);

    // Resetting the form fields after submission
    setHostelName('');
    setNumBoarders(0);
  };

  return (
    <div className='registration-container'>
      <h1>Inter-Hostel Tournament Registration</h1>
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
        <button type="submit" className='submit-button'>Register Hostel</button>
      </form>
    </div>
  );
}

export default HostelRegistration;
