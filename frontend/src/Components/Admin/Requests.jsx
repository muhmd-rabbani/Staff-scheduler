import React, { useState } from "react";

function Requests() {
  const [requests] = useState([
    {
      id: "R001",
      employeeId: "EMP101",
      staffName: "J. Mathew",
      department: "HR",
      message: "Swap morning shift with John",
      status: "Pending",
    },
    {
      id: "R002",
      employeeId: "EMP102",
      staffName: "S. George",
      department: "Finance",
      message: "Leave request for 2 days",
      status: "Pending",
    },
    {
      id: "R003",
      employeeId: "EMP103",
      staffName: "John Doe",
      department: "IT",
      message: "Permission for late login",
      status: "Approved",
    },
  ]);

  return (
    <div className="mainmanager pt-4">
      <div className="container pt-4 managerpage pb-5">

        {/* HEADER */}
        <h1 className="hd1">Requests</h1>

        {/* TABLE */}
        <table className="table my-table mt-4">
          <thead>
            <tr>
              <th>Request ID</th>
              <th>Employee ID</th>
              <th>Staff Name</th>
              <th>Department</th>
              <th>Message</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {requests.map((req) => (
              <tr key={req.id}>
                <td>{req.id}</td>
                <td>{req.employeeId}</td>
                <td>{req.staffName}</td>
                <td>{req.department}</td>
                <td>{req.message}</td>
                <td>
                  <span
                    className={
                      req.status === "Pending"
                        ? "text-warning"
                        : req.status === "Approved"
                        ? "text-success"
                        : "text-danger"
                    }
                  >
                    {req.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>
    </div>
  );
}

export default Requests;