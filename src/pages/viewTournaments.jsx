// THIS PAGE DISPLAYS ALL THE TOURNAMENTS THAT ARE PRESET
// CAN BE ACCESSED BY GUEST USER

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import '../styles/viewTournaments.css'; // Import CSS file
import Navbar from '../components/navbar';

function TournamentViewPage() {
  const [tournaments, setTournaments] = useState([
    {
        id: '1',
        name: 'Cricket',
        startDate: '123 Main Street',
        endDate: '123-456-7890',
        status: 'Ongoing',
        hostels: ['cmh', 'nmh']
      },
      {
        id: '2',
        name: 'Badminton',
        startDate: '123 Main Street',
        endDate: '123-456-7890',
        status: 'Ongoing',
        hostels: ['pmh', 'kmh']
      },
  
  ]);

  // Simulating data for tournaments
  useEffect(() => {
    // Replace this with actual API call to fetch tournaments data
    const fetchTournaments = async () => {
      try {
        const response = await fetch('your-api-endpoint/tournaments');
        const data = await response.json();
        setTournaments(data.tournaments);
      } catch (error) {
        console.error('Error fetching tournaments:', error);
      }
    };

    fetchTournaments();
  }, []);

  return (
    <div>
        <Navbar />
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
                <th>Participating Hostels</th>
                <th>View</th>
            </tr>
            </thead>
            <tbody>
            {tournaments.map(tournament => (
                <tr key={tournament.id}>
                <td>{tournament.id}</td>
                <td>{tournament.name}</td>
                <td>{tournament.startDate}</td>
                <td>{tournament.endDate}</td>
                <td>{tournament.status}</td>
                <td>
                    {tournament.hostels.map((hostel, index) => (
                    <span key={hostel.id}>
                        {hostel.name}
                        {index !== tournament.hostels.length - 1 && ', '}
                    </span>
                    ))}
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
