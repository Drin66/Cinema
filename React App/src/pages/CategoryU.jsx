import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Category = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchAllCategories = async () => {
      try {
        const res = await axios.get("http://localhost:3002/categories");
        console.log("Fetched categories:", res.data);
        
        if (Array.isArray(res.data)) {
            setCategories(res.data);
        } else {
          console.error("API response is not an array:", res.data);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllCategories();
  }, []);

//   const handleDelete = async (id) => {
//     try {
//       const confirmDelete = window.confirm("Are you sure you want to delete this category? This action cannot be undone.");
//       if (confirmDelete) {
//         await axios.delete(`http://localhost:3002/categories/${id}`);
//         setCategories((prevCategories) => prevCategories.filter(category => category.id !== id));
//       }
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   return (
//     <div>
//       <h1 className='h1-design' style={{ marginLeft:'35%'}} >Pet Shop Category Dashboard</h1>
//       <center>
//         <table style={{ boxShadow: '30px 15px 50px', marginTop: '2%', fontSize: '20px', fontFamily: 'sans-serif' }} border="1">
//           <thead>
//             <tr>
//               <th>Id</th>
//               <th>Name</th>
//               <th>Update</th>
//               <th>Delete</th>
//             </tr>
//           </thead>
//           <tbody>
//             {categories.map(category => (
//               <tr key={category.id}>
//                 <td>{category.id}</td>
//                 <td>{category.name}</td>
//                 <td className='update'><Link to={`/updatecategory/${category.id}`}>🔄Update</Link></td>
//                 <td className='delete' onClick={() => handleDelete(category.id)}>✖️Delete</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </center>
//       <br /><br />
//       <button className='users-button' style={{ marginLeft:'42%'}}><Link to="/addcategory" style={{ color: "#fff"}}>➕Add new Category</Link></button><br /><br /><br />
//       <Link to="/movies" style={{ marginLeft:'46%', color: "#000"}}>Back to Movies</Link><br /><br /><br />
//     </div>
//   );
};

export default Category;
