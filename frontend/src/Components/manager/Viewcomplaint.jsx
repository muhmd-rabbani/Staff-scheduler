import React from "react";
// import "./Dashboard.css"; // reuse same styles

function Viewcomplaint() {
  const complaints = [
    {
      id: "#1001",
      from: "J. Mathew",
      subject: "Shift swap request",
      status: "open",
      date: "2025-11-28",
    },
    {
      id: "#1000",
      from: "S. George",
      subject: "Late login",
      status: "closed",
      date: "2025-11-27",
    },
    {
      id: "#0999",
      from: "A. Rahman",
      subject: "Leave approval delay",
      status: "open",
      date: "2025-11-26",
    },
  ];

  return (
    <div className="ds-panel">
      <h2>All Complaints</h2>

      <table className="ds-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>From</th>
            <th>Subject</th>
            <th>Status</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {complaints.map((c) => (
            <tr key={c.id}>
              <td>{c.id}</td>
              <td>{c.from}</td>
              <td>{c.subject}</td>
              <td>
                <span className={`status ${c.status}`}>
                  {c.status === "open" ? "Open" : "Closed"}
                </span>
              </td>
              <td>{c.date}</td>
              <td>
                <button className="view-btn">View</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Viewcomplaint;