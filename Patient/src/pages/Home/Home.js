import React, { useState } from "react";
import { Grid, Collapse, Group, Text, Accordion } from "@mantine/core";
import "./Home.css";
import { NavLink } from "react-router-dom";

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
                <td>
                  <NavLink to={item.reportlink}>Report</NavLink>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

const AppointmentCard = ({ value, index }) => {
  return (
    <Grid.Col span={{ xs: 12, sm: 6, md: 4, lg: 4 }}>
      <div key={index} className="c-card h-auto appointment-card ">
        <div className="p-0">
          <p className="card-text mt-2">
            <span className="fw-600">Date: </span>
            {value.date}
          </p>
          <p className="card-text mt-1">
            {" "}
            <span className="fw-600">Doctor: </span>
            {value.doctorname}
          </p>
          <p className="card-text mt-1">
            {" "}
            <span className="fw-600">Hospital: </span>
            {value.hospitalname}
          </p>
          <p className="card-text mt-1">
            {" "}
            <span className="fw-600">Time: </span>
            {value.timeslot}
          </p>
          <Accordion
            sx={{
              ".mantine-Accordion-label": { fontWeight: 700 },
            }}
          >
            <Accordion.Item
              style={{ fontSize: "0.9rem" }}
              // key={value.doctorName}
              value="Read More"
              className="card-text"
            >
              <Accordion.Control
                className="p-0"
                style={{ color: "blue", fontSize: "0.9rem" }}
              >
                More Details
              </Accordion.Control>

              <Accordion.Panel>
                <span className="fw-600">Contact: </span>
                {value.contact}
              </Accordion.Panel>
              <Accordion.Panel>
                <span className="fw-600">Experience: </span>
                {value.experience}
              </Accordion.Panel>
              <Accordion.Panel>
                <span className="fw-600">Address: </span>
                {value.address}
              </Accordion.Panel>
            </Accordion.Item>
          </Accordion>
          <button className="mt-md-4 mt-3 reschedule-btn card-text">
            Reschedule
          </button>
        </div>
      </div>
    </Grid.Col>
  );
};

const Home = () => {
  const [doctors, setDoctors] = useState([
    {
      doctorname: "Dr. Karandeep Singh Sandhu",
      specialty: "Cardiologist",
      date: "18/10/2023",
      timeslot: "12:00pm - 03:00pm",
      hospitalname: "CardioCare Hospital",
      address: "Navghar Road, Mulund East, Mumbai",
      contact: "8169645464",
      reportlink: "https://example.com/report",
      experience: 21,
    },
    {
      doctorname: "Dr. Karandeep Singh Sandhu",
      specialty: "Cardiologist",
      date: "18/10/2023",
      timeslot: "12:00pm - 03:00pm",
      hospitalname: "CardioCare Hospital",
      address: "Navghar Road, Mulund East, Mumbai",
      contact: "8169645464",
      reportlink: "https://example.com/report",
      experience: 21,
    },
    {
      doctorname: "Dr. Karandeep Singh Sandhu",
      specialty: "Cardiologist",
      date: "18/10/2023",
      timeslot: "12:00pm - 03:00pm",
      hospitalname: "CardioCare Hospital",
      address: "Navghar Road, Mulund East, Mumbai",
      contact: "8169645464",
      reportlink: "https://example.com/report",
      experience: 21,
    },
    {
      doctorname: "Dr. Karandeep Singh Sandhu",
      specialty: "Cardiologist",
      date: "18/10/2023",
      timeslot: "12:00pm - 03:00pm",
      hospitalname: "CardioCare Hospital",
      address: "Navghar Road, Mulund East, Mumbai",
      contact: "8169645464",
      reportlink: "https://example.com/report",
      experience: 21,
    },
    // Add more entries as needed
  ]);

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
      <div className="container-fluid c-card">
        <div className="row  gy-3">
          <h5>UPCOMING APPOINTMENT</h5>
          <div className="upcoming-appointments-container">
            <Grid>
              {doctors.map((value, index) => (
                <AppointmentCard key={index} value={value} index={index} />
              ))}
            </Grid>
          </div>
        </div>
      </div>

      {/* <div className="container-fluid c-card my-4">
        <h4 className="mb-2">Past Visit to Doctor</h4>
        <Table
          data={doctors && doctors}
          columns={[
            "DoctorName",
            "Specialty",
            "Date",
            "Timeslot",
            "HospitalName",
            "",
          ]}
        />
      </div> */}
      <div className="alert-section my-4 c-card">
        <h4 className="mb-3">Alerts</h4>
        <div className="alert-container">
          {alerts.map((alert, index) => (
            <div key={index} className="alert-item">
              {alert}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
