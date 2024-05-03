// THIS PAGE DISPLAYS ALL THE TOURNAMENTS THAT ARE PRESET
// CAN BE ACCESSED BY GUEST USER

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import '../styles/viewTournaments.css'; // Import CSS file
import Navbar from '../components/navbar';
import axios from 'axios';

function formatDate(inputDate) {
  const date = new Date(inputDate);
  const formattedDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
  // console.log(formattedDate);
  return formattedDate;
}

function TournamentViewPage() {
  const [tournaments, setTournaments] = useState([{
    id: "",
    name: "",
    start_date: "",
    end_date: "",
    status: "",
    num_players: 0,
    hostels: [],
  }]);

  // Simulating data for tournaments
  useEffect(() => {
    // Replace this with actual API call to fetch tournaments data
    const fetchTournaments = async () => {
      let tournamentArray, participantTable, hostelArray;
      try {
        let res = await axios.get(`${import.meta.env.VITE_BASE_URL}/tournament`)
        tournamentArray = res.data;
        res = await axios.get(`${import.meta.env.VITE_BASE_URL}/tournament/participants`)
        participantTable = res.data;
        res = await axios.get(`${import.meta.env.VITE_BASE_URL}/hostel`)
        hostelArray = res.data;

        // console.log(tournamentArray, participantTable, hostelArray)

        const modifiedArray = tournamentArray.map(tournament => {
          let hostels = [];
          participantTable.forEach(entry => {
            if (entry.tournament_id === tournament.id) {
              let hostelName;
              hostelArray.forEach(hostel => {
                if (hostel.id === entry.hostel_id) {
                  hostelName = hostel.name;
                }
              })
              hostels.push(hostelName);
            }
          });
          return {
            ...tournament,
            hostels: hostels
          }
        })

        setTournaments(modifiedArray);
      } catch (error) {
        console.error('Error fetching tournaments:', error);
      }
    };

    fetchTournaments();

  }, []);

  console.log(tournaments);

  return (
    <div>
      <div className="tournament-view-container">
        <h1>All Tournaments</h1>
        <table className="tournament-table">
          <thead>
            <tr>
              <th>Tournament ID</th>
              <th>Tournament Name</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Status</th>
              <th>Number of Players</th>
              <th>Participating Hostels</th>
              <th>View</th>
            </tr>
          </thead>
          <tbody>
            {tournaments.map(tournament => (
              <tr key={tournament.id}>
                <td>{tournament.id}</td>
                <td>{tournament.name}</td>
                <td>{formatDate(tournament.start_date)}</td>
                <td>{formatDate(tournament.end_date)}</td>
                <td>{tournament.status}</td>
                <td>{tournament.num_players}</td>
                <td>
                  {
                    tournament.hostels.map((hostel, index) => (
                      <span key={index}>
                        {hostel}
                        {index !== tournament.hostels.length - 1 && ', '}
                      </span>
                    ))
                  }
                </td>
                <td>
                  <Link to={`/tournament/${tournament.id}`}>
                    <button>View</button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TournamentViewPage;
