import React, { useEffect, useState } from "react";
import "./Managerdashboard.css";

import Managestaff from "./Managestaff";
import Manageshift from "./Manageshift";
import AssignShift from "./AssignShift";
import Viewcomplaint from "./Viewcomplaint";

import api from "../../api";
import { useNavigate } from "react-router-dom";

function Managerdashboard() {
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
        const res = await api.get(`/Manager/bylogin/${loginId}`);
        setManagerName(res.data.name);
      } catch (err) {
        console.log(err);
      }
    };

    fetchManager();
  }, []);

  return (
    <div className="manager-container">
      {/* SIDEBAR */}
      <aside className="manager-sidebar">
        <h2 className="manager-logo">Manager</h2>

        <nav className="manager-menu">
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

          <button onClick={handleLogout}>Log out</button>
        </nav>
      </aside>

      {/* MAIN */}
      <main className="manager-main">
        <header className="manager-header">
          <h1>
            {active === "dashboard"
              ? "Dashboard"
              : active.charAt(0).toUpperCase() + active.slice(1)}
          </h1>

          <p className="manager-name">
            Welcome, <strong>{managerName}</strong>
          </p>
        </header>

        <div className="manager-content">
          {active === "dashboard" && (
            <>
              <div className="manager-cards">
                <div className="manager-card">
                  <p>Total Staff</p>
                  <h3>—</h3>
                </div>
                <div className="manager-card">
                  <p>Active Shifts</p>
                  <h3>—</h3>
                </div>
                <div className="manager-card">
                  <p>Pending Complaints</p>
                  <h3>—</h3>
                </div>
              </div>

              <div className="manager-panel">
                <h2>Recent Activity</h2>
                <ul>
                  <li>Staff added</li>
                  <li>Shift updated</li>
                </ul>
              </div>
            </>
          )}

          {active === "staff" && <Managestaff />}
          {active === "shifts" && <Manageshift />}
          {active === "assign" && <AssignShift />}
          {active === "complaints" && <Viewcomplaint />}
        </div>
      </main>
    </div>
  );
}

export default Managerdashboard;