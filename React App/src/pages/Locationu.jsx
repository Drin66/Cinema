import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const LocationU = () => {
  const [location, setlocation] = useState([]);

  useEffect(() => {
    const fetchAlllocation = async () => {
      try {
        const res = await axios.get("http://localhost:3002/location");
        console.log("Fetched location:", res.data);

        if (Array.isArray(res.data)) {
            setlocation(res.data);
        } else {
          console.error("API response is not an array:", res.data);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchAlllocation();
  }, []);

//   const handleDelete = async (id) => {
//     try {
//       const confirmDelete = window.confirm("Are you sure you want to delete this location? This action cannot be undone.");
//       if (confirmDelete) {
//         await axios.delete(`http://localhost:3002/location/${id}`);
//         setlocation((prevlocation) => prevlocation.filter(location => location.id !== id));
//       }
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   return (
//     <div>
//       <h1 className='h1-design' style={{ marginLeft:'38.5%' }} >location Dashboard</h1>
//       <center>
//         <table style={{ marginTop: '2%', fontSize: '20px', fontFamily: 'sans-serif' }} border="1">
//           <thead>
//             <tr style={{marginLeft:"50%"}}>
//               {/* <th>Id</th> */}
//               <th>Location</th>
//               <th>Update</th>
//               <th>Delete</th>
//             </tr>
//           </thead>
//           <tbody>
//             {location.map(location => (
//               <tr key={location.id}>
//                 {/* <td>{location.id}</td> */}
//                 <td>{location.name}</td>
//                 <td className='update'><Link to={`/updatelocation/${location.id}`}>🔄Update</Link></td>
//                 <td className='delete' onClick={() => handleDelete(location.id)}>✖️Delete</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </center>
//       <br /><br />
//       <button className='users-button' style={{ marginLeft:'42.5%'}}><Link to="/addlocation" style={{ color: "#fff"}}>➕Add new location</Link></button><br /><br /><br />
//       <Link to="/movies" style={{ marginLeft:'47%', color: "#000"}}>Back to Movies</Link><br /><br /><br />
//     </div>
//   );
};

export default LocationU;