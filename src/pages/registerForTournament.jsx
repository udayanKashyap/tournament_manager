// THIS PAGE CONTAINS A FORM ACCESSED BY HOSTEL USER TO ENROLL/REGISTER SOME STUDENTS OF THE HOSTEL FOR A PARTICULAR TOURNAMENT

import React, { useState, useEffect } from 'react';
import '../styles/registerForTournament.css'; // Importing the CSS file
import { useHostelStore } from '../store/store';
import axios from 'axios';

function ParticipantRegistrationPage() {
  const hostelId = useHostelStore(state => state.id)
  const [tournamentId, setTournamentId] = useState('');
  // const [hostelId, setHostelId] = useState('');
  const [tournamentList, setTournamentList] = useState([]);
  const [studentsList, setStudentsList] = useState([]);
  const [selectedParticipants, setSelectedParticipants] = useState([]);

  // Fetch students list based on hostel ID
  useEffect(() => {
    if (hostelId) {
      // Replace this with actual API call to fetch students from the hostel with hostelId
      const fetchStudentsList = async () => {
        try {
          const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/student`);
          let currentHostelStudents = []
          res.data.forEach(student => {
            if (student.hostel_id === hostelId) {
              currentHostelStudents.push(student);
            }
          });
          setStudentsList(currentHostelStudents);
        } catch (error) {
          console.error('Error fetching students list:', error);
        }
      };
      fetchStudentsList();
      const fetchTournamentList = async () => {
        try {
          const token = localStorage.getItem("token");
          const res = await axios.get(
            `${import.meta.env.VITE_BASE_URL}/tournament/hostel/${hostelId}`,
            { headers: { Authorization: `Bearer ${token}` } }
          )
          setTournamentList(res.data);
        } catch (error) {
          console.error('Error fetching tournaments list: ', error);
        }
      }
      fetchTournamentList();
    }
  }, [hostelId]);

  const handleTournamentSelection = (event) => {
    const selectedTournamentId = event.target.value;
    setTournamentId(selectedTournamentId);
  };

  const handleParticipantSelection = (event) => {
    const selectedParticipants = Array.from(event.target.selectedOptions, (option) => option.value);
    setSelectedParticipants(selectedParticipants);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Here you can add code to submit the participant data
    console.log('Tournament ID:', tournamentId);
    console.log('Hostel ID:', hostelId);
    console.log('Selected Participants:', selectedParticipants);
    const token = localStorage.getItem("token");
    const res = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/student/register`,
      {
        tournament_id: tournamentId,
        hostel_id: hostelId,
        selectedStudents: selectedParticipants
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    console.log(res.data);
    // Resetting the form fields after successful submission
    setTournamentId('');
    setSelectedParticipants([]);
  };

  return (
    <div className="participant-registration-container">
      <h1>Participant Registration</h1>
      <form onSubmit={handleSubmit} className="participant-registration-form">
        <div className="form-group">
          <label htmlFor="tournamentId">Select Tournament:</label>
          <select
            id="tournamentId"
            value={tournamentId}
            onChange={handleTournamentSelection}
            required
          >
            <option value="">Select Tournament</option>
            {tournamentList.map(tournament => (
              <option key={tournament.id} value={tournament.id}>{tournament.name}</option>
            ))}
          </select>
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
              <option key={student.id} value={student.roll_no}>{student.name}</option>
            ))}
          </select>
        </div>
        <button type="submit" className="submit-button">Register Participants</button>
      </form>
    </div>
  );
}

export default ParticipantRegistrationPage;
