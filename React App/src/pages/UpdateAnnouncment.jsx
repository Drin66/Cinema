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
        // <div className='form'><br/>
        //     <h1 className='h1-design'>Update Announcment Below</h1><br/><br/>
        //     <div className='mb-3'>
        //         <label htmlFor='name'>Name:</label><br/>
        //         <input type="text" placeholder='name' value={announcment.name} onChange={handleChange} name="name"/><br/><br/>
        //         <label htmlFor='reason'>Reason:</label><br/>
        //         <input type="text" placeholder='reason' value={announcment.reason} onChange={handleChange} name="reason"/><br/><br/> 
        //         <label htmlFor='date'>Date:</label><br/>
        //         <input 
        //             type="date" 
        //             placeholder="date" 
        //             name="date" 
        //             value={announcment.date.split("T")[0]} 
        //             onChange={handleChange}
        //         /><br /><br />       
        //     </div>
        //     <br /><br />
        //     <button className='signupbutton' onClick={handleClick} style={{color:"#fff"}}>Update</button><br />
        //     <td className='back'><Link to={`/announcments`}>Back</Link></td>
        // </div>

 
//     <div className='form' style={{ backgroundColor: 'transparent', padding: '20px', borderRadius: '8px' }}>
//     <h1 className='h1-design' style={{fontSize:'20px', color: '#fff', textAlign: 'center' }}>Update Announcement Below</h1>
//     <div className='mb-3'>
//         <label htmlFor='name' style={{color: '#fff' }}>Name:</label><br/>
//         <input 
//             type="text" 
//             placeholder='name' 
//             value={announcment.name} 
//             onChange={handleChange} 
//             name="name" 
//             style={{ width: '100%', padding: '10px', borderRadius: '5px', backgroundColor: '#333', color: '#fff', border: 'none' }}
//         /><br/><br/>

//         <label htmlFor='reason' style={{ color: '#fff' }}>Reason:</label><br/>
//         <input 
//             type="text" 
//             placeholder='reason' 
//             value={announcment.reason} 
//             onChange={handleChange} 
//             name="reason" 
//             style={{ width: '100%', padding: '10px', borderRadius: '5px', backgroundColor: '#333', color: '#fff', border: 'none' }}
//         /><br/><br/>

//         <label htmlFor='date' style={{ color: '#fff' }}>Date:</label><br/>
//         <input 
//             type="date" 
//             placeholder="date" 
//             name="date" 
//             value={announcment.date.split("T")[0]} 
//             onChange={handleChange} 
//             style={{ width: '100%', padding: '10px', borderRadius: '5px', backgroundColor: '#333', color: '#fff', border: 'none' }}
//         /><br/><br/>
//     </div>

//     <button 
//         className='signupbutton' 
//         onClick={handleClick} 
//         style={{ 
//             backgroundColor: '#5a9cf2', 
//             color: "#fff", 
//             padding: '10px 20px', 
//             borderRadius: '5px', 
//             border: 'none', 
//             fontSize: '14px', 
//             cursor: 'pointer' 
//         }}
//         onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#7bb3f9'}
//         onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#5a9cf2'}
//     >
//         Update
//     </button><br/><br/>

//     <button 
//         className='backbutton' 
//         style={{ 
//             backgroundColor: '#45d274', 
//             color: "#fff", 
//             padding: '10px 20px', 
//             borderRadius: '5px', 
//             border: 'none', 
//             fontSize: '16px', 
//             cursor: 'pointer' 
//         }}
//         onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#6fe89b'}
//         onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#45d274'}
//     >
//         <Link to={`/announcments`} style={{ color: '#fff', textDecoration: 'none' }}>Back</Link>
//     </button>
// </div>

<div className='form' style={{ backgroundColor: 'transparent', padding: '10px 20px', borderRadius: '8px', border: '2px solid #fff', maxWidth: '500px', margin: '0 auto' }}>
    <h1 className='h1-design' style={{fontSize:'20px', color: '#fff', textAlign: 'center' }}>Update Announcement Below</h1>
    <div className='mb-3'>
        <label htmlFor='name' style={{color: '#fff' }}>Name:</label><br/>
        <input 
            type="text" 
            placeholder='name' 
            value={announcment.name} 
            onChange={handleChange} 
            name="name" 
            style={{ width: '100%', padding: '8px', borderRadius: '5px', backgroundColor: '#333', color: '#fff', border: 'none', border: '2px solid #fff' }}
        /><br/><br/>

        <label htmlFor='reason' style={{ color: '#fff' }}>Reason:</label><br/>
        <input 
            type="text" 
            placeholder='reason' 
            value={announcment.reason} 
            onChange={handleChange} 
            name="reason" 
            style={{ width: '100%', padding: '8px', borderRadius: '5px', backgroundColor: '#333', color: '#fff', border: 'none', border: '2px solid #fff' }}
        /><br/><br/>

        <label htmlFor='date' style={{ color: '#fff' }}>Date:</label><br/>
        <input 
            type="date" 
            placeholder="date" 
            name="date" 
            value={announcment.date.split("T")[0]} 
            onChange={handleChange} 
            style={{ width: '100%', padding: '8px', borderRadius: '5px', backgroundColor: '#333', color: '#fff', border: 'none', border: '2px solid #fff' }}
        /><br/><br/>
    </div>

    <button 
        className='signupbutton' 
        onClick={handleClick} 
        style={{ 
            backgroundColor: '#5a9cf2', 
            color: "#fff", 
            padding: '8px 16px', 
            borderRadius: '5px', 
            border: 'none', 
            fontSize: '14px', 
            cursor: 'pointer',
            border: '2px solid #fff'
        }}
        onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#7bb3f9'}
        onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#5a9cf2'}
    >
        Update
    </button><br/><br/>

    <button 
        className='backbutton' 
        style={{ 
            backgroundColor: '#45d274', 
            color: "#fff", 
            padding: '8px 16px', 
            borderRadius: '5px', 
            border: 'none', 
            fontSize: '14px', 
            cursor: 'pointer', 
            border: '2px solid #fff'
        }}
        onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#6fe89b'}
        onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#45d274'}
    >
        <Link to={`/announcments`} style={{ color: '#fff', textDecoration: 'none' }}>Back</Link>
    </button>
</div>

    );
};

export default UpdateAnnouncment;
