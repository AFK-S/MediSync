import React from "react";

const DummyHospitalList = [
  {
    id: 1,
    name: "Hospital A",
    city: "City X",
    contact: "123-456-7890",
  },
  {
    id: 2,
    name: "Hospital B",
    city: "City Y",
    contact: "987-654-3210",
  },
];

function ViewHospital() {
  return (
    <div className="App">
      <div style={{ marginTop: "20px" }}>
        <h2 style={{ color: "#333", borderBottom: "2px solid #333" }}>
          Hospital List
        </h2>
        <ul style={{ listStyle: "none", padding: 0 }}>
          {DummyHospitalList.map((hospital) => (
            <li
              key={hospital.id}
              style={{
                borderBottom: "1px solid #ccc",
                marginBottom: "10px",
                paddingBottom: "10px",
              }}
            >
              <strong style={{ marginRight: "5px" }}>Name:</strong>{" "}
              {hospital.name} <br />
              <strong style={{ marginRight: "5px" }}>City:</strong>{" "}
              {hospital.city} <br />
              <strong style={{ marginRight: "5px" }}>Contact:</strong>{" "}
              {hospital.contact}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ViewHospital;
