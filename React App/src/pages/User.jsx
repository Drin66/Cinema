import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const res = await axios.get("http://localhost:3002/users");
        console.log("Fetched users:", res.data);
        
        if (Array.isArray(res.data)) {
          setUsers(res.data);
        } else {
          console.error("API response is not an array:", res.data);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllUsers();
  }, []);

  const handleDelete = async (id) => {
    try {
      const confirmDelete = window.confirm("Are you sure you want to delete this user? This action cannot be undone.");
      if (confirmDelete) {
        await axios.delete("http://localhost:3002/users/" + id);
        setUsers((prevUsers) => prevUsers.filter(user => user.id !== id));
        alert("User has been deleted successfully.");
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred while deleting the user.");
    } finally {
      // setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
  <h1 className='h1-design' style={{ textAlign: "center",marginLeft:"40%" , fontSize: '20px', color: 'white' }}>Cinema Users Dashboard</h1>
  
  <center>
    <table style={{ width: '80%', margin: '10px auto', borderCollapse: 'collapse', fontSize: '18px', fontFamily: 'Arial, sans-serif' }} border="1">
      <thead>
        <tr style={{ backgroundColor: '#20615b', color: "white", textAlign: 'center' }}>
          <th style={{ padding: '10px 15px' }}>Id</th>
          <th style={{ padding: '10px 15px' }}>Name</th>
          <th style={{ padding: '10px 15px' }}>Surname</th>
          <th style={{ padding: '10px 15px' }}>Email</th>
          <th style={{ padding: '10px 15px' }}>Password</th>
          <th style={{ padding: '10px 15px' }}>Role</th>
          <th style={{ padding: '10px 15px' }}>Update</th>
          <th style={{ padding: '10px 15px' }}>Delete</th>
        </tr>
      </thead>
      <tbody>
        {users.map(user => (
          <tr key={user.id} style={{ textAlign: 'center', backgroundColor: user.id % 2 === 0 ? '#761a1a' : '#761a1a' }}>
            <td style={{ padding: '12px' }}>{user.id}</td>
            <td style={{ padding: '12px' }}>{user.name}</td>
            <td style={{ padding: '12px' }}>{user.surname}</td>
            <td style={{ padding: '12px' }}>{user.email}</td>
            <td style={{ padding: '12px' }}>{user.password}</td>
            <td style={{ padding: '12px' }}>{user.role}</td>
            <td className='update'>
              <Link to={`/update/${user.id}`} style={{ color: "white", textDecoration: 'none', fontWeight: 'bold' }}>🔄 Update</Link>
            </td>
            <td className='delete' onClick={() => handleDelete(user.id)}>
              <span style={{ color: "white", cursor: 'pointer', fontWeight: 'bold' }}>✖️ Delete</span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </center>
  
  <div style={{ textAlign: 'center', marginTop: '50px' }}>
    <button className='users-button' style={{ backgroundColor: '#9ddcdc', color: '#fff', padding: '10px 20px', borderRadius: '5px', border: 'none', fontSize: '18px', cursor: 'pointer' }}>
      <Link to="/Signup" style={{ color: "#fff", textDecoration: 'none' }}>➕ Add new User</Link>
    </button>
  </div>
</div>

  );
};

export default Users;