import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Logout() {
    const navigate = useNavigate();

    const handleLogout = () => {
        axios.post('http://localhost:3002/logout')
            .then(res => {
                if (res.data.logout) {
                    localStorage.removeItem('token');
                    navigate('/login');
                    console.log("Successfully logged out");
                }
            })
            .catch(err => {
                console.error("Logout error:", err.response?.data || err.message);
            });
    };
    return (
        <button onClick={handleLogout}>
            Logout
        </button>
    );
}

export default Logout;
