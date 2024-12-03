import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Ligjerata = () => {
  const [Ligjerata, setLigjerata] = useState([]);

  useEffect(() => {
    const fetchAllLigjerata = async () => {
      try {
        const res = await axios.get("http://localhost:3002/ligjerata");
        console.log("Fetched Ligjerata:", res.data);
        
        if (Array.isArray(res.data)) {
            setLigjerata(res.data);
        } else {
          console.error("API response is not an array:", res.data);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllLigjerata();
  }, []);

  const handleDelete = async (id) => {
    try {
      const confirmDelete = window.confirm("Are you sure you want to delete this Hall? This action cannot be undone.");
      if (confirmDelete) {
        await axios.delete(`http://localhost:3002/ligjerata/${id}`);
        setLigjerata((prevLigjerata) => prevLigjerata.filter(Hall => Hall.id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
<div className="halls-dashboard" style={{padding: '1%', marginLeft:'5px' }}>
  <h1 className="h1-design" style={{ textAlign: 'center', fontSize: '30px', color: 'white', marginBottom: '20px', marginLeft: '35%' }}>Ligjerata Dashboard</h1>
  
  <center>
    <table className="halls-table" style={{ marginTop: "20px", width: "80%", borderCollapse: "collapse" }}>
      <thead>
        <tr style={{  backgroundColor: '#20615b',  color: '#fff',  textAlign: 'center' }}>
          <th style={{ padding: "10px 20px" }}>Id</th>
          <th style={{ padding: "10px 20px" }}>Name</th>
          <th style={{ padding: "10px 20px" }}>Prof. ID</th>
          <th style={{ padding: "10px 20px" }}>Update</th>
          <th style={{ padding: "10px 20px" }}>Delete</th>
        </tr>
      </thead>
      <tbody>
        {Ligjerata.map((Ligje) => (
          <tr key={Ligje.id} style={{ textAlign: "center", backgroundColor: "#761a1a", borderBottom: "1px solid #ccc" }}>
            <td style={{ padding: "10px" }}>{Ligje.id}</td>
            <td style={{ padding: "10px" }}>{Ligje.name}</td>
            <td style={{ padding: "10px" }}>{Ligje.prof_id}</td>
            <td style={{ padding: "10px" }}>
              <Link className="update-link" to={`/updateligjerata/${Ligje.id}`} style={{ color: "#4caf50" }}>🔄 Update</Link>
            </td>
            <td style={{ padding: "10px", cursor: "pointer" }}>
              <span className="delete-link" style={{ color: "#f44336" }} onClick={() => handleDelete(Ligje.id)}>✖️ Delete</span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </center>

  <div style={{ textAlign: "center", marginTop: "30px" }}>
  <button 
    className="users-button" 
    style={{ 
      backgroundColor: "#046987", 
      padding: "12px 30px", 
      borderRadius: "8px", 
      border: "none", 
      cursor: "pointer", 
      fontSize: "16px",
      transition: "background-color 0.3s ease" 
    }}
    onMouseOver={(e) => e.currentTarget.style.backgroundColor = "#0580a5"}
    onMouseOut={(e) => e.currentTarget.style.backgroundColor = "#046987"}
  >
    <Link to="/addLigjerata" style={{ color: "#fff", textDecoration: "none", fontSize:'20px' }}>➕  Add New Ligjerata</Link>
  </button>

</div>
</div>
  );
};

export default Ligjerata;