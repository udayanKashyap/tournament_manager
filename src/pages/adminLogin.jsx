// THIS PAGE REGISTERS THE HOSTEL USER AND PASSWORD

import React, { useState } from 'react';
import "../styles/addHostel.css"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAdminStore } from '../store/store';

function AdminLoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const router = useNavigate()
    const addAdmin = useAdminStore(state => state.addAdmin)
    const handleSubmit = async (event) => {
        event.preventDefault();
        // Here you can add code to submit the hostel registration data
        console.log('Username: ', username);
        try {
            const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/admin/login`, {
                username: username,
                password: password,
            })
            console.log('token: ', res.data.data)
            localStorage.setItem('token', res.data.token)
            addAdmin(res.data.data.userType, res.data.data.username);
            // router("/admin/students")
        } catch (error) {
            window.alert(error.message)
        }

        // Resetting the form fields after submission
        setUsername('');
        setPassword('');
    };

    return (
        <div className='registration-container'>
            <h1>Admin Login</h1>
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
                <button type="submit" className='submit-button'>Login</button>
            </form>
        </div>
    );
}

export default AdminLoginPage;
