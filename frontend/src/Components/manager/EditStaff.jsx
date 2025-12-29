import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import api from "../../api";

function EditStaff({ show, onHide, staff, onUpdated }) {
  const [departments, setDepartments] = useState([]);
  const [form, setForm] = useState({});

  useEffect(() => {
    if (staff) setForm(staff);
  }, [staff]);

  useEffect(() => {
    const fetchDepartments = async () => {
      const res = await api.get("/admin/department");
      setDepartments(res.data);
    };
    fetchDepartments();
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.put(`/staffs/updateStaff/${staff._id}`, form);
    alert("Staff updated successfully");
    onUpdated();
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Edit Staff</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Col md={6}>
              <Form.Control
                name="name"
                value={form.name || ""}
                onChange={handleChange}
                placeholder="Name"
              />
            </Col>
            <Col md={6}>
              <Form.Control
                name="age"
                value={form.age || ""}
                onChange={handleChange}
                placeholder="Age"
              />
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={6}>
              <Form.Select
                name="gender"
                value={form.gender || ""}
                onChange={handleChange}
              >
                <option value="">Gender</option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </Form.Select>
            </Col>
            <Col md={6}>
              <Form.Control
                name="phone"
                value={form.phone || ""}
                onChange={handleChange}
                placeholder="Phone"
              />
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={6}>
              <Form.Control
                name="email"
                value={form.email || ""}
                onChange={handleChange}
                placeholder="Email"
              />
            </Col>
            <Col md={6}>
              <Form.Control
                name="qualification"
                value={form.qualification || ""}
                onChange={handleChange}
                placeholder="Qualification"
              />
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={6}>
              <Form.Select
                name="department"
                value={form.department || ""}
                onChange={handleChange}
              >
                <option value="">Department</option>
                {departments.map((d) => (
                  <option key={d._id} value={d.DepartmentName}>
                    {d.DepartmentName}
                  </option>
                ))}
              </Form.Select>
            </Col>
            <Col md={6}>
              <Form.Control
                name="position"
                value={form.position || ""}
                onChange={handleChange}
                placeholder="Position"
              />
            </Col>
          </Row>

          <Form.Control
            className="mb-3"
            name="address"
            value={form.address || ""}
            onChange={handleChange}
            placeholder="Address"
          />

          <Row className="mb-3">
            <Col md={6}>
              <Form.Control
                name="state"
                value={form.state || ""}
                onChange={handleChange}
                placeholder="State"
              />
            </Col>
            <Col md={6}>
              <Form.Control
                name="pincode"
                value={form.pincode || ""}
                onChange={handleChange}
                placeholder="Pincode"
              />
            </Col>
          </Row>

          <div className="text-end">
            <Button variant="secondary" onClick={onHide} className="me-2">
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              Update Staff
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default EditStaff;
