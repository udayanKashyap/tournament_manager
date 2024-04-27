//  THIS PAGE PROVIDES A FORM TO ADD STUDENTS TO THE LOGGED IN HOSTEL USER

import React, { useState } from 'react';
import "../styles/addStudent.css"

function AddStudentsPage() {
  const [students, setStudents] = useState([
    {
      name: '',
      rollNo: '',
      address: '',
      contactNo: '',
      age: '',
      gender: ''
    }
  ]);

  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    const newStudents = [...students];
    newStudents[index][name] = value;
    setStudents(newStudents);
  };

  const handleAddStudent = () => {
    setStudents([...students, { name: '', rollNo: '', address: '', contactNo: '', age: '', gender: '' }]);
  };

  const handleRemoveStudent = (index) => {
    const newStudents = [...students];
    newStudents.splice(index, 1);
    setStudents(newStudents);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Here you can add code to submit the student data
    console.log('Students:', students);
    // Resetting the form fields after submission
    setStudents([{ name: '', rollNo: '', address: '', contactNo: '', age: '', gender: '' }]);
  };

  return (
    <div className="add-students-container">
      <h1>Add Students to Hostel</h1>
      <form onSubmit={handleSubmit} className="add-students-form">
        {students.map((student, index) => (
          <div key={index} className="student">
            <div className="form-group">
              <label htmlFor={`name-${index}`}>Name:</label>
              <input
                type="text"
                id={`name-${index}`}
                name="name"
                value={student.name}
                onChange={(e) => handleInputChange(index, e)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor={`rollNo-${index}`}>Roll No:</label>
              <input
                type="text"
                id={`rollNo-${index}`}
                name="rollNo"
                value={student.rollNo}
                onChange={(e) => handleInputChange(index, e)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor={`address-${index}`}>Address:</label>
              <input
                type="text"
                id={`address-${index}`}
                name="address"
                value={student.address}
                onChange={(e) => handleInputChange(index, e)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor={`contactNo-${index}`}>Contact No:</label>
              <input
                type="text"
                id={`contactNo-${index}`}
                name="contactNo"
                value={student.contactNo}
                onChange={(e) => handleInputChange(index, e)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor={`age-${index}`}>Age:</label>
              <input
                type="number"
                id={`age-${index}`}
                name="age"
                value={student.age}
                onChange={(e) => handleInputChange(index, e)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor={`gender-${index}`}>Gender:</label>
              <select
                id={`gender-${index}`}
                name="gender"
                value={student.gender}
                onChange={(e) => handleInputChange(index, e)}
                required
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            {index > 0 && (
              <button type="button" onClick={() => handleRemoveStudent(index)} className="remove-button">
                Remove Student
              </button>
            )}
          </div>
        ))}
        <button type="button" onClick={handleAddStudent} className="add-button">
          Add Student
        </button>
        <button type="submit" className="submit-button">Submit</button>
      </form>
    </div>
  );
}

export default AddStudentsPage;
