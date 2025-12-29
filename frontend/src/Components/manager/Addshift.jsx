import React, { useState } from "react";
import "./Addshift.css";
import api from "../../api";

function Addshift() {
  const [shiftName, setShiftName] = useState("");
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      const body={ shiftName, date, startTime, endTime }
      const res=await api.post("/shift/add",body)
    } catch (error) {
      
    }
    console.log({ shiftName, date, startTime, endTime });
    alert("Shift Added Successfully");
  };

  return (
    <div className="addshft">
      <form className="addshft1" onSubmit={handleSubmit}>
        <h1>Shifts</h1>

        <div className="form-group">
          <label>Shift Name</label>
          <input
            type="text"
            value={shiftName}
            onChange={(e) => setShiftName(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Start Time</label>
          <input
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>End Time</label>
          <input
            type="time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
          />
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Addshift;
