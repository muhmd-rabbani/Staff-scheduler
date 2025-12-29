import React, { useState } from 'react';
import './Managedepartment.css';
import { Modal, Button, Form } from 'react-bootstrap';
import api from '../../api';

function Managedepartment() {
  const [showModal, setShowModal] = useState(false);
  const [deptName, setDeptName] = useState("");

  const [departments, setDepartments] = useState([
    { id: 1, name: "Sales Department", staff: 12 },
    { id: 2, name: "Customer Service", staff: 14 },
  ]);

  const handleOpen = () => setShowModal(true);
  const handleClose = () => {
    setDeptName("");
    setShowModal(false);
  };

    // Fetch departments from backend
  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const res = await api.get("/admin/department");
        setDepartments(res.data);
      } catch (error) {
        console.log(error);
        alert("Failed to load departments");
      }
    };

    fetchDepartments();
  }, []);


  const handleSubmit = () => {
    if (!deptName.trim()) return;

    // const newDept = {
    //   id: departments.length + 1,
    //   name: deptName,
    //   staff: 0,
    // };

    // setDepartments([...departments, newDept]);

    const addDepartment=async()=>{
      console.log(deptName);
      
      const body={deptName}
      console.log(body);
      
      try {
      let res=await  api.post('/admin/addDep',body)
      console.log(res);
      
      } catch (error) {
        console.log(error);
        
      }
    }
    handleClose();
    addDepartment()
  };

  return (
    <div className="page-container">
      <h1 className="title">Manage Department</h1>

      <button className="add-btn" onClick={handleOpen}>
        Add Department +
      </button>

      <div className="dept-list">
        {departments.map((dept) => (
          <div key={dept.id} className="department-card">
            <h3>{dept.name}</h3>
            <p>Staff members: {dept.staff}</p>
          </div>
        ))}
      </div>

      {/* ADD DEPARTMENT MODAL */}
      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add Department</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Department Name:</Form.Label>
              <Form.Control
                type="text"
                value={deptName}
                onChange={(e) => setDeptName(e.target.value)}
                placeholder="Eg. Marketing"
              />
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="success" onClick={handleSubmit}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Managedepartment;