import React, { useState } from "react";
import { Badge } from "@mantine/core";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";

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
  const [patientData, setPatientData] = useState();
  const { id } = useParams();

  const getPatient = async () => {
    try {
      const { data } = await axios.get(`/api/dashboard/patient/${id}`);

      setPatientData(data);
    } catch (error) {
      alert(error.message);
    }
  };

  const capitalizeAndReplaceUnderscore = (str) => {
    const withoutUnderscore = str.replace(/_/g, " ");
    return (
      withoutUnderscore.charAt(0).toUpperCase() + withoutUnderscore.slice(1)
    );
  };

  useEffect(() => {
    getPatient();
  }, []);

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
  ]);

  const formatDate = (date) => {
    const d = new Date(date);
    let month = `${d.getMonth() + 1}`;
    let day = `${d.getDate()}`;
    const year = d.getFullYear();
    if (month.length < 2) month = `0${month}`;
    if (day.length < 2) day = `0${day}`;
    return [day, month, year].join("-");
  };
  return (
    <div>
      <div className="container-fluid">
        <div className="row gy-4">
          <div className="col-md-6 col-lg-8">
            <div className="c-card">
              <h3 className="fw-600">
                {patientData && patientData.name}{" "}
                <span style={{ fontSize: "1rem" }}>
                  ({patientData && patientData.age} years old)
                </span>
              </h3>

              <div className="mt-4">
                <p className="fw-600 mb-2">
                  Contact: {patientData && patientData.phone_number}
                </p>
                <p className="fw-600 mb-2">
                  Disease :{" "}
                  {patientData && patientData.disease.length > 0
                    ? patientData.disease.join(", ")
                    : "None"}
                </p>

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
                  {patientData &&
                    formatDate(patientData.upcoming_appointment[0].date)}
                </Badge>
                <p className="" style={{ fontSize: "1.1rem" }}>
                  {patientData &&
                    patientData.upcoming_appointment[0].doctor.name}
                </p>
                <p>
                  Time :{" "}
                  {patientData && patientData.upcoming_appointment[0].time_slot}
                </p>
                <p>
                  consultancy Fees : ₹{" "}
                  {patientData &&
                    patientData.upcoming_appointment[0].doctor.fees}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="row gy-4 my-2">
          <div className="col-md-6">
            <div className="c-card">
              <h4>Patient Report</h4>
              <div className="mt-2">
                <div
                  className="inner-container"
                  style={{ overflowY: "auto", maxHeight: "30vh" }}
                >
                  <table className="table table-hover text-no-wrap">
                    <thead>
                      <tr>
                        <th scope="col" className="text-no-wrap">
                          Name
                        </th>
                        <th scope="col" className="text-no-wrap">
                          Uploaded On
                        </th>
                        <th scope="col" className="text-no-wrap">
                          View
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {patientData &&
                        patientData.reports.map((item, index) => (
                          <>
                            <tr>
                              <td style={{ whiteSpace: "nowrap" }}>
                                {item.disease[0]}
                              </td>
                              <td style={{ whiteSpace: "nowrap" }}>
                                {formatDate(item.createdAt)}
                              </td>
                              <td style={{ whiteSpace: "nowrap" }}>
                                <a
                                  href={item.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  View
                                </a>
                              </td>
                            </tr>
                          </>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="c-card">
              <h4>Presciption by Doctor</h4>
              <div className="mt-2">
                <p>No prescription</p>
                {/* <Table
                  data={patientsWaiting && patientsWaiting}
                  columns={["Name", "Date", "Doctor", "TimeSlot"]}
                /> */}
              </div>
            </div>
          </div>
        </div>
        <div className="container-fluid c-card my-4">
          <h4 className="mb-2"> Upcoming Slots</h4>
          <div
            className="inner-container"
            style={{ overflowY: "auto", maxHeight: "30vh" }}
          >
            <table className="table table-hover text-no-wrap">
              <thead>
                <tr>
                  <th scope="col" className="text-no-wrap">
                    Date
                  </th>
                  <th scope="col" className="text-no-wrap">
                    Time
                  </th>
                  <th scope="col" className="text-no-wrap">
                    Doctor
                  </th>
                  <th scope="col" className="text-no-wrap">
                    Hospital
                  </th>
                </tr>
              </thead>
              <tbody>
                {patientData &&
                  patientData.upcoming_appointment.map((item, index) => (
                    <>
                      <tr>
                        <td style={{ whiteSpace: "nowrap" }}>
                          {formatDate(item.date)}
                        </td>
                        <td style={{ whiteSpace: "nowrap" }}>
                          {item.time_slot}
                        </td>
                        <td style={{ whiteSpace: "nowrap" }}>
                          {item.doctor.name}
                        </td>
                        <td style={{ whiteSpace: "nowrap" }}>
                          {item.hospital.name}
                        </td>
                      </tr>
                    </>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientProfile;
