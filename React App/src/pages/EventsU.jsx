import React, { useEffect, useState } from 'react';
import axios from 'axios';

const EventsU = () => {
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


  return (
    <div>
      <h1 className='h1-design' style={{marginLeft:'35%', marginRight:'15%', textAlign: 'center'}}>Cinema Events</h1><br /><br />
      <div className="movies-container">
        {Events.map(event => (
          <div className="movie-item" key={event.id}>
            {event.foto && <img src={`http://localhost:3002/images/${event.foto}`} alt="" className="movie-image" />}
            <h2 className="movie-title">{event.name}</h2>
            <h4 className="movie-title">{new Date(event.date).toLocaleDateString('en-GB')} - {new Date(event.endDate).toLocaleDateString('en-GB')}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventsU;