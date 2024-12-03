import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:3002')
            .then(res => {
                if (res.data.valid) {
                    navigate('/');
                } else {
                    navigate('/login');
                }
            })
            .catch(err => console.log(err));
    }, [navigate]);

    function handleSubmit(event) {
        event.preventDefault();
        axios.post('http://localhost:3002/login', { email, password })
            .then(res => {
                if (res.data.login) {
                    navigate('/');
                    console.log("Congrats, you are logged in");
                } else {
                    alert("No record of this user, please input the correct combination");
                }
                console.log(res);
            })
            .catch(err => {
                console.error("Login error:", err.response?.data || err.message);
                alert("Login failed. Please check your credentials.");
            });
    }

    return (
        <div className="login-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh'}}>
        <br/>
        <div className="login-form" style={{backgroundColor:'#8a0f0f', padding: '2rem', borderRadius: '8px', border: '1px solid #ddd', width: '100%', maxWidth: '400px' }}>
          <h1 className="h1-design" style={{ textAlign: 'center', marginBottom: '2rem', color:'#97cba9', backgroundColor:'##3c1b1f'}}>Log In Below</h1>
          
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email" style={{ display: 'block', marginBottom: '0.5rem', color: '#118a7e' }}>E-mail</label>
              <input
                type="email"
                id="email"
                placeholder="Enter Email"
                className="form-control"
                onChange={e => setEmail(e.target.value)}
                style={{backgroundColor:'white', color:"#000" , width: '100%', padding: '0.75rem', borderRadius: '4px', border: '1px solid #ddd' }}
              />
            </div>
            
            <div className="mb-3" style={{ marginTop: '1rem' }}>
              <label htmlFor="password" style={{ display: 'block', marginBottom: '0.5rem', color: '#118a7e' }}>Password</label>
              <input
                type="password"
                id="password"
                placeholder="Enter Password"
                className="form-control"
                onChange={e => setPassword(e.target.value)}
                style={{backgroundColor:'white', color:"#000" , width: '100%', padding: '0.75rem', borderRadius: '4px', border: '1px solid #ddd' }}
              />
            </div>
            
            <button
              type="submit"
              className="login-button"
              style={{ display: 'block', width: '100%', padding: '0.75rem', borderRadius: '4px', border: 'none', backgroundColor: '#118a7e', color: '#fff', fontSize: '1rem', cursor: 'pointer', marginTop: '1.5rem' }}>
              Login
            </button>
          </form><br/><br/>
          <p style={{marginLeft:"18%"}}>Don't have an account? ➜ <button className='users-button' style={{backgroundColor: '#118a7a'}}><Link to="/Signup" style={{ color: "#000", textDecoration: 'none' }}>Sign Up</Link></button></p>
        </div>
      </div>
    );
}
