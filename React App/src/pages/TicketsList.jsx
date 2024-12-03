import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const TicketList = () => {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    const fetchAllTickets = async () => {
      try {
        const res = await axios.get("http://localhost:3002/tickets");
        setTickets(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllTickets();
  }, []);

  const handleDelete = async (id) => {
    try {
      const confirmDelete = window.confirm("Are you sure you want to delete this ticket? This action cannot be undone.");
      if (confirmDelete) {
        await axios.delete("http://localhost:3002/tickets/" + id);
        window.location.reload();
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h1 className='h1-design' style={{marginLeft:'35%', marginRight:'15%', textAlign: 'center'}}>Cinema Tickets Dashboard</h1><br /><br />
      <div className="tickets-container" style={{padding:"10px"}}>
        {tickets.map(ticket => (
          <div className="ticket-item" key={ticket.id} style={{padding:"10px"}}>
            <h1 className="ticket-title">Ticket No: {ticket.id}</h1>
            <h2 className="ticket-title">{ticket.user_name} {ticket.user_surname}</h2>
            <p className="ticket-movie" style={{fontSize:"15px"}}>Movie: {ticket.movie_emri}</p>
            <p className="ticket-hall" style={{fontSize:"15px"}}>Hall: {ticket.hall_name}</p>
            <p className="ticket-date" style={{fontSize:"15px"}}>Date: {new Date(ticket.movie_date).toLocaleString()}</p>
            <div className="buttons">
              <button className="delete-movie" onClick={() => handleDelete(ticket.id)} style={{marginLeft:'32%'}}>🗑️</button>
              <button className='update-movie'><Link to={`/updateticket/${ticket.id}`}>🔄</Link></button>
            </div>
          </div>
        ))}
      </div>
      <br /><br />


      {/* <button className='users-button' 
      style={{
        padding: "12px 24px",
        backgroundColor: "#3baea0", 
        color: "#fff",
        borderRadius: "8px", 
        border: "none",
        fontSize: "16px",
        cursor: "pointer",
        transition: "background-color 0.3s ease, transform 0.3s ease",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        marginLeft:"750px"
        
        
        }}>
        <Link to="/addticket" style={{color:"#fff"}}>➕Add a new Ticket</Link></button><br /><br /><br /> */}
    
    
    
    </div>
  );
};

export default TicketList;
