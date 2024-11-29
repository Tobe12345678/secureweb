import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AdminComplaints() {
    const [complaints, setComplaints] = useState([]);
    const redirect = useNavigate()
    
    const handleClick = (complaint_id) => {
        redirect(`/report/${complaint_id}`)
    }

    useEffect(() => {
        const fetchComplaints = async () => {
            try {
                const response = await axios.get('http://localhost:3000/admin/complaints');
                setComplaints(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchComplaints();
    }, []);

    return (
        <div>
            <h2>Admin Complaints</h2>
            <ul>
                {complaints.map((complaint) => (
                    <li key={complaint.id}>
                        <p> Complaints ID: {complaint.id}</p>
                        <p>Symptoms: {complaint.symptoms}</p>
                        <p>Duration: {complaint.duration}</p>
                        <p>Taken Drugs: {complaint.taken_drugs}</p>
                        <p>Student ID: {complaint.students_id}</p>
                        <button onClick={() => handleClick(complaint.id)}> Add Report </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default AdminComplaints;
