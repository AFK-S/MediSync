import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { StateContext } from "../../context/StateContext";

const AllPatients = () => {
  const { hopitalData } = useContext(StateContext);
  console.log(hopitalData);

  const [doctors, setDoctors] = useState([
    {
      id: "657c32c9560f1eb5906adab0",
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
      <div
        className="c-card d-flex align-items-center "
        style={{ width: "100%" }}
      >
        <i className="fa-solid fa-magnifying-glass me-2"></i>
        <input
          type="text"
          style={{ width: "100%", outline: "none", border: "none" }}
          placeholder="Search Patient"
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
                {hopitalData.treated_patient &&
                  hopitalData.treated_patient.map((item, index) => (
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
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllPatients;
