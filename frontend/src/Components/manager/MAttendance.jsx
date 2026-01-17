import React from "react";

function MAttendance() {
  return (
    <div className="attendance-container">
      <h2 className="attendance-title">Attendance Report</h2>

      {/* Attendance Table */}
      <table className="attendance-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Employee</th>
            <th>Date</th>
            <th>In Time</th>
            <th>Out Time</th>
            <th>Status</th>
            <th>Duration</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>1</td>
            <td>John Thomas</td>
            <td>08-12-2025</td>
            <td>09:05 AM</td>
            <td>05:55 PM</td>
            <td>
              <span className="badge present">Present</span>
            </td>
            <td>8h 50m</td>
          </tr>

          <tr>
            <td>2</td>
            <td>Maria Jose</td>
            <td>08-12-2025</td>
            <td>—</td>
            <td>—</td>
            <td>
              <span className="badge absent">Absent</span>
            </td>
            <td>—</td>
          </tr>

          <tr>
            <td>3</td>
            <td>Ravi Kumar</td>
            <td>08-12-2025</td>
            <td>09:30 AM</td>
            <td>04:30 PM</td>
            <td>
              <span className="badge late">Late</span>
            </td>
            <td>7h 00m</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default MAttendance;
