// import React from 'react'

// function Addstaff() {
//   return (
//     <div className=''>
//         <form action="input" className='addmngr1'>
//             <h1>Add a Staff</h1>
//             {/* Name */}
//             <label htmlFor="name">Name:</label>
//             <input type="text"id='name'/><br /><br />
//             {/* age */}
//             <label htmlFor="age">Age:</label>
//             <input type="text"id='age'/>
//             {/* Gender */}
//             <label htmlFor="gender">Gender:</label>
//             <select id='gender'>
//               <option value="">Select</option>
//               <option value="male">Male</option>
//               <option value="female">Female</option>
//               <option value="other">Other</option>
//             </select>
//             <br /><br />
//             {/* Phone no */}
//             <label htmlFor="phnno">Phone no:</label>
//             <input type="text"id=''/><br /><br />
//             {/* Email */}
//             <label htmlFor="email">E-mail:</label>
//             <input type="text"id='email'/><br /><br />
//             {/* quality */}
//             <label htmlFor="quality">Qualification:</label>
//             <input type="text"id='quality'/><br /><br />
//             {/* department */}
//             <label htmlFor="department">Department:</label>
//             <input type="text"id='dept'/><br /><br />
//             {/* position */}
//             <label htmlFor="position">Position:</label>
//             <input type="text"id='postn'/><br /><br />
//             {/* adress */}
//             <label htmlFor="adress">Adress:</label>
//             <textarea id="address"></textarea><br /><br />
//             {/* state */}
//             <label htmlFor="state">State:</label>
//             <input type="text"id='state'/><br /><br />
//             {/* pincode */}
//             <label htmlFor="pincode">Pincode:</label>
//             <input type="text"id='pincode'/><br /><br />
//             <button type='submit'>
//               Submit
//             </button>
//         </form>
//     </div>
//   )
// }

// export default Addstaff

import React, { useState } from "react";
import api from "../../api";

function Addstaff() {
  const [form, setForm] = useState({
    name: "",
    age: "",
    gender: "",
    phone: "",
    email: "",
    qualification: "",
    department: "",
    position: "",
            password:"",

    address: "",
    state: "",
    pincode: ""
  });

  // handle input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !form.name ||
      !form.age ||
      !form.gender ||
      !form.phone ||
      !form.email
    ) {
      alert("Please fill all required fields");
      return;
    }

    try {
      await api.post("/staff/addStaff", form);
      alert("Staff added successfully");

      setForm({
        name: "",
        age: "",
        gender: "",
        phone: "",
        email: "",
        qualification: "",
        department: "",
        password:"",
        position: "",
        address: "",
        state: "",
        pincode: ""
      });
    } catch (error) {
      console.log(error);
      alert("Failed to add staff");
    }
  };
// console.log(form);

  return (
    <div>
      <form className="addmngr1" onSubmit={handleSubmit}>
        <h1>Add a Staff</h1>

        <label>Name:</label>
        <input name="name" value={form.name} onChange={handleChange} />
        <br /><br />

        <label>Age:</label>
        <input name="age" value={form.age} onChange={handleChange} />
        <br /><br />

        <label>Gender:</label>
        <select name="gender" value={form.gender} onChange={handleChange}>
          <option value="">Select</option>
          <option>Male</option>
          <option>Female</option>
          <option>Other</option>
        </select>
        <br /><br />

        <label>Phone:</label>
        <input name="phone" value={form.phone} onChange={handleChange} />
        <br /><br />

        <label>Email:</label>
        <input name="email" value={form.email} onChange={handleChange} />
        <br /><br />

        <label>Qualification:</label>
        <input
          name="qualification"
          value={form.qualification}
          onChange={handleChange}
        />
        <br /><br />

        <label>Department:</label>
        <input
          name="department"
          value={form.department}
          onChange={handleChange}
        />
        <br /><br />

        <label>Position:</label>
        <input
          name="position"
          value={form.position}
          onChange={handleChange}
        />
        <br /><br />

        <label>Address:</label>
        <textarea
          name="address"
          value={form.address}
          onChange={handleChange}
        />
        <br /><br />

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
          />
        </div>
        <br /><br />

        <label>State:</label>
        <input name="state" value={form.state} onChange={handleChange} />
        <br /><br />

        <label>Pincode:</label>
        <input
          name="pincode"
          value={form.pincode}
          onChange={handleChange}
        />
        <br /><br />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Addstaff;
