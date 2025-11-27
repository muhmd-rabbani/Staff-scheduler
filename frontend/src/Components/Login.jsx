import React from 'react'
import './Login.css'
function Login() {
  return (
    <div className='loginpage'>
        <form className='Login'>
             <h1>Login</h1>
             <input type="text" className='login1' placeholder='username' />
             <br /><input type="text" className='login1' placeholder='Password' />
             <br /><button className='log2'>submit</button>
        </form>
    </div>
  )
}

export default Login
