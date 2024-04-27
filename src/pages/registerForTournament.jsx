import React, { useState, useEffect } from 'react';
import '../styles/registerForTournament.css'; // Importing the CSS file

function ParticipantRegistrationPage() {
  const [tournamentId, setTournamentId] = useState('');
  const [hostelId, setHostelId] = useState('');
  const [studentsList, setStudentsList] = useState([]);
  const [selectedParticipants, setSelectedParticipants] = useState([]);

  // Simulating data for hostel students
  useEffect(() => {
    // Replace this with actual API call to fetch hostel ID from the tournament ID
    const fetchHostelId = async () => {
      try {
        const response = await fetch(`your-api-endpoint/tournament/${tournamentId}/hostel`);
        const data = await response.json();
        setHostelId(data.hostelId); // Assuming the response contains hostelId
      } catch (error) {
        console.error('Error fetching hostel ID:', error);
      }
    };

    fetchHostelId();
  }, [tournamentId]);

  // Fetch students list based on hostel ID
  useEffect(() => {
    if (hostelId) {
      // Replace this with actual API call to fetch students from the hostel with hostelId
      const fetchStudentsList = async () => {
        try {
          const response = await fetch(`your-api-endpoint/hostel/${hostelId}/students`);
          const data = await response.json();
          setStudentsList(data.students);
        } catch (error) {
          console.error('Error fetching students list:', error);
        }
      };

      fetchStudentsList();
    }
  }, [hostelId]);

  const handleParticipantSelection = (event) => {
    const selectedParticipants = Array.from(event.target.selectedOptions, (option) => option.value);
    setSelectedParticipants(selectedParticipants);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Here you can add code to submit the participant data
    console.log('Tournament ID:', tournamentId);
    console.log('Hostel ID:', hostelId);
    console.log('Selected Participants:', selectedParticipants);
    // Resetting the form fields after successful submission
    setTournamentId('');
    setHostelId('');
    setSelectedParticipants([]);
  };

  return (
    <div className="participant-registration-container">
      <h1>Participant Registration</h1>
      <form onSubmit={handleSubmit} className="participant-registration-form">
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
          <label htmlFor="participants">Select Participants:</label>
          <select
            multiple
            id="participants"
            value={selectedParticipants}
            onChange={handleParticipantSelection}
            required
          >
            {studentsList.map(student => (
              <option key={student.id} value={student.name}>{student.name}</option>
            ))}
          </select>
        </div>
        <button type="submit" className="submit-button">Register Participants</button>
      </form>
    </div>
  );
}

export default ParticipantRegistrationPage;
