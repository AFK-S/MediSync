import React, { useState, useContext, useEffect } from "react";
import { useDisclosure } from "@mantine/hooks";
import { Modal, Button } from "@mantine/core";
import AttendanceCalendar from "../AttendanceCalendar/AttendanceCalendar";
import { useParams } from "react-router-dom";
import { StateContext } from "../../context/StateContext";

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
  const { doctor_id } = useParams();
  const [opened, { open, close }] = useDisclosure(false);
  const { doctorsList } = useContext(StateContext);

  const [doctorDetails, setDoctorDetails] = useState({});

  console.log(doctor_id);
  useEffect(() => {
    if (doctorsList) {
      const doctor = doctorsList.find((doc) => doc._id === doctor_id);
      setDoctorDetails(doctor);
    }
  }, [doctorsList]);

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

  const [docLog, setDocLog] = useState([
    {
      time: "18:32",
      status: "exit",
    },
    {
      time: "18:32",
      status: "entry",
    },
  ]);

  return (
    <>
      {doctorDetails && (
        <div className="container-fluid">
          <h2 className="mt-4 fw-600">{doctorDetails.name}</h2>
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
          <div className="container-fluid my-4">
            <div className="row gy-4">
              <div className="col-md-8">
                <AttendanceCalendar />
              </div>
              <div className="col-md-4">
                <div className="c-card">
                  <h4>Logs</h4>
                  <div className="mt-2">
                    <Table
                      data={docLog && docLog}
                      columns={["Status", "Time"]}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
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
