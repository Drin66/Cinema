import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const MoviesU = () => {
  const [Movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchAllMovies = async () => {
      try {
        const res = await axios.get("http://localhost:3002/movies");
        setMovies(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllMovies();
  }, []);

  return (
    <div>
      <h1 className='h1-design' style={{marginLeft:'45%', marginRight:'15%', textAlign: 'center'}}>Movies</h1><br /><br />
      <div className="movies-container">
        {Movies.map(movie => (
          <div className="movie-item" key={movie.id}>
            {movie.foto && (<img src={`http://localhost:3002/images/${movie.foto}`} alt="" className="movie-image" style={{ cursor: 'pointer' }} />)}
            <h2 className="movie-title">{movie.emri}</h2>
            <p className="movie-title" style={{fontSize:"15px"}}>{movie.category}</p>
            <td>{new Date(movie.date).toLocaleString('en-GB', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            })}</td>
          </div>
        ))}
      </div>
      
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
</div>
    </div>
  );
};

export default MoviesU;
