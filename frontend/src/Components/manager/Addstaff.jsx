import React from 'react'

function Addstaff() {
  return (
    <div className='addmngr'>
        <form action="input" className='addmngr1'>
            <h1>Add a Staff</h1>
            {/* Name */}
            <label htmlFor="name">Name:</label>
            <input type="text"id='name'/><br /><br />
            {/* age */}
            <label htmlFor="age">Age:</label>
            <input type="text"id='age'/>
            {/* Gender */}
            <label htmlFor="gender">Gender:</label>
            <select id='gender'>
              <option value="">Select</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            <br /><br />
            {/* Phone no */}
            <label htmlFor="phnno">Phone no:</label>
            <input type="text"id=''/><br /><br />
            {/* Email */}
            <label htmlFor="email">E-mail:</label>
            <input type="text"id='email'/><br /><br />
            {/* quality */}
            <label htmlFor="quality">Qualification:</label>
            <input type="text"id='quality'/><br /><br />
            {/* department */}
            <label htmlFor="department">Department:</label>
            <input type="text"id='dept'/><br /><br />
            {/* position */}
            <label htmlFor="position">Position:</label>
            <input type="text"id='postn'/><br /><br />
            {/* adress */}
            <label htmlFor="adress">Adress:</label>
            <textarea id="address"></textarea><br /><br />
            {/* state */}
            <label htmlFor="state">State:</label>
            <input type="text"id='state'/><br /><br />
            {/* pincode */}
            <label htmlFor="pincode">Pincode:</label>
            <input type="text"id='pincode'/><br /><br />
            <button type='submit'>
              Submit
            </button>
        </form>
    </div>
  )
}

export default Addstaff
