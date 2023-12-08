import React, { useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import { Modal, Button } from "@mantine/core";
import AttendanceCalendar from "../components/AttendanceCalendar/AttendanceCalendar";

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

const Doctors = () => {
  const [opened, { open, close }] = useDisclosure(false);

  const [patientsDetails, setPatientsDetails] = useState([
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
    <>
      <div className="container-fluid">
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
        {/* Stats */}
        <div className="container-fluid my-4">
          <div className="row gy-3">
            <div className="col-md-4">
              <div className="c-card">
                <h4>Appointments</h4>
                <h5>30</h5>
              </div>
            </div>
            <div className="col-md-4">
              <div className="c-card">
                <h4>Revenue</h4>
                <h5>Rs. 30,000</h5>
              </div>
            </div>
            <div className="col-md-4">
              <div className="c-card">
                <h4>Patient History</h4>
                <Button onClick={open}>Open modal</Button>
              </div>
            </div>
          </div>
        </div>

        {/* Availability & Track */}
        <div className="container-fluid my-4">
          <div className="row">
            <div className="col-md-6">
              <AttendanceCalendar />
            </div>
            <div className="col-md-6">
              <h4>ok</h4>
            </div>
          </div>
        </div>

        {/* Patients List Today */}
        <div className="c-card my-4">
          <Table
            data={patientsWaiting && patientsWaiting}
            columns={["Name", "Date", "Doctor", "TimeSlot"]}
          />
        </div>
      </div>

      {/* Patients Info Modal */}
      <Modal opened={opened} onClose={close} title="Patient Details">
        <Table
          data={patientsDetails && patientsDetails}
          columns={["Name", "Date", "Doctor", "TimeSlot"]}
        />
      </Modal>
    </>
  );
};

export default Doctors;
