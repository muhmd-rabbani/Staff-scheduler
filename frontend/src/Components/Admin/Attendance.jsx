// import React, { useState } from "react";
// import "./attendance.css";
// import { Dropdown } from "react-bootstrap";

// function Attendance() {
//   const [data] = useState([
//     {
//       id: 1,
//       employee: "John Thomas",
//       department: "Marketing",
//       date: "2025-12-08",
//       inTime: "09:05 AM",
//       outTime: "05:55 PM",
//       status: "Present",
//       duration: "8h 50m",
//     },
//     {
//       id: 2,
//       employee: "Maria Jose",
//       department: "HR",
//       date: "2025-12-08",
//       inTime: "—",
//       outTime: "—",
//       status: "Absent",
//       duration: "—",
//     },
//     {
//       id: 3,
//       employee: "Ravi Kumar",
//       department: "IT",
//       date: "2025-12-08",
//       inTime: "09:30 AM",
//       outTime: "04:30 PM",
//       status: "Late",
//       duration: "7h 00m",
//     },
//   ]);

//   const [filteredData, setFilteredData] = useState(data);
//   const [selectedDate, setSelectedDate] = useState("");
//   const [department, setDepartment] = useState("");
//   const [search, setSearch] = useState("");

//   // Apply filters
//   const handleFilter = () => {
//     let result = data;

//     if (selectedDate) {
//       result = result.filter((item) => item.date === selectedDate);
//     }

//     if (department) {
//       result = result.filter((item) => item.department === department);
//     }

//     if (search) {
//       result = result.filter((item) =>
//         item.employee.toLowerCase().includes(search.toLowerCase())
//       );
//     }

//     setFilteredData(result);
//   };

//   // Clear filters
//   const handleClear = () => {
//     setSelectedDate("");
//     setDepartment("");
//     setSearch("");
//     setFilteredData(data);
//   };

//   return (
//     <div className="attendance-container">
//       <h2 className="attendance-title">Attendance Dashboard</h2>

//       {/* Filters */}
//       <div className="filter-box">
//         <input
//           type="date"
//           className="date-input"
//           value={selectedDate}
//           onChange={(e) => setSelectedDate(e.target.value)}
//         />

//         <Dropdown>
//           <Dropdown.Toggle variant="success">
//             {department || "Department"}
//           </Dropdown.Toggle>

//           <Dropdown.Menu>
//             <Dropdown.Item onClick={() => setDepartment("Marketing")}>
//               Marketing
//             </Dropdown.Item>
//             <Dropdown.Item onClick={() => setDepartment("HR")}>
//               HR
//             </Dropdown.Item>
//             <Dropdown.Item onClick={() => setDepartment("IT")}>
//               IT
//             </Dropdown.Item>
//           </Dropdown.Menu>
//         </Dropdown>

//         <input
//           type="text"
//           className="search-input"
//           placeholder="Search employee..."
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//         />

//         <button className="btn" onClick={handleFilter}>
//           Filter
//         </button>

//         <button className="btn clear-btn" onClick={handleClear}>
//           Clear
//         </button>
//       </div>

//       {/* Table */}
//       <table className="attendance-table">
//         <thead>
//           <tr>
//             <th>#</th>
//             <th>Employee</th>
//             <th>Date</th>
//             <th>In Time</th>
//             <th>Out Time</th>
//             <th>Status</th>
//             <th>Duration</th>
//           </tr>
//         </thead>

//         <tbody>
//           {filteredData.length > 0 ? (
//             filteredData.map((row) => (
//               <tr key={row.id}>
//                 <td>{row.id}</td>
//                 <td>{row.employee}</td>
//                 <td>{row.date}</td>
//                 <td>{row.inTime}</td>
//                 <td>{row.outTime}</td>
//                 <td>
//                   <span className={`badge ${row.status.toLowerCase()}`}>
//                     {row.status}
//                   </span>
//                 </td>
//                 <td>{row.duration}</td>
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td colSpan="7" style={{ textAlign: "center" }}>
//                 No records found
//               </td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export default Attendance;

import React, { useState } from "react";
import "./attendance.css";
import { Dropdown } from "react-bootstrap";

function Attendance() {
  const [data] = useState([
    {
      id: 1,
      employee: "John Thomas",
      department: "Marketing",
      date: "2025-12-08",
      inTime: "09:05 AM",
      outTime: "05:55 PM",
      status: "Present",
      duration: "8h 50m",
    },
    {
      id: 2,
      employee: "Maria Jose",
      department: "HR",
      date: "2025-12-08",
      inTime: "—",
      outTime: "—",
      status: "Absent",
      duration: "—",
    },
    {
      id: 3,
      employee: "Ravi Kumar",
      department: "IT",
      date: "2025-12-08",
      inTime: "09:30 AM",
      outTime: "04:30 PM",
      status: "Late",
      duration: "7h 00m",
    },
  ]);

  const [filteredData, setFilteredData] = useState(data);
  const [selectedDate, setSelectedDate] = useState("");
  const [department, setDepartment] = useState("");
  const [search, setSearch] = useState("");

  const handleFilter = () => {
    let result = data;

    if (selectedDate) {
      result = result.filter((item) => item.date === selectedDate);
    }

    if (department) {
      result = result.filter((item) => item.department === department);
    }

    if (search) {
      result = result.filter((item) =>
        item.employee.toLowerCase().includes(search.toLowerCase())
      );
    }

    setFilteredData(result);
  };

  const handleClear = () => {
    setSelectedDate("");
    setDepartment("");
    setSearch("");
    setFilteredData(data);
  };

  return (
    <div className="attendance-container">
      <h2 className="attendance-title">Attendance Dashboard</h2>

      {/* Filters */}
      <div className="filter-box">
        <input
          type="date"
          className="date-input"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />

        <Dropdown>
          <Dropdown.Toggle variant="success">
            {department || "Department"}
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item onClick={() => setDepartment("Marketing")}>
              Marketing
            </Dropdown.Item>
            <Dropdown.Item onClick={() => setDepartment("HR")}>
              HR
            </Dropdown.Item>
            <Dropdown.Item onClick={() => setDepartment("IT")}>
              IT
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

        <input
          type="text"
          className="search-input"
          placeholder="Search employee..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button className="btn" onClick={handleFilter}>
          Filter
        </button>

        <button className="btn clear-btn" onClick={handleClear}>
          Clear
        </button>
      </div>

      {/* Table */}
      <table className="attendance-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Employee</th>
            <th>Department</th> {/* ✅ ADDED */}
            <th>Date</th>
            <th>In Time</th>
            <th>Out Time</th>
            <th>Status</th>
            <th>Duration</th>
          </tr>
        </thead>

        <tbody>
          {filteredData.length > 0 ? (
            filteredData.map((row) => (
              <tr key={row.id}>
                <td>{row.id}</td>
                <td>{row.employee}</td>
                <td>{row.department}</td> {/* ✅ ADDED */}
                <td>{row.date}</td>
                <td>{row.inTime}</td>
                <td>{row.outTime}</td>
                <td>
                  <span className={`badge ${row.status.toLowerCase()}`}>
                    {row.status}
                  </span>
                </td>
                <td>{row.duration}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" style={{ textAlign: "center" }}>
                No records found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Attendance;
