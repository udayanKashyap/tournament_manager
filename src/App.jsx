import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import AddHostelPage from './pages/HostelRegistration'
import AddStudentsPage from './pages/addStudents'
import TournamentCreationPage from './pages/createTournament'
import ParticipantRegistrationPage from './pages/registerForTournament'
import ViewStudentsPage from './pages/viewStudents'

import { BrowserRouter, Routes, Route } from "react-router-dom";
import TournamentViewPage from './pages/viewTournaments'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/hostel/register" element={<AddHostelPage />}/>
        <Route path="/hostel/students/add" element={<AddStudentsPage />}/>
        <Route path="/hostel/students" element={<ViewStudentsPage />}/>

        <Route path="/tournament/register" element={<ParticipantRegistrationPage />} />
        <Route path="/tournament/create" element={<TournamentCreationPage />} />
        <Route path="/tournament/view" element={<TournamentViewPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
