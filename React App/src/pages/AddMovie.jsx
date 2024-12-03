import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const AddMovie = () => {
  const [movie, setMovie] = useState({
    emri: "",
    foto: null,
    category: "",
  });
  
  const [categories, setCategories] = useState([]); 
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:3002/categories");
        setCategories(response.data);
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
        formData.append('category', movie.category);
        
        await axios.post("http://localhost:3002/movies", formData);
        navigate("/movies");
    } catch (err) {
        console.log(err);
        setError(true);
    }
  };

  return (
<div className="form" style={{  backgroundColor: 'transparent', padding: '10px 20px', borderRadius: '8px', border: '2px solid #fff', maxWidth: '500px', margin: '0 auto'  }}>
  <h1 className="h1-prod" style={{background:'#20615b', padding: '7px',textAlign: 'center', fontSize: '24px', color: 'white',  marginBottom: '20px', border: '3px solid white', borderRadius: '8px' }}>Add New Movie</h1>
  
  <label style={{ fontWeight: 'bold', color: 'white' }} htmlFor='emri'>Name:</label>
  <input
    type="text"
    placeholder="Movie name"
    name="emri"
    onChange={handleChange}
    style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc', marginBottom: '20px' }}
  />
  
  <label style={{ fontWeight: 'bold', color: 'white' }} htmlFor='category'>Category:</label>
  <select
    name="category"
    onChange={handleChange}
    value={movie.category}
    className="dropdown-style"
    style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc', marginBottom: '20px' }}
  >
    <option value="">Select a category</option>
    {categories.map((category) => (
      <option key={category.id} value={category.name}>
        {category.name}
      </option>
    ))}
  </select>
  
  <label style={{ fontWeight: 'bold', color: 'white' }} htmlFor='date'>Movie Time:</label>
  <input
    type="datetime-local"
    name="date"
    value={movie.date ? new Date(movie.date).toISOString().slice(0, 16) : ''}
    onChange={handleChange}
    style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc', marginBottom: '20px' }}
  />
  
  <button className="signupbutton" onClick={handleClick} style={{ 
    backgroundColor: '#49beb7', 
    color: '#fff', 
    padding: '10px 20px', 
    borderRadius: '5px', 
    border: 'none', 
    fontSize: '16px', 
    cursor: 'pointer', 
    width: '100%', 
    transition: 'background-color 0.3s ease'
  }}
  onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#1dad9b'}
  onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#1dad9b'}
  >
    Add
  </button>
  
  {error && <p style={{ color: 'red', textAlign: 'center', marginTop: '10px' }}>Something went wrong!</p>}
  
  <div style={{ textAlign: 'center', marginTop: '20px' }}>
    <Link to="/movies" style={{ color: '#35bcbf', textDecoration: 'none', fontSize: '16px' }}>Back to Movies</Link>
  </div>
</div>

  );
};

export default AddMovie;
