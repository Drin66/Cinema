import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from "react-router-dom";
import axios from "axios";

const UpdateAnnouncment = () => {
    const [announcment, setAnnouncment] = useState(null);

    const navigate = useNavigate();
    const location = useLocation();
    const id = location.pathname.split("/")[2];
    
    useEffect(() => {
        const fetchAnnouncment = async () => {
            try {
                console.log("Fetching Announcment...");
                const response = await axios.get("http://localhost:3002/Announcments/" + id);
                console.log("Fetched announcment:", response.data);
                setAnnouncment(response.data); 
            } catch (error) {
                console.error("Error fetching announcment:", error);
            }
        };

        fetchAnnouncment();
    }, [id]);

    const handleChange = (e) => {
        setAnnouncment(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleClick = async (e) => {
        e.preventDefault();
        try {
            const confirmUpdate = window.confirm("Are you sure you want to update this Announcment?");
            if (confirmUpdate) {
                await axios.put("http://localhost:3002/Announcments/"+ id, announcment);
                navigate("/announcments");
            }
        } catch (err) {
            console.error("Error updating announcment:", err);
        }
    };

    if(!announcment){
        return <div>Loading...</div>;
    }

    return (
        <div className='form'><br/>
            <h1 className='h1-design'>Update Announcment Below</h1><br/><br/>
            <div className='mb-3'>
                <label htmlFor='name'>Name:</label><br/>
                <input type="text" placeholder='name' value={announcment.name} onChange={handleChange} name="name"/><br/><br/>
                <label htmlFor='reason'>Reason:</label><br/>
                <input type="text" placeholder='reason' value={announcment.reason} onChange={handleChange} name="reason"/><br/><br/> 
                <label htmlFor='date'>Date:</label><br/>
                <input 
                    type="date" 
                    placeholder="date" 
                    name="date" 
                    value={announcment.date.split("T")[0]} 
                    onChange={handleChange}
                /><br /><br />       
            </div>
            <br /><br />
            <button className='signupbutton' onClick={handleClick} style={{color:"#fff"}}>Update</button><br />
            <td className='back'><Link to={`/announcments`}>Back</Link></td>
        </div>
    );
};

export default UpdateAnnouncment;