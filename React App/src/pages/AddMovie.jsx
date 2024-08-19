import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const AddMovie = () => {
  const [movie, setMovie] = useState({
    emri: "",
    pershkrimi: "",
    cmimi: null,
    foto: null, 
  });
  
  const [error, setError] = useState(false);

  const navigate = useNavigate();

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
        
        await axios.post("http://localhost:3002/movies", formData);
        navigate("/movies");
    } catch (err) {
        console.log(err);
        setError(true);
    }
  };

  return (
    <div className="form">
      <h1 className="h1-prod">Add New Movie</h1><br/>
      <label style={{color: 'rgb(70, 101, 126)', fontWeight: 'bold'}} htmlFor='emri'>Name:</label>
      <input
        type="text"
        placeholder="Movie name"
        name="emri"
        onChange={handleChange}
      /><br/><br/>
      <button className="signupbutton" onClick={handleClick}>Add</button><br/>
      {error && "Something went wrong!"}
      <Link to="/movies">Back to Movies</Link>
    </div>
  );
};

export default AddMovie;
