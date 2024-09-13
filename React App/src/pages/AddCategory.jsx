import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddCategory = () => {
  const [category, setCategory] = useState({
    name:"",
  });

  const navigate = useNavigate()

  const handleChange = (e) =>{
    setCategory(prev=>({...prev, [e.target.name]: e.target.value}));
  };
  const handleClick = async e => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3002/categories", category);
      console.log("New category created:", response.data);
      navigate("/category");
    } catch(err) {
      console.error("Error creating category:", err);
    }
  };
  
  console.log(category);
  return (
    <div className="add-category-container" style={{padding: '40px', borderRadius: '8px', width: '400px', color: 'white', margin: 'auto', textAlign: 'center' }}>
    <div className="form" style={{ padding: '2rem', borderRadius: '8px', border: '2px solid #ccc', width: '100%', maxWidth: '400px' }}>
      <h1 className="h1-design" style={{ display: 'block', marginBottom: '10px', fontWeight: 'bold', color: 'white' }}>Add Category Below</h1>
      
      <label htmlFor="name" style={{ display: 'block', marginBottom: '0.5rem', color: 'white', fontWeight: 'bold' }}>Name:</label>
      <input
        type="text"
        id="name"
        placeholder="Enter category name"
        onChange={handleChange}
        name="name"
        style={{color:'white',fontSize:'16px', width: '100%', padding: '0.75rem', borderRadius: '4px', border: '1px solid #ddd', marginBottom: '1.5rem' }}
      />
      
      <button
        type="button"
        className="add-button"
        onClick={handleClick}
        style={{ width: '100%', padding: '12px', backgroundColor: '#93e4c1', color: '#fff', borderRadius: '5px', border: 'none', fontSize: '16px', cursor: 'pointer' }}
      >
        Add
      </button>
    </div>
  </div>
  );
};

export default AddCategory;
