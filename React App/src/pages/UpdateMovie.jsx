import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import axios from "axios";

const UpdateMovie = () => {
  const [movie, setMovie] = useState(null);
  const [categories, setCategories] = useState([]); // State to hold categories
  const navigate = useNavigate();
  const location = useLocation();
  const id = location.pathname.split("/")[2];

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        console.log("Fetching movie...");
        const response = await axios.get("http://localhost:3002/movies/" + id);
        console.log("Fetched movie:", response.data);
        setMovie(response.data); 
      } catch (error) {
        console.error("Error fetching movie:", error);
      }
    };
  
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:3002/categories"); // Adjust the URL if necessary
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchMovie();
    fetchCategories();
  }, [id]);

  const handleChange = (e) => {
    setMovie((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const confirmUpdate = window.confirm("Are you sure you want to update this movie?");
      if (confirmUpdate) {
        await axios.put("http://localhost:3002/movies/" + id, movie);
        navigate("/movies");
      }
    } catch (err) {
      console.error("Error updating movie:", err);
    }
  };

  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <div className="form">
      <h1 className="h1-design">Update the Movie</h1><br />
      
      <label style={{color: 'rgb(70, 101, 126)', fontWeight: 'bold'}} htmlFor='name'>Name:</label>
      <input
        type="text"
        placeholder="Movie name"
        name="emri"
        value={movie.emri}
        onChange={handleChange}
      /><br /><br />
      
      <label style={{color: 'rgb(70, 101, 126)', fontWeight: 'bold'}} htmlFor='foto'>Image:</label>
      <input
        type="text"
        placeholder="Movie image URL"
        name="foto"
        value={movie.foto}
        onChange={handleChange}
      /><br /><br />
      
      <label style={{color: 'rgb(70, 101, 126)', fontWeight: 'bold'}} htmlFor='category'>Category:</label>
      <select
        name="category"
        value={movie.category}
        onChange={handleChange}
        className="dropdown-style"
      >
        <option value="">Select a category</option>
        {categories.map((category) => (
          <option key={category.id} value={category.name}>
            {category.name}
          </option>
        ))}
      </select>
      <br /><br />

      <label style={{color: 'rgb(70, 101, 126)', fontWeight: 'bold'}} htmlFor='date'>Movie Time:</label>
      <input
        type="datetime-local"
        name="date"
        value={new Date(movie.date).toISOString().slice(0, 16)}
        onChange={handleChange}
      /><br /><br />
      
      <button className="signupbutton" onClick={handleClick} style={{color:"#fff"}}>Update</button><br/>
      <Link to="/movies">Back to Movies</Link>
    </div>
  );
};

export default UpdateMovie;
