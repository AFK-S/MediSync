import React, { useEffect, useState } from "react";
import { useForm } from "@mantine/form";
import { TextInput, Button, Group, Select, NumberInput } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import axios from "axios";
import { useCookies } from "react-cookie";

// const doctors = ["Dr. XYZ", "Dr. ABC", "Dr. PQR"];
const timeSlots = ["10:00am - 10:30am", "11:00am - 11:30am", "2:00pm - 2:30pm"];

const Table = ({ data, columns }) => {
  return (
    <div
      className="inner-container"
      style={{ overflowY: "auto", maxHeight: "80vh" }}
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

const Appointments = () => {
  const [doctors, setDoctors] = useState([]);
  const [availability, setAvailability] = useState([]);
  const [cookie] = useCookies();
  const [timeSlot, setTimeSlot] = useState([]);

  const [patientsWaiting, setPatientsWaiting] = useState([
    {
      name: "Karan",
      age: "0",
      doctor: "Dr. XYZ",
      timeslot: "10:00am - 10:30am",
      date: "23/10/2023",
    },
    {
      name: "Karan",
      age: "0",
      doctor: "Dr. XYZ",
      timeslot: "10:00am - 10:30am",
      date: "23/10/2023",
    },
    {
      name: "Karan",
      age: "0",
      doctor: "Dr. XYZ",
      timeslot: "10:00am - 10:30am",
      date: "23/10/2023",
    },
    {
      name: "Karan",
      age: "0",
      doctor: "Dr. XYZ",
      timeslot: "10:00am - 10:30am",
      date: "23/10/2023",
    },
    {
      name: "Karan",
      age: "0",
      doctor: "Dr. XYZ",
      timeslot: "10:00am - 10:30am",
      date: "23/10/2023",
    },
  ]);

  const form = useForm({
    initialValues: {
      name: "",
      age: "",
      phone_number: "",
      gender: "",
      lifestyle: "",
      habits: "",
      doctor: "",
      doctor_id: "",
      date: "",
      time_slot: "",
      hospital_id: cookie._id,
      symptoms: [],
    },
  });

  const handleDate = async (value) => {
    const foundDoctor = doctors.find((item) => item.name === value);

    form.setValues({ doctor: value });
    form.setValues({ doctor_id: foundDoctor._id });

    const date = foundDoctor.availability;

    console.log(date);
    setAvailability(date);
  };

  const handleTimeSlot = (date) => {
    const foundDoctor = doctors.find(
      (item) => item.name === form.values.doctor
    );
    const foundDate = foundDoctor.availability.find(
      (item) => item.date === date
    );

    const start_time = foundDate.start_time;
    const end_time = foundDate.end_time;
    const timeSlots = [`${start_time}-${end_time}`];
    console.log(timeSlots);

    setTimeSlot(timeSlots);
  };

  const fetchDoctors = async () => {
    try {
      const { data } = await axios.get(`/api/doctor/hospital/${cookie._id}`);
      setDoctors(data);
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async () => {
    // Handle form submission logic here
    const formData = form.values;
    try {
      // Assuming your API call returns a promise, so we'll use await
      const { data } = await axios.post(
        "/api/appointment/walk_in/register",
        formData
      );
      console.log(data);
      alert("Appointment Booked");

      window.location.reload();
    } catch (err) {
      console.log(err);
    }
    console.log(formData);
  };

  const getCheckIn = async () => {
    try {
      const { data } = await axios.get(
        `/api/appointment/walk_in/today/${cookie._id}`
      );
      console.log(cookie._id);
      console.log("data");

      setPatientsWaiting(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchDoctors();
    getCheckIn();
  }, []);

  return (
    <div>
      <div className="container-fluid">
        <div className="c-card">
          <h4>Walk In Appointments</h4>
          <div className="container-fluid p-0 mt-3">
            <div className="row">
              <div className="col-md-6">
                <TextInput
                  label="Name"
                  placeholder="Name"
                  {...form.getInputProps("name")}
                />
              </div>
              <div className="col-md-6 mt-3 mt-md-0">
                <NumberInput
                  label="Phone Number"
                  placeholder="Phone Number"
                  {...form.getInputProps("phone_number")}
                />
              </div>
              <div className="col-md-6">
                <NumberInput
                  mt="md"
                  label="Age"
                  placeholder="Age"
                  {...form.getInputProps("age")}
                />
              </div>
              <div className="col-md-6">
                <Select
                  mt="md"
                  label="Select Gender"
                  placeholder="Select Gender"
                  data={[
                    { label: "Male", value: "male" },
                    { label: "Female", value: "female" },
                  ]}
                  onChange={(value) =>
                    form.setValues({ ...form.values, gender: value })
                  }
                  value={form.values.gender}
                />{" "}
              </div>

              <div className="col-md-6">
                <Select
                  mt="md"
                  required
                  placeholder="Select one of the following"
                  label="Do You Drink/Smoke?"
                  data={[
                    { value: "yes", label: "Yes" },
                    { value: "no", label: "No" },
                  ]}
                  onChange={(event) => {
                    form.setValues({ habits: event });
                  }}
                  value={form.values.habits}
                />
              </div>
              <div className="col-md-6">
                <Select
                  mt="md"
                  label="Select Lifestyle"
                  placeholder="Select Lifestyle"
                  data={[
                    { value: "rural", label: "Rural" },
                    { value: "urban", label: "Urban" },
                    { value: "active", label: "Active" },
                    { value: "urban-rural", label: "Urban-rural" },
                  ]}
                  onChange={(value) =>
                    form.setValues({ ...form.values, lifestyle: value })
                  }
                  value={form.values.lifestyle}
                />
              </div>
              <div className="col-md-6">
                <Select
                  mt="md"
                  label="Select Doctor"
                  placeholder="Select Doctor"
                  data={doctors.map((doctor) => ({
                    value: doctor.name,
                    label: doctor.name,
                  }))}
                  onChange={(value) => handleDate(value)}
                  value={form.values.doctor}
                />
              </div>

              <div className="col-md-6">
                <Select
                  mt="md"
                  label="Select Date"
                  placeholder="Select Date"
                  data={availability
                    .filter(
                      (slot) =>
                        new Date(slot.date) >= new Date().setHours(0, 0, 0, 0)
                    )
                    .map((slot) => ({
                      value: slot.date,
                      label: new Date(slot.date).toLocaleDateString("en-GB"),
                    }))
                    .sort((a, b) => new Date(a.value) - new Date(b.value))}
                  onChange={(value) => {
                    form.setValues({ ...form.values, date: value });
                    handleTimeSlot(value);
                  }}
                  nothingFoundMessage="No time slots available"
                  value={form.values.date}
                />
              </div>
              <div className="col-md-6">
                <Select
                  mt="md"
                  label="Select Time Slot"
                  placeholder="Select Time Slot"
                  data={timeSlot.map((slot) => ({ value: slot, label: slot }))}
                  onChange={(value) =>
                    form.setValues({ ...form.values, time_slot: value })
                  }
                  value={form.values.time_slot}
                />
              </div>
            </div>
            <Group justify="end" mt="xl">
              <Button onClick={handleSubmit}>Book</Button>
            </Group>
          </div>
        </div>
      </div>
      <div className="mt-4 c-card">
        <div className="d-flex flex-column flex-md-row align-items-start align-content-md-center justify-content-between w-100">
          <h4 className="mb-2 ">Walk In Patient List</h4>
          <div
            className="d-flex align-items-center w-100 my-3 my-md-0"
            style={{ maxWidth: "300px" }}
          >
            <i className="fa-solid fa-magnifying-glass me-2"></i>
            <input
              type="text"
              style={{ width: "100%", outline: "none", border: "none" }}
              placeholder="Search Patients"
            />
          </div>
        </div>
        <div className="mt-2">
          <div
            className="inner-container"
            style={{ overflowY: "auto", maxHeight: "80vh" }}
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
                    Slot
                  </th>
                </tr>
              </thead>
              <tbody>
                {patientsWaiting &&
                  patientsWaiting.map((item, index) => (
                    <tr>
                      <td style={{ whiteSpace: "nowrap" }}>
                        {item?.patient?.name}
                      </td>
                      <td style={{ whiteSpace: "nowrap" }}>
                        {item?.doctor.name}
                      </td>
                      <td style={{ whiteSpace: "nowrap" }}>
                        {item?.time_slot}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
          {/* <Table
            data={patientsWaiting && patientsWaiting}
            columns={["Name", "Date", "Doctor", "TimeSlot"]}
          /> */}
        </div>
      </div>
    </div>
  );
};

export default Appointments;
