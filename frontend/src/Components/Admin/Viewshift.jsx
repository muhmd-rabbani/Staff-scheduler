import React from 'react'

function Viewshift() {
  return (
    <div>
        <div className='mainmanager pt-4'>
    <div className='container pt-4  managerpage pb-5' >
    <div>
      <h1 className="hd1">Shifts</h1>
    
      <table className="table my-table">
  <thead>
    <tr>
      
      <th scope="col">id</th>
      <th scope="col">Name</th>
      <th scope="col">Date</th>
      <th scope="col">Start time</th>
      <th scope="col">End time</th>
       <th scope="col">Status</th>
 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>1</td>
      <td>Rabbani</td>
      <td>11/2/2035</td>
      <td>11:00</td>
      <td>12:00</td>
      <td>Done</td>

    </tr>
    <tr>
      <td>2</td>
      <td>Haneen</td>
      <td>11/2/2045</td>
      <td>10:00</td>
      <td>2:00</td>
      <td>Done</td>

    </tr>
    <tr>
      <td>3</td>
      <td>Haneen</td>
      <td>11/2/2045</td>
      <td>10:00</td>
      <td>2:00</td>
      <td>Done</td>

    </tr>
  </tbody>
</table>
    </div>
    </div>
    </div>
    </div>
  )
}

export default Viewshift
