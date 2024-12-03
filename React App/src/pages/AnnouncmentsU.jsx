import React, { useEffect, useState } from 'react';
import axios from 'axios';
// import { Link } from 'react-router-dom';

const AnnouncmentsU = () => {
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

  return (
    <div>
      <div style={{ padding: '1%', marginLeft:'5px'}}>
  <h1 className="h1-design" style={{ textAlign: 'center', fontSize: '24px', color: 'white', marginBottom: '20px', marginLeft: '35%' }}>
    Cinema Announcements 🚨
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
    }}>
      <thead>
        <tr style={{ 
          backgroundColor: '#20615b', 
          color: '#fff', 
          textAlign: 'center'
        }}>
          <th style={{ padding: '12px', borderBottom: '2px solid #ddd' }}>Name</th>
          <th style={{ padding: '12px', borderBottom: '2px solid #ddd' }}>Reason</th>
          <th style={{ padding: '12px', borderBottom: '2px solid #ddd' }}>Date</th>
        </tr>
      </thead>
      <tbody>
        {Announcments.map(Announcment => (
          <tr key={Announcment.id} style={{ textAlign: 'center', backgroundColor: Announcment.id % 2 === 0 ? '#761a1a' : '#761a1a' }}>
            <td style={{ padding: '12px' }}>{Announcment.name}</td>
            <td style={{ padding: '12px' }}>{Announcment.reason}</td>
            <td style={{ padding: '12px' }}>{new Date(Announcment.date).toLocaleDateString('en-GB')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </center>
</div>
    </div>
  );
};

export default AnnouncmentsU;