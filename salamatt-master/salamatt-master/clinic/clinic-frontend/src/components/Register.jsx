import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [year, setYear] = useState('');
  const [email, setEmail] = useState('');
  const [dept, setDept] = useState('');
  const [gender, setGender] = useState('');
  const [age, setAge] = useState('');
  const redirect = useNavigate('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/users', {
        name,
        password,
        email,
        year,
        dept,
        age,
        gender,
      });

      // Reset form fields
      setName('');
      setAge('');
      setPassword('');
      setYear('');
      setEmail('');
      setDept('');
      setGender('');

      // Handle successful registration
      console.log(response.data);
      navigate('/login');
    } catch (error) {
      // Handle error
      console.error(error);
    }
  };

  return (
    <div className="register-container">
      <h2 className="register-heading">Register</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="label">Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input"
          />
        </div>
        <div className="form-group">
          <label className="label">Age:</label>
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="input"
          />
        </div>
        <div className="form-group">
          <label className="label">Year:</label>
          <input
            type="number"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className="input"
          />
        </div>
        <div className="form-group">
          <label className="label">Dept:</label>
          <input
            type="text"
            value={dept}
            onChange={(e) => setDept(e.target.value)}
            className="input"
          />
        </div>
        <div className="form-group">
          <label className="label">Gender:</label>
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="input"
          >
            <option value="">Select an option</option>
            <option value="female">Female</option>
            <option value="male">Male</option>
          </select>
        </div>
        <div className="form-group">
          <label className="label">Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input"
          />
        </div>
        <div className="form-group">
          <label className="label">Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input"
          />
        </div>
        <button type="submit" className="register-button">
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;
