import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";
// import 'bootstrap/dist/css/bootstrap.min.css';
// import '~bootstrap/scss/bootstrap';


const Signup = () => {
  const [user, setUser] = useState({
    name:"",
    surname:"",
    email:"",
    password:"",
  });

  const navigate = useNavigate()

  const handleChange = (e) =>{
    setUser(prev=>({...prev, [e.target.name]: e.target.value}));
  };
  const handleClick = async e => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3002/users", user);
      console.log("New user created:", response.data);
      navigate("/user");
    } catch(err) {
      console.error("Error creating user:", err);
    }
  };
  

  // const handleClick = async e =>{
  //   e.preventDefault()
  //   try{
  //     await axios.post("http://localhost:3003/users", user)
  //     navigate("/")
  //   }catch(err){
  //     console.log(err)
  //   }
  // }

  console.log(user);
  return (
    <div className='lgnn'>
      <div className='form'><br/>
        <h1 className='h1-design'>Sign Up Below</h1><br/>
        <label style={{color: 'rgb(70, 101, 126)', fontWeight: 'bold'}} htmlFor='emri'>Name:</label>
        <input type="text" placeholder='name' onChange={handleChange} name="name" /><br/><br/>
        <label style={{color: 'rgb(70, 101, 126)', fontWeight: 'bold'}} htmlFor='surname'>Surname:</label>
        <input type="text" placeholder='surname' onChange={handleChange} name="surname"/><br/><br/>
        <label style={{color: 'rgb(70, 101, 126)', fontWeight: 'bold'}} htmlFor='email'>Email:</label>
        <input type="text" placeholder='email' onChange={handleChange} name="email"/><br/><br/>
        <label style={{color: 'rgb(70, 101, 126)', fontWeight: 'bold'}} htmlFor='password'>Password:</label>
        <input type="text" placeholder='password' onChange={handleChange} name="password"/><br/><br/>
        <button className='signupbutton' onClick={handleClick} >Sign up</button>
      </div>
    </div>
  );
};

export default Signup;
