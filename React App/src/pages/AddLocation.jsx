import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddLocation = () => {
  const [Location, setLocation] = useState({
    name:"",
  });

  const navigate = useNavigate()

  const handleChange = (e) =>{
    setLocation(prev=>({...prev, [e.target.name]: e.target.value}));
  };
  const handleClick = async e => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3002/Location", Location);
      console.log("New category created:", response.data);
      navigate("/Location");
    } catch(err) {
      console.error("Error creating Location:", err);
    }
  };
  
  console.log(Location);
  return (
    <div className='lgnn'>
      <div className='form'><br/>
        <h1 className='h1-design'>Add Location Below</h1><br/>
        <label style={{color: 'rgb(70, 101, 126)', fontWeight: 'bold'}} htmlFor='name'>Name:</label>
        <input type="text" placeholder='name' onChange={handleChange} name="name"/><br/><br/>
        <button className='signupbutton' onClick={handleClick} >Add</button>
      </div>
    </div>
  );
};

export default AddLocation;
