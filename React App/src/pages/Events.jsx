import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Events = () => {
  const [Events, setEvents] = useState([]);

  useEffect(() => {
    const fetchAllEvents = async () => {
      try {
        const res = await axios.get("http://localhost:3002/events");
        setEvents(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllEvents();
  }, []);

  const handleDelete = async (id) => {
    try {
        const confirmDelete = window.confirm("Are you sure you want to delete this Event? This action cannot be undone.");
        if (confirmDelete) {
            await axios.delete("http://localhost:3002/events/" + id);
            window.location.reload();
        }
    } catch (err) {
        console.error(err);
    }
  };

  return (
    <div>
      <h1 className='h1-design' style={{marginLeft:'35%', marginRight:'15%', textAlign: 'center'}}>Cinema Event Dashboard</h1><br /><br />
      <div className="movies-container">
        {Events.map(event => (
          <div className="movie-item" key={event.id}>
            {event.foto && <img src={`http://localhost:3002/images/${event.foto}`} alt="" className="movie-image" />}
            <h2 className="movie-title">{event.name}</h2>
            <h4 className="movie-title">{new Date(event.date).toLocaleDateString('en-GB')} - {new Date(event.endDate).toLocaleDateString('en-GB')}</h4>
            <div className="buttons">
              <button className="delete-product" onClick={() => handleDelete(event.id)} style={{marginLeft:'10%'}}>🗑️</button>
              <button className='update-product'><Link to={`/updateevent/${event.id}`}>🔄</Link></button>
            </div>
          </div>
        ))}
      </div>
      <button className='users-button' style={{marginLeft:'45%'}}><Link to="/addevent" style={{color:"#fff"}}>➕Add a new Event</Link></button><br /><br /><br />
    </div>
  );
};

export default Events;
