import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
    const [errorMessage, setErrorMessage] = useState('')
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate()

    console.log(email);
    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage(''); // Clear previous errors
   
        try {
            const response = await axios.post(`http://localhost:3000/users/login`, {
                email,
                password
            }, {
                timeout: 1000000, // Set a higher timeout value (in milliseconds)
            });
            const { id, is_admin, name, email : emailFromDb } = response.data.user;
            const token = response.data.token;
            // Save the user's ID to localStorage
            localStorage.setItem('id', id);
            localStorage.setItem('is_admin', is_admin);
            localStorage.setItem('token', token);

            if (is_admin) {
                navigate('/admin/complaints'); // Redirect to the admin complaints page
            } else {
                navigate('/profile'); // Redirect to the user profile
            }
        } catch (error) {
            // Handle error
            if (error.response) {
                // If the backend sent an error response, display the error message
                setErrorMessage(error.response.data.error || 'An error occurred. Please try again.');
            } else if (error.request) {
                // If the request was made but no response was received
                setErrorMessage('No response from the server. Please check your connection.');
            } else {
                // Any other errors
                setErrorMessage('An unexpected error occurred. Please try again.');
            }
            console.error(error);
        }
    };

    return (
        <div>
            <h2> Login here</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" value={email}
                        onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                {errorMessage && (
                    <div style={{ color: 'red', marginTop: '10px' }}>
                        {errorMessage}
                    </div>
                )}
                    <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default Login;