import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const AddLigjerata = () => {
  const [Ligjerata, setLigjerata] = useState({
    name: "",
    prof_id: ""
  });

  const [Ligjeruesi, setLigjeruesi] = useState([]); 
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLigjeruesi = async () => {
      try {
        const response = await axios.get("http://localhost:3002/ligjeruesi"); 
        console.log("Fetched Ligjeruesi:", response.data); 
        setLigjeruesi(response.data); 
      } catch (error) {
        console.error("Error fetching Ligjeruesi:", error);
      }
    };
  
    fetchLigjeruesi();
  }, []);
  

  const handleChange = (e) => {
    setLigjerata(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3002/ligjerata", Ligjerata);
      navigate("/ligjerata");
    } catch (err) {
      console.error("Error creating Ligjerata:", err);
      setError(true);
    }
  };

  return (
    <div className='lgnn' style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
    <div className='form' style={{backgroundColor: 'transparent', padding: '10px 20px', borderRadius: '8px', border: '2px solid #fff', maxWidth: '500px', margin: '0 auto' }}>
      <h1 className='h1-design' style={{ textAlign: 'center', color: '#46657E', marginBottom: '20px' }}>Add Ligjerata Below</h1>
  
      <label style={{ color: '#46657E', fontWeight: 'bold', marginBottom: '10px', display: 'block' }} htmlFor='name'>Name:</label>
      <input 
        type="text" 
        placeholder='name' 
        onChange={handleChange} 
        name="name" 
        style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc', marginBottom: '20px' }}
      />
  
      <label style={{ color: '#46657E', fontWeight: 'bold', marginBottom: '10px', display: 'block' }} htmlFor='prof_id'>Prof:</label>
      <select
        name="prof_id"
        onChange={handleChange}
        value={Ligjerata.prof_id}
        className="dropdown-style"
        style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc', marginBottom: '20px' }}
      >
        <option value="">Select a Ligjerues</option>
        {Ligjeruesi.map((ligj) => (
          <option key={ligj.id} value={ligj.id}>
            {ligj.name}
          </option>
        ))}
      </select>
  
      <button 
        className='signupbutton' 
        onClick={handleClick} 
        style={{ 
          width: '100%', padding: '10px', backgroundColor: '#5a9cf2', 
          color: '#fff', borderRadius: '5px', border: 'none', cursor: 'pointer', marginBottom: '10px' 
        }}
        onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#1dad9b'}
        onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#1dad9b'}
      >
        Add
      </button>
  
      {error && <p style={{ color: 'red', textAlign: 'center' }}>Something went wrong!</p>}
  
      <div style={{ textAlign: 'center', marginTop: '10px' }}>
        <Link to="/ligjerata" style={{ color: '#46657E', textDecoration: 'none', fontWeight: 'bold' }}>Back to Ligjerata</Link>
      </div>
    </div>
  </div>
  

  );
};

export default AddLigjerata;
