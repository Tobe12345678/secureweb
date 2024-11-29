import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
const redirect = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const response = await axios.post(`http://localhost:3000/users/login`, { 
            email, 
            password
         }, {
            timeout: 5000, // Set a higher timeout value (in milliseconds)
         });
          // Handle successful login
          redirect('/profile')
          console.log(response.data);
        } catch (error) {
          // Handle error
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
                    <input type="password" id="password" value={password}  onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    )
}

export default Login;