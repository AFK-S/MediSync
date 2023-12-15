import React, { useEffect, useState } from "react";
import { useForm } from "@mantine/form";
import { TextInput, Button, Group, Select, NumberInput } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import axios from "axios";
import symptomsData from "./symptoms.json";

import {
  PillsInput,
  Pill,
  Combobox,
  CheckIcon,
  useCombobox,
  MultiSelect,
} from "@mantine/core";

import { useCookies } from "react-cookie";

const Appointments = () => {
  const [hospitals, setHospitals] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [fetchedSpecializations, setFetchedSpecializations] = useState([]);
  const [availability, setAvailability] = useState([]);

  const [timeSlot, setTimeSlot] = useState([]);

  const [cookies] = useCookies(["token"]);

  useEffect(() => {
    const fetchHospitals = async () => {
      const { data } = await axios.get("/api/hospitals");
      setHospitals(data);
      console.log(data);
    };
    fetchHospitals();
  }, []);

  const handleSpecialization = async (hospital) => {
    const foundHospital = hospitals.find((item) => item.name === hospital);
    const hospitalId = foundHospital._id;

    form.setValues({
      ...form.values,
      hospital: hospital,
      hospital_id: hospitalId,
      specialization: "",
      doctor: "",
    });

    const { data } = await axios.get(`/api/specializations/${hospitalId}`);

    setFetchedSpecializations(data);
  };

  const handleDoctor = async (value) => {
    const foundHospital = hospitals.find(
      (item) => item.name === form.values.hospital
    );

    const hospitalId = foundHospital._id;

    const { data } = await axios.get(
      `/api/appointment/doctor/${hospitalId}/${value}`
    );
    setDoctors(data);
  };

  const handleDate = async (doctor) => {
    console.log("====================================");
    console.log(doctor);
    console.log("====================================");
    const foundDoctor = doctors.find((item) => item.name === doctor);
    console.log(foundDoctor);

    form.setValues({ doctor_id: foundDoctor._id });

    const date = foundDoctor.availability;
    setAvailability(date);
  };

  const handleTimeSlots = async (date) => {
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
    console.log(timeSlot);
  };

  const form = useForm({
    initialValues: {
      hospital: "",
      hospital_id: "",
      specialization: "",
      doctor: "",
      doctor_id: "",
      patient_id: "",
      date: "",
      time_slot: "",
      symptoms: [],
    },
  });

  const handleSubmit = async (values) => {
    console.log(values);
    values.patient_id = cookies._id;
    try {
      console.log(values);
      const { data } = await axios.post("/api/appointment/register", values);
      console.log(data);
      alert("Appointment booked successfully");
    } catch (error) {
      alert("Something went wrong");
      console.log(error);
    }
  };

  const isHospitalSelected = form.values.hospital;
  const isSpecializationSelected = form.values.specialization;
  const isDoctorSelected = form.values.doctor;
  return (
    <div>
      <div className="container-fluid">
        <div className="c-card">
          <h4>Book an Appointment</h4>
          <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
            <div className="container-fluid p-0 mt-3">
              <div className="row">
                <div className="col-md-6">
                  <Select
                    label="Select Hospital"
                    placeholder="Select Hospital"
                    data={hospitals.map((hospital) => ({
                      value: hospital.name,
                      label: hospital.name,
                    }))}
                    onChange={(value) => {
                      handleSpecialization(value);
                    }}
                    value={form.values.hospital}
                  />
                </div>
                <div className="col-md-6 mt-3 mt-md-0">
                  <Select
                    label="Select Specialization"
                    placeholder="Select Specialization"
                    {...form.getInputProps("specialization")}
                    data={fetchedSpecializations.map((specialization) => ({
                      value: specialization,
                      label: specialization,
                    }))}
                    onChange={(value) => {
                      form.setValues({
                        ...form.values,
                        specialization: value,
                      });
                      handleDoctor(value);
                    }}
                    nothingFoundMessage="No specializations found"
                    disabled={!isHospitalSelected}
                  />
                </div>
                <div className="col-md-6 mt-3 mt-md-0">
                  <Select
                    label="Select Doctor"
                    placeholder="Select Doctor"
                    data={doctors.map((doctor) => ({
                      value: doctor.name,
                      label: doctor.name,
                    }))}
                    {...form.getInputProps("doctor")}
                    onChange={(value) => {
                      form.setValues({
                        ...form.values,
                        doctor: value,
                      });
                      handleDate(value);
                    }}
                    mt="md"
                    nothingFoundMessage="No doctors found"
                    disabled={!isSpecializationSelected}
                  />
                </div>
                <div className="col-md-6">
                  <Select
                    mt="md"
                    label="Select Date"
                    placeholder="Select Date"
                    disabled={!isDoctorSelected}
                    data={availability.map((slot) => ({
                      value: slot.date,
                      label: new Date(slot.date).toLocaleDateString(),
                    }))}
                    onChange={(value) => {
                      form.setValues({ ...form.values, date: value });
                      handleTimeSlots(value);
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
                    disabled={!isDoctorSelected}
                    data={timeSlot.map((slot) => ({
                      value: slot,
                      label: slot,
                    }))}
                    onChange={(value) => {
                      form.setValues({ ...form.values, time_slot: value });
                    }}
                    nothingFoundMessage="No time slots available"
                    value={form.values.time_slot}
                  />
                </div>
                <div className="col-md-6">
                  <MultiSelect
                    label="Enter Symptoms"
                    placeholder="Pick Symptoms"
                    mt="md"
                    onChange={(value) => {
                      form.setValues({ symptoms: value });
                    }}
                    value={form.values.symptoms}
                    data={Object.entries(symptomsData).map(
                      ([label, value]) => ({
                        value: value,
                        label: label,
                      })
                    )}
                    disabled={!isDoctorSelected}
                    searchable
                    nothingFoundMessage="Nothing found..."
                  />
                </div>
              </div>
              <Group justify="end" mt="xl">
                <Button
                  className="book-btn"
                  type="submit"
                  // onClick={handleSubmit}
                  disabled={!isDoctorSelected}
                  style={{ background: "#1b03a3" }}
                >
                  Book
                </Button>
              </Group>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Appointments;
