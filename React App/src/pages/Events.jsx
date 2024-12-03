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
              <button className='update-product'><Link to={`/updateEvent/${event.id}`}>🔄</Link></button>
            </div>
          </div>
        ))}
      </div>
      
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
  <button className='users-button' style={{ 
    padding: '12px 24px', 
    backgroundColor: '#9ddcdc', 
    border: 'none', 
    color: '#fff', 
    borderRadius: '5px', 
    fontSize: '16px', 
    cursor: 'pointer', 
    display: 'inline-block',
    textAlign: 'center'
  }}>
    <Link to="/addevent" style={{ 
      textDecoration: 'none', 
      color: '#fff', 
      fontWeight: 'bold' 
    }}>
      ➕ Add a New Event
    </Link>
  </button>
</div>

    </div>
  );
};

export default Events;