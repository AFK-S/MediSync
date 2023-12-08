import React, { useState } from "react";
import { Divider, Group, Text } from "@mantine/core";
import Chart from "react-apexcharts";

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
                  <h1 className="mt-2">90</h1>
                </div>
                <div className="col-6 text-capitalize">
                  <p className="fw-600 ">Appointments Completed</p>
                  <h1 className="mt-2">21</h1>
                </div>
              </div>
              <div className=" text-capitalize d-flex align-items-center mt-3 fw-600">
                <h5 className=" ">Doctors Available : </h5>
                <h5 className="ms-3">21</h5>
              </div>
            </div>
          </div>
          <div className="col-md-4 ">
            <div className="c-card">
              <h4>Beds Available</h4>
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
                30
              </h1>
            </div>
          </div>
        </div>
      </div>

      {/* Available Doctors */}
      <div className="container-fluid c-card my-4">
        <h4 className="mb-2">Doctors Available</h4>
        <Table
          data={doctors && doctors}
          columns={[
            "Name",
            "Age",
            "Experience",
            "Specialty",
            "Date",
            "TimeSlot",
          ]}
        />
      </div>

      {/* Waiting Patients */}
      <div className="container-fluid c-card my-4">
        <h4 className="mb-2">Patients Waiting</h4>
        <Table
          data={patientsWaiting && patientsWaiting}
          columns={["Name", "Date", "Doctor", "TimeSlot"]}
        />
      </div>
    </div>
  );
};

export default Dashboard;
