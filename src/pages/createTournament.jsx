// THIS PAGE CONTAINS A FORM THAT CAN BE ACCESSED BY ADMIN USERS TO CREATE A NEW TOURNAMENT

import React, { useState, useEffect } from 'react';
import '../styles//createTournament.css'; // Importing the CSS file
import axios, { AxiosError } from 'axios';

function TournamentCreationPage() {
  const [tournamentName, setTournamentName] = useState('');
  const [hostels, setHostels] = useState([]);
  const [selectedHostels, setSelectedHostels] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [status, setStatus] = useState('');
  const [numPlayersPerTeam, setNumPlayersPerTeam] = useState('');

  useEffect(() => {
    const fetchHostels = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/hostel`);
        console.log(response.data)
        setHostels(response.data);
      } catch (error) {
        console.error('Error fetching hostels:', error);
      }
    };

    fetchHostels();
  }, []);

  const handleHostelSelection = (event) => {
    const selectedHostels = Array.from(event.target.selectedOptions, (option) => option.value);
    setSelectedHostels(selectedHostels);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (new Date(endDate) < new Date(startDate)) {
      window.alert("End date cannot be before start date")
      return;
    }
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/tournament`,
        {
          name: tournamentName,
          start_date: startDate,
          end_date: endDate,
          status: status,
          num_players: numPlayersPerTeam,
          hostels_participating: selectedHostels,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      )
    } catch (error) {
      if (error instanceof AxiosError) {
        window.alert(error.response.data.message)
      }

    }
    // Resetting the form fields after submission
    setTournamentName('');
    setSelectedHostels([]);
    setStartDate('');
    setEndDate('');
    setStatus('');
    setNumPlayersPerTeam('');
  };

  return (
    <div className="tournament-creation-container">
      <h1>Create Tournament</h1>
      <form onSubmit={handleSubmit} className="tournament-creation-form">
        <div className="form-group">
          <label htmlFor="tournamentName">Tournament Name:</label>
          <input
            type="text"
            id="tournamentName"
            value={tournamentName}
            onChange={(e) => setTournamentName(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="hostelsParticipating">Hostels Participating:</label>
          <select
            multiple
            id="hostelsParticipating"
            value={selectedHostels}
            onChange={handleHostelSelection}
            required
          >
            {hostels?.map(hostel => (
              <option key={hostel.id} value={hostel.id}>{hostel.name}</option>
            ))}
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
        <div className="form-group">
          <label htmlFor="tournament_status">Status:</label>
          <input
            type="text"
            id="tournament_status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="submit-button">Create Tournament</button>
      </form>
    </div>
  );
}

export default TournamentCreationPage;
