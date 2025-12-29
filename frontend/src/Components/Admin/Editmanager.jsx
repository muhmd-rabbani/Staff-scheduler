import React, { useEffect, useState } from 'react';
import { Form, Button, Card, Row, Col } from 'react-bootstrap';
import api from '../../api';
import "./Editmanager.css";

function Editmanager({ id, onClose }) {
  const [manager, setManager] = useState({
    name: '',
    age: '',
    gender: '',
    phone: '',
    email: '',
    qualification: '',
    address: '',
    state: '',
    pincode: ''
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchManager = async () => {
      try {
        const res = await api.get(`/Manager/${id}`);
        setManager(res.data.manager);
        setLoading(false);
      } catch (error) {
        alert('Failed to load manager data');
        onClose();
      }
    };

    fetchManager();
  }, [id, onClose]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setManager({ ...manager, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/Manager/update/${id}`, manager);
      alert('Manager updated successfully');
      onClose();
    } catch (error) {
      alert('Update failed');
    }
  };

  if (loading) {
    return <p className="text-center mt-5">Loading...</p>;
  }

  return (
    <div className="edit-manager-page mt-4">
      <Card className="edit-manager-card p-4 shadow">
        <h3 className="mb-4">Edit Manager</h3>

        <Form onSubmit={handleSubmit}>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  name="name"
                  value={manager.name}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Age</Form.Label>
                <Form.Control
                  type="number"
                  name="age"
                  value={manager.age}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Gender</Form.Label>
                <Form.Select
                  name="gender"
                  value={manager.gender}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </Form.Select>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Phone</Form.Label>
                <Form.Control
                  name="phone"
                  value={manager.phone}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={manager.email}
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
                  value={manager.qualification}
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
              value={manager.address}
              onChange={handleChange}
            />
          </Form.Group>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>State</Form.Label>
                <Form.Control
                  name="state"
                  value={manager.state}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Pincode</Form.Label>
                <Form.Control
                  name="pincode"
                  value={manager.pincode}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>

          <div className="d-flex gap-3">
            <Button type="submit" variant="primary">
              Update
            </Button>

            <Button variant="secondary" onClick={onClose}>
              Cancel
            </Button>
          </div>
        </Form>
      </Card>
    </div>
  );
}

export default Editmanager;
