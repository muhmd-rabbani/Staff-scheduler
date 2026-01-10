// import React, { useEffect, useState } from "react";
// import { Button, Form, Row, Col, Card } from "react-bootstrap";
// import api from "../../api";


// function AssignShift() {
//   const [shifts, setShifts] = useState([]);
//   const [staffs, setStaffs] = useState([]);

//   const [selectedShift, setSelectedShift] = useState("");
//   const [selectedStaff, setSelectedStaff] = useState([]);

//   const [startDate, setStartDate] = useState("");
//   const [endDate, setEndDate] = useState("");

//   /* 🔹 Load shifts & staff */
//   useEffect(() => {
//     const departmentId = localStorage.getItem("departmentId");
//     const managerId = localStorage.getItem("managerId");

//     api.get(`/shift/by-department/${departmentId}`)
//       .then(res => setShifts(res.data.shifts))
//       .catch(() => alert("Failed to load shifts"));
      

//     api.get(`/staffs/by-manager/${managerId}`)
//       .then(res => setStaffs(res.data.staffs))
//       .catch(() => alert("Failed to load staff"));
//   }, []);

//   /* 🔹 Toggle staff checkbox */
//   const toggleStaff = (id) => {
//     setSelectedStaff(prev =>
//       prev.includes(id)
//         ? prev.filter(s => s !== id)
//         : [...prev, id]
//     );
//   };

//   /* 🔹 Assign shift */
//   const handleAssign = async () => {
//     if (!selectedShift || !startDate || !endDate || selectedStaff.length === 0) {
//       return alert("Please fill all fields");
//     }

//     if (new Date(endDate) < new Date(startDate)) {
//       return alert("End date cannot be before start date");
//     }

//     try {
//       await api.post("/shift/assign", {
//         shiftId: selectedShift,
//         staffIds: selectedStaff,
//         startDate,
//         endDate,
//         managerId: localStorage.getItem("managerId")
//       });

//       alert("Shift assigned successfully");

//       // reset
//       setSelectedShift("");
//       setSelectedStaff([]);
//       setStartDate("");
//       setEndDate("");

//     } catch (error) {
//       alert("Assignment failed");
//     }
//   };

//   return (
//     <div className="container py-4">

//       <Card className="shadow">
//         <Card.Body>

//           <h3 className="mb-4 text-center">Assign Shift to Staff</h3>

//           {/* 🔹 SHIFT SELECTION */}
//           <Form.Group className="mb-3">
//             <Form.Label>Select Shift</Form.Label>
//             <Form.Select
//               value={selectedShift}
//               onChange={(e) => setSelectedShift(e.target.value)}
//             >
//               <option value="">-- Select Shift --</option>
//               {shifts.map(shift => (
//                 <option key={shift._id} value={shift._id}>
//                   {shift.shiftName} ({shift.startTime} - {shift.endTime})
//                 </option>
//               ))}
//             </Form.Select>
//           </Form.Group>

//           {/* 🔹 DATE RANGE */}
//           <Row className="mb-3">
//             <Col md={6}>
//               <Form.Group>
//                 <Form.Label>Start Date</Form.Label>
//                 <Form.Control
//                   type="date"
//                   value={startDate}
//                   onChange={(e) => setStartDate(e.target.value)}
//                 />
//               </Form.Group>
//             </Col>

//             <Col md={6}>
//               <Form.Group>
//                 <Form.Label>End Date</Form.Label>
//                 <Form.Control
//                   type="date"
//                   value={endDate}
//                   onChange={(e) => setEndDate(e.target.value)}
//                 />
//               </Form.Group>
//             </Col>
//           </Row>

//           {/* 🔹 STAFF SELECTION */}
//           <Form.Group className="mb-3">
//             <Form.Label>Select Staff</Form.Label>

