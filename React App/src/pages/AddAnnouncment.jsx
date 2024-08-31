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
    <div className='lgnn'>
      <div className='form'><br/>
        <h1 className='h1-design'>Add Announcment Below</h1><br/>
        <label style={{color: 'rgb(70, 101, 126)', fontWeight: 'bold'}} htmlFor='name'>Name:</label>
        <input type="text" placeholder='name' onChange={handleChange} name="name"/><br/><br/>
        {/* <label style={{color: 'rgb(70, 101, 126)', fontWeight: 'bold'}} htmlFor='reason'>Reason:</label>
        <input type="text" placeholder='reason' onChange={handleChange} name="reason"/><br/><br/> */}
        <label style={{color: 'rgb(70, 101, 126)', fontWeight: 'bold'}} htmlFor='reason'>Reason:</label>
        <textarea 
            placeholder='Please provide a detailed reason' 
            onChange={handleChange} 
            name="reason" 
            rows="4" 
            style={{width: '100%', resize: 'none'}}
        ></textarea>
        <br/><br/>
        <label style={{color: 'rgb(70, 101, 126)', fontWeight: 'bold'}} htmlFor='date'>End Date:</label>
      <input
        type="date"
        placeholder="Announcment date"
        name="date"
        onChange={handleChange}
      /><br/><br/>
        <button className='signupbutton' onClick={handleClick} >Add</button>
      </div>
    </div>
  );
};

export default AddAnnouncment;
