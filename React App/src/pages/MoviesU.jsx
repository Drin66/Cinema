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

//   const handleDelete = async (id) => {
//     try {
//         const confirmDelete = window.confirm("Are you sure you want to delete this product? This action cannot be undone.");
//         if (confirmDelete) {
//             await axios.delete("http://localhost:3002/movies/" + id);
//             window.location.reload();
//         }
//     } catch (err) {
//         console.error(err);
//     }
//   };

//   // const handleRefresh = () => {
//   //   window.location.reload(); // Reloads the current page
//   // };

//   return (
//     <div>
//       <h1 className='h1-design' style={{marginLeft:'35%', marginRight:'15%', textAlign: 'center'}}>Cinema Movies Dashboard</h1><br /><br />
//       <div className="movies-container">
//         {Movies.map(movie => (
//           <div className="movie-item" key={movie.id}>
//             {movie.foto && <img src={`http://localhost:3002/images/${movie.foto}`} alt="" className="movie-image" />}
//             <h2 className="movie-title">{movie.emri}</h2>
//             <div className="buttons">
//               <button className="delete-product" onClick={() => handleDelete(movie.id)} style={{marginLeft:'10%'}}>🗑️</button>
//               <button className='update-product'><Link to={`/updatemovie/${movie.id}`}>🔄</Link></button>
//             </div>
//           </div>
//         ))}
//       </div>
//       <button className='users-button' style={{marginLeft:'45%'}}><Link to="/addmovie" style={{color:"#fff"}}>➕Add a new Movie</Link></button><br /><br /><br />
//       <button className='users-button' style={{marginLeft:'43.5%', backgroundColor:"rgba(4, 105, 135)", border:"#fff"}}><Link to="/category" style={{color:"#fff"}}>🔠See Movie Categories</Link></button>
//     </div>
//   );
};

export default MoviesU;