import React, { useState } from "react";
import { Table, Button, Badge } from "react-bootstrap";
import "./Leaverequest.css";

function Leaverequest() {
  const [leaves, setLeaves] = useState([
    {
      id: 1,
      name: "Rahul",
      from: "2025-01-10",
      to: "2025-01-12",
      reason: "Family function",
      emergency: false,
      status: "Pending",
    },
    {
      id: 2,
      name: "Anjali",
      from: "2025-01-15",
      to: "2025-01-15",
      reason: "Hospital emergency",
      emergency: true,
      status: "Pending",
    },
    {
      id: 3,
      name: "Arjun",
      from: "2025-01-18",
      to: "2025-01-19",
      reason: "Personal work",
      emergency: false,
      status: "Pending",
    },
  ]);

  const updateStatus = (id, status) => {
    setLeaves((prev) =>
      prev.map((leave) =>
        leave.id === id ? { ...leave, status } : leave
      )
    );
  };

  return (
    <div className="leave-wrapper">
      <h3 className="leave-title mb-3">Leave Requests</h3>

      <Table bordered hover responsive className="leave-table text-center">
        <thead>
          <tr>
            <th>Employee</th>
            <th>From</th>
            <th>To</th>
            <th>Reason</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {leaves.map((leave) => (
            <tr
              key={leave.id}
              className={leave.emergency ? "emergency-row" : ""}
            >
              <td>
                {leave.name}
              </td>

              <td>{leave.from}</td>
              <td>{leave.to}</td>
              <td>{leave.reason}</td>

              <td>
                <Badge
                  bg={
                    leave.status === "Approved"
                      ? "success"
                      : leave.status === "Rejected"
                      ? "danger"
                      : "warning"
                  }
                >
                  {leave.status}
                  
                </Badge>
                {leave.emergency && (
                  <Badge bg="danger" className="ms-2">
                    Emergency
                  </Badge>
                )}
              </td>

              <td>
                <Button
                  size="sm"
                  variant="success"
                  className="me-2"
                  disabled={leave.status !== "Pending"}
                  onClick={() => updateStatus(leave.id, "Approved")}
                >
                  Approve
                </Button>

                <Button
                  size="sm"
                  variant="danger"
                  disabled={leave.status !== "Pending"}
                  onClick={() => updateStatus(leave.id, "Rejected")}
                >
                  Reject
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default Leaverequest;
