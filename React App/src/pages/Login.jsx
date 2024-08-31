import React,{ useState } from 'react'
import axios from 'axios';
import { useNavigate} from "react-router-dom";

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function handleSubmit(event) {
      event.preventDefault();
      axios.post('http://localhost:3002/login', {email, password})
      .then(res => {console.log(res)})
      .catch(err => console.log(err));
  }

    const navigate = useNavigate();
    const handleClick = async e =>{
        e.preventDefault()
        try{
          navigate("/movies")
        }catch(err){
          console.log(err)
        }
      }

  return (
    <div className='lgn'>
        <div>
            <form onSubmit={handleSubmit}>
              <h1 className='h1-design'>Log In Below</h1><br/><br/><br/>
                <div className='mb-3'>
                    <label htmlFor='email'>E-mail</label><br/>
                    <input type='email' style={{marginLeft: "8%"}} id='email' placeholder='Enter Email' className='form-control' onChange={e => setEmail(e.target.value)}/><br/><br/>
                </div>
                <div className='mb-3'>
                    <label htmlFor='password' >Password</label><br/>
                    <input type='password' style={{marginLeft: "8%"}} id='password' placeholder='Enter Password' className='form-control' onChange={e => setPassword(e.target.value)}/>
                </div><br/>
                <button type="submit" className='signupbutton' onClick={handleClick} style={{marginLeft:"8%"}}>Login</button>
            </form>
        </div>
    </div>
  )
}
