import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import axios from "axios";

const UpdateLigjerata = () => {
  const [Ligjerata, setLigjerata] = useState(null);
  const [Ligjeruesi, setLigjeruesi] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const id = location.pathname.split("/")[2];

  useEffect(() => {
    const fetchLigjerata = async () => {
      try {
        const response = await axios.get(`http://localhost:3002/ligjerata/${id}`);
        setLigjerata(response.data); 
      } catch (error) {
        console.error("Error fetching Ligjerata:", error);
      }
    };
  
    const fetchLigjeruesi = async () => {
      try {
        const response = await axios.get("http://localhost:3002/ligjeruesi"); 
        setLigjeruesi(response.data);
      } catch (error) {
        console.error("Error fetching Ligjeruesi:", error);
      }
    };

    fetchLigjerata();
    fetchLigjeruesi();
  }, [id]);

  const handleChange = (e) => {
    setLigjerata((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const confirmUpdate = window.confirm("Are you sure you want to update this Ligjerata?");
      if (confirmUpdate) {
        await axios.put(`http://localhost:3002/ligjerata/${id}`, Ligjerata);
        navigate("/ligjerata");
      }
    } catch (err) {
      console.error("Error updating Ligjerata:", err);
    }
  };

  if (!Ligjerata) {
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
        value={Ligjerata.name}
        onChange={handleChange}
      /><br /><br />
      
      <label style={{color: 'rgb(70, 101, 126)', fontWeight: 'bold'}} htmlFor='prof_id'>Ligjeruesi:</label>
      <select
        name="prof_id"
        value={Ligjerata.prof_id}
        onChange={handleChange}
        className="dropdown-style"
      >
        <option value="">Select a Ligjerues</option>
        {Ligjeruesi.map((ligj) => (
          <option key={ligj.id} value={ligj.id}>
            {ligj.name}
          </option>
        ))}
      </select>
      <br /><br />
      
      <button className="signupbutton" onClick={handleClick} style={{color:"#fff"}}>Update</button><br/>
      <Link to="/ligjerata" style={{color:"#FFF"}}>Back to Ligjerata</Link>
    </div>
  );
};

export default UpdateLigjerata;
