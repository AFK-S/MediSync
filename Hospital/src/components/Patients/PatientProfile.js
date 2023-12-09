import React, { useState } from "react";
import { Badge } from "@mantine/core";

const Table = ({ data, columns }) => {
  return (
    <div
      className="inner-container"
      style={{ overflowY: "auto", maxHeight: "30vh" }}
    >
      <table className="table table-hover text-no-wrap">
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
              <tr key={index}>
                {columns.map((col, colIndex) => (
                  <td key={colIndex} style={{ whiteSpace: "nowrap" }}>
                    {item[col.toLowerCase()]}
                  </td>
                ))}
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

const PatientProfile = () => {
  const [patientsWaiting, setPatientsWaiting] = useState([
    {
      name: "Karan",
      doctor: "Dr. XYZ",
      timeslot: "10:00am - 10:30am",
      date: "23/10/2023",
    },
    {
      name: "Karan",
      doctor: "Dr. XYZ",
      timeslot: "10:00am - 10:30am",
      date: "23/10/2023",
    },
    {
      name: "Karan",
      doctor: "Dr. XYZ",
      timeslot: "10:00am - 10:30am",
      date: "23/10/2023",
    },
    {
      name: "Karan",
      doctor: "Dr. XYZ",
      timeslot: "10:00am - 10:30am",
      date: "23/10/2023",
    },
    {
      name: "Karan",
      doctor: "Dr. XYZ",
      timeslot: "10:00am - 10:30am",
      date: "23/10/2023",
    },
    {
      name: "Karan",
      doctor: "Dr. XYZ",
      timeslot: "10:00am - 10:30am",
      date: "23/10/2023",
    },
    {
      name: "Karan",
      doctor: "Dr. XYZ",
      timeslot: "10:00am - 10:30am",
      date: "23/10/2023",
    },
    {
      name: "Karan",
      doctor: "Dr. XYZ",
      timeslot: "10:00am - 10:30am",
      date: "23/10/2023",
    },
    {
      name: "Karan",
      doctor: "Dr. XYZ",
      timeslot: "10:00am - 10:30am",
      date: "23/10/2023",
    },
    {
      name: "Karan",
      doctor: "Dr. XYZ",
      timeslot: "10:00am - 10:30am",
      date: "23/10/2023",
    },
    {
      name: "Karan",
      doctor: "Dr. XYZ",
      timeslot: "10:00am - 10:30am",
      date: "23/10/2023",
    },
  ]);
  return (
    <div>
      <div className="container-fluid">
        <div className="row gy-4">
          <div className="col-md-6 col-lg-8">
            <div className="c-card">
              <h3 className="fw-600">
                Karandeep Singh Sandhu{" "}
                <span style={{ fontSize: "1rem" }}>(21 years old)</span>
              </h3>

              <div className="mt-4">
                <p className="fw-600 mb-2">Contact: 7977216556</p>
                <p className="fw-600 mb-2">Symptoms: XYS,SYGS,YSUS</p>
                <p className="fw-600 ">
                  Past Medical Conditions: Diabetic, Stroke
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-lg-4">
            <div className="c-card">
              <h4>Appointments </h4>
              <div className="mt-4 fw-600">
                <Badge color="blue" radius="sm" mb={5} size="sm">
                  Today
                </Badge>
                <p className="" style={{ fontSize: "1.1rem" }}>
                  Dr. Karandeep Singh
                </p>
                <p>Time : 10:00am</p>
                <p>consultancy Fees : ₹ 2000</p>
              </div>
            </div>
          </div>
        </div>
        <div className="row gy-4 my-2">
          <div className="col-md-6">
            <div className="c-card">
              <h4>Patient Report</h4>
              <div className="mt-2">
                <Table
                  data={patientsWaiting && patientsWaiting}
                  columns={["Name", "Date", "Doctor", "TimeSlot"]}
                />
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="c-card">
              <h4>Presciption by Doctor</h4>
              <div className="mt-2">
                <Table
                  data={patientsWaiting && patientsWaiting}
                  columns={["Name", "Date", "Doctor", "TimeSlot"]}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="container-fluid c-card my-4">
          <h4 className="mb-2"> Upcoming Slots</h4>
          <Table
            data={patientsWaiting && patientsWaiting}
            columns={["Name", "Date", "Doctor", "TimeSlot"]}
          />
        </div>
      </div>
    </div>
  );
};

export default PatientProfile;
