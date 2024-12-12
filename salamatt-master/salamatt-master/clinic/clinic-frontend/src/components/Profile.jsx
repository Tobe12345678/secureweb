import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useParams, Link } from "react-router-dom";
import Complaints from "./Complaints";
function Profile() {
  const [student, setStudent] = useState('');
  const id = localStorage.getItem('id'); // Make sure 'id' is stored correctly in localStorage

useEffect(() => {
  const fetchProfileData = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/profile/${id}`);
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
