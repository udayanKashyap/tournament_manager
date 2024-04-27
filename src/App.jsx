import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import AddHostelPage from './pages/addHostel'
import AddStudentsPage from './pages/addStudents'
import TournamentCreationPage from './pages/createTournament'
import ParticipantRegistrationPage from './pages/registerForTournament'

import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/hostel/register" element={<AddHostelPage />}/>
        <Route path="/hostel/students" element={<AddStudentsPage/>}/>
        <Route path="/tournament/register" element={<ParticipantRegistrationPage/>} />

        <Route path="/tournament/create" element={<TournamentCreationPage/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
