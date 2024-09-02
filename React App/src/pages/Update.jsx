import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from "react-router-dom";
import axios from "axios";


const Update = () => {
  const [user, setUser] = useState(null);
  //   name:"",
  //   surname:"",
  //   email:"",
  //   username:"",
  //   password:"",
  // });

  const navigate = useNavigate();
  const location = useLocation();
  const id = location.pathname.split("/")[2];

  useEffect(() => {
    const fetchUser = async () => {
      try {
        console.log("Fetching user...");
        const response = await axios.get("http://localhost:3002/users/" + id);
        console.log("Fetched user:", response.data);
        setUser(response.data); 
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
  
    fetchUser();
  }, [id]);
  

  const handleChange = (e) =>{
    setUser(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const confirmUpdate = window.confirm("Are you sure you want to update this user?");
      if (confirmUpdate) {
        await axios.put("http://localhost:3002/users/" + id, user);
        navigate("/user");
      }
    } catch (err) {
      console.error("Error updating user:", err);
    }
  }

  if(!user){
    return <div>Loading...</div>;
  }

  return (
    <div className='form'><br/>
      <h1 className='h1-design'>Update User Below</h1><br/><br/>
      <div className='mb-3'>
        <label htmlFor='name'>Name:</label><br/>
        <input type="text" placeholder='name' value={user.name} onChange={handleChange} name="name"/><br/><br/>
        <label htmlFor='surname'>Surname:</label><br/>
        <input type="text" placeholder='surname' value={user.surname} onChange={handleChange} name="surname"/><br/><br/>
        <label htmlFor='email'>Email:</label><br/>
        <input type="text" placeholder='email' value={user.email} onChange={handleChange} name="email"/><br/><br/>
        <label htmlFor='password'>Password:</label><br/>
        <input type="text" placeholder='password' value={user.password} onChange={handleChange} name="password"/><br/><br/>
      </div>
      <button className='signupbutton' onClick={handleClick}>Update</button><br />
      <td className='back' ><Link to={`/user`}>Back</Link></td>
    </div>
  );
};

export default Update;
