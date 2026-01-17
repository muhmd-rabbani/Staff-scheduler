import React, { useEffect, useState } from "react";
import "./Managerdashboard.css";

import Managestaff from "./Managestaff";
import Manageshift from "./Manageshift";
import Addshift from "./Addshift";
import AssignShift from "./AssignShift";
import api from "../../api";
import { useNavigate } from "react-router-dom";
import Requests from "../Admin/Requests";
import MRequests from "./MRequests";
import MAttendance from "./MAttendance";

function Dashboard() {
  const [active, setActive] = useState("dashboard");
  const [managerName, setManagerName] = useState("");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  useEffect(() => {
    const fetchManager = async () => {
      try {
        const loginId = localStorage.getItem("loginId");
        if (!loginId) {
          alert("Login required");
          return;
        }

        const res = await api.get(`/Manager/bylogin/${loginId}`);

        // store only IDs
        localStorage.setItem("managerId", res.data._id);
        localStorage.setItem("departmentId", res.data.department);

        // keep name in state
        setManagerName(res.data.name);
      } catch (error) {
        console.log(error);
        alert("Failed to load manager data");
      }
    };

    fetchManager();
  }, []);

  return (
    <div className="simple-container">
      {/* LEFT SIDEBAR */}
      <aside className="simple-sidebar">
        <h2 className="simple-logo">Manager</h2>

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
            Staffs
          </button>

          <button
            className={active === "Attendance" ? "active" : ""}
            onClick={() => setActive("Attendance")}
          >
            Attendance
          </button>

          <button
            className={active === "shifts" ? "active" : ""}
            onClick={() => setActive("shifts")}
          >
            Shifts
          </button>

          <button
            className={active === "assign" ? "active" : ""}
            onClick={() => setActive("assign")}
          >
            Assign Shift
          </button>

          <button
            className={active === "complaints" ? "active" : ""}
            onClick={() => setActive("complaints")}
          >
            Complaints
          </button>
          <button
            className={`nav-item ${active === "Requests" ? "active" : ""}`}
            onClick={() => setActive("Requests")}
          >
            Requests
          </button>

          <button onClick={handleLogout}>Log out</button>
        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <main className="simple-main">
        <header className="simple-header">
          <div>
            <h1>
              {active === "dashboard"
                ? "Dashboard"
                : active.charAt(0).toUpperCase() + active.slice(1)}
            </h1>

            <p className="manager-name">
              Welcome, <strong>{managerName}</strong>
            </p>
          </div>
        </header>

        <div className="simple-content">
          {active === "dashboard" && (
            <>
              <div className="simple-cards">
                <div className="simple-card">
                  <p>Total Staff</p>
                  <h3>—</h3>
                </div>

                <div className="simple-card">
                  <p>Active Shifts</p>
                  <h3>—</h3>
                </div>

                <div className="simple-card">
                  <p>Pending Complaints</p>
                  <h3>—</h3>
                </div>
              </div>

              <div className="simple-panel">
                <h2>Recent Activity</h2>
                <ul>
                  <li>Staff added</li>
                  <li>Shift updated</li>
                </ul>
              </div>
            </>
          )}

          {active === "staff" && <Managestaff />}
          {active === "add-shifts" && <Addshift />}
          {active === "shifts" && <Manageshift />}
          {active === "assign" && <AssignShift />}
          {active === "Requests" && <MRequests  />}
          {active === "Attendance" && <MAttendance/>}
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
