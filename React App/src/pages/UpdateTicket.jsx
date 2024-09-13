import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import axios from "axios";

const UpdateTicket = () => {
  const [ticket, setTicket] = useState(null);
  const [users, setUsers] = useState([]);
  const [movies, setMovies] = useState([]);
  const [halls, setHalls] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const id = location.pathname.split("/")[2];

  useEffect(() => {
    const fetchTicket = async () => {
      try {
        const response = await axios.get("http://localhost:3002/tickets/" + id);
        setTicket(response.data);
      } catch (error) {
        console.error("Error fetching ticket:", error);
      }
    };

    const fetchData = async () => {
      try {
        const usersResponse = await axios.get("http://localhost:3002/users");
        const moviesResponse = await axios.get("http://localhost:3002/movies");
        const hallsResponse = await axios.get("http://localhost:3002/halls");
        setUsers(usersResponse.data);
        setMovies(moviesResponse.data);
        setHalls(hallsResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchTicket();
    fetchData();
  }, [id]);

  const handleChange = (e) => {
    setTicket((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleUserChange = (e) => {
    const selectedUserId = e.target.value;
    const selectedUser = users.find(user => user.id === parseInt(selectedUserId));
    if (selectedUser) {
      setTicket((prev) => ({
        ...prev,
        user_name: selectedUser.name,
        user_surname: selectedUser.surname,
      }));
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();
    console.log("Ticket data being sent:", ticket);
    try {
      const confirmUpdate = window.confirm("Are you sure you want to update this ticket?");
      if (confirmUpdate) {
        await axios.put("http://localhost:3002/tickets/" + id, ticket);
        navigate("/ticketsList");
      }
    } catch (err) {
      console.error("Error updating ticket:", err);
    }
  };

  if (!ticket) {
    return <div>Loading...</div>;
  }

  // Format the date in the local timezone, keeping both date and time intact
  const formatDate = (date) => {
    const d = new Date(date);
    const pad = (n) => n < 10 ? '0' + n : n;
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
  };

  return (
    <div className="form">
      <h1 className="h1-prod">Update Ticket</h1><br />

      <label style={{ fontWeight: 'bold' }} htmlFor='user_name'>User:</label>
      <select
        name="user_id"
        onChange={handleUserChange}
        value={users.find(user => user.name === ticket.user_name && user.surname === ticket.user_surname)?.id || ""}
        className="dropdown-style"
      >
        <option value="">Select a user</option>
        {users.map((user) => (
          <option key={user.id} value={user.id}>
            {user.name} {user.surname}
          </option>
        ))}
      </select>
      <br /><br />

      <label style={{ fontWeight: 'bold' }} htmlFor='movie_emri'>Movie:</label>
      <select
        name="movie_emri"
        onChange={handleChange}
        value={ticket.movie_emri}
        className="dropdown-style"
      >
        <option value="">Select a movie</option>
        {movies.map((movie) => (
          <option key={movie.id} value={movie.emri}>
            {movie.emri}
          </option>
        ))}
      </select>
      <br /><br />

      <label style={{ fontWeight: 'bold' }} htmlFor='hall_name'>Hall:</label>
      <select
        name="hall_name"
        onChange={handleChange}
        value={ticket.hall_name}
        className="dropdown-style"
      >
        <option value="">Select a hall</option>
        {halls.map((hall) => (
          <option key={hall.id} value={hall.name}>
            {hall.name}
          </option>
        ))}
      </select>
      <br /><br />

      <label style={{ fontWeight: 'bold' }} htmlFor='date'>Date:</label>
      <input
        type="datetime-local"
        name="date"
        value={formatDate(ticket.movie_date)}
        onChange={handleChange}
      /><br /><br />

      <button className="signupbutton" onClick={handleClick}>Update</button><br />
      <Link to="/ticketsList" style={{ color: "white" }}>Back to Tickets</Link>
    </div>
  );
};

export default UpdateTicket;
