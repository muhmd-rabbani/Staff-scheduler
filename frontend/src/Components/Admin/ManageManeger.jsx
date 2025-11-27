import React, { useState } from 'react';
import Table from 'react-bootstrap/Table';
import './ManageManeger.css';
import Button from 'react-bootstrap/Button';

import Addmanager from './Addmanager';

function ManageManeger() {
  const [showAddForm, setShowAddForm] = useState(false);

  return (
    <div className='mainmanager pt-4'>
      <div className='container pt-4 managerpage pb-5'>

        <div className='d-flex btm-1 justify-content-between'>
          <h1 className='hd1'>Manage Managers</h1>

          <button className='btn-1' onClick={() => setShowAddForm(true)}>
            Add
          </button>
        </div>

        {/* RENDER ADD FORM INSTEAD OF TABLE */}
        {showAddForm ? (
          <Addmanager onClose={() => setShowAddForm(false)} />
        ) : (
          <Table striped bordered hover className='table my-table mt-4'>
            <thead>
              <tr>
                <th>id</th>
                <th>Name</th>
                <th>Age</th>
                <th>Gender</th>
                <th>Phn No</th>
                <th>E-mail</th>
                <th>Qualification</th>
                <th>Address</th>
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
                <td>Male</td>
                <td>987654123</td>
                <td>mark@123gmail.com</td>
                <td>Manager</td>
                <td>dvyjg</td>
                <td>Kerala</td>
                <td>76809</td>
                <td>
                  <Button variant="primary" className='me-2'>Accept</Button>
                  <Button variant="danger">Reject</Button>
                </td>
              </tr>
            </tbody>
          </Table>
        )}
        
      </div>
    </div>
  );
}

export default ManageManeger;
