import React from 'react'
import Table from 'react-bootstrap/Table';
import './ManageManeger.css'
import Button from 'react-bootstrap/Button';
function ManageManeger() {
  return (
    <div className='mainmanager pt-4'>
    <div className='container pt-4  managerpage pb-5' >
        <div className='d-flex btm-1'>
            <h1></h1>
            <h1 className='hd1'>Manage Managers</h1>
        <button className='btn-1'>
        Add
      </button>
        </div>
      <Table striped bordered hover className='table my-table'>
      <thead>
        <tr>
          <th>id</th>
          <th>Name</th>
          <th>Age</th>
          <th>Gender</th>
          <th >Phn No</th>
          <th>E-mail</th>
          <th>Qualification</th>
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
          <td>30</td>
          <td>male</td>
          <td>987654123</td>
          <td>mark@123gmail.com</td>
          <td>manager</td>
          <td>dvyjg</td>
          <td>kerala</td>
          <td>76809</td>
          <td>
            <Button variant="primary"className='me-2'>Accept</Button>
            <Button variant="danger">Reject</Button>
          </td>
        </tr>
        {/* <tr>
          <td>2</td>
          <td>Jacob</td>
          <td>45</td>
          <td>Male</td>
          <td>987654123</td>
          <td>mark@123gmail.com</td>
          <td>manager</td>
          <td>dvyjg</td>
          <td>kerala</td>
          <td>76809</td>
          <td>
            <Button variant="primary"className='me-2'>Edit</Button>
            <Button variant="success">Delete</Button>
          </td>
        </tr>
        <tr>
          <td>3</td>
          <td>Marco</td>
          <td>40</td>
          <td>female</td>
          <td>987654123</td>
          <td>mark@123gmail.com</td>
          <td>manager</td>
          <td>dvyjg</td>
          <td>kerala</td>
          <td>76809</td>
          <td>
            <Button variant="primary"className='me-2'>Edit</Button>
            <Button variant="success">Delete</Button>
          </td>
        </tr> */}
      </tbody>
    </Table>
    </div>
    </div>
  )
}

export default ManageManeger
