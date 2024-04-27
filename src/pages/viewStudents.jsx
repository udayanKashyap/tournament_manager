// THIS PAGE SHOWS ALL THE STUDENTS OF THE LOGGED IN HOSTERL USER IN A TABLE
// THIS ALSO PROVIDES THE FUNCTIONALITY TO DELETE THEM

import React, { useState } from 'react';
import "../styles/viewStudents.css"

function ViewStudentsPage() {
  const [students, setStudents] = useState([
    {
      name: 'John Doe',
      rollNo: '101',
      address: '123 Main Street',
      contactNo: '123-456-7890',
      age: '20',
      gender: 'male'
    },
    {
      name: 'Jane Smith',
      rollNo: '102',
      address: '456 Elm Street',
      contactNo: '987-654-3210',
      age: '21',
      gender: 'female'
    }
  ]);

  const handleDeleteStudent = (index) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      const updatedStudents = [...students];
      updatedStudents.splice(index, 1);
      setStudents(updatedStudents);
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
                <td>{student.rollNo}</td>
                <td>{student.address}</td>
                <td>{student.contactNo}</td>
                <td>{student.age}</td>
                <td>{student.gender}</td>
                <td>
                  <button onClick={() => handleDeleteStudent(index)}>Delete</button>
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
