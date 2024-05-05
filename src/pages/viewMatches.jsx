import { SingleEliminationBracket, Match, SVGViewer } from '@g-loot/react-tournament-brackets';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function formatDate(inputDate) {
    const date = new Date(inputDate);
    const formattedDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
    // console.log(formattedDate);
    return formattedDate;
}

// {
//     id: 260005,
//     name: 'Final - Match',
//     nextMatchId: null,
//     nextLooserMatchId: null,
//     tournamentRoundText: '4',
//     startTime: '2021-05-30',
//     state: 'SCHEDULED',
//     participants: [
//         {
//             id: 'c016cb2a-fdd9-4c40-a81f-0cc6bdf4b9cc',
//             resultText: null,
//             isWinner: false,
//             status: null,
//             name: 'giacomo123',
//         },
//         {
//             id: '9ea9ce1a-4794-4553-856c-9a3620c0531b',
//             resultText: null,
//             isWinner: false,
//             status: null,
//             name: 'Ant',
//         },
//     ],
// },




function SingleElimination() {
    const { tournament_id } = useParams();
    const [matches, setMatches] = useState([]);
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        fetchMatches(-1);

    }, []);
    const CreateMatchTable = (matches, hostels) => {
        let matchTable = [];
        let toPop = [];
        if (hostels.length > 0) {
            matchTable = matches.map(match => {
                let participants = [];
                let hostel1, hostel2, hostelName1, hostelName2;
                if (match.participant1 === "None") {
                    hostel1 = null;
                    hostelName1 = ""
                }
                else {
                    hostel1 = hostels.find(e => e.name === match.participant1);
                    hostelName1 = hostel1.name;
                }
                if (match.participant2 === "None") {
                    hostel2 = null;
                    hostelName2 = ""
                }
                else {
                    hostel2 = hostels.find(e => e.name === match.participant2);
                    hostelName2 = hostel2.name;
                }
                // Hostels Fetched ///////////////////////////////////////////////////////////////////
                if (hostel1 != null) {
                    let isWinner = false, resultText = null;
                    if (match.winner === hostel1.name) { isWinner = true; resultText = "WON" };
                    const participant = {
                        id: hostel1.id,
                        resultText: resultText,
                        isWinner: isWinner,
                        status: null,
                        name: hostel1.name,
                    }
                    participants.push(participant);
                }
                if (hostel2 != null) {
                    let isWinner = false, resultText = null;
                    if (match.winner === hostel2.name) { isWinner = true; resultText = "WON" };
                    const participant = {
                        id: hostel2.id,
                        resultText: resultText,
                        isWinner: isWinner,
                        status: null,
                        name: hostel2.name,
                    }
                    participants.push(participant);
                }
                const matchName = (hostelName1 + " vs " + hostelName2);
                // Find Next match id /////////////////////////////////////////////////////////////////////////////
                let nextMatchId = null
                // if (hostel1 == null || hostel2 == null || match.winner == "null") {
                //     nextMatchId = null;
                // }
                {
                    matches.forEach(instance => {
                        if (
                            instance.stage === match.stage + 1 &&
                            (
                                match.winner === instance.participant1 || match.winner === instance.participant2
                            )
                        ) {
                            nextMatchId = instance.id;
                        }
                    });
                }
                return {
                    id: match.id,
                    name: matchName,
                    nextMatchId: nextMatchId,
                    tournamentRoundText: match.stage + 1,
                    startTime: match.date,
                    state: 'DONE',
                    participants: participants,
                }
            })
            setMatches(matchTable);
            setLoading(false)
        }

        // console.log(matchTable);
    }

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
                if (matchInstance.hostel_id_1 != null) {
                    hostelName1 = hostelArray.find(e => e.id === matchInstance.hostel_id_1).name;
                }
                if (matchInstance.hostel_id_2 != null) {
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

            CreateMatchTable(matchDetails, hostelArray);


        } catch (error) {
            console.error('Error fetching matches: ', error);
        }
    };

    // console.log(matches);
    if (!loading) {
        console.log(matches);
        return <SingleEliminationBracket
            matches={matches}
            matchComponent={Match}
        // svgWrapper={({ children, ...props }) => (
        //     <SVGViewer width={500} height={500} {...props}>
        //         {children}
        //     </SVGViewer>
        // )}
        />
    }

    return <h1>Loading</h1>

}
export default SingleElimination;