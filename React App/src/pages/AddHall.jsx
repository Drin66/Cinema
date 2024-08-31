import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const AddHall = () => {
  const [hall, setHall] = useState({
    name: "",
    movie_name: "",
    capacity: ""
  });

  const [movies, setMovies] = useState([]); 
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get("http://localhost:3002/movies"); 
        console.log("Fetched movies:", response.data); 
        setMovies(response.data); 
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };
  
    fetchMovies();
  }, []);
  

  const handleChange = (e) => {
    setHall(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3002/Halls", hall);
      navigate("/Halls");
    } catch (err) {
      console.error("Error creating hall:", err);
      setError(true);
    }
  };

  return (
    <div className='lgnn'>
      <div className='form'><br/>
        <h1 className='h1-design'>Add Hall Below</h1><br/>
        
        <label style={{color: 'rgb(70, 101, 126)', fontWeight: 'bold'}} htmlFor='name'>Name:</label>
        <input 
          type="text" 
          placeholder='Hall name' 
          onChange={handleChange} 
          name="name" 
        /><br/><br/>
        
        <label style={{color: 'rgb(70, 101, 126)', fontWeight: 'bold'}} htmlFor='movie_name'>Movie:</label>
        <select
          name="movie_name"
          onChange={handleChange}
          value={hall.movie_name}
          className="dropdown-style"
        >
          <option value="">Select a Movie</option>
          {movies.map((movie) => (
            <option key={movie.id} value={movie.emri}>
              {movie.emri}
            </option>
          ))}
        </select>
        <br/><br/>

        <label style={{color: 'rgb(70, 101, 126)', fontWeight: 'bold'}} htmlFor='capacity'>Capacity:</label>
        <input 
          type="number" 
          placeholder='Capacity' 
          onChange={handleChange} 
          name="capacity" 
        /><br/><br/>
        
        <button className='signupbutton' onClick={handleClick}>Add</button><br/>
        {error && "Something went wrong!"}
        <Link to="/Halls" style={{ color: "white"}}>Back to Halls</Link>
      </div>
    </div>
  );
};

export default AddHall;
