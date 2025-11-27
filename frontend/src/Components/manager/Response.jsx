import React from 'react'

function Response() {
  return (
    <div className='addshft'>
        <form action="input" className='addshft1'>
            <h1>Response</h1>
            <label htmlFor="name"></label>
            <input type="text"id='name'/><br /><br />
           <button type='send'>
              send
            </button>
        </form>
    </div>
  )
}

export default Response
