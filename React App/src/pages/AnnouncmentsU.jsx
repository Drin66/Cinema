import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const AnnouncmentsU = () => {
  const [Announcments, setAnnouncments] = useState([]);

  useEffect(() => {
    const fetchAllAnnouncments = async () => {
      try {
        const res = await axios.get("http://localhost:3002/Announcments");
        console.log("Fetched Announcments:", res.data);

        if (Array.isArray(res.data)) {
            setAnnouncments(res.data);
        } else {
          console.error("API response is not an array:", res.data);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllAnnouncments();
  }, []);

//   const handleDelete = async (id) => {
//     try {
//       const confirmDelete = window.confirm("Are you sure you want to delete this Announcment? This action cannot be undone.");
//       if (confirmDelete) {
//         await axios.delete(`http://localhost:3002/Announcments/${id}`);
//         setAnnouncments((prevAnnouncments) => prevAnnouncments.filter(Announcments => Announcments.id !== id));
//       }
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   return (
//     <div>
//       <h1 className='h1-design' style={{ marginLeft:'42%' }} >Announcments Dashboard</h1>
//       <center>
//         <table style={{ marginTop: '2%', fontSize: '20px', fontFamily: 'sans-serif' }} border="1">
//           <thead>
//             <tr>
//               <th>Id</th>
//               <th>Name</th>
//               <th>Update</th>
//               <th>Delete</th>
//             </tr>
//           </thead>
//           <tbody>
//             {Announcments.map(Announcment => (
//               <tr key={Announcment.id}>
//                 <td>{Announcment.id}</td>
//                 <td>{Announcment.name}</td>
//                 {/* <td className='update'><Link to={`/updateAnnouncment/${Announcment.id}`}>🔄Update</Link></td>
//                 <td className='delete' onClick={() => handleDelete(Announcment.id)}>✖️Delete</td> */}
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </center>
//       <br /><br />
//       <button className='users-button' style={{ marginLeft:'45%'}}><Link to="/addAnnouncment" style={{ color: "#fff"}}>Add new Announcment</Link></button><br /><br /><br />
//     </div>
//   );
 }

export default AnnouncmentsU;