import React, { useState } from "react";
import "./Dashboard.css";
import ManageManeger from "./ManageManeger";
import Viewstaff from "./Viewstaff";
import Viewshift from "./Viewshift";
import Viewcomplaint from "./Viewcomplaint";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [active, setActive] = useState("dashboard");
  const [collapsed, setCollapsed] = useState(false);
  const toggleCollapse = () => setCollapsed((s) => !s);
  const navigate = useNavigate()
  const handleLogout = () => {
  localStorage.clear();
  navigate('/')
  
}

  return (
    <div className={`ds-root ${collapsed ? "collapsed" : ""}`}>
      <aside className="ds-sidebar">
        <div className="ds-brand">
          <div className="logo">SS</div>
          <div className="brand-text">
            <span>Staff</span>
            <strong>Scheduler</strong>
          </div>
        </div>

        <div className="ds-search-wrap">
          <input className="ds-search" placeholder="Search..." />
        </div>

        <nav className="ds-nav">
          <button
            className={`nav-item ${active === "dashboard" ? "active" : ""}`}
            onClick={() => setActive("dashboard")}
          >
            Dashboard
          </button>

          <button
            className={`nav-item ${active === "managers" ? "active" : ""}`}
            onClick={() => setActive("managers")}
          >
            Managers
          </button>

          <button
            className={`nav-item ${active === "staff" ? "active" : ""}`}
            onClick={() => setActive("staff")}
          >
            Staffs
          </button>

          <button
            className={`nav-item ${active === "shifts" ? "active" : ""}`}
            onClick={() => setActive("shifts")}
          >
            Shifts
          </button>

          <button
            className={`nav-item ${active === "complaints" ? "active" : ""}`}
            onClick={() => setActive("complaints")}
          >
            Complaints
          </button>
          <button
            className="nav-item"
            onClick={handleLogout}>
            Log out
          </button>
        </nav>

        <div className="ds-footer">
          <small>v1.0 • © Staff Scheduler</small>
        </div>
      </aside>

      <main className="ds-main">
        <header className="ds-topbar">
          <div className="ds-top-left">
            <button className="collapse-btn" onClick={toggleCollapse} aria-label="Toggle menu">
              {/* <FiMenu /> */} ☰
            </button>
            <h1 className="page-title">{active === "dashboard" ? "Dashboard Overview" : active.charAt(0).toUpperCase() + active.slice(1)}</h1>
          </div>

          <div className="ds-top-right">
            <button className="top-icon">Docs</button>
            <button className="top-avatar">R</button>
          </div>
        </header>

        <section className="ds-content">
          {active === "dashboard" && (
            <>
              <div className="ds-cards">
                <div className="card">
                  <div className="card-title">Total Staff</div>
                  <div className="card-value">128</div>
                </div>

                <div className="card">
                  <div className="card-title">Total departments</div>
                  <div className="card-value">8</div>
                </div>

                <div className="card">
                  <div className="card-title">Open Complaints</div>
                  <div className="card-value">4</div>
                </div>

                <div className="card">
                  <div className="card-title">Managers</div>
                  <div className="card-value">12</div>
                </div>
              </div>

              <div className="ds-panel">
                <h2>Recent Complaints</h2>
                <table className="ds-table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>From</th>
                      <th>Subject</th>
                      <th>Status</th>
                      <th>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>#1001</td>
                      <td>J. Mathew</td>
                      <td>Shift swap request</td>
                      <td><span className="status open">Open</span></td>
                      <td>2025-11-28</td>
                    </tr>
                    <tr>
                      <td>#1000</td>
                      <td>S. George</td>
                      <td>Late login</td>
                      <td><span className="status closed">Closed</span></td>
                      <td>2025-11-27</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </>
          )}

          {active === "managers" && <ManageManeger />}
          {active === "staff" && <Viewstaff />}
          {active === "shifts" && <Viewshift />}
          {active === "complaints" && <Viewcomplaint />}
        </section>
      </main>
    </div>
  );
}

export default Dashboard;