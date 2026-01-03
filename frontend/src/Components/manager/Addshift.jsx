import React, { useState } from "react";
import { Form, Button, Row, Col, Card } from "react-bootstrap";
import api from "../../api";

function Addshift({ onClose }) {
  const [form, setForm] = useState({
    shiftName: "",
    date: "",
    startTime: "",
    endTime: ""
  });

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
    onClose && onClose();
  } catch (error) {
    console.log(error);
    alert("Failed to add shift");
  }
};

  return (
    <Card className="shadow-sm">
      <Card.Body>
        <Card.Title className="mb-4">Add Shift</Card.Title>

        <Form onSubmit={handleSubmit} className="text-white">
          <Row className="mb-3 ">
            <Col md={6}>
              <Form.Group>
                <Form.Label>Shift Name</Form.Label>
                <Form.Control
                  name="shiftName"
                  placeholder="Enter shift name"
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group>
                <Form.Label>Date</Form.Label>
                <Form.Control
                  type="date"
                  name="date"
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-4">
            <Col md={6}>
              <Form.Group>
                <Form.Label>Start Time</Form.Label>
                <Form.Control
                  type="time"
                  name="startTime"
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group>
                <Form.Label>End Time</Form.Label>
                <Form.Control
                  type="time"
                  name="endTime"
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>

          <div className="d-flex justify-content-end gap-2">
            <Button variant="secondary" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              Submit
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default Addshift;