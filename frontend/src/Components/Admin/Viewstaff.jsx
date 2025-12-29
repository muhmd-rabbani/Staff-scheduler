import React, { useState,useEffect } from 'react'
import Table from 'react-bootstrap/Table';
  // import './ManageManeger.css'
import Button from 'react-bootstrap/Button';

import api from '../../api';

function Viewstaff() {
      const [showAddForm,setShowAddForm]=useState("")
      const [staffs, setStaffs] = useState([]);
      const fetchStaffs = async () => {
    try {
      const res = await api.get('/staff/staff');
      console.log(res);
      
      setStaffs(res.data.staffs);
    } catch (error) {
      console.log(error);
      alert('Failed to load staffs');
    }
  };

  useEffect(() => {
    fetchStaffs();
  }, []);

  return (
    <div className='mainmanager  pt-4 '>
    <div className='container pt-4  managerpage pb-5' >
        <div className='d-flex btm-1'>
            <h1></h1>
            <h1>Employees</h1>
     
        </div>

      
      <Table striped bordered hover className='table my-table'>
      <thead>
        <tr>
          <th>id</th>
          <th>Name</th>
          <th>Qualification</th>
          <th>Position</th>
          <th>Department</th>
          <th>Age</th>
          <th>Gender</th>
          <th >Phn No</th>
          <th>E-mail</th>
          <th>Adress</th>
          <th>State</th>
          <th>Pincode</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
  {staffs.map((staff, index) => (
    <tr key={staff._id}>
      <td>{index + 1}</td>
      <td>{staff.name}</td>
      <td>{staff.qualification}</td>
      <td>{staff.position}</td>
      <td>{staff.department}</td>
      <td>{staff.age}</td>
      <td>{staff.gender}</td>
      <td>{staff.phoneno}</td>
      <td>{staff.email}</td>
      <td>{staff.address}</td>
      <td>{staff.state}</td>
      <td>{staff.pincode}</td>
   
    </tr>
  ))}
</tbody>

    </Table>
        
    </div>
    </div>
  )
}

export default Viewstaff
