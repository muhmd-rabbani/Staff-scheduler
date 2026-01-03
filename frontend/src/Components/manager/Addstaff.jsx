import React, { useState } from "react";
import { Form, Button, Row, Col, Card } from "react-bootstrap";
import api from "../../api";

function Addstaff({ onClose }) {
  const [form, setForm] = useState({
    name: "",
    age: "",
    gender: "",
    phone: "",
    email: "",
    qualification: "",
    position: "",
    password: "",
    address: "",
    state: "",
    pincode: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password.length < 6)
      return alert("Password must be at least 6 characters");

    try {
      const managerId = localStorage.getItem("managerId");

      if (!managerId) {
        alert("Manager not found");
        return;
      }

      await api.post("/staffs/addStaffs", {
        ...form,
        managerId
      });

      alert("Staff added successfully");
      onClose();
    } catch (error) {
      console.log(error);
      alert("Failed to add staff");
    }
  };

  return (
    <Card className="shadow-sm">
      <Card.Body>
        <Card.Title className="mb-4">Add Staff</Card.Title>

        <Form onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Col md={6}>
              <Form.Group>
                <Form.Label>Name</Form.Label>
                <Form.Control name="name" onChange={handleChange} />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group>
                <Form.Label>Age</Form.Label>
                <Form.Control name="age" onChange={handleChange} />
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={6}>
              <Form.Group>
                <Form.Label>Gender</Form.Label>
                <Form.Select name="gender" onChange={handleChange}>
                  <option value="">Select</option>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </Form.Select>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group>
                <Form.Label>Phone</Form.Label>
                <Form.Control name="phone" onChange={handleChange} />
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={6}>
              <Form.Group>
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" name="email" onChange={handleChange} />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group>
                <Form.Label>Qualification</Form.Label>
                <Form.Control name="qualification" onChange={handleChange} />
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={6}>
              <Form.Group>
                <Form.Label>Position</Form.Label>
                <Form.Control name="position" onChange={handleChange} />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-3">
            <Form.Label>Address</Form.Label>
            <Form.Control as="textarea" rows={2} name="address" onChange={handleChange} />
          </Form.Group>

          <Row className="mb-3">
            <Col md={6}>
              <Form.Group>
                <Form.Label>State</Form.Label>
                <Form.Control name="state" onChange={handleChange} />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group>
                <Form.Label>Pincode</Form.Label>
                <Form.Control name="pincode" onChange={handleChange} />
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

export default Addstaff;
