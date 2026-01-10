import React, { useEffect, useState } from "react";
import { Button, Table, Card, Badge, Row, Col } from "react-bootstrap";
import api from "../../api";
import { useNavigate } from "react-router-dom";

function ViewAssignments() {
  const [assignments, setAssignments] = useState([]);
  const navigate = useNavigate();

  const fetchAssignments = async () => {
    try {
      const departmentId = localStorage.getItem("departmentId");
      const res = await api.get(`/shift/assign/${departmentId}`);
      setAssignments(res.data.assignments || []);
    } catch (error) {
      console.error("Failed to load assignments");
    }
  };

  useEffect(() => {
    fetchAssignments();
  }, []);

  const handleDeleteAssignment = async (id) => {
    if (!window.confirm("Remove this assignment?")) return;
    try {
      await api.delete(`/shift/assignment/${id}`);
      fetchAssignments();
      alert("Assignment removed");
    } catch (error) {
      alert("Failed to remove assignment");
    }
  };

  const getStatus = (startDate, endDate) => {
    const today = new Date();
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    if (today >= start && today <= end) return { text: "Active", variant: "success" };
    if (today < start) return { text: "Upcoming", variant: "warning" };
    return { text: "Completed", variant: "secondary" };
  };

  return (
    <div className="container pt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2>Shift Assignments</h2>
          <p className="text-muted">View all shift assignments</p>
        </div>
        <div className="d-flex gap-2">
          <Button variant="primary" onClick={() => navigate('/manager/assign-shift')}>
            + New Assignment
          </Button>
          <Button variant="secondary" onClick={() => navigate('/manager/shifts')}>
            Back to Shifts
          </Button>
        </div>
      </div>

      <Card>
        <Card.Body>
          <Table responsive hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Staff Name</th>
                <th>Shift</th>
                <th>Assignment Period</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {assignments.map((assignment, index) => {
                const status = getStatus(assignment.startDate, assignment.endDate);
                return (
                  <tr key={assignment._id}>
                    <td>{index + 1}</td>
                    <td>
                      <strong>{assignment.staffId?.name || "Unknown"}</strong>
                      <div className="small text-muted">{assignment.staffId?.email}</div>
                    </td>
                    <td>
                      <Badge bg="primary">
                        {assignment.shiftId?.shiftName || "Unknown"}
                      </Badge>
                      <div className="small">
                        {assignment.shiftId?.date} - {assignment.shiftId?.startTime} to {assignment.shiftId?.endTime}
                      </div>
                    </td>
                    <td>
                      <div className="small">
                        <div>From: {new Date(assignment.startDate).toLocaleDateString()}</div>
                        <div>To: {new Date(assignment.endDate).toLocaleDateString()}</div>
                      </div>
                    </td>
                    <td>
                      <Badge bg={status.variant}>{status.text}</Badge>
                    </td>
                    <td>
                      <Button
                        size="sm"
                        variant="outline-danger"
                        onClick={() => handleDeleteAssignment(assignment._id)}
                      >
                        Remove
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>

          {assignments.length === 0 && (
            <div className="text-center py-5">
              <h4 className="text-muted">No assignments found</h4>
              <p className="text-muted mb-3">Start by assigning shifts to your staff</p>
              <Button variant="primary" onClick={() => navigate('/manager/assign-shift')}>
                Assign Your First Shift
              </Button>
            </div>
          )}
        </Card.Body>
      </Card>
    </div>
  );
}

export default ViewAssignments;