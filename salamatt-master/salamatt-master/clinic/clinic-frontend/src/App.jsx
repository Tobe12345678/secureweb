import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import HospitalLandingPage from './components/HospitalLandingPage';
import Navbar from './Sidebar';
import './App.css';
import Login from './components/Login';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Complaints from './components/Complaints';
import Register from './components/Register';
import Profile from './components/Profile';
import AdminComplaints from './components/AdminComplaints';
import Reports from './components/Reports';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <div className='App'>
          <Routes>
            <Route path="/" element={<HospitalLandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/complaints" element={<Complaints />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="*" element={<LoginWithRedirection />} />
            <Route path="/admin" element={<AdminComplaints />} />
            <Route path="/report/:complaint_id" element={<Reports />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

function LoginWithRedirection() {
  const navigate = useNavigate();

  const handleLogin = () => {
    // Perform login logic here

    // Redirect to profile page
    navigate('/profile');
  };

  return <Login onLogin={handleLogin} />;
}

export default App;
