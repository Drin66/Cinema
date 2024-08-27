import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const AddMovie = () => {
  const [movie, setMovie] = useState({
    emri: "",
    foto: null,
    category: "",
  });
  
  const [categories, setCategories] = useState([]); // Add state to hold categories
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:3002/categories"); // Adjust the URL if necessary
        setCategories(response.data); // Assuming response.data is an array of categories
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleChange = (e) => {
    if (e.target.name === 'foto') {
      setMovie((prev) => ({ ...prev, foto: e.target.files[0] }));
    } else {
      setMovie((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
        const formData = new FormData();
        formData.append('emri', movie.emri);
        formData.append('foto', movie.foto); 
        formData.append('category', movie.category); // This was incorrectly using 'foto' instead of 'category'
        
        await axios.post("http://localhost:3002/movies", formData);
        navigate("/movies");
    } catch (err) {
        console.log(err);
        setError(true);
    }
  };

  return (
    <div className="form" style={{ backgroundColor: "transparent"}}>
      <h1 className="h1-prod">Add New Movie</h1><br/>
      
      <label style={{fontWeight: 'bold'}} htmlFor='emri'>Name:</label>
      <input
        type="text"
        placeholder="Movie name"
        name="emri"
        onChange={handleChange}
      /><br/><br/>
      
      <label style={{fontWeight: 'bold'}} htmlFor='category'>Category:</label>
      <select
        name="category"
        onChange={handleChange}
        value={movie.category}
        className="dropdown-style"
      >
        <option value="">Select a category</option>
        {categories.map((category) => (
          <option key={category.id} value={category.name}>
            {category.name}
          </option>
        ))}
      </select>
      <br/><br/>
      
      <button className="signupbutton" onClick={handleClick}>Add</button><br/>
      {error && "Something went wrong!"}
      <Link to="/movies" style={{ color: "white"}}>Back to Movies</Link>
    </div>
  );
};

export default AddMovie;
