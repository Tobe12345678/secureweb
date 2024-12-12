import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useParams, Link } from "react-router-dom";
import Complaints from "./Complaints";
function Profile() {
  const [student, setStudent] = useState('');
  const id = parseInt(localStorage.getItem('id'), 10); // Make sure 'id' is stored correctly in localStorage
  console.log(id)
useEffect(() => {
  const fetchProfileData = async () => {
    try {
      const token = localStorage.getItem('token');
    if (!token) {
      console.error('Token is missing. Please log in again.');
      return;
    }
      const response = await axios.get(`http://localhost:3000/profile/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Attach token to Authorization header
        },
      });
      
      setStudent(response.data.profileData);
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  if (id) fetchProfileData();
  else console.error('User ID not found in localStorage');
}, [id]);

  return (
    <div>
      <button> <Link to="/complaints">Complaints</Link>   </button>
    
 <h2>Profile</h2>
      <div>
        <p>ID: {id}</p>
        <p>Name: {student.name}</p>
        <p>Email: {student.email}</p>
        <p>Department: {student.dept}</p>
        <p>Gender: {student.gender}</p>
      </div>
    </div>
  );
}

export default Profile;
