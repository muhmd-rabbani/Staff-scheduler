import React, { useEffect, useState } from "react";
import { Button, Table, Modal, Form, Card, Row, Col, Badge, Tabs, Tab } from "react-bootstrap";
import api from "../../api";

function Manageshift() {
  const [shifts, setShifts] = useState([]);
  const [staffs, setStaffs] = useState([]);
  const [assignedShifts, setAssignedShifts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState("add");
  const [selectedShift, setSelectedShift] = useState(null);
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [activeTab, setActiveTab] = useState("shifts");
  
  const [shiftForm, setShiftForm] = useState({
    shiftName: "",
    date: "",
    startTime: "",
    endTime: ""
  });
  
  const [assignForm, setAssignForm] = useState({
    shiftId: "",
    staffIds: [],
    startDate: "",
    endDate: ""
  });

  const fetchShifts = async () => {
    try {
      const departmentId = localStorage.getItem("departmentId");
      const res = await api.get(`/shift/by-department/${departmentId}`);
      setShifts(res.data.shifts);
    } catch (error) {
      alert("Failed to load shifts");
    }
  };

  const fetchStaffs = async () => {
    try {
      const managerId = localStorage.getItem("managerId");
      const res = await api.get(`/staffs/by-manager/${managerId}`);
      setStaffs(res.data.staffs);
    } catch (error) {
      console.error("Failed to load staffs");
    }
  };

  const fetchAssignedShifts = async () => {
    try {
      const departmentId = localStorage.getItem("departmentId");
      const res = await api.get(`/shift/assign/${departmentId}`);
      console.log("Assignments API Response:", res.data);
      setAssignedShifts(res.data.assignments || []);
    } catch (error) {
      console.error("Failed to load assigned shifts:", error);
    }
  };

  useEffect(() => {
    fetchShifts();
    fetchStaffs();
    fetchAssignedShifts();
  }, []);

  // CORRECTED: Get assigned staff count for a shift
  const getAssignedStaffCount = (shiftId) => {
    return assignedShifts.filter(a => 
      a.shift?._id === shiftId || a.shift === shiftId
    ).length;
  };

  // CORRECTED: Get shift name from assignment
  const getShiftName = (shift) => {
    if (!shift) return "Unknown Shift";
    if (typeof shift === 'string') {
      const foundShift = shifts.find(s => s._id === shift);
      return foundShift ? foundShift.shiftName : "Unknown Shift";
    }
    return shift.shiftName || "Unknown Shift";
  };

  // CORRECTED: Get staff name from assignment
  const getStaffName = (staff) => {
    if (!staff) return "Unknown Staff";
    if (typeof staff === 'string') {
      const foundStaff = staffs.find(s => s._id === staff);
      return foundStaff ? foundStaff.name : "Unknown Staff";
    }
    return staff.name || "Unknown Staff";
  };

  // CORRECTED: Get staff email
  const getStaffEmail = (staff) => {
    if (!staff) return "";
    if (typeof staff === 'string') {
      const foundStaff = staffs.find(s => s._id === staff);
      return foundStaff ? foundStaff.email : "";
    }
    return staff.email || "";
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this shift?")) return;
    try {
      await api.delete(`/shift/${id}`);
      fetchShifts();
      fetchAssignedShifts();
    } catch (error) {
      alert("Delete failed");
    }
  };

  const handleDeleteAssignment = async (assignmentId) => {
    if (!window.confirm("Remove this assignment?")) return;
    try {
      await api.delete(`/shift/assignment/${assignmentId}`);
      fetchAssignedShifts();
      alert("Assignment removed successfully");
    } catch (error) {
      alert("Failed to remove assignment");
    }
  };

  // Modal handlers (keep as is)
  const handleShowModal = (mode, shift = null, assignment = null) => {
    setModalMode(mode);
    setSelectedShift(shift);
    setSelectedAssignment(assignment);
    
    if (mode === "assign" && shift) {
      setAssignForm(prev => ({ ...prev, shiftId: shift._id }));
    }
    
    if (mode === "view" && shift) {
      setShiftForm({
        shiftName: shift.shiftName,
        date: shift.date,
        startTime: shift.startTime,
        endTime: shift.endTime
      });
    }
    
    if (mode === "editAssignment" && assignment) {
      // CORRECTED: Your API doesn't have startDate/endDate, only date
      setAssignForm({
        shiftId: assignment.shift?._id || assignment.shift,
        staffIds: [assignment.staff?._id || assignment.staff],
        startDate: assignment.date ? new Date(assignment.date).toISOString().split('T')[0] : "",
        endDate: assignment.date ? new Date(assignment.date).toISOString().split('T')[0] : ""
      });
    }
    
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedShift(null);
    setSelectedAssignment(null);
    setShiftForm({
      shiftName: "",
      date: "",
      startTime: "",
      endTime: ""
    });
    setAssignForm({
      shiftId: "",
      staffIds: [],
      startDate: "",
      endDate: ""
    });
  };

  // Add/Edit Shift handler (keep as is)
  const handleShiftSubmit = async (e) => {
    e.preventDefault();
    const departmentId = localStorage.getItem("departmentId");
    if (!departmentId) {
      alert("Department not found");
      return;
    }

    try {
      const endpoint = modalMode === "add" ? "/shift/add" : `/shift/${selectedShift._id}`;
      const method = modalMode === "add" ? "post" : "put";
      
      await api[method](endpoint, {
        ...shiftForm,
        departmentId
      });

      alert(`Shift ${modalMode === "add" ? "Added" : "Updated"} Successfully`);
      fetchShifts();
      fetchAssignedShifts();
      handleCloseModal();
    } catch (error) {
      alert(`Failed to ${modalMode === "add" ? "add" : "update"} shift`);
    }
  };

  // Assign/Edit Assignment handler (keep as is)
  const handleAssignSubmit = async (e) => {
    e.preventDefault();
    const { shiftId, staffIds, startDate, endDate } = assignForm;
    
    if (!shiftId || !startDate || !endDate || staffIds.length === 0) {
      return alert("Please fill all fields");
    }

    if (new Date(endDate) < new Date(startDate)) {
      return alert("End date cannot be before start date");
    }

    try {
      if (modalMode === "editAssignment" && selectedAssignment) {
        await api.put(`/shift/assignment/${selectedAssignment._id}`, {
          shiftId,
          staffId: staffIds[0],
          date: startDate // Your API uses 'date' not 'startDate'
        });
        alert("Assignment updated successfully");
      } else {
        await api.post("/shift/assign", {
          shiftId,
          staffIds,
          startDate,
          endDate,
          managerId: localStorage.getItem("managerId")
        });
        alert("Shift assigned successfully");
      }
      
      fetchAssignedShifts();
      handleCloseModal();
    } catch (error) {
      alert(modalMode === "editAssignment" ? "Update failed" : "Assignment failed");
    }
  };

  const toggleStaff = (id) => {
    setAssignForm(prev => ({
      ...prev,
      staffIds: modalMode === "editAssignment" 
        ? [id]
        : prev.staffIds.includes(id)
          ? prev.staffIds.filter(s => s !== id)
          : [...prev.staffIds, id]
    }));
  };

  // CORRECTED: Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="container pt-4 pb-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2>Shift Management</h2>
          <p className="text-muted mb-0">Manage shifts and assignments</p>
        </div>
        <div className="d-flex gap-2">
          <Button variant="success" onClick={() => handleShowModal("add")}>
            <i className="bi bi-plus-circle me-2"></i>Add Shift
          </Button>
          <Button variant="primary" onClick={() => handleShowModal("assign")}>
            <i className="bi bi-person-plus me-2"></i>Assign Shift
          </Button>
        </div>
      </div>

      <Tabs activeKey={activeTab} onSelect={(k) => setActiveTab(k)} className="mb-4" fill>
        <Tab eventKey="shifts" title={
          <span>
            <i className="bi bi-calendar me-1"></i>All Shifts
            <Badge bg="secondary" className="ms-2">{shifts.length}</Badge>
          </span>
        }>
          <Card className="shadow-sm mt-3">
            <Card.Body>
              <Table responsive hover>
                <thead>
                  <tr>
                    <th>#</th><th>Shift Name</th><th>Date</th><th>Time</th><th>Assigned Staff</th><th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {shifts.length > 0 ? shifts.map((shift, index) => {
                    const assignedCount = getAssignedStaffCount(shift._id);
                    return (
                      <tr key={shift._id}>
                        <td>{index + 1}</td>
                        <td><strong>{shift.shiftName}</strong></td>
                        <td>{shift.date}</td>
                        <td>
                          <Badge bg="info" className="me-1">{shift.startTime}</Badge>
                          <Badge bg="warning" className="me-1">{shift.endTime}</Badge>
                        </td>
                        <td>
                          {assignedCount > 0 ? (
                            <div>
                              <Badge bg="success" className="me-2">{assignedCount} staff</Badge>
                              <Button size="sm" variant="link" onClick={() => setActiveTab("assignments")}>
                                View Assignments
                              </Button>
                            </div>
                          ) : <Badge bg="secondary">Not assigned</Badge>}
                        </td>
                        <td>
                          <div className="d-flex gap-2">
                            <Button size="sm" variant="outline-info" onClick={() => handleShowModal("view", shift)}>
                              <i className="bi bi-eye"></i>
                            </Button>
                            <Button size="sm" variant="outline-primary" onClick={() => handleShowModal("assign", shift)}>
                              <i className="bi bi-person-plus"></i>
                            </Button>
                            <Button size="sm" variant="outline-danger" onClick={() => handleDelete(shift._id)}>
                              <i className="bi bi-trash"></i>
                            </Button>
                          </div>
                        </td>
                      </tr>
                    );
                  }) : (
                    <tr><td colSpan="6" className="text-center py-4">
                      <div className="text-muted">
                        <i className="bi bi-calendar-x fs-1"></i>
                        <p className="mt-2">No shifts found</p>
                        <Button variant="outline-primary" size="sm" onClick={() => handleShowModal("add")}>
                          Create Your First Shift
                        </Button>
                      </div>
                    </td></tr>
                  )}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Tab>

        <Tab eventKey="assignments" title={
          <span>
            <i className="bi bi-people me-1"></i>Assigned Shifts
            <Badge bg="success" className="ms-2">{assignedShifts.length}</Badge>
          </span>
        }>
          <Card className="shadow-sm mt-3">
            <Card.Body>
              <Table responsive hover>
                <thead>
                  <tr>
                    <th>#</th><th>Staff Name</th><th>Shift</th><th>Date</th><th>Time</th><th>Assigned On</th><th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {assignedShifts.length > 0 ? assignedShifts.map((assignment, index) => {
                    // CORRECTED: Using the right data structure
                    const shift = assignment.shift;
                    const staff = assignment.staff;
                    const assignmentDate = new Date(assignment.date);
                    const today = new Date();
                    const isActive = assignmentDate.toDateString() === today.toDateString();
                    
                    return (
                      <tr key={assignment._id}>
                        <td>{index + 1}</td>
                        <td>
                          <strong>{getStaffName(staff)}</strong>
                          <div className="small text-muted">{getStaffEmail(staff)}</div>
                        </td>
                        <td>
                          <Badge bg="primary">{getShiftName(shift)}</Badge>
                          <div className="small">{shift?.date || "No date"}</div>
                        </td>
                        <td>{formatDate(assignment.date)}</td>
                        <td>
                          <div className="small">
                            <i className="bi bi-clock me-1"></i>
                            {shift?.startTime || "N/A"} - {shift?.endTime || "N/A"}
                          </div>
                        </td>
                        <td>
                          <div className="small">
                            <i className="bi bi-calendar-check me-1"></i>
                            {new Date(assignment.createdAt).toLocaleDateString()}
                          </div>
                        </td>
                        <td>
                          {isActive ? <Badge bg="success">Today</Badge> : <Badge bg="secondary">Scheduled</Badge>}
                        </td>
                        <td>
                          <div className="d-flex gap-2">
                            <Button size="sm" variant="outline-danger" onClick={() => handleDeleteAssignment(assignment._id)}>
                              <i className="bi bi-trash"></i>
                            </Button>
                          </div>
                        </td>
                      </tr>
                    );
                  }) : (
                    <tr><td colSpan="7" className="text-center py-4">
                      <div className="text-muted">
                        <i className="bi bi-people fs-1"></i>
                        <p className="mt-2">No assigned shifts found</p>
                        <Button variant="outline-primary" size="sm" onClick={() => handleShowModal("assign")}>
                          Assign Your First Shift
                        </Button>
                      </div>
                    </td></tr>
                  )}
                </tbody>
              </Table>
              
              {assignedShifts.length > 0 && (
                <div className="mt-4 pt-3 border-top">
                  <Row>
                    <Col md={3}>
                      <div className="text-center">
                        <div className="fs-4 text-primary">
                          {assignedShifts.filter(a => {
                            const date = new Date(a.date);
                            const today = new Date();
                            return date.toDateString() === today.toDateString();
                          }).length}
                        </div>
                        <div className="text-muted small">Today's Assignments</div>
                      </div>
                    </Col>
                    <Col md={3}>
                      <div className="text-center">
                        <div className="fs-4 text-warning">
                          {new Set(assignedShifts.map(a => a.staff?._id || a.staff)).size}
                        </div>
                        <div className="text-muted small">Staff Involved</div>
                      </div>
                    </Col>
                    <Col md={3}>
                      <div className="text-center">
                        <div className="fs-4 text-success">
                          {new Set(assignedShifts.map(a => a.shift?._id || a.shift)).size}
                        </div>
                        <div className="text-muted small">Shifts Used</div>
                      </div>
                    </Col>
                    <Col md={3}>
                      <div className="text-center">
                        <div className="fs-4 text-info">
                          {assignedShifts.length}
                        </div>
                        <div className="text-muted small">Total Assignments</div>
                      </div>
                    </Col>
                  </Row>
                </div>
              )}
            </Card.Body>
          </Card>
        </Tab>
      </Tabs>

      {/* MODAL FOR ALL OPERATIONS - Keep as is */}
      <Modal show={showModal} onHide={handleCloseModal} size={modalMode === "editAssignment" ? "md" : "lg"} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            {modalMode === "add" && "Add New Shift"}
            {modalMode === "assign" && "Assign Shift to Staff"}
            {modalMode === "view" && "Shift Details"}
            {modalMode === "editAssignment" && "Edit Assignment"}
          </Modal.Title>
        </Modal.Header>
        
        <Modal.Body>
          {modalMode === "add" && (
            <Form onSubmit={handleShiftSubmit}>
              <Row className="mb-3">
                <Col md={6}><Form.Group><Form.Label>Shift Name *</Form.Label>
                  <Form.Control name="shiftName" placeholder="e.g., Morning Shift" value={shiftForm.shiftName} onChange={(e) => setShiftForm({...shiftForm, shiftName: e.target.value})} required/></Form.Group></Col>
                <Col md={6}><Form.Group><Form.Label>Date *</Form.Label>
                  <Form.Control type="date" name="date" value={shiftForm.date} onChange={(e) => setShiftForm({...shiftForm, date: e.target.value})} required/></Form.Group></Col>
              </Row>
              <Row className="mb-4">
                <Col md={6}><Form.Group><Form.Label>Start Time *</Form.Label>
                  <Form.Control type="time" name="startTime" value={shiftForm.startTime} onChange={(e) => setShiftForm({...shiftForm, startTime: e.target.value})} required/></Form.Group></Col>
                <Col md={6}><Form.Group><Form.Label>End Time *</Form.Label>
                  <Form.Control type="time" name="endTime" value={shiftForm.endTime} onChange={(e) => setShiftForm({...shiftForm, endTime: e.target.value})} required/></Form.Group></Col>
              </Row>
              <div className="d-flex justify-content-end gap-2">
                <Button variant="secondary" onClick={handleCloseModal}>Cancel</Button>
                <Button type="submit" variant="primary">Add Shift</Button>
              </div>
            </Form>
          )}
          
          {modalMode === "view" && selectedShift && (
            <div>
              <Row className="mb-3">
                <Col md={6}><strong>Shift Name:</strong><p className="fs-5">{selectedShift.shiftName}</p></Col>
                <Col md={6}><strong>Date:</strong><p className="fs-5">{selectedShift.date}</p></Col>
              </Row>
              <Row className="mb-4">
                <Col md={6}><strong>Start Time:</strong><p className="fs-5">{selectedShift.startTime}</p></Col>
                <Col md={6}><strong>End Time:</strong><p className="fs-5">{selectedShift.endTime}</p></Col>
              </Row>
              <div className="mb-4">
                <strong>Assigned Staff:</strong>
                {getAssignedStaffCount(selectedShift._id) > 0 ? (
                  <div className="mt-2">
                    {assignedShifts.filter(a => a.shift?._id === selectedShift._id).map(assignment => (
                      <Badge key={assignment._id} bg="light" text="dark" className="me-2 mb-2 p-2 d-inline-flex align-items-center">
                        <i className="bi bi-person-circle me-1"></i>
                        {getStaffName(assignment.staff)}
                        <Button size="sm" variant="link" className="text-danger ms-2 p-0" onClick={() => handleDeleteAssignment(assignment._id)}>
                          <i className="bi bi-x"></i>
                        </Button>
                      </Badge>
                    ))}
                  </div>
                ) : <p className="text-muted mt-2">No staff assigned to this shift</p>}
              </div>
              <div className="d-flex justify-content-between">
                <Button variant="secondary" onClick={handleCloseModal}>Close</Button>
                <Button variant="outline-primary" onClick={() => handleShowModal("assign", selectedShift)}>
                  <i className="bi bi-person-plus me-1"></i>Assign Staff
                </Button>
              </div>
            </div>
          )}
          
          {modalMode === "assign" && (
            <Form onSubmit={handleAssignSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Select Shift *</Form.Label>
                <Form.Select value={assignForm.shiftId} onChange={(e) => setAssignForm({...assignForm, shiftId: e.target.value})} required>
                  <option value="">-- Select Shift --</option>
                  {shifts.map(shift => (
                    <option key={shift._id} value={shift._id}>{shift.shiftName} ({shift.date} - {shift.startTime} to {shift.endTime})</option>
                  ))}
                </Form.Select>
              </Form.Group>
              <Row className="mb-3">
                <Col md={6}><Form.Group><Form.Label>Date *</Form.Label>
                  <Form.Control type="date" value={assignForm.startDate} onChange={(e) => setAssignForm({...assignForm, startDate: e.target.value})} required/></Form.Group></Col>
                <Col md={6}><Form.Group><Form.Label>End Date *</Form.Label>
                  <Form.Control type="date" value={assignForm.endDate} onChange={(e) => setAssignForm({...assignForm, endDate: e.target.value})} required/></Form.Group></Col>
              </Row>
              <Form.Group className="mb-3">
                <Form.Label>Select Staff *</Form.Label>
                <Card className="border">
                  <Card.Body style={{ maxHeight: "200px", overflowY: "auto" }}>
                    {staffs.length > 0 ? staffs.map(staff => (
                      <Form.Check key={staff._id} type="checkbox" id={`staff-${staff._id}`}
                        label={<div className="d-flex align-items-center justify-content-between">
                          <div><strong>{staff.name}</strong><div className="small text-muted">{staff.email}</div></div>
                          {assignForm.staffIds.includes(staff._id) && <Badge bg="success">Selected</Badge>}
                        </div>}
                        checked={assignForm.staffIds.includes(staff._id)} onChange={() => toggleStaff(staff._id)}/>
                    )) : <p className="text-muted text-center">No staff available</p>}
                  </Card.Body>
                </Card>
                <Form.Text className="text-muted">Selected: {assignForm.staffIds.length} staff member(s)</Form.Text>
              </Form.Group>
              <div className="d-flex justify-content-end gap-2">
                <Button variant="secondary" onClick={handleCloseModal}>Cancel</Button>
                <Button type="submit" variant="success">Assign Shift</Button>
              </div>
            </Form>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default Manageshift;