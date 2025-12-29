import React, { useState, useEffect } from "react";
import { Card, Form, Button, Row, Col } from "react-bootstrap";
import api from "../../api";

function Addmanager({ onClose }) {
  const [departments, setDepartments] = useState([]);

  const [form, setForm] = useState({
    name: "",
    age: "",
    gender: "",
    phone: "",
    email: "",
    qualification: "",
    address: "",
    state: "",
    pincode: "",
    department: "",
    password: "",
    cpassword: "",
  });

  /* INPUT CHANGE */
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  /* FETCH DEPARTMENTS */
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

  /* SUBMIT */
  const addmanager = async (e) => {
    e.preventDefault();

    if (!form.department) return alert("Select department");
    if (form.password.length < 6) return alert("Password min 6 chars");
    if (form.password !== form.cpassword) return alert("Passwords not matching");

    try {
      await api.post("/Manager/addManager", form);
      alert("Manager added successfully");
      onClose?.();
    } catch {
      alert("Failed to add manager");
    }
  };

  return (
    <Row className="justify-content-center mt-4">
      <Col xl={8} lg={9} md={10}>
        <Card className="shadow-sm">
          <Card.Body>
            <h3 className="text-center mb-4">Add Manager</h3>

            <Form onSubmit={addmanager}>
              {/* ROW 1 */}
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Name</Form.Label>
                    <Form.Control name="name" onChange={handleChange} required />
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Age</Form.Label>
                    <Form.Control
                      type="number"
                      name="age"
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>

              {/* ROW 2 */}
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Gender</Form.Label>
                    <Form.Select name="gender" onChange={handleChange} required>
                      <option value="">Select</option>
                      <option>Male</option>
                      <option>Female</option>
                      <option>Other</option>
                    </Form.Select>
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Phone</Form.Label>
                    <Form.Control name="phone" onChange={handleChange} required />
                  </Form.Group>
                </Col>
              </Row>

              {/* ROW 3 */}
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Qualification</Form.Label>
                    <Form.Control
                      name="qualification"
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
              </Row>

              {/* ROW 4 */}
              <Row>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={2}
                      name="address"
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
              </Row>

              {/* ROW 5 */}
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>State</Form.Label>
                    <Form.Control name="state" onChange={handleChange} />
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Pincode</Form.Label>
                    <Form.Control name="pincode" onChange={handleChange} />
                  </Form.Group>
                </Col>
              </Row>

              {/* ROW 6 */}
              <Row>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label>Department</Form.Label>
                    <Form.Select
                      name="department"
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select Department</option>
                      {departments.map((dept) => (
                        <option key={dept._id} value={dept.DepartmentName}>
                          {dept.DepartmentName}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>

              {/* ROW 7 */}
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      name="password"
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                      type="password"
                      name="cpassword"
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>

              {/* ACTIONS */}
              <Row className="mt-4">
                <Col className="d-flex justify-content-end gap-3">
                  <Button variant="secondary" onClick={onClose}>
                    Cancel
                  </Button>
                  <Button type="submit" variant="primary">
                    Add Manager
                  </Button>
                </Col>
              </Row>
            </Form>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}

export default Addmanager;
