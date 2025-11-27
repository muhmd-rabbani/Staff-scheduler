import React from 'react'
import './Dashboard.css'

function Dashboard() {
  return (
    <div className="sidebar">
      <div className="brand">
        <h2>StaffScheduler</h2>
      </div>

      <div className="menu">
        <div className="menu-item active">Dashboard</div>
        <div className="menu-item">Managers</div>
        <div className="menu-item">Schedules</div>
        <div className="menu-item">Attendance</div>
        <div className="menu-item">Reports</div>
        <div className="menu-item">Settings</div>
        <div className="menu-item">Logout</div>
      </div>
    </div>
  )
}

export default Dashboard
