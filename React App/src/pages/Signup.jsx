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
    //
    <div className='lgnn' style={{ display: 'flex',color:'white', justifyContent: 'center', alignItems: 'center', height: '90vh' }}>
  <div className='form' style={{ padding: '40px',color:'white', borderRadius: '8px', width: '400px', border: '2px solid white', color: 'white' }}>
    <h1 className='h1-design' style={{ textAlign: 'center', fontSize: '24px', color: 'white', marginBottom: '20px' }}>Sign Up Below</h1>

    <label htmlFor='name' style={{ display: 'block', marginBottom: '10px', fontWeight: 'bold', color: 'white' }}>Name:</label>
    <input type="text" placeholder='Enter your name' onChange={handleChange} name="name" style={{ width: '100%', padding: '12px', marginBottom: '20px', border: '1px solid #ccc', borderRadius: '5px', fontSize: '16px' }}/>

    <label htmlFor='surname' style={{ display: 'block', marginBottom: '10px', fontWeight: 'bold', color: 'white' }}>Surname:</label>
    <input type="text" placeholder='Enter your surname' onChange={handleChange} name="surname" style={{ width: '100%', padding: '12px', marginBottom: '20px', border: '1px solid #ccc', borderRadius: '5px', fontSize: '16px' }}/>

    <label htmlFor='email' style={{ display: 'block', marginBottom: '10px', fontWeight: 'bold', color: 'white' }}>Email:</label>
    <input type="email" placeholder='Enter your email' onChange={handleChange} name="email" style={{ width: '100%', padding: '12px', marginBottom: '20px', border: '1px solid #ccc', borderRadius: '5px', fontSize: '16px' }}/>

    <label htmlFor='password' style={{ display: 'block', marginBottom: '10px', fontWeight: 'bold', color: 'white' }}>Password:</label>
    <input type="password" placeholder='Enter your password' onChange={handleChange} name="password" style={{ width: '100%', padding: '12px', marginBottom: '20px', border: '1px solid #ccc', borderRadius: '5px', fontSize: '16px' }}/>

    <button className='signupbutton' onClick={handleClick} style={{ width: '100%', padding: '12px', backgroundColor: '#007bff', color: '#fff', borderRadius: '5px', border: 'none', fontSize: '16px', cursor: 'pointer' }}>Sign up</button>
  </div>
</div>



  );
};

export default Signup;