import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddAnnouncment = () => {
  const [announcment, setAnnouncment] = useState({
    name:"",
    reason:"",
    date:""
  });

  const navigate = useNavigate()

  const handleChange = (e) =>{
    setAnnouncment(prev=>({...prev, [e.target.name]: e.target.value}));
  };
  const handleClick = async e => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3002/Announcments", announcment);
      console.log("New Announcment created:", response.data);
      navigate("/Announcments");
    } catch(err) {
      console.error("Error creating Announcment:", err);
    }
  };
  
  console.log(announcment);
  return (
    <div className='lgnn' style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
    <div className='form' style={{ backgroundColor: 'transparent', padding: '20px', borderRadius: '8px', border: '2px solid #46817E' }}>
        <h1 className='h1-design' style={{ fontSize: '20px', color: '#46817E', textAlign: 'center', marginBottom: '20px' }}>Add Announcement Below</h1>
        
        <label style={{ color: '#46817E', fontWeight: 'bold', display: 'block', marginBottom: '5px' }} htmlFor='name'>Name:</label>
        <input 
            type="text" 
            placeholder='Enter name' 
            onChange={handleChange} 
            name="name" 
            style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #46817E', marginBottom: '20px' }}
        />

        <label style={{ color: '#46817E', fontWeight: 'bold', display: 'block', marginBottom: '5px' }} htmlFor='reason'>Reason:</label>
        <textarea 
            placeholder='Please provide a detailed reason' 
            onChange={handleChange} 
            name="reason" 
            rows="4" 
            style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #46817E', resize: 'none', marginBottom: '20px' }}
        ></textarea>

        <label style={{ color: '#46817E', fontWeight: 'bold', display: 'block', marginBottom: '5px' }} htmlFor='date'>End Date:</label>
        <input
            type="date"
            placeholder="Select end date"
            name="date"
            onChange={handleChange}
            style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #46817E', marginBottom: '20px' }}
        />

        <button 
            className='signupbutton' 
            onClick={handleClick} 
            style={{ 
                backgroundColor: '#46817E', 
                color: '#fff', 
                padding: '10px 20px', 
                borderRadius: '5px', 
                border: 'none', 
                fontSize: '16px', 
                cursor: 'pointer', 
                width: '100%' 
            }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#5fa4a3'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#46817E'}
        >
            Add
        </button>
    </div>
</div>

  );
};

export default AddAnnouncment;
