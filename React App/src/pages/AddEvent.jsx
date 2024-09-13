import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const AddEvent = () => {
  const [event, setEvent] = useState({});
  
  const [error, setError] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    if (e.target.name === 'foto') {
      setEvent((prev) => ({ ...prev, foto: e.target.files[0] }));
    } else {
      setEvent((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
        const formData = new FormData();
        formData.append('name', event.name);
        formData.append('foto', event.foto);
        formData.append('date', event.startDate);
        formData.append('endDate', event.endDate);
        
        await axios.post("http://localhost:3002/events", formData);
        navigate("/events");
    } catch (err) {
        console.log(err);
        setError(true);
    }
  };

  return (
    <div className="form" style={{ padding: '40px', borderRadius: '8px', width: '400px', border: '2px solid white', color: 'white', margin: 'auto', textAlign: 'center' }}>
    <h1 className="h1-prod" style={{background:'#20615b', padding: '7px',textAlign: 'center', fontSize: '24px', color: 'white',  marginBottom: '20px', border: '3px solid white', borderRadius: '8px' }}>Add New Event</h1><br/>
  
    <label htmlFor='name' style={{ display: 'block', marginBottom: '10px', fontWeight: 'bold', color: 'white' }}>Name:</label>
    <input
      type="text"
      placeholder="Event name"
      name="name"
      onChange={handleChange}
      style={{ width: '100%', padding: '12px', marginBottom: '20px', border: '1px solid #ccc', borderRadius: '5px', fontSize: '16px' }}
    /><br/><br/>
    
    <label htmlFor='startDate' style={{ display: 'block', marginBottom: '10px', fontWeight: 'bold', color: 'white' }}>Start Date:</label>
    <input
      type="date"
      placeholder="Event start date"
      name="startDate"
      onChange={handleChange}
      style={{ width: '100%', padding: '12px', marginBottom: '20px', border: '1px solid #ccc', borderRadius: '5px', fontSize: '16px' }}
    /><br/><br/>
    
    <label htmlFor='endDate' style={{ display: 'block', marginBottom: '10px', fontWeight: 'bold', color: 'white' }}>End Date:</label>
    <input
      type="date"
      placeholder="Event end date"
      name="endDate"
      onChange={handleChange}
      style={{ width: '100%', padding: '12px', marginBottom: '20px', border: '1px solid #ccc', borderRadius: '5px', fontSize: '16px' }}
    /><br/><br/>
    
    <button className="signupbutton" onClick={handleClick} style={{ width: '100%', padding: '12px', backgroundColor: '#9ddcdc', color: '#fff', borderRadius: '5px', border: 'none', fontSize: '16px', cursor: 'pointer' }}>Add</button><br/>
    
    {error && <p style={{ color: 'red', marginTop: '10px' }}>Something went wrong!</p>}
    
    <Link to="/events" style={{ color:'#9ddcdc', display: 'block', marginTop: '20px', color: 'white', textDecoration: 'underline' }}>Back to Events</Link>
  </div>
  
  );
};

export default AddEvent;
