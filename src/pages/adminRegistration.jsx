// THIS PAGE REGISTERS THE ADMIN USER AND PASSWORD

import React, { useState } from 'react';
import "../styles/addHostel.css"
import axios from 'axios';

function AdminRegistration() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        console.log('username: ', username);
        console.log('password: ', password);
        try {
            const res = await axios.post(
                `${import.meta.env.VITE_BASE_URL}/admin`,
                {
                    username: username,
                    password: password
                }
            )
            console.log(res.data);
        } catch (error) {
            console.error('Error creating admin user: ', error);
        }
        // Resetting the form fields after submission
        setUsername('');
        setPassword('');
    };

    return (
        <div className='registration-container'>
            <h1>Admin Registration</h1>
            <form onSubmit={handleSubmit} className='registration-form'>
                <div className='form-group'>
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className='form-group'>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className='submit-button'>Register Admin</button>
            </form>
        </div>
    );
}

export default AdminRegistration;
