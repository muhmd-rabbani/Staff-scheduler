import React from 'react'
import './Addshift.css'
function Addshift() {
  return (
    <div className='addshft'>
        <form action="input" className='addshft1'>
            <h1>Shifts</h1>
            <label htmlFor="id">Staff id:</label>
            <input type="text"id='id'/><br /><br />
            <label htmlFor="name">Staff Name:</label>
            <input type="text"id='name'/><br /><br />
            <label for="date">Date:</label>
            <input type="date" id="date1" /><br /><br />
            <label>Start time:</label>
            <input type='time'id='time1'/>
            <label>End time:</label>
            <input type='time'id='time2'/><br />
            <button type='submit'>
              Submit
            </button>
        </form>
    </div>
  )
}

export default Addshift
