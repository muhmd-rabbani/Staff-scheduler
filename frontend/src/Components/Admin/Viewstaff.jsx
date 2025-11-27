import React from 'react'
import Table from 'react-bootstrap/esm/Table'

function Viewstaff() {
  return (
        <div className='mainmanager  pt-4 '>
    <div className='container pt-4  managerpage pb-5' >
        <h1>Employees</h1>
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
          
        </tr>
      </tbody>
    </Table>
    </div>
    </div>
      
  )
}

export default Viewstaff
