import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
// import 'bootstrap/dist/css/bootstrap.min.css';

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
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h1 className='h1-design' style={{ marginLeft:"35%" }}>Cinema Users Dashboard</h1>
      <center>
        <table style={{  marginTop: '2%', fontSize: '20px', fontFamily: 'sans-serif' }} border="1">
          <thead>
            <tr style={{ backgroundColor: 'black',color: "#fff"}} >
              <th>Id</th>
              <th>Name</th>
              <th>Surname</th>
              <th>Email</th>
              <th>Password</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.surname}</td>
                <td>{user.email}</td>
                <td>{user.password}</td>
                <td className='update'><Link to={`/update/${user.id}`} style={{ color: "#fff"}}>🔄Update</Link></td>
                <td className='delete' onClick={() => handleDelete(user.id)} style={{ color: "#fff"}}>✖️Delete</td>
              </tr>
            ))}
          </tbody>
        </table>
      </center>
      <br /><br />
      <button className='users-button' style={{ marginLeft: '45%' }}><Link to="/Signup" style={{ color: "#fff"}}>➕Add new User</Link></button><br /><br /><br />
    </div>
  );
};

export default Users;