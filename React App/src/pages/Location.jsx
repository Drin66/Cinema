import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Location = () => {
  const [location, setlocation] = useState([]);

  useEffect(() => {
    const fetchAlllocation = async () => {
      try {
        const res = await axios.get("http://localhost:3002/location");
        console.log("Fetched location:", res.data);

        if (Array.isArray(res.data)) {
            setlocation(res.data);
        } else {
          console.error("API response is not an array:", res.data);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchAlllocation();
  }, []);

  const handleDelete = async (id) => {
    try {
      const confirmDelete = window.confirm("Are you sure you want to delete this location? This action cannot be undone.");
      if (confirmDelete) {
        await axios.delete(`http://localhost:3002/location/${id}`);
        setlocation((prevlocation) => prevlocation.filter(location => location.id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ padding: '1%', marginLeft:'5px' }}>
    <h1 className="h1-design" style={{textAlign: 'center', fontSize: '24px', color: 'white', marginBottom: '20px', marginLeft: '43%' }}>Location Dashboard</h1>
    
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <table style={{ width: '55%', borderCollapse: 'collapse', fontSize: '16px', fontFamily: 'Arial, sans-serif', backgroundColor: '#761a1a', border: '1px solid #ddd', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
        <thead>
          <tr style={{  backgroundColor: '#20615b', 
          color: '#fff', 
          textAlign: 'center' }}>
            <th style={{ padding: '1rem' }}>Location</th>
            <th style={{ padding: '1rem' }}>Update</th>
            <th style={{ padding: '1rem' }}>Delete</th>
          </tr>
        </thead>
        <tbody>
          {location.map(loc => (
            <tr key={loc.id} style={{ borderBottom: '1px solid #ddd' }}>
              <td style={{ padding: '1rem', paddingLeft:"15%" }}>{loc.name}</td>
              <td style={{ textAlign: 'center' }}>
                <Link to={`/updatelocation/${loc.id}`} style={{ color: '#007bff', textDecoration: 'none' }}>🔄 Update</Link>
              </td>
              <td style={{ textAlign: 'center', cursor: 'pointer', color: '#dc3545' }} onClick={() => handleDelete(loc.id)}>
                ✖️ Delete
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    
    <div style={{ textAlign: 'center', marginTop: '2rem' }}>
      <Link to="/addlocation" style={{ display: 'inline-block', padding: '0.75rem 1.5rem', borderRadius: '4px', backgroundColor: '#9ddcdc', color: '#fff', textDecoration: 'none', fontSize: '1rem' }}>
        ➕ Add New Location
      </Link>
    </div>
    
    <div style={{ textAlign: 'center', marginTop: '1rem' }}>
      <Link to="/movies" style={{ color: '#007bff', textDecoration: 'none', fontSize: '1rem' }}>
        Back to Movies
      </Link>
    </div>
  </div>
  );
};

export default Location;