import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useParams } from "react-router-dom";

function Profile() {
  const [profile, setProfile] = useState('');
  const { id } = useParams();

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/profile/${id}`);
        const { profileData } = response.data;
        setProfile(profileData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProfileData();
  }, [id]);


  return (
    <div>
      <h2>Profile</h2>
      <div>
        <p>ID: {id}</p>
        <p>Symptoms: {profile.name}</p>
        <p>Email: {profile.email}</p>
        <p>Department: {profile.dept}</p>
        <p>Gender: {profile.gender}</p>
      </div>
    </div>
  );
}

export default Profile;
