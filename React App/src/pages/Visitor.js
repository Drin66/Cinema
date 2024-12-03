import React from 'react'
import axios from 'axios';

function Visitor() {
    const handleLogout= () => {
        axios.get('http://localhost:3002/logout')
        .then( res => {
            window.location.reload();
        })
        .catch(err => console.log(err))
    }
  return (
    <div>
      <h1>Welcome to our Cinnema, Visitor</h1><br/><br/>
      <h7>you can Log out anytime by clicking the button ➜ <button onClick={handleLogout} className='users-button' style={{ backgroundColor: '#9ddcdc', color: '#fff', padding: '10px 20px', borderRadius: '5px', border: 'none', fontSize: '18px', cursor: 'pointer' }}>
        Log Out</button></h7>
    </div>
  )
}

export default Visitor
