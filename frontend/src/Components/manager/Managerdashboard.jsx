import React, { useState } from 'react';

import '../Admin/Dashboard.css';
import Managestaff from './Managestaff';
import Manageshift from './Manageshift';
// import ManageManeger from './ManageManeger';
// import Viewstaff from './Viewstaff';
// import Viewshift from './Viewshift';
// import Viewcomplaint from './Viewcomplaint';

function Managerdashboard() {
  // State to store currently active page
  const [active, setActive] = useState("dashboard");

  return (
    <div className=" dscontainer">
      
      {/* SIDEBAR */}
      <div className="sidebar">
        <div className="brand">
          <h2>StaffScheduler</h2>
        </div>

        <div className="menu">
          <div
            className={`menu-item ${active === "dashboard" ? "active" : ""}`}
            onClick={() => setActive("dashboard")}
          >
            Dashboard
          </div>

          <div
            className={`menu-item ${active === "managers" ? "active" : ""}`}
            onClick={() => setActive("managers")}
          >
            Managers
          </div>

          <div
            className={`menu-item ${active === "staff" ? "active" : ""}`}
            onClick={() => setActive("staff")}
          >
            Staffs
          </div>

          <div
            className={`menu-item ${active === "shifts" ? "active" : ""}`}
            onClick={() => setActive("shifts")}
          >
            Shifts
          </div>

          <div
            className={`menu-item ${active === "complaints" ? "active" : ""}`}
            onClick={() => setActive("complaints")}
          >
            Complaints
          </div>
        </div>
      </div>

      {/* MAIN CONTENT (Dynamic Rendering) */}
      <div className="content">
        {active === "dashboard" && <h1>Dashboard Overview</h1>}
        {active === "staff" && <Managestaff />}
        {active === "shifts" && <Manageshift />}
        {active === "complaints" && <Viewcomplaint />}
      </div>
    </div>
  );
}

export default Managerdashboard;
