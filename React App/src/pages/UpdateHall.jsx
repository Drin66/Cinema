import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import axios from "axios";

const UpdateHall = () => {
  const [hall, setHall] = useState(null);
  const [movies, setMovies] = useState([]); // State to hold movies
  const navigate = useNavigate();
  const location = useLocation();
  const id = location.pathname.split("/")[2];

  useEffect(() => {
    const fetchHall = async () => {
      try {
        const response = await axios.get(`http://localhost:3002/Halls/${id}`);
        setHall(response.data); 
      } catch (error) {
        console.error("Error fetching hall:", error);
      }
    };
  
    const fetchMovies = async () => {
      try {
        const response = await axios.get("http://localhost:3002/movies"); 
        setMovies(response.data);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchHall();
    fetchMovies();
  }, [id]);

  const handleChange = (e) => {
    setHall((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const confirmUpdate = window.confirm("Are you sure you want to update this hall?");
      if (confirmUpdate) {
        await axios.put(`http://localhost:3002/Halls/${id}`, hall);
        navigate("/Halls");
      }
    } catch (err) {
      console.error("Error updating hall:", err);
    }
  };

  if (!hall) {
    return <div>Loading...</div>;
  }

  return (
    <div className="form">
      <h1 className="h1-design">Update the Hall</h1><br />
      
      <label style={{color: 'rgb(70, 101, 126)', fontWeight: 'bold'}} htmlFor='name'>Name:</label>
      <input
        type="text"
        placeholder="Hall name"
        name="name"
        value={hall.name}
        onChange={handleChange}
      /><br /><br />
      
      <label style={{color: 'rgb(70, 101, 126)', fontWeight: 'bold'}} htmlFor='movie_name'>Movie:</label>
      <select
        name="movie_name"
        value={hall.movie_name}
        onChange={handleChange}
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

      <label style={{color: 'rgb(70, 101, 126)', fontWeight: 'bold'}} htmlFor='capacity'>Capacity:</label>
      <input
        type="number"
        placeholder="capacity"
        name="capacity"
        value={hall.capacity}
        onChange={handleChange}
      /><br /><br />
      
      <button className="signupbutton" onClick={handleClick} style={{color:"#fff"}}>Update</button><br/>
      <Link to="/Halls" style={{color:"#FFF"}}>Back to Halls</Link>
    </div>
  );
};

export default UpdateHall;
