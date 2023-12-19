import React, { useContext, useState } from "react";
import { Divider, Group, Text, Avatar } from "@mantine/core";
import Chart from "react-apexcharts";
import { StateContext } from "../context/StateContext";

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

const Dashboard = () => {
  const { hospitalData } = useContext(StateContext);

  const [doctors, setDoctors] = useState([
    {
      name: "Karandeep Singh Sandhu",
      age: "40",
      experience: "10",
      specialty: "cardiologist",
      date: "18/10/2023",
      timeslot: "12:00pm - 03:00pm",
    },
    {
      name: "Karan",
      age: "40",
      experience: "10",
      specialty: "cardiologist",
      date: "18/10/2023",
      timeslot: "12:00pm - 03:00pm",
    },
    {
      name: "Karan",
      age: "40",
      experience: "10",
      specialty: "cardiologist",
      date: "18/10/2023",
      timeslot: "12:00pm - 03:00pm",
    },
    {
      name: "Karan",
      age: "40",
      experience: "10",
      specialty: "cardiologist",
      date: "18/10/2023",
      timeslot: "12:00pm - 03:00pm",
    },
    {
      name: "Karan",
      age: "40",
      experience: "10",
      specialty: "cardiologist",
      date: "18/10/2023",
      timeslot: "12:00pm - 03:00pm",
    },
    {
      name: "Karan",
      age: "40",
      experience: "10",
      specialty: "cardiologist",
      date: "18/10/2023",
      timeslot: "12:00pm - 03:00pm",
    },
    {
      name: "Karan",
      age: "40",
      experience: "10",
      specialty: "cardiologist",
      date: "18/10/2023",
      timeslot: "12:00pm - 03:00pm",
    },
    {
      name: "Karan",
      age: "40",
      experience: "10",
      specialty: "cardiologist",
      date: "18/10/2023",
      timeslot: "12:00pm - 03:00pm",
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

  const bedsChartData = {
    series: [
      hospitalData.today_non_treated_patient_count !== undefined
        ? hospitalData.today_non_treated_patient_count
        : 10,
      hospitalData.today_treated_patient_count !== undefined
        ? hospitalData.today_treated_patient_count
        : 90,
    ],

    options: {
      chart: {
        type: "donut",
      },
      labels: ["Non Treated", "Treated"],
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
  return (
    <div>
      <div className="container-fluid">
        <div className="row gy-3">
          <div className="col-md-4 ">
            <div className="c-card">
              <h4>Day Satistics</h4>
              <div className="row mt-3">
                <div className="col-6 text-capitalize">
                  <p className="fw-600 ">Appointments Booked</p>
                  <h1 className="mt-2">
                    {hospitalData &&
                      hospitalData.today_non_treated_patient_count +
                        hospitalData.today_treated_patient_count}
                  </h1>
                </div>
                <div className="col-6 text-capitalize">
                  <p className="fw-600 ">Appointments Completed</p>
                  <h1 className="mt-2">
                    {hospitalData && hospitalData.today_treated_patient_count}
                  </h1>
                </div>
              </div>
              {/* <div className=" text-capitalize d-flex align-items-center mt-3 fw-600">
                <h5 className=" ">Doctors Available : </h5>
                <h5 className="ms-3">21</h5>
              </div> */}
            </div>
          </div>
          <div className="col-md-4 ">
            <div className="c-card">
              <h4> Appointment Stats</h4>
              <Chart
                className="mt-3"
                options={bedsChartData.options}
                series={bedsChartData.series}
                type="donut"
                height="230"
              />
            </div>
          </div>
          <div className="col-md-4 ">
            <div className="c-card">
              <h4>Doctors Available today</h4>
              <h1 className="text-center mt-2" style={{ fontSize: "1200%" }}>
                {hospitalData && hospitalData.doctor_available_count}
              </h1>
            </div>
          </div>
        </div>
      </div>

      {/* Available Doctors */}
      <div className="container-fluid c-card my-4">
        <h4 className="mb-2">Doctors Available</h4>
        <div
          className="inner-container"
          style={{ overflowY: "auto", maxHeight: "40vh" }}
        >
          <table className="table table-hover text-no-wrap">
            <thead>
              <tr>
                <th scope="col" className="text-no-wrap">
                  Avatar
                </th>
                <th scope="col" className="text-no-wrap">
                  Name
                </th>
                <th scope="col" className="text-no-wrap">
                  specialization
                </th>
                <th scope="col" className="text-no-wrap">
                  Age
                </th>
                <th scope="col" className="text-no-wrap">
                  Experience
                </th>
              </tr>
            </thead>
            <tbody>
              {hospitalData.doctor_available?.map((item, index) => (
                <tr key={index}>
                  <td style={{ whiteSpace: "nowrap" }}>
                    <Avatar src={item.photo_url} alt="it's me" />
                  </td>
                  <td style={{ whiteSpace: "nowrap" }}>{item.name}</td>
                  <td style={{ whiteSpace: "nowrap" }}>
                    {item.specialization}
                  </td>
                  <td style={{ whiteSpace: "nowrap" }}>{item.age} years</td>
                  <td style={{ whiteSpace: "nowrap" }}>
                    {item.experience} years
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Waiting Patients */}
      <div className="container-fluid c-card my-4">
        <h4 className="mb-2">Patients Waiting</h4>
        {/* <Table
          data={patientsWaiting && patientsWaiting}
          columns={["Name", "Date", "Doctor", "TimeSlot"]}
        /> */}
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
                  Doctor
                </th>
                <th scope="col" className="text-no-wrap">
                  Symptoms
                </th>
                <th scope="col" className="text-no-wrap">
                  Time
                </th>
              </tr>
            </thead>
            <tbody>
              {hospitalData?.today_non_treated_patient?.map((item, index) => (
                <tr key={index}>
                  <td style={{ whiteSpace: "nowrap" }}>{item.patient.name}</td>
                  <td style={{ whiteSpace: "nowrap" }}>{item.doctor.name}</td>
                  <td style={{ whiteSpace: "nowrap" }}>
                    <td style={{ whiteSpace: "nowrap" }}>
                      {item.symptoms.map((symptom, index) => (
                        <span key={index}>
                          {symptom
                            .replace(/_/g, " ")
                            .replace(/\b\w/g, (char) => char.toUpperCase())}
                          {index < item.symptoms.length - 1 && ", "}
                        </span>
                      ))}
                    </td>
                  </td>
                  <td style={{ whiteSpace: "nowrap" }}>{item.time_slot}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
