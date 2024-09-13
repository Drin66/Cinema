import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import axios from "axios";

const UpdateEvent = () => {
  const [event, setEvent] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const id = location.pathname.split("/")[2];

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        console.log("Fetching event...");
        const response = await axios.get("http://localhost:3002/events/" + id);
        console.log("Fetched event:", response.data);
        setEvent(response.data); 

        const formattedEvent = {
            ...response.data,
            date: response.data.date.slice(0, 10), 
            endDate: response.data.endDate.slice(0, 10) 
          };
    
          setEvent(formattedEvent);
      } catch (error) {
        console.error("Error fetching event:", error);
      }
    };
  
    fetchEvent();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const formattedValue = name === 'date' || name === 'endDate' ? value : value;
    setEvent((prev) => ({ ...prev, [name]: formattedValue }));
  };
  

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const confirmUpdate = window.confirm("Are you sure you want to update this event?");
      if (confirmUpdate) {
        await axios.put("http://localhost:3002/events/" + id, event);
        navigate("/events");
      }
    } catch (err) {
      console.error("Error updating event:", err);
    }
  };

  if (!event) {
    return <div>Loading...</div>;
  }

  // return (
    // <div className="form">
    //   <h1 className="h1-design">Update the Event</h1><br />
    //   <label style={{color: 'rgb(70, 101, 126)', fontWeight: 'bold'}} htmlFor='name'>Name:</label>
    //   <input
    //     type="text"
    //     placeholder="Product name"
    //     name="name"
    //     value={event.name}
    //     onChange={handleChange}
    //   /><br /><br />
    //   <label style={{color: 'rgb(70, 101, 126)', fontWeight: 'bold'}} htmlFor='foto'>Image:</label>
    //   <input
    //     type="text"
    //     placeholder="Event image URL"
    //     name="foto"
    //     value={event.foto}
    //     onChange={handleChange}
    //   /><br /><br />
    //   <label style={{color: 'rgb(70, 101, 126)', fontWeight: 'bold'}} htmlFor='date'>Start Date:</label>
    //   <input
    //     type="date"
    //     placeholder="date"
    //     name="date"
    //     value={event.date}
    //     onChange={handleChange}
    //   /><br /><br />
    //   <label style={{color: 'rgb(70, 101, 126)', fontWeight: 'bold'}} htmlFor='date'>End Date:</label>
    //   <input
    //     type="date"
    //     placeholder="date"
    //     name="endDate"
    //     value={event.endDate}
    //     onChange={handleChange}
    //   /><br /><br />
    //   <button className="signupbutton" onClick={handleClick} style={{color:"#fff"}}>Update</button><br/>
    //   <Link to="/events">Back to Events</Link>
    // </div>
  // );
};

export default UpdateEvent;
