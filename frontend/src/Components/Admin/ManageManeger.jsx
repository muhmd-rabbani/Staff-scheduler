import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import './ManageManeger.css';
import Addmanager from './Addmanager';
import Editmanager from './Editmanager';
import api from '../../api';

function ManageManeger() {
  const [showAddForm, setShowAddForm] = useState(false);
  const [editId, setEditId] = useState(null);
  const [managers, setManagers] = useState([]);

  /* =========================
     FETCH MANAGERS
  ========================= */
  const fetchManagers = async () => {
    try {
      const res = await api.get('/Manager/allmanagers');
      setManagers(res.data.managers);
    } catch (error) {
      console.log(error);
      alert('Failed to load managers');
    }
  };

  useEffect(() => {
    fetchManagers();
  }, []);

  /* =========================
     EDIT MANAGER
  ========================= */
  const handleEdit = (id) => {
    setEditId(id);
    setShowAddForm(false);
  };

  /* =========================
     DELETE MANAGER
  ========================= */
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this manager?')) return;

    try {
      await api.delete(`/Manager/delete/${id}`);
      alert('Manager deleted successfully');
      fetchManagers();
    } catch (error) {
      console.log(error);
      alert('Failed to delete manager');
    }
  };

  return (
    <div className="mainmanager pt-4">
      <div className="container pt-4 managerpage pb-5">

        {/* HEADER */}
        <div className="d-flex justify-content-between align-items-center">
          <h1 className="hd1">Managers</h1>

          {!editId && (
         <Button
  variant="primary"
  className="d-flex align-items-center gap-2"
  onClick={() => setShowAddForm(true)}
>
  <span style={{ fontSize: "18px", lineHeight: "1" }}>+</span>
  Add Manager
</Button>
          )}
        </div>

        {/* ADD MANAGER */}
        {showAddForm && (
          <Addmanager
            onClose={() => {
              setShowAddForm(false);
              fetchManagers();
            }}
          />
        )}

        {/* EDIT MANAGER */}
        {editId && (
          <Editmanager
            id={editId}
            onClose={() => {
              setEditId(null);
              fetchManagers();
            }}
          />
        )}

        {/* MANAGER TABLE */}
        {!showAddForm && !editId && (
          <Table striped bordered hover className="table my-table mt-4">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Age</th>
                <th>Gender</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Qualification</th>
                <th>Address</th>
                <th>State</th>
                <th>Pincode</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {managers.length > 0 ? (
                managers.map((manager, index) => (
                  <tr key={manager._id}>
                    <td>{index + 1}</td>
                    <td>{manager.name}</td>
                    <td>{manager.age}</td>
                    <td>{manager.gender}</td>
                    <td>{manager.phone}</td>
                    <td>{manager.email}</td>
                    <td>{manager.qualification}</td>
                    <td>{manager.address}</td>
                    <td>{manager.state}</td>
                    <td>{manager.pincode}</td>
                    <td>
                      <Button
                        variant="primary"
                        className="me-2"
                        onClick={() => handleEdit(manager._id)}
                      >
                        Edit
                      </Button>

                      <Button
                        variant="danger"
                        onClick={() => handleDelete(manager._id)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="11" className="text-center">
                    No managers found
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        )}

      </div>
    </div>
  );
}

export default ManageManeger;
