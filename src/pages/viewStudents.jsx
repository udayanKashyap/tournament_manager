// THIS PAGE SHOWS ALL THE STUDENTS OF THE LOGGED IN HOSTERL USER IN A TABLE
// THIS ALSO PROVIDES THE FUNCTIONALITY TO DELETE THEM

import React, { useEffect, useState } from 'react';
import "../styles/viewStudents.css"
import { useHostelStore } from '../store/store';
import axios from 'axios';

function ViewStudentsPage() {
  const hostelId = useHostelStore(state => state.id)
  const [students, setStudents] = useState([]);

  const fetchStudentsList = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/student`);
      let currentHostelStudents = []
      res.data.forEach(student => {
        if (student.hostel_id === hostelId) {
          currentHostelStudents.push(student);
        }
      });
      setStudents(currentHostelStudents);
      console.log(currentHostelStudents);
    } catch (error) {
      console.error('Error fetching students list: ', error);
    }
  };
  useEffect(() => {
    if (hostelId) {
      fetchStudentsList();
    }
  }, [hostelId])

  const handleDeleteStudent = async (student) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      console.log(student);
      try {
        const token = localStorage.getItem("token");
        const res = await axios.delete(
          `${import.meta.env.VITE_BASE_URL}/student/${student.roll_no}`,
          { headers: { Authorization: `Bearer ${token}` } }
        )
        console.log(res.data);
        fetchStudentsList();
      } catch (error) {
        console.error('Error deleting Student: ', error);
      }
    }
  };

  return (
    <div className="add-students-container">
      <h1>Add Students to Hostel</h1>
      <div className="existing-students">
        <h2>Existing Students</h2>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Roll No</th>
              <th>Address</th>
              <th>Contact No</th>
              <th>Age</th>
              <th>Gender</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, index) => (
              <tr key={index}>
                <td>{student.name}</td>
                <td>{student.roll_no}</td>
                <td>{student.address}</td>
                <td>{student.contact_number}</td>
                <td>{student.age}</td>
                <td>{student.gender}</td>
                <td>
                  <button onClick={() => handleDeleteStudent(student)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ViewStudentsPage;
