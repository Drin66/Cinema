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
    <div className="form">
      <h1 className="h1-prod">Add New Event</h1><br/>
      <label style={{color: 'rgb(70, 101, 126)', fontWeight: 'bold'}} htmlFor='name'>Name:</label>
      <input
        type="text"
        placeholder="Event name"
        name="name"
        onChange={handleChange}
      /><br/><br/>
      <label style={{color: 'rgb(70, 101, 126)', fontWeight: 'bold'}} htmlFor='date'>Start Date:</label>
      <input
        type="date"
        placeholder="Event start date"
        name="startDate"
        onChange={handleChange}
      /><br/><br/>
      <label style={{color: 'rgb(70, 101, 126)', fontWeight: 'bold'}} htmlFor='date'>End Date:</label>
      <input
        type="date"
        placeholder="Event end date"
        name="endDate"
        onChange={handleChange}
      /><br/><br/>
      <button className="signupbutton" onClick={handleClick}>Add</button><br/>
      {error && "Something went wrong!"}
      <Link to="/events">Back to Events</Link>
    </div>
  );
};

export default AddEvent;
