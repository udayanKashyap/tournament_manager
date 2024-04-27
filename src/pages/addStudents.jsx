import React, { useState } from 'react';
import "../styles/addStudent.css"

function AddStudentsPage() {
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

  const [newStudent, setNewStudent] = useState({
    name: '',
    rollNo: '',
    address: '',
    contactNo: '',
    age: '',
    gender: ''
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewStudent({
      ...newStudent,
      [name]: value
    });
  };

  const handleAddStudent = () => {
    setStudents([...students, newStudent]);
    setNewStudent({
      name: '',
      rollNo: '',
      address: '',
      contactNo: '',
      age: '',
      gender: ''
    });
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <form className="add-students-form">
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={newStudent.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="rollNo">Roll No:</label>
          <input
            type="text"
            id="rollNo"
            name="rollNo"
            value={newStudent.rollNo}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="address">Address:</label>
          <input
            type="text"
            id="address"
            name="address"
            value={newStudent.address}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="contactNo">Contact No:</label>
          <input
            type="text"
            id="contactNo"
            name="contactNo"
            value={newStudent.contactNo}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="age">Age:</label>
          <input
            type="number"
            id="age"
            name="age"
            value={newStudent.age}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="gender">Gender:</label>
          <select
            id="gender"
            name="gender"
            value={newStudent.gender}
            onChange={handleInputChange}
            required
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <button type="button" onClick={handleAddStudent} className="add-button">
          Add Student
        </button>
      </form>
    </div>
  );
}

export default AddStudentsPage;
