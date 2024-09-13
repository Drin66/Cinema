import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import {FaSignInAlt} from "react-icons/fa";

function Dashboard() {
    const [name, setName] = useState('')
    const navigate = useNavigate()

    axios.defaults.withCredentials = true;
    useEffect(() => {
        axios.get('http://localhost:3002')
        .then( res => {
            if(res.data.valid){
                setName(res.data.name);
            } else{
                navigate('/login')
            }
        })
        .catch(err => console.log(err))
    })

return (
    <div style={{marginLeft:"30%"}}>
        <h1>Welcome to our Cinnema, {name}</h1> <br />
        Select different options from the navigation bars<br /><br /><br />
        <p>Select Movies from the navigation Bar to see playing Movies</p><br/><br/><br/>
        <button className='users-button' style={{ marginLeft: '10%' }}><Link to="/Login" style={{ color: "#fff"}}><FaSignInAlt/> Log In in your account</Link></button><br /><br /><br />
    </div>
);
}


export default Dashboard;