import React, { useState, useEffect } from "react";
import axios from 'axios';
import Auth from "./Auth";

function Complaints() {
  const [symptoms, setSymptoms] = useState('');
  const [taken_drugs, setTakenDrugs] = useState('');
  const [duration, setDuration] = useState('');
  const [students_id, setStudents_Id] = useState('');
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    const fetchComplaints = async () => {
      const id = localStorage.getItem('id')
      try {
        const student = Auth.getCurrentUser();
        console.log("Fetched student from Auth:", student);

        if (student && id ) {
          setStudents_Id(id);
          const response = await axios.get(`http://localhost:3000/complaints/${id}`);
          console.log("Response data:", response.data);
          setComplaints(response.data.complaint ? [response.data.complaint] : []);
      } else {
        console.error('No student logged in.');
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchComplaints();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(students_id);
  
    // Validation for all the fields so i can see where the error is coming from
  if (!symptoms) {
    console.error('Symptoms field is required.');
    return;
  }

  if (!duration) {
    console.error('Duration field is required.');
    return;
  }

  if (!taken_drugs) {
    console.error('Please select if drugs were taken.');
    return;
  }

  // if (!students_id) {
  //   console.error('Student ID is missing. Please log in.');
  //   return;
  // }
    try {
      const response = await axios.post('http://localhost:3000/complaints', {
        symptoms,
        duration,
        taken_drugs,
        students_id, 
      });
      console.log(response.data);

      setComplaints([...complaints, response.data]);

      setSymptoms('');
      setDuration('');
      setTakenDrugs('');

    } catch (error) {
      console.error('Error submitting complaint:', error);
    }
  };

  return (
    <div className="complaints-container">
      <h2 className="complaints-heading">Complaints</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="label">Symptoms:</label>
          <input
            type="text"
            value={symptoms}
            onChange={e => setSymptoms(e.target.value)}
            className="input"
          />
        </div>

        <div className="form-group">
          <label className="label">Duration:</label>
          <input
            type="number"
            value={duration}
            onChange={e => setDuration(e.target.value)}
            className="input"
          />
        </div>

        <div className="form-group">
          <label className="label">Taken any drugs?:</label>
          <select
           value={taken_drugs} 
           onChange={(e) => setTakenDrugs(e.target.value)}
            className="select"
          >
            <option value="">Select an option</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>

        <button type="submit"className="submit-button">Submit Complaint</button>
      </form>

      <div className="complaints-list">
        <h2>Complaints</h2>
        <ul>
          {complaints.map((complaint) => (
            <li key={complaint.id}>
              <p>Symptoms: {complaint.symptoms}</p>
              <p>Duration: {complaint.duration}</p>
              <p>Drugs Taken: {complaint.taken_drugs}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Complaints;
