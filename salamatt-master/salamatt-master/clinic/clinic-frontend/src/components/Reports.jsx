import React from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";

function Reports() {
    const [report, setReport] = useState('');
    const {complaint_id} = useParams()

    const handleSubmit = async (e) => {
        try {
            const response = await axios.put(`http://localhost:3000/complaints/${complaint_id}`, { 
           report,
           complaint_id
         });
          // Handle successful login
          alert('updated successfully')
          console.log(response.data);
        } catch (error) {
          // Handle error
          console.error(error);
        }
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
            <label htmlFor="report">Doctors Report:</label>
            <input type="report" id="report" value={report}
                onChange={(e) => setReport(e.target.value)} />
            <div>
                <button type="submit"> Add </button>

            </div>
            </form>
           
        </div>
    )
}
export default Reports;