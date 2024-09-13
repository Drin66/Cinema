import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Halls = () => {
  const [Halls, setHalls] = useState([]);

  useEffect(() => {
    const fetchAllHalls = async () => {
      try {
        const res = await axios.get("http://localhost:3002/Halls");
        console.log("Fetched Halls:", res.data);
        
        if (Array.isArray(res.data)) {
            setHalls(res.data);
        } else {
          console.error("API response is not an array:", res.data);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllHalls();
  }, []);

  const handleDelete = async (id) => {
    try {
      const confirmDelete = window.confirm("Are you sure you want to delete this Hall? This action cannot be undone.");
      if (confirmDelete) {
        await axios.delete(`http://localhost:3002/Halls/${id}`);
        setHalls((prevHalls) => prevHalls.filter(Hall => Hall.id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
   


<div className="halls-dashboard" style={{padding: '1%', marginLeft:'5px' }}>
  <h1 className="h1-design" style={{ textAlign: 'center', fontSize: '30px', color: 'white', marginBottom: '20px', marginLeft: '35%' }}>Halls Dashboard</h1>
  
  <center>
    <table className="halls-table" style={{ marginTop: "20px", width: "80%", borderCollapse: "collapse" }}>
      <thead>
        <tr style={{  backgroundColor: '#20615b',  color: '#fff',  textAlign: 'center' }}>
          <th style={{ padding: "10px 20px" }}>Id</th>
          <th style={{ padding: "10px 20px" }}>Name</th>
          <th style={{ padding: "10px 20px" }}>Movie Name</th>
          <th style={{ padding: "10px 20px" }}>Hall Capacity</th>
          <th style={{ padding: "10px 20px" }}>Update</th>
          <th style={{ padding: "10px 20px" }}>Delete</th>
        </tr>
      </thead>
      <tbody>
        {Halls.map((Hall) => (
          <tr key={Hall.id} style={{ textAlign: "center", backgroundColor: "#761a1a", borderBottom: "1px solid #ccc" }}>
            <td style={{ padding: "10px" }}>{Hall.id}</td>
            <td style={{ padding: "10px" }}>{Hall.name}</td>
            <td style={{ padding: "10px" }}>{Hall.movie_name}</td>
            <td style={{ padding: "10px" }}>{Hall.capacity} Seats</td>
            <td style={{ padding: "10px" }}>
              <Link className="update-link" to={`/updateHall/${Hall.id}`} style={{ color: "#4caf50" }}>🔄 Update</Link>
            </td>
            <td style={{ padding: "10px", cursor: "pointer" }}>
              <span className="delete-link" style={{ color: "#f44336" }} onClick={() => handleDelete(Hall.id)}>✖️ Delete</span>
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
    <Link to="/addHall" style={{ color: "#fff", textDecoration: "none", fontSize:'20px' }}>➕  Add New Hall</Link>
  </button>
  
  <br /><br />
  
  <Link 
    to="/movies" 
    style={{ 
      color: "#fff", 
      textDecoration: "none", 
      fontSize: "16px", 
      padding: "10px 20px", 
      backgroundColor: "#2e7d32", 
      borderRadius: "8px", 
      transition: "background-color 0.3s ease"
    }}
    onMouseOver={(e) => e.currentTarget.style.backgroundColor = "#3a9679"}
    onMouseOut={(e) => e.currentTarget.style.backgroundColor = "#3a9679"}
  >
    Back to Movies
  </Link>
</div>

</div>



  );
};

export default Halls;