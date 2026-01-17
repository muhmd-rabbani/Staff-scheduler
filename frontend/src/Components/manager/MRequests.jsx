// import React, { useState } from "react";
// import { Modal, Button, Form } from "react-bootstrap";

// function MRequests() {
//   const [requests, setRequests] = useState([
//     {
//       id: "R001",
//       employeeId: "EMP101",
//       staffName: "J. Mathew",
//       department: "HR",
//       message: "Swap morning shift with John",
//       status: "Pending",
//     },
//     {
//       id: "R002",
//       employeeId: "EMP102",
//       staffName: "S. George",
//       department: "Finance",
//       message: "Leave request for 2 days",
//       status: "Pending",
//     },
//     {
//       id: "R003",
//       employeeId: "EMP103",
//       staffName: "John Doe",
//       department: "IT",
//       message: "Permission for late login",
//       status: "Approved",
//     },
//   ]);

//   const [showModal, setShowModal] = useState(false);
//   const [selectedRequest, setSelectedRequest] = useState(null);
//   const [remark, setRemark] = useState("");

//   // Open modal
//   const handleOpen = (request) => {
//     setSelectedRequest(request);
//     setShowModal(true);
//   };

//   // Close modal
//   const handleClose = () => {
//     setShowModal(false);
//     setSelectedRequest(null);
//     setRemark("");
//   };

//   // Approve
//   const handleApprove = () => {
//     setRequests((prev) =>
//       prev.map((req) =>
//         req.id === selectedRequest.id
//           ? { ...req, status: "Approved" }
//           : req
//       )
//     );
//     handleClose();
//   };

//   // Reject
//   const handleReject = () => {
//     setRequests((prev) =>
//       prev.map((req) =>
//         req.id === selectedRequest.id
//           ? { ...req, status: "Rejected" }
//           : req
//       )
//     );
//     handleClose();
//   };

//   return (
//     <div className="mainmanager pt-4">
//       <div className="container pt-4 managerpage pb-5">

//         {/* HEADER */}
//         <h1 className="hd1">Manage Requests</h1>

//         {/* TABLE */}
//         <table className="table my-table mt-4">
//           <thead>
//             <tr>
//               <th>Request ID</th>
//               <th>Employee ID</th>
//               <th>Staff Name</th>
//               <th>Department</th>
//               <th>Message</th>
//               <th>Status</th>
//               <th>Action</th>
//             </tr>
//           </thead>

//           <tbody>
//             {requests.map((req) => (
//               <tr key={req.id}>
//                 <td>{req.id}</td>
//                 <td>{req.employeeId}</td>
//                 <td>{req.staffName}</td>
//                 <td>{req.department}</td>
//                 <td>{req.message}</td>
//                 <td>
//                   <span
//                     className={
//                       req.status === "Pending"
//                         ? "text-warning"
//                         : req.status === "Approved"
//                         ? "text-success"
//                         : "text-danger"
//                     }
//                   >
//                     {req.status}
//                   </span>
//                 </td>
//                 <td>
//                   <Button
//                     variant="success"
//                     disabled={req.status !== "Pending"}
//                     onClick={() => handleOpen(req)}
//                   >
//                     Review
//                   </Button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>

//         {/* MODAL */}
//         <Modal show={showModal} onHide={handleClose} centered>
//           <Modal.Header closeButton>
//             <Modal.Title>Review Request</Modal.Title>
//           </Modal.Header>

//           <Modal.Body>
//             <Form>
//               <Form.Group>
//                 <Form.Label>Remark</Form.Label>
//                 <Form.Control
//                   as="textarea"
//                   rows={4}
//                   value={remark}
//                   onChange={(e) => setRemark(e.target.value)}
//                   placeholder="Enter your remark..."
//                 />
//               </Form.Group>
//             </Form>
//           </Modal.Body>

//           <Modal.Footer>
//             <Button variant="secondary" onClick={handleClose}>
//               Cancel
//             </Button>
//             <Button variant="danger" onClick={handleReject}>
//               Reject
//             </Button>
//             <Button variant="success" onClick={handleApprove}>
//               Approve
//             </Button>
//           </Modal.Footer>
//         </Modal>

//       </div>
//     </div>
//   );
// }

// export default MRequests;

import React, { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import api from "../../api"; // ✅ make sure this path is correct

function MRequests() {
  const [requests, setRequests] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [replyText, setReplyText] = useState("");
const formatDate = (date) => {
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(new Date(date));
};

  // 🔹 Fetch leave requests by department
  useEffect(() => {
    const fetchLeaves = async () => {
      try {
        const departmentId = localStorage.getItem("departmentId");
        if (!departmentId) return;

        const res = await api.get(
          `/staffs/leaveByDep/${departmentId}`
        );
console.log(res);

        setRequests(res.data.leaves);
      } catch (error) {
        console.log(error);
        alert("Failed to fetch leave requests");
      }
    };

    fetchLeaves();
  }, []);

  const handleOpen = (request) => {
    setSelectedRequest(request);
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setReplyText("");
    setSelectedRequest(null);
  };

  // 🔹 Approve leave (frontend-only for now)
  const handleApprove = () => {
    setRequests((prev) =>
      prev.map((req) =>
        req._id === selectedRequest._id
          ? { ...req, status: "Approved" }
          : req
      )
    );
    handleClose();
  };

  // 🔹 Reject leave (frontend-only for now)
  const handleReject = () => {
    setRequests((prev) =>
      prev.map((req) =>
        req._id === selectedRequest._id
          ? { ...req, status: "Rejected" }
          : req
      )
    );
    handleClose();
  };

  return (
    <div className="mainmanager pt-4">
      <div className="container pt-4 managerpage pb-5">

        <h1 className="hd1">Leave Requests</h1>

        <table className="table my-table mt-4">
          <thead>
            <tr>
              <th>#</th>
              <th>Staff Name</th>
              <th>Email</th>
              <th>Leave Type</th>
              <th>From</th>
              <th>To</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
<tbody>
  {requests.length > 0 ? (
    requests.map((req, index) => (
      <tr key={req._id}>
        <td>{index + 1}</td>
        <td>{req.staffId?.name}</td>
        <td>{req.staffId?.email}</td>
        <td>{req.leaveType}</td>
        <td>{formatDate(req.startDate)}</td>
        <td>{formatDate(req.endDate)}</td>
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
        <td>
          <Button
            variant="success"
            size="sm"
            disabled={req.status !== "Pending"}
            onClick={() => handleOpen(req)}
          >
            Review
          </Button>
        </td>
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan="8" style={{ textAlign: "center" }}>
        No leave requests found
      </td>
    </tr>
  )}
</tbody>

        </table>

        {/* MODAL */}
        <Modal show={showModal} onHide={handleClose} centered>
          <Modal.Header closeButton>
            <Modal.Title>Review Leave Request</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Form>
              <Form.Group>
  <Form.Label>Reason</Form.Label>
  <Form.Control
    type="text"
    value={selectedRequest?.reason || ""}
    readOnly
    placeholder="No reason provided"
  />
</Form.Group>

            </Form>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="danger" onClick={handleReject}>
              Reject
            </Button>
            <Button variant="success" onClick={handleApprove}>
              Approve
            </Button>
          </Modal.Footer>
        </Modal>

      </div>
    </div>
  );
}

export default MRequests;
