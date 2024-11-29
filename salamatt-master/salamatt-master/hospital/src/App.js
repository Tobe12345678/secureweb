import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import HospitalLandingPage from '../../clinic/clinic-frontend/src/components/HospitalLandingPage';
import Sidebar from '../../clinic/clinic-frontend/src/Sidebar';
import './App.css'
import Login from '../../clinic/clinic-frontend/src/components/Login';
import { BrowserRouter as Route, Router, Routes } from 'react-router-dom'
import Complaints from '../../clinic/clinic-frontend/src/components/Complaints';
import Register from '../../clinic/clinic-frontend/src/components/Register';
import Profile from '../../clinic/clinic-frontend/src/components/Profile';

function App() {
  return (

      <div> 
        <Sidebar />
        <HospitalLandingPage />
        <Login />
        <Complaints />
        <Register />
        <Profile />
       </div>

  );
}

export default App;
