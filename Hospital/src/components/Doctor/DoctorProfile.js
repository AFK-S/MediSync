import React, { useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import { Modal, Button } from "@mantine/core";
import AttendanceCalendar from "../AttendanceCalendar/AttendanceCalendar";

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

const DoctorProfile = () => {
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

  return (
    <>
      <div className="container-fluid">
        <h2 className="mt-4 fw-600">Dr. Karandeep Singh Sandhu</h2>
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
            <div className="col-md-8">
              <AttendanceCalendar />
            </div>
            <div className="col-md-4">
              <div className="c-card">
                <h4>Doctor Logs</h4>
                <Table
                  data={patientsDetails && patientsDetails}
                  columns={["Name", "Date", "Doctor", "TimeSlot"]}
                />
              </div>
            </div>
          </div>
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

export default DoctorProfile;
