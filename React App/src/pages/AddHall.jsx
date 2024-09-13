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
    <div className='lgnn' style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
    <div className='form' style={{backgroundColor: 'transparent', padding: '10px 20px', borderRadius: '8px', border: '2px solid #fff', maxWidth: '500px', margin: '0 auto' }}>
      <h1 className='h1-design' style={{ textAlign: 'center', color: '#46657E', marginBottom: '20px' }}>Add Hall Below</h1>
  
      <label style={{ color: '#46657E', fontWeight: 'bold', marginBottom: '10px', display: 'block' }} htmlFor='name'>Name:</label>
      <input 
        type="text" 
        placeholder='Hall name' 
        onChange={handleChange} 
        name="name" 
        style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc', marginBottom: '20px' }}
      />
  
      <label style={{ color: '#46657E', fontWeight: 'bold', marginBottom: '10px', display: 'block' }} htmlFor='movie_name'>Movie:</label>
      <select
        name="movie_name"
        onChange={handleChange}
        value={hall.movie_name}
        className="dropdown-style"
        style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc', marginBottom: '20px' }}
      >
        <option value="">Select a Movie</option>
        {movies.map((movie) => (
          <option key={movie.id} value={movie.emri}>
            {movie.emri}
          </option>
        ))}
      </select>
  
      <label style={{ color: '#46657E', fontWeight: 'bold', marginBottom: '10px', display: 'block' }} htmlFor='capacity'>Capacity:</label>
      <input 
        type="number" 
        placeholder='Capacity' 
        onChange={handleChange} 
        name="capacity" 
        style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc', marginBottom: '20px' }}
      />
  
      <button 
        className='signupbutton' 
        onClick={handleClick} 
        style={{ 
          width: '100%', padding: '10px', backgroundColor: '#5a9cf2', 
          color: '#fff', borderRadius: '5px', border: 'none', cursor: 'pointer', marginBottom: '10px' 
        }}
        onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#1dad9b'}
        onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#1dad9b'}
      >
        Add
      </button>
  
      {error && <p style={{ color: 'red', textAlign: 'center' }}>Something went wrong!</p>}
  
      <div style={{ textAlign: 'center', marginTop: '10px' }}>
        <Link to="/Halls" style={{ color: '#46657E', textDecoration: 'none', fontWeight: 'bold' }}>Back to Halls</Link>
      </div>
    </div>
  </div>
  

  );
};

export default AddHall;
