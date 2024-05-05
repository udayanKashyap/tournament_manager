import React, { useState, useEffect } from 'react';
import "../styles/editMatches.css"
import { useParams } from 'react-router-dom';
import axios from 'axios';

function formatDate(inputDate) {
    const date = new Date(inputDate);
    const formattedDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
    // console.log(formattedDate);
    return formattedDate;
}


function EditMatches() {
    const { tournament_id } = useParams()
    const [currentStage, setCurrentStage] = useState(-1);
    const [matches, setMatches] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [hostels, setHostels] = useState([]);

    useEffect(() => {
        // Fetch matches from API
        // fetchMatches();
        const exampleMatches = [];
        //     {
        //         id: 1,
        //         date: "2024-05-01",
        //         stage: "Quarterfinal",
        //         participant1: "Team A",
        //         participant2: "Team B",
        //         winner: ""
        //     },
        //     {
        //         id: 2,
        //         date: "2024-05-02",
        //         stage: "Quarterfinal",
        //         participant1: "Team C",
        //         participant2: "Team D",
        //         winner: ""
        //     },
        //     {
        //         id: 3,
        //         date: "2024-05-03",
        //         stage: "Quarterfinal",
        //         participant1: "Team E",
        //         participant2: "Team F",
        //         winner: ""
        //     },
        //     {
        //         id: 4,
        //         date: "2024-05-04",
        //         stage: "Quarterfinal",
        //         participant1: "Team G",
        //         participant2: "Team H",
        //         winner: ""
        //     }
        // ];
        setMatches(exampleMatches);
        fetchMatches(-1);

    }, []);

    const fetchMatches = async (stage) => {
        try {
            const matches = await axios.get(
                `${import.meta.env.VITE_BASE_URL}/matches/${tournament_id}/${stage}`
            )
            if (matches.data.length === 0) {
                window.alert("Please generate matchups");
                return;
            }
            const hostelArray = (await axios.get(`${import.meta.env.VITE_BASE_URL}/hostel`)).data
            const matchDetails = matches.data.map(matchInstance => {

                let hostelName1 = "None", hostelName2 = "None";
                if (matchInstance.hostel_id_1 !== null) {
                    hostelName1 = hostelArray.find(e => e.id === matchInstance.hostel_id_1).name;
                }
                if (matchInstance.hostel_id_2 !== null) {
                    hostelName2 = hostelArray.find(e => e.id === matchInstance.hostel_id_2).name;
                }

                let winner = "null";
                if (matchInstance.winner === matchInstance.hostel_id_1) {
                    winner = hostelName1;
                }
                else if (matchInstance.winner === matchInstance.hostel_id_2) {
                    winner = hostelName2;
                }
                return {
                    id: matchInstance.id,
                    date: formatDate(matchInstance.date),
                    stage: matchInstance.stage,
                    participant1: hostelName1,
                    participant2: hostelName2,
                    winner: winner
                }
            })

            matchDetails.sort((a, b) => (a.stage - b.stage)); //Sort according to stage in Ascending order
            const currStage = matchDetails[matchDetails.length - 1].stage;
            setCurrentStage(currStage);
            console.log(currStage);
            setHostels(hostelArray);
            setMatches(matchDetails);
        } catch (error) {
            console.error('Error fetching matches: ', error);
        }
    };

    const handleWinnerUpdate = async (matchId, winner) => {
        try {
            console.log(winner);
            if (winner === "None") {
                window.alert("Winner cannot be null");
                return;
            }
            const winnerId = hostels.find(e => e.name === winner).id;
            const res = await axios.post(
                `${import.meta.env.VITE_BASE_URL}/matches/update`,
                {
                    match_id: matchId,
                    winner: winnerId
                }
            )
            console.log(res.data);
            fetchMatches(-1);
        } catch (error) {
            console.error('Error updating winner: ', error);
        }
    };

    const handleNewMatchCreate = async () => {
        try {
            const res = await axios.post(
                `${import.meta.env.VITE_BASE_URL}/matches/create`,
                {
                    tournament_id: tournament_id,
                    stage: currentStage + 1
                }
            )

            fetchMatches(-1);
        } catch (error) {
            console.error('Error creating new match: ', error);
        }
    };

    // if (isLoading) {
    //     return <div>Loading...</div>;
    // }

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Date</th>
                        <th>Stage</th>
                        <th>Participant 1</th>
                        <th>Participant 2</th>
                        <th>Winner</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {matches.map(match => (
                        <tr key={match.id}>
                            <td>{match.id}</td>
                            <td>{match.date}</td>
                            <td>{match.stage}</td>
                            <td>{match.participant1}</td>
                            <td>{match.participant2}</td>
                            <td>
                                <select
                                    value={match.winner}
                                    onChange={e => handleWinnerUpdate(match.id, e.target.value)}
                                >
                                    <option value="">Select winner</option>
                                    <option value={match.participant1}>{match.participant1}</option>
                                    <option value={match.participant2}>{match.participant2}</option>
                                </select>
                            </td>
                            <td>
                                <button>Edit</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div>
                <h2>Create New Match</h2>
                <button onClick={handleNewMatchCreate}>Auto Generate Matches{ }</button>
            </div>
        </div>
    );
}

export default EditMatches;
/*
TODO
 - Fix "Create New Match Button" to use automatic api generation of matches
 - Maintain current stage of tournament in a local variable
 - calculate current stage using list of all matches. current stage is the max value of the stage
Only allow changing of winner in current stage
Block changing of winner in previous completed stages if new stage matchups are made
Make reset button beside each match that resets the winner to 'Null'
Only allow resets for current stage and not for stages that are complete
Make dynamic stage name based on how many matches are there in each stage. (optional features)
*/


