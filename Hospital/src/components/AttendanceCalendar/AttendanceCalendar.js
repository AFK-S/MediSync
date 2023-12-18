import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"; // Import the default styles for react-calendar
import "./Attendance.css";

const AttendanceCalendar = ({
  attendance,
  availability,
  today_appointment,
}) => {
  const attendanceData =
    attendance &&
    attendance.map((item) => (item.date ? item.date.split("T")[0] : ""));
  const upcomingData =
    availability &&
    availability.map((item) => (item.date ? item.date.split("T")[0] : ""));

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
    return (
      attendanceData &&
      attendanceData.includes(date.toISOString().split("T")[0])
    );
  };

  const isDateUpcoming = (date) => {
    return (
      upcomingData && upcomingData.includes(date.toISOString().split("T")[0])
    );
  };

  const formatDate = (date) => {
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    const formattedDate = new Date(date).toLocaleDateString("en-GB", options);
    return formattedDate;
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
            <h5 className="mb-2 mt-4 mt-md-0">Upcoming Appointments Today</h5>
            <div className="">
              {today_appointment && today_appointment.length > 0 ? (
                <div
                  className="inner-container"
                  style={{ overflowY: "auto", maxHeight: "300px" }}
                >
                  <table className="table table-hover text-no-wrap">
                    <thead>
                      <tr>
                        <th scope="col" className="text-no-wrap">
                          Name
                        </th>
                        <th scope="col" className="text-no-wrap">
                          Date
                        </th>
                        <th scope="col" className="text-no-wrap">
                          Slot
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {today_appointment.map((item, index) => (
                        <tr key={index}>
                          <td style={{ whiteSpace: "nowrap" }}>
                            {item.patient.name}
                          </td>
                          <td style={{ whiteSpace: "nowrap" }}>
                            {formatDate(item.date)}
                          </td>
                          <td style={{ whiteSpace: "nowrap" }}>
                            {item.time_slot}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p>No appointments today.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendanceCalendar;
