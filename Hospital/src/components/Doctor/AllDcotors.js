import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { StateContext } from "../../context/StateContext";

const Table = ({ data, columns }) => {
  return (
    <div
      className="inner-container"
      style={{ overflowY: "auto", maxHeight: "300px" }}
    >
      {data.length > 0 ? (
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
            {data.map((item, index) => (
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
                <td>{item.name}</td>
                <td>{item.age}</td>
                <td>{item.specialization}</td>
                <td>{item.experience}</td>
                <td>
                  <NavLink to={`profile/${item._id}`}>View More</NavLink>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No Results Found</p>
      )}
    </div>
  );
};

const AllDoctors = () => {
  const { doctorsList } = useContext(StateContext);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredDoctors = doctorsList.filter((doctor) =>
    doctor.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      <div className="mt-4">
        <Table
          data={filteredDoctors}
          columns={["Name", "Age", "Specialization", "Experience", ""]}
        />
      </div>
    </div>
  );
};

export default AllDoctors;
