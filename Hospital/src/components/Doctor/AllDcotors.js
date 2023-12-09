import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const Table = ({ data, columns }) => {
  return (
    <div
      className="inner-container"
      style={{ overflowY: "auto", maxHeight: "300px" }}
    >
      <table className="table table-hover text-no-wrap table-borderless">
        <thead>
          <tr>
            {columns.map((col, index) => (
              <th key={index} scope="col" className="text-no-wrap">
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data &&
            data.map((item, index) => (
              <tr
                key={index}
                style={{
                  whiteSpace: "nowrap",
                  backgroundColor: "#fff",
                  borderRadius: "20px",
                  padding: "1rem",
                  border: 0,
                  marginBottom: "1rem",
                }}
              >
                {columns.map((col, colIndex) => (
                  <td key={colIndex}>{item[col.toLowerCase()]}</td>
                ))}
                <td>
                  <NavLink to={`profile/${item.id}`}>View More</NavLink>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

const AllDcotors = () => {
  const [doctors, setDoctors] = useState([
    {
      id: 1,
      name: "Karandeep",
      speciality: "ABC",
      age: 30,
      experience: "20+",
    },
    {
      id: 2,
      name: "Karandeep",
      speciality: "ABC",
      age: 30,
      experience: "20+",
    },
    {
      id: 3,
      name: "Karandeep",
      speciality: "ABC",
      age: 30,
      experience: "20+",
    },
  ]);
  return (
    <div>
      <div className="w-100 d-flex align-items-center justify-content-between">
        <div className=""></div>
        <div
          className="c-card d-flex align-items-center "
          style={{ width: "100%", maxWidth: "500px" }}
        >
          <i className="fa-solid fa-magnifying-glass me-2"></i>
          <input
            type="text"
            style={{ width: "100%", outline: "none", border: "none" }}
            placeholder="Search Doctor Name or Licence Number"
          />
        </div>
      </div>
      <div className="mt-4">
        <Table
          data={doctors && doctors}
          columns={["Name", "Age", "Speciality", "Experience", ""]}
        />
      </div>
    </div>
  );
};

export default AllDcotors;
