// import React, { useState } from "react";
// import { Form, Button, Row, Col, Card } from "react-bootstrap";
// import api from "../../api";

// function Addshift({ onClose }) {
//   const [form, setForm] = useState({
//     shiftName: "",
//     date: "",
//     startTime: "",
//     endTime: ""
//   });

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//  const handleSubmit = async (e) => {
//   e.preventDefault();

//   const departmentId = localStorage.getItem("departmentId");
//   if (!departmentId) {
//     alert("Department not found");
//     return;
//   }

//   try {
//     await api.post("/shift/add", {
//       ...form,
//       departmentId
//     });

//     alert("Shift Added Successfully");
//     onClose && onClose();
//   } catch (error) {
//     console.log(error);
//     alert("Failed to add shift");
//   }
// };

//   return (
//     <Card className="shadow-sm">
//       <Card.Body>
//         <Card.Title className="mb-4">Add Shift</Card.Title>

//         <Form onSubmit={handleSubmit} className="text-white">
//           <Row className="mb-3 ">
//             <Col md={6}>
//               <Form.Group>
//                 <Form.Label>Shift Name</Form.Label>
//                 <Form.Control
//                   name="shiftName"
//                   placeholder="Enter shift name"
//                   onChange={handleChange}
//                 />
//               </Form.Group>
//             </Col>

//             <Col md={6}>
//               <Form.Group>
//                 <Form.Label>Date</Form.Label>
//                 <Form.Control
//                   type="date"
//                   name="date"
//                   onChange={handleChange}
//                 />
//               </Form.Group>
//             </Col>
//           </Row>

//           <Row className="mb-4">
//             <Col md={6}>
//               <Form.Group>
//                 <Form.Label>Start Time</Form.Label>
//                 <Form.Control
//                   type="time"
//                   name="startTime"
//                   onChange={handleChange}
//                 />
//               </Form.Group>
//             </Col>

//             <Col md={6}>
//               <Form.Group>
//                 <Form.Label>End Time</Form.Label>
//                 <Form.Control
//                   type="time"
//                   name="endTime"
//                   onChange={handleChange}
//                 />
//               </Form.Group>
//             </Col>
//           </Row>

//           <div className="d-flex justify-content-end gap-2">
//             <Button variant="secondary" onClick={onClose}>
//               Cancel
//             </Button>
//             <Button type="submit" variant="primary">
//               Submit
//             </Button>
//           </div>
//         </Form>
//       </Card.Body>
//     </Card>
//   );
// }

// export default Addshift;
import React, { useState } from "react";
import { Form, Button, Card, Row, Col } from "react-bootstrap";
import api from "../../api";
import { useNavigate } from "react-router-dom";

function Addshift() {
  const [form, setForm] = useState({
    shiftName: "",
    date: "",
    startTime: "",
    endTime: ""
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const departmentId = localStorage.getItem("departmentId");
    if (!departmentId) {
      alert("Department not found");
      return;
    }

    try {
      await api.post("/shift/add", {
        ...form,
        departmentId
      });

      alert("Shift Added Successfully");
      navigate('/manager/shifts');
    } catch (error) {
      alert("Failed to add shift");
    }
  };

  return (
    <div className="container pt-4">
      <Card className="shadow-sm">
        <Card.Body>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <h2>Add New Shift</h2>
              <p className="text-muted">Create a new shift for your department</p>
            </div>
            <Button variant="secondary" onClick={() => navigate('/manager/shifts')}>
              Back to Shifts
            </Button>
          </div>

          <Form onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Shift Name *</Form.Label>
                  <Form.Control
                    name="shiftName"
                    placeholder="e.g., Morning Shift"
                    value={form.shiftName}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Date *</Form.Label>
                  <Form.Control
                    type="date"
                    name="date"
                    value={form.date}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-4">
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Start Time *</Form.Label>
                  <Form.Control
                    type="time"
                    name="startTime"
                    value={form.startTime}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>End Time *</Form.Label>
                  <Form.Control
                    type="time"
                    name="endTime"
                    value={form.endTime}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <div className="d-flex justify-content-end gap-2">
              <Button variant="secondary" onClick={() => navigate('/manager/shifts')}>
                Cancel
              </Button>
              <Button type="submit" variant="primary">
                Add Shift
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}

export default Addshift;