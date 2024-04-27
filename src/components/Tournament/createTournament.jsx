import React, { useState } from 'react';
import './createTournament.css'; // Importing the CSS file

function TournamentCreationPage() {
  const [tournamentId, setTournamentId] = useState('');
  const [hostelsParticipating, setHostelsParticipating] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [numPlayersPerTeam, setNumPlayersPerTeam] = useState('');

  const handleHostelSelection = (event) => {
    const selectedHostels = Array.from(event.target.selectedOptions, (option) => option.value);
    setHostelsParticipating(selectedHostels);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if(new Date(endDate) < new Date(startDate)){
        // setErrorMessage('End date cannot be before start date');
        return;
    }
    // Here you can add code to submit the tournament data
    console.log('Tournament ID:', tournamentId);
    console.log('Hostels Participating:', hostelsParticipating);
    console.log('Start Date:', startDate);
    console.log('End Date: ', endDate)
    console.log('Number of Players per Team:', numPlayersPerTeam);
    // Resetting the form fields after submission
    setTournamentId('');
    setHostelsParticipating([]);
    setStartDate('');
    setEndDate('');
    setNumPlayersPerTeam('');
  };

  return (
    <div className="tournament-creation-container">
      <h1>Create Tournament</h1>
      <form onSubmit={handleSubmit} className="tournament-creation-form">
        <div className="form-group">
          <label htmlFor="tournamentId">Tournament ID:</label>
          <input
            type="text"
            id="tournamentId"
            value={tournamentId}
            onChange={(e) => setTournamentId(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="hostelsParticipating">Hostels Participating:</label>
          <select
            multiple
            id="hostelsParticipating"
            value={hostelsParticipating}
            onChange={handleHostelSelection}
            required
          >
            <option value="hostel1">Hostel 1</option>
            <option value="hostel2">Hostel 2</option>
            <option value="hostel3">Hostel 3</option>
            {/* Add more hostels as needed */}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="startDate">Start Date:</label>
          <input
            type="date"
            id="startDate"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="endDate">End Date:</label>
          <input
            type="date"
            id="endDate"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="numPlayersPerTeam">Number of Players per Team:</label>
          <input
            type="number"
            id="numPlayersPerTeam"
            value={numPlayersPerTeam}
            onChange={(e) => setNumPlayersPerTeam(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="submit-button">Create Tournament</button>
      </form>
    </div>
  );
}

export default TournamentCreationPage;
