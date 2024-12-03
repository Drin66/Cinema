import React, { useEffect, useState } from 'react';
import axios from 'axios';

const LocationU = () => {
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

  return (
    <div style={{ padding: '1%', marginLeft:'5px' }}>
    <h1 className="h1-design" style={{textAlign: 'center', fontSize: '24px', color: 'white', marginBottom: '20px', marginLeft: '43%' }}>Cinemas Locations</h1>
    
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <table style={{ width: 'auto', padding:"50%" , borderCollapse: 'collapse', fontSize: '16px', fontFamily: 'Arial, sans-serif', backgroundColor: '#761a1a', border: '1px solid #ddd', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
        <thead>
          <tr style={{  backgroundColor: '#20615b', 
          color: '#fff', 
          textAlign: 'center', padding:"25%" }}>
            <th style={{ padding: '1rem' }}>Location 📍</th>
          </tr>
        </thead>
        <tbody>
          {location.map(loc => (
            <tr key={loc.id} style={{ borderBottom: '1px solid #ddd' }}>
              <td style={{ padding: '1rem', padding:"18%"}}>{loc.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
  );
};

export default LocationU;