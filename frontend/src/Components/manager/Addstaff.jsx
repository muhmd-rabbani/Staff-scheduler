import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col, Card } from "react-bootstrap";
import api from "../../api";

function Addstaff({ onClose }) {
  const [departments, setDepartments] = useState([]);

  const [form, setForm] = useState({
    name: "",
    age: "",
    gender: "",
    phone: "",
    email: "",
    qualification: "",
    department: "",
    position: "",
    password: "",
    address: "",
    state: "",
    pincode: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const res = await api.get("/admin/department");
        setDepartments(res.data);
      } catch {
        alert("Failed to load departments");
      }
    };
    fetchDepartments();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.department) return alert("Select department");
    if (form.password.length < 6) return alert("Password too short");

    try {
      await api.post("/staffs/addStaffs", form);
      alert("Staff added successfully");
      onClose();
    } catch {
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
                <Form.Control
                  name="name"
                  placeholder="Enter name"
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group>
                <Form.Label>Age</Form.Label>
                <Form.Control
                  name="age"
                  placeholder="Enter age"
                  onChange={handleChange}
                />
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
                <Form.Control
                  name="phone"
                  placeholder="Phone number"
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={6}>
              <Form.Group>
                <Form.Label>Email</Form.Label>
                <Form.Control
                  name="email"
                  type="email"
                  placeholder="Email address"
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group>
                <Form.Label>Qualification</Form.Label>
                <Form.Control
                  name="qualification"
                  placeholder="Qualification"
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={6}>
              <Form.Group>
                <Form.Label>Department</Form.Label>
                <Form.Select name="department" onChange={handleChange}>
                  <option value="">Select Department</option>
                  {departments.map((d) => (
                    <option key={d._id} value={d.DepartmentName}>
                      {d.DepartmentName}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group>
                <Form.Label>Position</Form.Label>
                <Form.Control
                  name="position"
                  placeholder="Position"
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-3">
            <Form.Label>Address</Form.Label>
            <Form.Control
              as="textarea"
              rows={2}
              name="address"
              placeholder="Address"
              onChange={handleChange}
            />
          </Form.Group>

          <Row className="mb-3">
            <Col md={6}>
              <Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  placeholder="Password"
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group>
                <Form.Label>State</Form.Label>
                <Form.Control
                  name="state"
                  placeholder="State"
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-4">
            <Form.Label>Pincode</Form.Label>
            <Form.Control
              name="pincode"
              placeholder="Pincode"
              onChange={handleChange}
            />
          </Form.Group>

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
