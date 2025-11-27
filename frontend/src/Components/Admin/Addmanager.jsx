import React, { useState } from 'react'
import './Addmanager.css'

function Addmanager() {
  const [name,setName]=useState("")
  const [age,setAge]=useState("")
  const [gender,setGender]=useState("")
  const [phone,setPhone]=useState("")
  const [Email,setEmail]=useState("")
  const [qualification,setQualification]=useState("")
  const [address,setAddress]=useState("")
  const [state,setState]=useState("")
  const [pincode,setPincode]=useState("")
  const [password,setPassword]=useState("")
  const [cpassword,setCpassword]=useState("")
  console.log("name",name,"age",age,gender) 
  return (
    <div className='addmngr'>
        <form action="input" className='addmngr1'>
            <h1>Add Manager</h1>
            {/* Name */}
            <label htmlFor="name">Name:</label>
            <input type="text"id='name' onChange={(e)=>{setName(e.target.value)}}/><br /><br />
            {/* age */}
            <label htmlFor="age">Age:</label>
            <input type="text"id='age' onChange={(e)=>{setAge(e.target.value)}} />
            {/* Gender */}
            <label htmlFor="gender">Gender:</label>
            <select id='gender'onChange={(e)=>{setGender(e.target.value)}} >
              <option value="">Select</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            <br /><br />
            {/* Phone no */}
            <label htmlFor="phnno">Phone no:</label>
            <input type="text"id='phn'onChange={(e)=>{setPhnno(e.target.value)}}/><br /><br />
            {/* Email */}
            <label htmlFor="email">E-mail:</label>
            <input type="text"id='email'/><br /><br />
            {/* quality */}
            <label htmlFor="quality">Qualification:</label>
            <input type="text"id='quality'/><br /><br />
            {/* adress */}
            <label htmlFor="adress">Adress:</label>
            <textarea id="address"></textarea><br /><br />
            {/* state */}
            <label htmlFor="state">State:</label>
            <input type="text"id='state'/><br /><br />
            {/* pincode */}
            <label htmlFor="pincode">Pincode:</label>
            <input type="text"id='pincode'/><br /><br />
             <label htmlFor="password">Password:</label>
            <input type="text"id=''/><br /><br />
             <label htmlFor="password">confirm password:</label>
            <input type="text"id=''/><br /><br />
            <button type='submit'>
              Submit
            </button>
        </form>
    </div>
  )
}

export default Addmanager
