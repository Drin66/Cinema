import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const AddTicket = () => {
  const [ticket, setTicket] = useState({
    user_name: "",
    user_surname: "",
    movie_emri: "",
    hall_name: "",
    date: "",
  });

  const [users, setUsers] = useState([]);
  const [movies, setMovies] = useState([]);
  const [halls, setHalls] = useState([]);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersResponse = await axios.get("http://localhost:3002/users");
        const moviesResponse = await axios.get("http://localhost:3002/movies");
        const hallsResponse = await axios.get("http://localhost:3002/halls");
        console.log("Movies API response:", moviesResponse.data);
        setUsers(usersResponse.data);
        setMovies(moviesResponse.data);
        setHalls(hallsResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    setTicket((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleMovieChange = (e) => {
    const selectedMovieName = e.target.value;
    const selectedMovie = movies.find(movie => movie.emri === selectedMovieName);
    if (selectedMovie) {
      const movieDateUTC = new Date(selectedMovie.date); // This is in UTC
      const movieDateLocal = new Date(movieDateUTC.getTime() - movieDateUTC.getTimezoneOffset() * 60000); // Convert to local time
      const formattedDate = movieDateLocal.toISOString().slice(0, 16); // Convert to yyyy-MM-ddThh:mm format
  
      setTicket((prev) => ({
        ...prev,
        movie_emri: selectedMovie.emri,
        date: formattedDate,
      }));
    }
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

  // const handleClick = async (e) => {
  //   e.preventDefault();
  //   console.log("Ticket data being sent:", ticket);
  //   try {
  //     await axios.post("http://localhost:3002/tickets", ticket);
  //     navigate("/ticketsList");
  //   } catch (err) {
  //     console.error("Error adding ticket:", err.response ? err.response.data : err.message);
  //     setError(true);
  //   }
  // };
  const handleClick = async (e) => {
    e.preventDefault();
    console.log("Ticket data being sent:", ticket);
  
    // Convert date to YYYY-MM-DD HH:MM:SS format
    const formattedDate = ticket.date
      ? new Date(ticket.date).toISOString().slice(0, 19).replace('T', ' ') // Convert to YYYY-MM-DD HH:MM:SS
      : '';
  
    const updatedTicket = {
      ...ticket,
      date: formattedDate
    };
  
    console.log("Updated ticket data:", updatedTicket);
  
    try {
      await axios.post("http://localhost:3002/tickets", updatedTicket);
      navigate("/ticketsList");
    } catch (err) {
      console.log(err);
      setError(true);
    }
  };
  
  
    

  return (
    <div className="form" style={{ backgroundColor: "transparent"}}>
      <h1 className="h1-prod">Book New Ticket</h1><br/>

      <label style={{fontWeight: 'bold'}} htmlFor='user_name'>User:</label>
      <select
        name="user_id"
        onChange={handleUserChange}
        className="dropdown-style"
      >
        <option value="">Select a user</option>
        {users.map((user) => (
          <option key={user.id} value={user.id}>
            {user.name} {user.surname}
          </option>
        ))}
      </select>
      <br/><br/>

      <label style={{fontWeight: 'bold'}} htmlFor='movie_emri'>Movie:</label>
      <select
        name="movie_emri"
        onChange={handleMovieChange}
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
      <br/><br/>
      
      <label style={{fontWeight: 'bold'}} htmlFor='hall_name'>Hall:</label>
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
      <br/><br/>

      <label style={{fontWeight: 'bold'}} htmlFor='date'>Date:</label>
      <input
        type="datetime-local"
        name="date"
        value={ticket.date ? ticket.date.substring(0, 16) : ''}
        onChange={handleChange}
      /><br/><br/>
      
      <button className="signupbutton" onClick={handleClick}>Add</button><br/>
      {error && "Something went wrong!"}
      <Link to="/ticketsList" style={{ color: "white"}}>Back to Tickets</Link>
    </div>
  );
};

export default AddTicket;
