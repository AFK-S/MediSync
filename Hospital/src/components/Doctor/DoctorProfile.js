import React, { useState, useEffect } from "react";
import { useDisclosure } from "@mantine/hooks";
import { Modal, Button } from "@mantine/core";
import AttendanceCalendar from "../AttendanceCalendar/AttendanceCalendar";
import { NavLink, useParams } from "react-router-dom";
import axios from "axios";

const Table = ({ data, columns }) => {
  const formatDate = (date) => {
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    const formattedDate = new Date(date).toLocaleDateString("en-GB", options);
    return formattedDate;
  };
  const [log, setLog] = useState([]);

  useEffect(() => {
    if (data) {
      setLog(data);
    }
  }, [data]);
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
          {log.map((item, index) => (
            <tr key={index}>
              <td style={{ whiteSpace: "nowrap" }}>{item.type}</td>
              <td style={{ whiteSpace: "nowrap" }}>{item.status}</td>
              <td style={{ whiteSpace: "nowrap" }}>
                {formatDate(item.createdAt)}
              </td>
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

  const [doctorDetails, setDoctorDetails] = useState({});

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(`/api/dashboard/doctor/${doctor_id}`);
        console.log(data);
        setDoctorDetails(data);
      } catch (error) {
        console.error("Failed to fetch data: ", error);
      }
    })();
  }, []);

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

  const revenue =
    doctorDetails && doctorDetails.treated_patient_count * doctorDetails.fees;

  const formatTime = (date) => {
    const options = { hour: "2-digit", minute: "2-digit" };
    const formattedTime = new Date(date).toLocaleTimeString("en-GB", options);
    return formattedTime;
  };

  return (
    <>
      {doctorDetails && (
        <div className="container-fluid">
          <h2 className="mt-4 fw-600">{doctorDetails.name}</h2>
          <div className="container-fluid my-4">
            <div className="row gy-3">
              <div className="col-md-4">
                <div className="c-card">
                  <h4>Today's Appointments</h4>
                  {doctorDetails && doctorDetails.today_appointment_count ? (
                    <h3>{doctorDetails.today_appointment_count}</h3>
                  ) : (
                    <p className="mt-3">No Appointments Today</p>
                  )}
                </div>
              </div>
              <div className="col-md-4">
                <div className="c-card">
                  <h4>
                    Today's Revenue{" "}
                    <span style={{ fontSize: "18px" }}>
                      {" "}
                      <br />(
                      {doctorDetails &&
                        doctorDetails.treated_patient_count}{" "}
                      patients treated)
                    </span>
                  </h4>
                  <h5 className="mt-3">Rs. {revenue}</h5>
                </div>
              </div>
              <div className="col-md-4">
                <div className="c-card">
                  <h4>Patient History</h4>
                  <Button onClick={open} mt={12}>
                    Open modal
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <div className="container-fluid my-4">
            <div className="row gy-4">
              <div className="col-md-8">
                <AttendanceCalendar
                  availability={doctorDetails.availability}
                  attendance={doctorDetails.attendance}
                  today_appointment={doctorDetails.today_appointment}
                />
              </div>
              <div className="col-md-4">
                <div className="c-card">
                  <h4>Logs</h4>
                  <div className="mt-2">
                    {doctorDetails.log && doctorDetails.log.length > 0 ? (
                      <div
                        className="inner-container"
                        style={{ overflowY: "auto", maxHeight: "40vh" }}
                      >
                        <table className="table table-hover text-no-wrap">
                          <thead>
                            <tr>
                              <th scope="col" className="text-no-wrap">
                                Type
                              </th>
                              <th scope="col" className="text-no-wrap">
                                Status
                              </th>
                              <th scope="col" className="text-no-wrap">
                                Time
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {doctorDetails.log.reverse().map((item, index) => (
                              <tr key={index}>
                                <td style={{ whiteSpace: "nowrap" }}>
                                  {item.type}
                                </td>
                                <td style={{ whiteSpace: "nowrap" }}>
                                  {item.status}
                                </td>
                                <td style={{ whiteSpace: "nowrap" }}>
                                  {formatTime(item.createdAt)}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    ) : (
                      <p>No logs available.</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <Modal opened={opened} onClose={close} title="Patient Details">
        {/* <Table
          data={patientsDetails && patientsDetails}
          columns={["Name", "Date", "Doctor", "TimeSlot"]}
        /> */}
        {doctorDetails.treated_patient &&
        doctorDetails.treated_patient.length > 0 ? (
          <div
            className="inner-container"
            style={{ overflowY: "auto", maxHeight: "40vh" }}
          >
            <table className="table table-hover text-no-wrap">
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
                {doctorDetails &&
                  doctorDetails.treated_patient.map((item, index) => (
                    <tr key={index}>
                      <td style={{ whiteSpace: "nowrap" }}>{item.name}</td>
                      <td style={{ whiteSpace: "nowrap" }}>{item.age}</td>
                      <NavLink
                        to={`/patients/profile/${item._id}`}
                        style={{
                          padding: 0,
                          height: "100%",
                          width: "100%",
                          display: "flex",
                          alignItems: "center",
                          marginTop: "10px",
                        }}
                      >
                        <td style={{ whiteSpace: "nowrap" }}>View</td>
                      </NavLink>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p>No Patient available.</p>
        )}
      </Modal>
    </>
  );
};

export default DoctorProfile;
