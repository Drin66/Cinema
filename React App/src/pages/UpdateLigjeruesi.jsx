import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from "react-router-dom";
import axios from "axios";

const UpdateLigjeruesi = () => {
    const [Ligjeruesi, setLigjeruesi] = useState(null);

    const navigate = useNavigate();
    const location = useLocation();
    const id = location.pathname.split("/")[2];

    useEffect(() => {
        const fetchLigjeruesi = async () => {
            try {
                console.log("Fetching Ligjeruesi...");
                const response = await axios.get("http://localhost:3002/ligjeruesi/" + id);
                console.log("Fetched Ligjeruesi:", response.data);
                setLigjeruesi(response.data); 
            } catch (error) {
                console.error("Error fetching Ligjeruesi:", error);
            }
        };

        fetchLigjeruesi();
    }, [id]);

    const handleChange = (e) => {
        setLigjeruesi(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleClick = async (e) => {
        e.preventDefault();
        try {
            const confirmUpdate = window.confirm("Are you sure you want to update this Ligjeruesi?");
            if (confirmUpdate) {
                await axios.put("http://localhost:3002/ligjeruesi/"+ id, Ligjeruesi);
                navigate("/ligjeruesi");
            }
        } catch (err) {
            console.error("Error updating Ligjeruesi:", err);
        }
    };

    if(!Ligjeruesi){
        return <div>Loading...</div>;
      }

    return (
        <div className='form'><br/>
            <h1 className='h1-design'>Update Ligjeruesi Below</h1><br/><br/>
            <div className='mb-3'>
                <label htmlFor='name'>Name:</label><br/>
                <input type="text" placeholder='name' value={Ligjeruesi.name} onChange={handleChange} name="name"/><br/><br/>
                <label htmlFor='name'>Dept:</label><br/>
                <input type="text" placeholder='dept' value={Ligjeruesi.dept} onChange={handleChange} name="dept"/><br/><br/>
                <label htmlFor='name'>email:</label><br/>
                <input type="text" placeholder='email' value={Ligjeruesi.email} onChange={handleChange} name="name"/><br/><br/>        
            </div>
            <button className='signupbutton' onClick={handleClick}><Link to={`/updatLigjeruesi/${Ligjeruesi.id}`} style={{color:"#fff"}}  >Update</Link></button><br />
            <td className='back'><Link to={`/ligjeruesi`}>Back</Link></td>
        </div>
    );
};

export default UpdateLigjeruesi;