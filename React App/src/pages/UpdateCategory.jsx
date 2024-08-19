import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from "react-router-dom";
import axios from "axios";

const UpdateCategory = () => {
    const [category, setCategory] = useState(null);

    const navigate = useNavigate();
    const location = useLocation();
    const id = location.pathname.split("/")[2];
    
    useEffect(() => {
        const fetchCategory = async () => {
            try {
                console.log("Fetching category...");
                const response = await axios.get("http://localhost:3002/categories/" + id);
                console.log("Fetched category:", response.data);
                setCategory(response.data); 
            } catch (error) {
                console.error("Error fetching category:", error);
            }
        };

        fetchCategory();
    }, [id]);

    const handleChange = (e) => {
        setCategory(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleClick = async (e) => {
        e.preventDefault();
        try {
            const confirmUpdate = window.confirm("Are you sure you want to update this Category?");
            if (confirmUpdate) {
                await axios.put("http://localhost:3002/categories/"+ id, category);
                navigate("/category");
            }
        } catch (err) {
            console.error("Error updating number:", err);
        }
    };

    if(!category){
        return <div>Loading...</div>;
      }

    return (
        <div className='form'><br/>
            <h1 className='h1-design'>Update Category Below</h1><br/><br/>
            <div className='mb-3'>
                <label htmlFor='name'>Name:</label><br/>
                <input type="text" placeholder='name' value={category.name} onChange={handleChange} name="name"/><br/><br/>        
            </div>
            <button className='signupbutton' onClick={handleClick}><Link to={`/updatcategory/${category.id}`} style={{color:"#fff"}}  >Update</Link></button><br />
            <td className='back'><Link to={`/category`}>Back</Link></td>
        </div>
    );
};

export default UpdateCategory;
