import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"; // Import the default styles for react-calendar
import "./Attendance.css";

const Table = ({ data, columns }) => {
  return (
    <div
      className="inner-container"
      style={{ overflowY: "auto", maxHeight: "300px" }}
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

const AttendanceCalendar = () => {
  // Replace these arrays with the actual data from your backend
  const attendanceData = ["2023-12-23", "2023-12-13", "2023-10-25"];
  const upcomingData = ["2023-12-27", "2023-10-28", "2023-12-09"];

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

  const isDateMarked = (date) => {
    return attendanceData.includes(date.toISOString().split("T")[0]);
  };

  const isDateUpcoming = (date) => {
    return upcomingData.includes(date.toISOString().split("T")[0]);
  };

  return (
    <div className="c-card">
      <h4>Attendance Calendar</h4>
      <div className="row">
        <div className="col-md-6">
          <div className="mt-3">
            <Calendar
              style={{ width: "100%", borderRadius: "100px", padding: "10px" }}
              onClickDay={(date, event) => event.preventDefault()}
              tileClassName={({ date, view }) =>
                `${isDateMarked(date) ? "marked-date" : ""} ${
                  isDateUpcoming(date) ? "upcoming-date" : ""
                } ${view === "month" ? "month-view" : ""}`
              }
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className=" p-0">
            <h5 className="mb-2 mt-4 mt-md-0">Upcoming Appointments</h5>
            <div className="">
              <Table
                data={patientsWaiting && patientsWaiting}
                columns={["Name", "Date", "TimeSlot"]}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendanceCalendar;
