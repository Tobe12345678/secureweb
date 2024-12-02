import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useParams, Link } from "react-router-dom";
import Complaints from "./Complaints";
function Profile() {
  const [student, setStudent] = useState('');
  const { id } = useParams();

  useEffect(() => {
    const fetchProfileData = async () => {
      const id = localStorage.getItem('id');  // Get id from localStorage
      if (!id) {
          console.error("User is not logged in");
          return;
      }

      try {
          const response = await axios.get(`http://localhost:3000/profile/${id}`);
          setStudent(response.data.profileData);  // Use profileData instead of the full response
      } catch (error) {
          console.error(error);
      }
  };

    fetchProfileData();
  }, [id]);


  return (
    <div>
 <Link to="/complaints">Profile</Link>      
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
