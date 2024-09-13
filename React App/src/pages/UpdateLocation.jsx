import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from "react-router-dom";
import axios from "axios";

const UpdateLocation = () => {
    const [Location, setLocation] = useState(null);

    const navigate = useNavigate();
    const location = useLocation();
    const id = location.pathname.split("/")[2];

    useEffect(() => {
        const fetchLocation = async () => {
            try {
                console.log("Fetching Location...");
                const response = await axios.get("http://localhost:3002/Location/" + id);
                console.log("Fetched Location:", response.data);
                setLocation(response.data); 
            } catch (error) {
                console.error("Error fetching Location:", error);
            }
        };

        fetchLocation();
    }, [id]);

    const handleChange = (e) => {
        setLocation(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleClick = async (e) => {
        e.preventDefault();
        try {
            const confirmUpdate = window.confirm("Are you sure you want to update this Location?");
            if (confirmUpdate) {
                await axios.put("http://localhost:3002/Location/"+ id, Location);
                navigate("/Location");
            }
        } catch (err) {
            console.error("Error updating Location:", err);
        }
    };

    if(!Location){
        return <div>Loading...</div>;
      }

    return (
        <div className='form'><br/>
            <h1 className='h1-design'>Update Location Below</h1><br/><br/>
            <div className='mb-3'>
                <label htmlFor='name'>Name:</label><br/>
                <input type="text" placeholder='name' value={Location.name} onChange={handleChange} name="name"/><br/><br/>        
            </div>
            <button className='signupbutton' onClick={handleClick}><Link to={`/updatLocation/${Location.id}`} style={{color:"#fff"}}  >Update</Link></button><br />
            <td className='back'><Link to={`/Location`}>Back</Link></td>
        </div>
    );
};

export default UpdateLocation;