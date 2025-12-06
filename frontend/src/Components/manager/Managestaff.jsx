import React, { useState } from 'react'
import Table from 'react-bootstrap/Table';
  // import './ManageManeger.css'
import Button from 'react-bootstrap/Button';

function Managestaff() {
      const [showAddForm,setShowAddForm]=useState("")
  return (
    <div className='mainmanager  pt-4 '>
    <div className='container pt-4  managerpage pb-5' >
        <div className='d-flex btm-1'>
            <h1></h1>
            <h1>Employees</h1>
        <button className='btn-1' onClick={() => setShowAddForm(true)}>
        Add +
      </button>
        </div>

        {/* RENDER ADD FORM INSTEAD OF TABLE */}
        {showAddForm ? (
          <Addmanager onClose={() => setShowAddForm(false)} />
        ) :
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
        <tr>
          <td>1</td>
          <td>Mark</td>
          <td>manager</td>
          <td>main</td> 
          <td>marketing</td>   
          <td>30</td>
          <td>male</td>
          <td>987654123</td>
          <td>mark@123gmail.com</td>
          <td>dvyjg</td>
          <td>kerala</td>
          <td>76809</td>
          <td>
            <Button variant="primary"className='me-2'>Edit</Button>
            <Button variant="danger">Delete</Button>
          </td>
        </tr>
        <tr>
          <td>2</td>
          <td>Jacob</td>
          <td>manager</td>
          <td>main</td> 
          <td>marketing</td> 
          <td>45</td>
          <td>Male</td>
          <td>987654123</td>
          <td>mark@123gmail.com</td>
          <td>dvyjg</td>
          <td>kerala</td>
          <td>76809</td>
          <td>
            <Button variant="primary"className='me-2'>Edit</Button>
            <Button variant="danger">Delete</Button>
          </td>
        </tr>
        <tr>
          <td>3</td>
          <td>Marco</td>
          <td>manager</td>
          <td>main</td> 
          <td>marketing</td> 
          <td>40</td>
          <td>female</td>
          <td>987654123</td>
          <td>mark@123gmail.com</td>
          <td>dvyjg</td>
          <td>kerala</td>
          <td>76809</td>
          <td>
            <Button variant="primary"className='me-2'>Edit</Button>
            <Button variant="danger">Delete</Button>
          </td>
        </tr>
      </tbody>
    </Table>
        }
    </div>
    </div>
  )
}

export default Managestaff
