import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AdminLogin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage('');

        try {
            const response = await axios.post(`http://localhost:3000/admin/login`, {
                email,
                password,
            });

            // Save admin ID to localStorage
            localStorage.setItem('admin_id', response.data.admin.id);

            // Redirect someone to admin dashboard
            navigate('/admin/complaints');
        } catch (error) {
            if (error.response) {
                setErrorMessage(error.response.data.error || 'An error occurred.');
            } else {
                setErrorMessage('An unexpected error occurred.');
            }
        }
    };
    // Admin login option added
    return (
        <div>
            <h2>Admin Login</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default AdminLogin;
