import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { StateContext } from "../../context/StateContext";

const AllPatients = () => {
  const { hospitalData } = useContext(StateContext);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPatients = hospitalData.treated_patient
    ? hospitalData.treated_patient.filter((patient) =>
        patient.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  return (
    <div>
      <div
        className="c-card d-flex align-items-center "
        style={{ width: "100%" }}
      >
        <i className="fa-solid fa-magnifying-glass me-2"></i>
        <input
          type="text"
          style={{ width: "100%", outline: "none", border: "none" }}
          placeholder="Search Patient"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="container-fluid">
        <div className="mt-4">
          <div
            className="inner-container"
            style={{ overflowY: "auto", maxHeight: "300px" }}
          >
            <table className="table table-hover text-no-wrap table-borderless">
              <thead>
                <tr>
                  <th scope="col" className="text-no-wrap">
                    Name
                  </th>
                  <th scope="col" className="text-no-wrap">
                    Age
                  </th>
                  <th scope="col" className="text-no-wrap">
                    View
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredPatients.map((item, index) => (
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
                    <td>
                      <NavLink to={`profile/${item._id}`}>View More</NavLink>
                    </td>
                  </tr>
                ))}
                {filteredPatients.length === 0 && (
                  <tr>
                    <td colSpan="3">No Results Found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllPatients;
