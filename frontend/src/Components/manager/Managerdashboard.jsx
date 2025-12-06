import React, { useState } from "react";
import "./Managerdashboard.css";

import Managestaff from "./Managestaff";
import Manageshift from "./Manageshift";

function Dashboard() {
  const [active, setActive] = useState("dashboard");

  return (
    <div className="simple-container">
      
      {/* LEFT MINI SIDEBAR */}
      <aside className="simple-sidebar">
        <h2 className="simple-logo">SS</h2>

        <nav className="simple-menu">
          <button
            className={active === "dashboard" ? "active" : ""}
            onClick={() => setActive("dashboard")}
          >
            Dashboard
          </button>
          <button
            className={active === "staff" ? "active" : ""}
            onClick={() => setActive("staff")}
          >
            Manage Staff
          </button>
          <button
            className={active === "shifts" ? "active" : ""}
            onClick={() => setActive("shifts")}
          >
            Manage Shift
          </button>
        </nav>
      </aside>

      {/* MAIN SCREEN */}
      <main className="simple-main">
        <header className="simple-header">
          <h1>
            {active === "dashboard"
              ? "Dashboard"
              : active.charAt(0).toUpperCase() + active.slice(1)}
          </h1>
        </header>

        <div className="simple-content">
          {active === "dashboard" && (
            <>
              <div className="simple-cards">
                <div className="simple-card">
                  <p>Total Managers</p>
                  <h3>12</h3>
                </div>
                <div className="simple-card">
                  <p>Total Staff</p>
                  <h3>128</h3>
                </div>
                <div className="simple-card">
                  <p>Active Shifts</p>
                  <h3>8</h3>
                </div>
                <div className="simple-card">
                  <p>Open Complaints</p>
                  <h3>4</h3>
                </div>
              </div>

              <div className="simple-panel">
                <h2>Recent Activity</h2>
                <ul>
                  <li>New shift added</li>
                  <li>Manager updated</li>
                  <li>Complaint resolved</li>
                </ul>
              </div>
            </>
          )}

          {active === "staff" && <Managestaff />}
          {active === "shifts" && <Manageshift />}
        </div>
      </main>
    </div>
  );
}

export default Dashboard;