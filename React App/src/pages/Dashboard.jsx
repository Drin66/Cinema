import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { useNavigate} from 'react-router-dom';
// import {FaSignInAlt} from "react-icons/fa";
import Admin from './Admin';
import Visitor from './Visitor';

function Dashboard() {
    const [role, setRole] = useState('')
    const navigate = useNavigate()

    axios.defaults.withCredentials = true;
    useEffect(() => {
        axios.get('http://localhost:3002')
        .then( res => {
            if(res.data.valid){
                setRole(res.data.role);
            } else{
                navigate('/login')
            }
        })
        .catch(err => console.log(err))
    })

return (
    <div style={{marginLeft:"30%"}}>
        {role === "admin" && <Admin />}
        {role === "visitor" && <Visitor/> }
    </div>
);
}


export default Dashboard;