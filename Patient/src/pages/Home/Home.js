import React, { useState } from "react";
import { Grid, Collapse, Group, Text, Accordion, Button } from "@mantine/core";
import "./Home.css";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Badge } from "@mantine/core";

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
  var index =
    value.today_appointment && value.today_appointment.length > 0
      ? value.today_appointment.findIndex(
          (appointment) => appointment._id === value._id
        )
      : "First";

  return (
    <Grid.Col span={{ xs: 12, sm: 6, md: 4, lg: 4 }}>
      <div
        key={index}
        className="c-card h-auto appointment-card "
        style={{ borderColor: "#B6BBC4", position: "relative" }}
      >
        <Badge
          color="#0A0059"
          style={{ position: "absolute", top: "1rem", right: "1rem" }}
        >
          {index !== undefined && index === 0
            ? "Next"
            : index === -1
            ? "Done"
            : `${index ? index : ""} in Queue`}
        </Badge>

        <div className="p-0">
          <p className="card-text mt-2">
            <span className="fw-600">Date: </span>
            {value.date.split("T")[0].split("-").reverse().join("-")}
          </p>
          <p className="card-text mt-1">
            {" "}
            <span className="fw-600">Doctor: </span>
            {value.doctor.name}
          </p>
          <p className="card-text mt-1">
            {" "}
            <span className="fw-600">Hospital: </span>
            {value.hospital.name}
          </p>
          <p className="card-text mt-1">
            {" "}
            <span className="fw-600">Time: </span>
            {value.time_slot}
          </p>
          <p className="card-text mt-1">
            {" "}
            <span className="fw-600">Confirmed Slot: </span>
            {value.alloted_time}
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
                style={{ color: "#0a0059", fontSize: "0.9rem" }}
              >
                More Details
              </Accordion.Control>

              <Accordion.Panel>
                <span className="fw-600">Contact: </span>
                {value.hospital.contact_details.phone_number}
              </Accordion.Panel>
              <Accordion.Panel>
                <span className="fw-600"> Doctor's Experience: </span>
                {value.doctor.experience} years
              </Accordion.Panel>
              <Accordion.Panel>
                <span className="fw-600">Address: </span>
                {value.hospital.address.street}. {value.hospital.address.city},{" "}
                {value.hospital.address.state}, {value.hospital.address.country}{" "}
                - {value.hospital.address.zipCode}
              </Accordion.Panel>
            </Accordion.Item>
          </Accordion>
          <Button
            className="mt-4 cancel-button"
            variant="light"
            type="outline"
            style={{
              color: "#DF2E38",
              backgroundColor: "#fff",
              borderColor: "#DF2E38",
              fontWeight: 700,
              fontSize: "0.9rem",
              transition: "all 0.2s ease-in-out",
              borderRadius: "0.5rem",
            }}
          >
            Cancel
          </Button>
        </div>
      </div>
    </Grid.Col>
  );
};

const Home = () => {
  const appointmentUpcoming = useSelector(
    (state) => state.app.appData.upcoming_appointment
  );

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
              {appointmentUpcoming &&
                appointmentUpcoming.map((value, index) => (
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
        <h4 className="mb-3">
          Alerts <i className="fa-solid fa-bell"></i>
        </h4>
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
