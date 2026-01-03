import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import api from "../../api";

function Manageshift() {
  const navigate = useNavigate();
  const [shifts, setShifts] = useState([]);

  const fetchShifts = async () => {
    try {
      const departmentId = localStorage.getItem("departmentId");
      if (!departmentId) return;

      const res = await api.get(`/shift/by-department/${departmentId}`);
      setShifts(res.data.shifts);
    } catch (error) {
      console.log(error);
      alert("Failed to load shifts");
    }
  };

  useEffect(() => {
    fetchShifts();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this shift?")) return;

    try {
      await api.delete(`/shift/${id}`);
      fetchShifts();
    } catch (error) {
      alert("Delete failed");
    }
  };

  return (
    <div className="mainmanager pt-4">
      <div className="container pt-4 managerpage pb-5">
        <h1 className="text-white">Shifts</h1>
        <table className="table table-bordered mt-3">
          <thead>
            <tr>
              <th>#</th>
              <th>Shift Name</th>
              <th>Date</th>
              <th>Start</th>
              <th>End</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {shifts.length > 0 ? (
              shifts.map((shift, index) => (
                <tr key={shift._id}>
                  <td>{index + 1}</td>
                  <td>{shift.shiftName}</td>
                  <td>{shift.date}</td>
                  <td>{shift.startTime}</td>
                  <td>{shift.endTime}</td>
                  <td>
                    {/* <button>Edit</button> */}
                     <Button
                      size="sm"
                      variant="primary"
                     
                      onClick={() => {
                        setSelectedShift(shift);
                        setShowEdit(true);
                      }}
                    >
                      Edit
                    </Button>
                    {/* <button onClick={() => handleDelete(shift._id)}>
                      Delete
                    </button> */}
                    <Button
                        size="sm"
                        variant="danger"
                        onClick={() => handleDelete(shift._id)}
                    >
                       Delete
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center">
                  No shifts found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Manageshift;
