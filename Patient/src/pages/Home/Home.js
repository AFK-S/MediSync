import React, { useState } from "react";
import { Divider, Group, Text } from "@mantine/core";
import Chart from "react-apexcharts";
import "./Home.css";
import RescheduleIcon from "../../assets/rescheduling.png";

const Table = ({ data, columns }) => {
  return (
    <div
      className="inner-container"
      style={{ overflowY: "auto", maxHeight: "40vh" }}
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

const Home = () => {
  const [doctors, setDoctors] = useState([
    {
      doctorName: "Dr. Karandeep Singh Sandhu",
      specialty: "Cardiologist",
      date: "18/10/2023",
      timeslot: "12:00pm - 03:00pm",
      hospitalName: "CardioCare Hospital",
      reportLink: "https://example.com/report",
    },
    {
      doctorName: "Dr. Priya Sharma",

      specialty: "Pediatrician",
      date: "20/10/2023",
      timeslot: "10:00am - 12:00pm",
      hospitalName: "ChildCare Clinic",
      reportLink: "https://example.com/report",
    },
    {
      doctorName: "Dr. Sameer Kapoor",

      specialty: "Dermatologist",
      date: "22/10/2023",
      timeslot: "02:00pm - 04:00pm",
      hospitalName: "SkinCare Center",
      reportLink: "https://example.com/report",
    },
    {
      doctorName: "Dr. Nisha Patel",
      specialty: "Orthopedic Surgeon",
      date: "25/10/2023",
      timeslot: "09:00am - 11:00am",
      hospitalName: "OrthoCare Hospital",
      reportLink: "https://example.com/report",
    },
    // Add more entries as needed
  ]);

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

  const bedsChartData = {
    series: [40, 60],
    options: {
      chart: {
        type: "donut",
      },
      labels: ["Male", "Female"],
      colors: ["#228be6", "#9ebed8"],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 300,
            },
            legend: false,
          },
        },
      ],
      legend: false,
    },
  };

  const appointments = [
    {
      date: "14-05-2023",
      doctor: "Karandeep Singh Sandhu",
      branch: "Airoli",
      time: "9:30",
      experience: 21,
      licenseNumber: "21",
    },
    {
      date: "14-05-2023",
      doctor: "Karandeep Singh Sandhu",
      branch: "Airoli",
      time: "9:30",
      experience: 21,
      licenseNumber: "21",
    },
  ];
  const [alerts, setAlerts] = useState([
    "Appointment rescheduled for Dr. Karandeep Singh Sandhu on 18/10/2023",
    "New appointment added for Dr. Priya Sharma on 20/10/2023",
    "Appointment rescheduled for Dr. Karandeep Singh Sandhu on 18/10/2023",
    "New appointment added for Dr. Priya Sharma on 20/10/2023",
    "Appointment rescheduled for Dr. Karandeep Singh Sandhu on 18/10/2023",
    "New appointment added for Dr. Priya Sharma on 20/10/2023",
    "Appointment rescheduled for Dr. Karandeep Singh Sandhu on 18/10/2023",
    "New appointment added for Dr. Priya Sharma on 20/10/2023",
    "Appointment rescheduled for Dr. Karandeep Singh Sandhu on 18/10/2023",
    "New appointment added for Dr. Priya Sharma on 20/10/2023",
  ]);

  return (
    <div>
      <div className="container-fluid">
        <div className="row gy-3">
          <h5>UPCOMING APPOINTMENT</h5>
          <div className="upcoming-appointments-container p-4">
            {appointments.map((value, index) => {
              return (
                <div
                  key={index}
                  className="c-card mt-3 appointment-card d-md-flex justify-content-around"
                >
                  <div className="c-card">
                    <p className="mt-2">
                      <span className="fw-600">Date: </span>
                      {value.date}
                    </p>
                    <p className="mt-1">
                      {" "}
                      <span className="fw-600">Doctor: </span>
                      {value.doctor}
                    </p>
                    <p className="mt-1">
                      {" "}
                      <span className="fw-600">Branch: </span>
                      {value.branch}
                    </p>
                    <p className="mt-1">
                      {" "}
                      <span className="fw-600">Time: </span>
                      {value.time}
                    </p>
                    <button className="mt-md-4 mt-3 reschedule-btn">
                      Reschedule
                    </button>
                  </div>
                  <div className="c-card d-md-block d-none">
                    <h6>DOCTOR INFO : </h6>
                    <div className="row mt-3">
                      <div className="col-md-4 col-12 text-capitalize">
                        <p className="fw-600 mt-2">Doctor Name</p>
                        <div className="d-md-flex align-items-center justify-content-center w-100 flex-column">
                          <p className="mt-2">{value.doctor}</p>
                        </div>
                      </div>
                      <div className="col-md-4 col-12 text-capitalize">
                        <div className="d-md-flex align-items-center justify-content-center w-100 flex-column">
                          <p className="fw-600 mt-2">Experience</p>
                          <p className="mt-2">{value.experience}</p>
                        </div>
                      </div>
                      <div className="col-md-4 col-12 text-capitalize">
                        <div className="d-md-flex align-items-center justify-content-center w-100 flex-column">
                          <p className="fw-600 mt-2">License Number</p>
                          <p className="mt-2">{value.licenseNumber}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="container-fluid c-card my-4">
        <h4 className="mb-2">Past Visit to Doctor</h4>
        <Table
          data={doctors && doctors}
          columns={[
            "doctorName",
            "specialty",
            "date",
            "timeslot",
            "hospitalName",
            "reportLink",
          ]}
        />
      </div>
      <div className="alert-section">
        <h4 className="mb-3">Alerts</h4>
        <div className="alert-container">
          {alerts.map((alert, index) => (
            <div key={index} className="alert-item">
              {alert}
            </div>
          ))}
        </div>
      </div>

      {/* Waiting Patients */}
      {/* <div className="container-fluid c-card my-4">
        <h4 className="mb-2">Patients Waiting</h4>
        <Table
          data={patientsWaiting && patientsWaiting}
          columns={["Name", "Date", "Doctor", "TimeSlot"]}
        />
      </div> */}
    </div>
  );
};

export default Home;
