import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Announcments = () => {
  const [Announcments, setAnnouncments] = useState([]);

  useEffect(() => {
    const fetchAllAnnouncments = async () => {
      try {
        const res = await axios.get("http://localhost:3002/Announcments");
        console.log("Fetched Announcments:", res.data);
        
        if (Array.isArray(res.data)) {
            setAnnouncments(res.data);
        } else {
          console.error("API response is not an array:", res.data);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllAnnouncments();
  }, []);

  const handleDelete = async (id) => {
    try {
      const confirmDelete = window.confirm("Are you sure you want to delete this Announcment? This action cannot be undone.");
      if (confirmDelete) {
        await axios.delete(`http://localhost:3002/Announcments/${id}`);
        setAnnouncments((prevAnnouncments) => prevAnnouncments.filter(Announcments => Announcments.id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <div style={{ padding: '1%', marginLeft:'5px'}}>
  <h1 className="h1-design" style={{ textAlign: 'center', fontSize: '24px', color: 'white', marginBottom: '20px', marginLeft: '35%' }}>
    Announcements Dashboard
  </h1>
  
  <center>
    <table style={{ 
        width: '100%', 
      margin: '10px auto', 
      borderCollapse: 'collapse', 
      fontSize: '18px', 
      fontFamily: 'Arial, sans-serif', 
      backgroundColor: '#fff', 
      border: '1px solid #ddd',
      boxShadow: '0 0 10px rgba(0,0,0,0.1)', 
      // borderRadius:'20%',
      // border: '2px'
    }}>
      <thead>
        <tr style={{ 
          backgroundColor: '#20615b', 
          color: '#fff', 
          textAlign: 'center'
        }}>
          <th style={{ padding: '12px', borderBottom: '2px solid #ddd' }}>Id</th>
          <th style={{ padding: '12px', borderBottom: '2px solid #ddd' }}>Name</th>
          <th style={{ padding: '12px', borderBottom: '2px solid #ddd' }}>Reason</th>
          <th style={{ padding: '12px', borderBottom: '2px solid #ddd' }}>Date</th>
          <th style={{ padding: '12px', borderBottom: '2px solid #ddd' }}>Update</th>
          <th style={{ padding: '12px', borderBottom: '2px solid #ddd' }}>Delete</th>
        </tr>
      </thead>
      <tbody>
        {Announcments.map(Announcment => (
          <tr key={Announcment.id} style={{ textAlign: 'center', backgroundColor: Announcment.id % 2 === 0 ? '#761a1a' : '#761a1a' }}>
            <td style={{ padding: '12px' }}>{Announcment.id}</td>
            <td style={{ padding: '12px' }}>{Announcment.name}</td>
            <td style={{ padding: '12px' }}>{Announcment.reason}</td>
            <td style={{ padding: '12px' }}>{new Date(Announcment.date).toLocaleDateString('en-GB')}</td>
            <td style={{ padding: '12px', textAlign: 'center' }}>
              <Link to={`/updateannouncment/${Announcment.id}`} style={{ color: '#bef2ff', fontWeight: 'bold', textDecoration: 'none' }}>🔄 Update</Link>
            </td>
            <td style={{ padding: '12px', textAlign: 'center' }}>
              <button 
                onClick={() => handleDelete(Announcment.id)} 
                style={{
                  backgroundColor: '#dc3545', 
                  color: '#fff', 
                   border: 'none', 
                   borderRadius: '5px', 
                   padding: '6px 12px', 
                   fontSize: '16px', 
                  cursor: 'pointer', 
                   transition: 'background-color 0.3s ease'
                }}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#c82333'}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#dc3545'}
              >
                🗑️ Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </center>

  <div style={{ textAlign: 'center', marginTop: '30px' }}>
    <Link to="/addAnnouncment" style={{ textDecoration: 'none' }}>
      <button className="signupbutton" style={{ 
        backgroundColor: '#9ddcdc', 
        color: '#fff', 
        border: 'none', 
        borderRadius: '5px', 
        padding: '10px 20px', 
        fontSize: '18px', 
        cursor: 'pointer', 
        transition: 'background-color 0.3s ease'
      }} 
      onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#3a9679'}
      onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#3a9679'}
      >
        ➕ Add New Announcement
      </button>
    </Link>
  </div>
</div>
   
   
   
    </div>
  );
};

export default Announcments;