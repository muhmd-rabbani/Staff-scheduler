import React, { useState, useEffect } from "react";
import { Table, Button, Row, Col } from "react-bootstrap";
import Addstaff from "./Addstaff";
import EditStaff from "./EditStaff";
import api from "../../api";

function Managestaff() {
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [staffs, setStaffs] = useState([]);
  const [selectedStaff, setSelectedStaff] = useState(null);

  const fetchStaffs = async () => {
    try {
      const res = await api.get("/staff/staff");
      setStaffs(res.data.staffs);
    } catch (error) {
      alert("Failed to load staffs");
    }
  };

  useEffect(() => {
    fetchStaffs();
  }, []);

  return (
    <div className="manage-staff">
      <Row className="align-items-center mb-3">
        <Col>
          <h2>Employees</h2>
        </Col>

        <Col className="text-end">
          <Button onClick={() => setShowAddForm(true)}>
            + Add Staff
          </Button>
        </Col>
      </Row>

      {/* ADD STAFF */}
      {showAddForm && (
        <Addstaff
          onClose={() => {
            setShowAddForm(false);
            fetchStaffs();
          }}
        />
      )}

      {/* STAFF TABLE */}
      {!showAddForm && (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Qualification</th>
              <th>Position</th>
              <th>Department</th>
              <th>Age</th>
              <th>Gender</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Address</th>
              <th>State</th>
              <th>Pincode</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {staffs.length > 0 ? (
              staffs.map((staff, index) => (
                <tr key={staff._id}>
                  <td>{index + 1}</td>
                  <td>{staff.name}</td>
                  <td>{staff.qualification}</td>
                  <td>{staff.position}</td>
                  <td>{staff.department}</td>
                  <td>{staff.age}</td>
                  <td>{staff.gender}</td>
                  <td>{staff.phone}</td>
                  <td>{staff.email}</td>
                  <td>{staff.address}</td>
                  <td>{staff.state}</td>
                  <td>{staff.pincode}</td>
                  <td>
                    <Button
                      size="sm"
                      variant="primary"
                      className="me-2"
                      onClick={() => {
                        setSelectedStaff(staff);
                        setShowEdit(true);
                      }}
                    >
                      Edit Staff
                    </Button>

                    <Button size="sm" variant="danger">
                      Delete
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="13" className="text-center">
                  No staff found
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      )}

      {/* EDIT STAFF MODAL */}
      <EditStaff
        show={showEdit}
        staff={selectedStaff}
        onHide={() => setShowEdit(false)}
        onUpdated={fetchStaffs}
      />
    </div>
  );
}

export default Managestaff;