//             <div
//               className="border rounded p-3"
//               style={{ maxHeight: "250px", overflowY: "auto" }}
//             >
//               {staffs.length > 0 ? (
//                 staffs.map(staff => (
//                   <Form.Check
//                     key={staff._id}
//                     type="checkbox"
//                     label={staff.name}
//                     checked={selectedStaff.includes(staff._id)}
//                     onChange={() => toggleStaff(staff._id)}
//                   />
//                 ))
//               ) : (
//                 <p className="text-muted">No staff available</p>
//               )}
//             </div>
//           </Form.Group>

//           {/* 🔹 ACTION BUTTON */}
//           <div className="text-center mt-4">
//             <Button variant="success" onClick={handleAssign}>
//               Assign Shift
//             </Button>
//           </div>

//         </Card.Body>
//       </Card>

//     </div>
//   );
// }

// export default AssignShift;
import React, { useEffect, useState } from "react";
import { Button, Form, Row, Col, Card } from "react-bootstrap";
import api from "../../api";
import { useNavigate } from "react-router-dom";

function AssignShift() {
  const [shifts, setShifts] = useState([]);
  const [staffs, setStaffs] = useState([]);
  const [selectedShift, setSelectedShift] = useState("");
  const [selectedStaff, setSelectedStaff] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const departmentId = localStorage.getItem("departmentId");
    const managerId = localStorage.getItem("managerId");

    api.get(`/shift/by-department/${departmentId}`)
      .then(res => setShifts(res.data.shifts))
      .catch(() => alert("Failed to load shifts"));

    api.get(`/staffs/by-manager/${managerId}`)
      .then(res => setStaffs(res.data.staffs))
      .catch(() => alert("Failed to load staff"));
  }, []);

  const toggleStaff = (id) => {
    setSelectedStaff(prev =>
      prev.includes(id)
        ? prev.filter(s => s !== id)
        : [...prev, id]
    );
  };

  const handleAssign = async () => {
    if (!selectedShift || !startDate || !endDate || selectedStaff.length === 0) {
      return alert("Please fill all fields");
    }

    if (new Date(endDate) < new Date(startDate)) {
      return alert("End date cannot be before start date");
    }

    try {
      await api.post("/shift/assign", {
        shiftId: selectedShift,
        staffIds: selectedStaff,
        startDate,
        endDate,
        managerId: localStorage.getItem("managerId")
      });

      alert("Shift assigned successfully");
      navigate('/manager/view-assignments');
    } catch (error) {
      alert("Assignment failed");
    }
  };

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2>Assign Shift to Staff</h2>
          <p className="text-muted">Assign shifts to your staff members</p>
        </div>
        <Button variant="secondary" onClick={() => navigate('/manager/shifts')}>
          Back to Shifts
        </Button>
      </div>

      <Card className="shadow">
        <Card.Body>
          <Form.Group className="mb-3">
            <Form.Label>Select Shift</Form.Label>
            <Form.Select
              value={selectedShift}
              onChange={(e) => setSelectedShift(e.target.value)}
            >
              <option value="">-- Select Shift --</option>
              {shifts.map(shift => (
                <option key={shift._id} value={shift._id}>
                  {shift.shiftName} ({shift.startTime} - {shift.endTime})
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Row className="mb-3">
            <Col md={6}>
              <Form.Group>
                <Form.Label>Start Date</Form.Label>
                <Form.Control
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>End Date</Form.Label>
                <Form.Control
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-3">
            <Form.Label>Select Staff</Form.Label>
            <div className="border rounded p-3" style={{ maxHeight: "250px", overflowY: "auto" }}>
              {staffs.map(staff => (
                <Form.Check
                  key={staff._id}
                  type="checkbox"
                  label={`${staff.name} (${staff.email})`}
                  checked={selectedStaff.includes(staff._id)}
                  onChange={() => toggleStaff(staff._id)}
                />
              ))}
            </div>
          </Form.Group>

          <div className="d-flex justify-content-between mt-4">
            <Button variant="secondary" onClick={() => navigate('/manager/shifts')}>
              Cancel
            </Button>
            <Button variant="success" onClick={handleAssign}>
              Assign Shift
            </Button>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}

export default AssignShift;