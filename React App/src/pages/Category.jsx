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

  const handleDelete = async (id) => {
    try {
      const confirmDelete = window.confirm("Are you sure you want to delete this category? This action cannot be undone.");
      if (confirmDelete) {
        await axios.delete(`http://localhost:3002/categories/${id}`);
        setCategories((prevCategories) => prevCategories.filter(category => category.id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ padding: '1%', marginLeft:'5px'}}>
    <h1 className='h1-design' style={{ textAlign: 'center', fontSize: '24px', color: 'white', marginBottom: '20px', marginLeft: '35%' }}>Movie Category Dashboard</h1>
    
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <table style={{ width: '80%', borderCollapse: 'collapse' }} border="1">
        <thead>
          <tr style={{ backgroundColor: '#20615b' }}>
            <th style={{ padding: '1rem', borderBottom: '2px solid #ddd' }}>Id</th>
            <th style={{ padding: '1rem', borderBottom: '2px solid #ddd' }}>Name</th>
            <th style={{ padding: '1rem', borderBottom: '2px solid #ddd' }}>Update</th>
            <th style={{ padding: '1rem', borderBottom: '2px solid #ddd' }}>Delete</th>
          </tr>
        </thead>
        <tbody>
          {categories.map(category => (
              <tr key={category.id} style={{ backgroundColor: '#761a1a', color: '#fff' }}>
              <td style={{ padding: '1rem' }}>{category.id}</td>
              <td style={{ padding: '1rem' }}>{category.name}</td>
              <td style={{ textAlign: 'center' }}>
                <Link to={`/updatecategory/${category.id}`} style={{ color: 'turqoise', textDecoration: 'none' }}>🔄 Update</Link>
              </td>
              <td style={{ textAlign: 'center', cursor: 'pointer', color: '#dc3545' }} onClick={() => handleDelete(category.id)}>
                ✖️ Delete
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    
    <div style={{ textAlign: 'center', marginTop: '2rem' }}>
      <Link to="/addcategory" style={{ color: '#fff', backgroundColor: '#53a8b6', padding: '0.5rem 1rem', borderRadius: '4px', textDecoration: 'none' }}>
        ➕ Add New Category
      </Link>
    </div>
    
    <div style={{ textAlign: 'center', marginTop: '1rem' }}>
      <Link to="/movies" style={{ color: '#28a745', textDecoration: 'none' }}>
        Back to Movies
      </Link>
    </div>
  </div>
  );
};

export default Category;
