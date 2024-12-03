import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddLigjeruesi = () => {
  const [Ligjeruesi, setLigjeruesi] = useState({
    name:"",
    dept:"",
    email:"",
  });

  const navigate = useNavigate()

  const handleChange = (e) =>{
    setLigjeruesi(prev=>({...prev, [e.target.name]: e.target.value}));
  };
  const handleClick = async e => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3002/ligjeruesi", Ligjeruesi);
      console.log("New Ligjeruesi created:", response.data);
      navigate("/Ligjeruesi");
    } catch(err) {
      console.error("Error creating Ligjeruesi:", err);
    }
  };

  console.log(Ligjeruesi);
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
    <div className="form" style={{ padding: '2rem', borderRadius: '8px', border: '2px solid #ccc', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', width: '100%', maxWidth: '400px' }}>
      <h1 className="h1-design" style={{ textAlign: 'center', marginBottom: '2rem', color: 'white', backgroundColor:'#347474' }}>Add Ligjeruesi Below</h1>
      
      <label htmlFor="name" style={{fontSize:'20px', display: 'block', marginBottom: '0.5rem', color: 'rgb(70, 101, 126)', fontWeight: 'bold' }}>Name:</label>
      <input
        type="text"
        id="name"
        placeholder="Enter Ligjeruesi name"
        onChange={handleChange}
        name="name"
        style={{fontSize:'20px', width: '100%', padding: '0.75rem', borderRadius: '4px', border: '1px solid #ddd', marginBottom: '1.5rem' }}
      />

    <label htmlFor="name" style={{fontSize:'20px', display: 'block', marginBottom: '0.5rem', color: 'rgb(70, 101, 126)', fontWeight: 'bold' }}>dept:</label>
      <input
        type="text"
        id="dept"
        placeholder="Enter dept name"
        onChange={handleChange}
        name="dept"
        style={{fontSize:'20px', width: '100%', padding: '0.75rem', borderRadius: '4px', border: '1px solid #ddd', marginBottom: '1.5rem' }}
      />

    <label htmlFor="name" style={{fontSize:'20px', display: 'block', marginBottom: '0.5rem', color: 'rgb(70, 101, 126)', fontWeight: 'bold' }}>Email:</label>
      <input
        type="text"
        id="email"
        placeholder="Enter Ligjeruesi email"
        onChange={handleChange}
        name="email"
        style={{fontSize:'20px', width: '100%', padding: '0.75rem', borderRadius: '4px', border: '1px solid #ddd', marginBottom: '1.5rem' }}
      />
      
      <button
        type="button"
        onClick={handleClick}
        style={{ width: '100%', padding: '12px', backgroundColor: '#93e4c1', color: '#fff', borderRadius: '5px', border: 'none', fontSize: '16px', cursor: 'pointer' }}
      >
        Add
      </button>
    </div>
  </div>
  );
};

export default AddLigjeruesi;