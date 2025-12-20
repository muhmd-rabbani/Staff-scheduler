import React, { useState, useEffect } from "react";
import "./Addmanager.css";
import api from "../../api";

function Addmanager() {
  const [departments, setDepartments] = useState([]);

  const [form, setForm] = useState({
    name: "",
    age: "",
    gender: "",
    phone: "",
    email: "",
    qualification: "",
    address: "",
    state: "",
    pincode: "",
    department: "",
    password: "",
  });

  // Handle input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Fetch departments from backend
  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const res = await api.get("/admin/department");
        setDepartments(res.data);
      } catch (error) {
        console.log(error);
        alert("Failed to load departments");
      }
    };

    fetchDepartments();
  }, []);

  // Submit form
  const addmanager = async (e) => {
    e.preventDefault();

    // Validation
    if (!form.department) {
      alert("Please select a department");
      return;
    }

    if (form.password.length < 6) {
      alert("Password must be at least 6 characters");
      return;
    }

    if (form.password !== form.cpassword) {
      alert("Passwords do not match");
      return;
    }

    if (
      !form.name ||
      !form.age ||
      !form.gender ||
      !form.phone ||
      !form.email ||
      !form.password
    ) {
      alert("Please fill all required fields");
      return;
    }

    const body = {
      name: form.name,
      age: form.age,
      gender: form.gender,
      phone: form.phone,
      email: form.email,
      qualification: form.qualification,
      address: form.address,
      state: form.state,
      pincode: form.pincode,
      department: form.department,
      password: form.password
    };

    try {
      await api.post("/Manager/addManager", body);
      alert("Manager added successfully");

      setForm({
        name: "",
        age: "",
        gender: "",
        phone: "",
        email: "",
        qualification: "",
        address: "",
        state: "",
        pincode: "",
        department: "",
        password: "",
        cpassword: ""
      });
    } catch (error) {
      console.log(error);
      alert("Failed to add manager");
    }
  };

  return (
    <div className="addmngr">
      <form className="addmngr1" onSubmit={addmanager}>
        <h1>Add Manager</h1>

        <div className="form-group">
          <label>Name</label>
          <input name="name" value={form.name} onChange={handleChange} />
        </div>

        <div className="row">
          <div className="form-group">
            <label>Age</label>
            <input
              type="number"
              name="age"
              value={form.age}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Gender</label>
            <select name="gender" value={form.gender} onChange={handleChange}>
              <option value="">Select</option>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
          </div>
        </div>

        <div className="form-group">
          <label>Phone</label>
          <input
            type="number"
            name="phone"
            value={form.phone}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Qualification</label>
          <input
            name="qualification"
            value={form.qualification}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Address</label>
          <textarea
            name="address"
            value={form.address}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>State</label>
          <input name="state" value={form.state} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Pincode</label>
          <input
            type="number"
            name="pincode"
            value={form.pincode}
            onChange={handleChange}
          />
        </div>

        {/* Department Dropdown */}
        <div className="form-group">
          <label>Department</label>
          <select
            name="department"
            value={form.department}
            onChange={handleChange}
          >
            <option value="">Select Department</option>
            {departments.map((dept) => (
              <option key={dept._id} value={dept.DepartmentName}>
                {dept.DepartmentName}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Confirm Password</label>
          <input
            type="password"
            name="cpassword"
            value={form.cpassword}
            onChange={handleChange}
          />
        </div>

        <button type="submit">Add Manager</button>
      </form>
    </div>
  );
}

export default Addmanager;
