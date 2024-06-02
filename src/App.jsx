import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import axios from "axios";
import AddHostelPage from "./pages/addHostel";
import AddStudentsPage from "./pages/addStudents";
import TournamentCreationPage from "./pages/createTournament";
import ParticipantRegistrationPage from "./pages/registerForTournament";
import ViewStudentsPage from "./pages/viewStudents";
import HostelLoginPage from "./pages/HostelLogin";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import TournamentViewPage from "./pages/viewTournaments";
import { useHostelStore, useAdminStore } from "./store/store";
import AdminRegistration from "./pages/adminRegistration";
import AdminLoginPage from "./pages/adminLogin";
import Navbar from "./components/navbar";
import SingleElimination from "./pages/viewMatches";
import EditMatches from "./pages/editMatches";

function App() {
  const addHostel = useHostelStore((state) => state.addHostel);
  const addAdmin = useAdminStore((state) => state.addAdmin);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      return;
    }
    const getToken = async () => {
      try {
        const res = await axios.post(
          `${import.meta.env.VITE_BASE_URL}/verify`,
          { token }
        );
        console.log("verified token!!!", res.data);
        if (res.data.userType === "admin") {
          addAdmin(res.data.userType, res.data.username);
        }
        if (res.data.userType === "hostelAdmin") {
          addHostel(res.data.userType, res.data.name, res.data.id);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getToken();
  }, []);

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/hostel/register" element={<AddHostelPage />} />
        <Route path="/hostel/students/add" element={<AddStudentsPage />} />
        <Route path="/hostel/students" element={<ViewStudentsPage />} />
        <Route path="/hostel/login" element={<HostelLoginPage />} />

        <Route
          path="/hostel/tournament/register"
          element={<ParticipantRegistrationPage />}
        />
        <Route path="/tournament/create" element={<TournamentCreationPage />} />
        <Route path="/tournament/view" element={<TournamentViewPage />} />

        <Route path="/admin/register" element={<AdminRegistration />} />
        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route
          path="/admin/:tournament_id/matches"
          element={
            <AdminLoginPage>
              <EditMatches />
            </AdminLoginPage>
          }
        />

        <Route path="/:tournament_id/matches" element={<SingleElimination />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
