import React from 'react'
import './Login.css'

function Login() {
  const handleClick = (e) => {
    e.preventDefault();
    document.querySelector(".log2").classList.add("shrink");
  };

  return (
    <div className='loginpage'>
      <form className='Login'>
        <img className="loginIllustrationLeft" src="/Shared workspace-amico.png" alt="login"/>
        <div className="loginContent">
          <h1>Log in</h1>
          <input type="text" className='login1' placeholder='Username' />
          <input type="password" className='login1' placeholder='Password' />
          <button className='log2' onClick={handleClick}>Log in ➜</button>
        </div>

      </form>
    </div>
  )
}

export default Login
