import React, { useState } from 'react'
import './Login.css'
import api from '../api';
import { useNavigate } from 'react-router-dom';

function Login() {
  const[username,setusername]=useState("")
  const[password,setpassword]=useState("")
  const navigate= useNavigate();

  const handleClick =async (e) => {
    e.preventDefault();

    try {
      const body={username,password}
      const result=await api.post("/login/login",body)
      console.log(result);
      let role=result.data.user.role;

      if(role=='manager'){
        navigate('/managerHome')
      }
      else if(role=='Admin'){
        navigate('/AdminHome')
      }
    } catch (error) {
      
    }
  };

  return (
    <div className='loginpage'>
      <form className='Login'>
        <div className="loginContent">
          <h1>Welcome back</h1>
          <label htmlFor="">Email</label>
          <input type="text" className='login1' placeholder='Enter your email' onChange={(e)=>setusername(e.target.value)} />
          <label htmlFor="">Password</label>
          <input type="password" className='login1' placeholder='Enter your password' onChange={(e)=>setpassword(e.target.value)} />
          <button type="button" className='log2' onClick={handleClick}>Log in ➜</button>
          <span className='forgot'>Forgot password?</span>
          <div className='divider'><span>OR</span></div>
          <button className='googleBtn'><img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="google" />
          Login with Google</button>
        </div>
      </form>
    </div>
  )
}

export default Login
