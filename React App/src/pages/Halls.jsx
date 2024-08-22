import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Halls = () => {
  const [Halls, setHalls] = useState([]);

  useEffect(() => {
    const fetchAllHalls = async () => {
      try {
        const res = await axios.get("http://localhost:3002/Halls");
        console.log("Fetched Halls:", res.data);
        
        if (Array.isArray(res.data)) {
            setHalls(res.data);
        } else {
          console.error("API response is not an array:", res.data);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllHalls();
  }, []);

  const handleDelete = async (id) => {
    try {
      const confirmDelete = window.confirm("Are you sure you want to delete this Hall? This action cannot be undone.");
      if (confirmDelete) {
        await axios.delete(`http://localhost:3002/Halls/${id}`);
        setHalls((prevHalls) => prevHalls.filter(Hall => Hall.id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h1 className='h1-design' style={{ marginLeft:'42%' }} >Halls Dashboard</h1>
      <center>
        <table style={{ boxShadow: '30px 15px 50px', marginTop: '2%', fontSize: '20px', fontFamily: 'sans-serif' }} border="1">
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {Halls.map(Hall => (
              <tr key={Hall.id}>
                <td>{Hall.id}</td>
                <td>{Hall.name}</td>
                <td className='update'><Link to={`/updateHall/${Hall.id}`}>🔄Update</Link></td>
                <td className='delete' onClick={() => handleDelete(Hall.id)}>✖️Delete</td>
              </tr>
            ))}
          </tbody>
        </table>
      </center>
      <br /><br />
      <button className='users-button' style={{ marginLeft:'45%'}}><Link to="/addHall" style={{ color: "#fff"}}>➕Add new Hall</Link></button><br /><br /><br />
      <Link to="/movies" style={{ marginLeft:'47%', color: "#000"}}>Back to Movies</Link><br /><br /><br />
    </div>
  );
};

export default Halls;
