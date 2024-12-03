import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Ligjeruesi = () => {
  const [ligjeruesi, setLigjeruesi] = useState([]);

  useEffect(() => {
    const fetchAllligjeruesi = async () => {
      try {
        const res = await axios.get("http://localhost:3002/ligjeruesi");
        console.log("Fetched ligjeruesi:", res.data);

        if (Array.isArray(res.data)) {
            setLigjeruesi(res.data);
        } else {
          console.error("API response is not an array:", res.data);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllligjeruesi();
  }, []);

  const handleDelete = async (id) => {
    try {
      const confirmDelete = window.confirm("Are you sure you want to delete this ligjeruesi? This action cannot be undone.");
      if (confirmDelete) {
        await axios.delete(`http://localhost:3002/ligjeruesi/${id}`);
        setLigjeruesi((prevligjeruesi) => prevligjeruesi.filter(ligjeruesi => ligjeruesi.id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ padding: '1%', marginLeft:'5px' }}>
    <h1 className="h1-design" style={{textAlign: 'center', fontSize: '24px', color: 'white', marginBottom: '20px', marginLeft: '43%' }}>Ligjeruesi Dashboard</h1>
    
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <table style={{ width: '55%', borderCollapse: 'collapse', fontSize: '16px', fontFamily: 'Arial, sans-serif', backgroundColor: '#761a1a', border: '1px solid #ddd', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
        <thead>
          <tr style={{  backgroundColor: '#20615b', 
          color: '#fff', 
          textAlign: 'center' }}>
            <th style={{ padding: '1rem' }}>Ligjeruesi</th>
            <th style={{ padding: '1rem' }}>Departament</th>
            <th style={{ padding: '1rem' }}>E-mail</th>
            <th style={{ padding: '1rem' }}>Update</th>
            <th style={{ padding: '1rem' }}>Delete</th>
          </tr>
        </thead>
        <tbody>
          {ligjeruesi.map(ligj => (
            <tr key={ligj.id} style={{ borderBottom: '1px solid #ddd' }}>
              <td style={{ padding: '1rem', paddingLeft:"15%" }}>{ligj.name}</td>
              <td style={{ padding: '1rem', paddingLeft:"15%" }}>{ligj.dept}</td>
              <td style={{ padding: '1rem', paddingLeft:"15%" }}>{ligj.email}</td>
              <td style={{ textAlign: 'center' }}>
                <Link to={`/updateLigjeruesi/${ligj.id}`} style={{ color: '#007bff', textDecoration: 'none' }}>🔄 Update</Link>
              </td>
              <td style={{ textAlign: 'center', cursor: 'pointer', color: '#dc3545' }} onClick={() => handleDelete(ligj.id)}>
                ✖️ Delete
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    
    <div style={{ textAlign: 'center', marginTop: '2rem' }}>
      <Link to="/addLigjeruesi" style={{ display: 'inline-block', padding: '0.75rem 1.5rem', borderRadius: '4px', backgroundColor: '#9ddcdc', color: '#fff', textDecoration: 'none', fontSize: '1rem' }}>
        ➕ Add New Ligjerues
      </Link>
    </div>
    
    {/* <div style={{ textAlign: 'center', marginTop: '1rem' }}>
      <Link to="/movies" style={{ color: '#007bff', textDecoration: 'none', fontSize: '1rem' }}>
        Back to Movies
      </Link>
    </div> */}
  </div>
  );
};

export default Ligjeruesi;