import React, { useState } from "react";
import { useForm } from "@mantine/form";
import { TextInput, Button, Group, Select, NumberInput } from "@mantine/core";
import { DateInput } from "@mantine/dates";

const doctors = ["Dr. XYZ", "Dr. ABC", "Dr. PQR"];
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
      doctor: "",
      timeslot: "",
      date: "",
    },
  });

  const handleSubmit = () => {
    // Handle form submission logic here
    const formData = form.values;
    // Add logic to handle the form data (e.g., API call, state update)
    console.log(formData);
  };

  return (
    <div>
      <div className="container-fluid">
        <div className="c-card">
          <h4>Book an Appointment</h4>
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
                  label="Select Doctor"
                  placeholder="Select Doctor"
                  data={doctors.map((doctor) => ({
                    value: doctor,
                    label: doctor,
                  }))}
                  onChange={(value) =>
                    form.setValues({ ...form.values, doctor: value })
                  }
                  value={form.values.doctor}
                />
              </div>

              <div className="col-md-6">
                <DateInput
                  mt="md"
                  label="Select Date"
                  placeholder="Select Date"
                  {...form.getInputProps("date")}
                />
              </div>
              <div className="col-md-6">
                <Select
                  mt="md"
                  label="Select Time Slot"
                  placeholder="Select Time Slot"
                  data={timeSlots.map((slot) => ({ value: slot, label: slot }))}
                  onChange={(value) =>
                    form.setValues({ ...form.values, timeslot: value })
                  }
                  value={form.values.timeslot}
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
          <h4 className="mb-2 ">Patients List</h4>
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
          <Table
            data={patientsWaiting && patientsWaiting}
            columns={["Name", "Date", "Doctor", "TimeSlot"]}
          />
        </div>
      </div>
    </div>
  );
};

export default Appointments;
