import React, { useState } from 'react';
import "../styles/addHostel.css"

function HostelRegistration() {
  const [hostelName, setHostelName] = useState('');
  const [numBoarders, setNumBoarders] = useState(0);
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Here you can add code to submit the hostel registration data
    console.log('Hostel Name:', hostelName);
    console.log('Number of Boarders:', numBoarders);
    // Resetting the form fields after submission
    setHostelName('');
    setNumBoarders(0);
  };

  return (
    <div>
      <h1>Inter-Hostel Tournament Registration</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="hostelName">Hostel Name:</label>
          <input
            type="text"
            id="hostelName"
            value={hostelName}
            onChange={(e) => setHostelName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="numBoarders">Number of Boarders:</label>
          <input
            type="number"
            id="numBoarders"
            value={numBoarders}
            onChange={(e) => setNumBoarders(parseInt(e.target.value))}
            required
          />
        </div>
        <div>
          <label htmlFor="hostekPasswotd">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Register Hostel</button>
      </form>
    </div>
  );
}

export default HostelRegistration;
