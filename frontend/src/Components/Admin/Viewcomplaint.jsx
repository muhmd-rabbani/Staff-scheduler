import React from 'react'

function Viewcomplaint() {
  return (
    <div>
        <h1>Complaints</h1>
        <table class="table table-bordered">
  <thead>
    <tr>
      <th scope="col">Against id</th>
      <th scope="col">Subject</th>
      <th scope="col">Description</th>
      <th scope="col"></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td scope="row">1</td>
      <td>Mark</td>
      <td>Otto</td>
      <td>
        <button>Reply    
        </button>
      </td>
    </tr>
    <tr>
      <th scope="row">2</th>
      <td>Jacob</td>
      <td>Thornton</td>
      <td>
        <button>Reply
        </button>
      </td>
    </tr>
    <tr>
      <th scope="row">3</th>
      <td>John</td>
      <td>Doe</td>
     <td>
        <button>Reply
        </button>
      </td>
    </tr>
  </tbody>
</table>
      
    </div>
  )
}

export default Viewcomplaint

