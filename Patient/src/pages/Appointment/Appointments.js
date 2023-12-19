import React, { useEffect, useState } from "react";
import { useForm } from "@mantine/form";
import { TextInput, Button, Group, Select, NumberInput } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import axios from "axios";
import symptomsData from "./symptoms.json";
import { useDispatch, useSelector } from "react-redux";
import {
  PillsInput,
  Pill,
  Combobox,
  CheckIcon,
  useCombobox,
  MultiSelect,
  Text,
} from "@mantine/core";

import { useCookies } from "react-cookie";

const Appointments = () => {
  const [hospitals, setHospitals] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [fetchedSpecializations, setFetchedSpecializations] = useState([]);
  const [availability, setAvailability] = useState([]);
  const [onlineSlotsAvailable, setOnlineSlotsAvailable] = useState(0);
  const [offlineSlotsAvailable, setOfflineSlotsAvailable] = useState(0);
  const [isOnlineSlotsAvailable, setIsOnlineSlotsAvailable] = useState(true);
  const [isDateSelected, setIsDateSelected] = useState(false);

  const [timeSlot, setTimeSlot] = useState([]);

  const [cookies] = useCookies(["token"]);
  const BookFormData = useSelector((state) => state.app.formData);

  useEffect(() => {
    const fetchHospitals = async () => {
      const { data } = await axios.get("/api/hospitals");
      setHospitals(data);
      console.log(data);
    };
    console.log(BookFormData);
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

    const { data } = await axios.get(
      `/api/doctors/specialization/${hospitalId}`
    );

    setFetchedSpecializations(data);
  };

  const handleDoctor = async (value) => {
    const foundHospital = hospitals.find(
      (item) => item.name === form.values.hospital
    );

    const hospitalId = foundHospital._id;

    const { data } = await axios.get(
      `/api/doctors/specialization/${hospitalId}/${value}`
    );
    console.log(data);
    setDoctors(data);
  };

  const handleDate = async (doctor) => {
    const foundDoctor = doctors.find((item) => item.name === doctor);

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
    const slots = await handleAvailableSlot(foundDate.date);
    console.log(slots);
    const slotsBooked = slots.slot_booked;
    const slotsOnlineAvailable = slots.slot_count;
    const slotsOfflineAvailable = slots.slot_count.walk_in;
    console.log(slotsBooked, slotsOnlineAvailable, slotsOfflineAvailable);

    if (slotsBooked <= slotsOnlineAvailable) {
      const start_time = foundDate.start_time;
      const end_time = foundDate.end_time;
      const timeSlots = [`${start_time}-${end_time}`];
      console.log(timeSlots);
      setIsDateSelected(true);

      setTimeSlot(timeSlots);
    } else {
      alert("No slots available");
      setTimeSlot([]);
    }
    setIsOnlineSlotsAvailable(slotsOnlineAvailable > slotsBooked);

    setOnlineSlotsAvailable(slotsOnlineAvailable - slotsBooked);
    setOfflineSlotsAvailable(slotsOfflineAvailable);
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

  const handleAvailableSlot = async (date) => {
    const type = "online";
    const doctor_id = form.values.doctor_id;
    console.log(date);
    const { data } = await axios.post(
      `/api/appointment/doctor/slots/${type}/${doctor_id}`,
      { date: date }
    );

    console.log(data);
    return data;
  };

  const handleSubmit = async (values) => {
    values.patient_id = cookies._id;
    console.log(values);
    try {
      // console.log(values);
      const { data } = await axios.post(
        "/api/appointment/online/register",
        values
      );
      console.log(data);
      alert("Appointment booked successfully");
    } catch (error) {
      alert(error.response.data);
      console.log(error);
    }
  };

  const isHospitalSelected = form.values.hospital;
  const isSpecializationSelected = form.values.specialization;
  const isDoctorSelected = form.values.doctor;
  const isSlotAvailable = timeSlot;
  return (
    <div>
      <div className="container-fluid">
        <div className="c-card">
          <h4>Book an Appointment</h4>
          <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
            <div className="container-fluid p-0 mt-3">
              <div className="row">
                <div className="col-md-6">
                  <div className=" d-flex justify-content-between align-items-between g-4">
                    <MultiSelect
                      style={{ width: "75%" }}
                      label="Enter Symptoms"
                      placeholder="Pick Symptoms"
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
                      // disabled={!isOnlineSlotsAvailable || !isDateSelected}
                      searchable
                      nothingFoundMessage="Nothing found..."
                    />
                    <Button
                      mt={23}
                      style={{ background: "#0a0059" }}
                      className="book-btn"
                    >
                      Recommend
                    </Button>
                  </div>
                </div>

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
                <div className="col-md-6 mt-md-3 mt-md-0">
                  <Select
                    label="Select Specialization"
                    placeholder="Select Specialization"
                    // mt="md"
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
                    data={availability
                      .map((slot) => ({
                        value: slot.date,
                        label: new Date(slot.date).toLocaleDateString("en-GB"), // Use 'en-GB' for dd/mm/yyyy format
                      }))
                      .sort((a, b) => new Date(a.value) - new Date(b.value))}
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
                    disabled={!isOnlineSlotsAvailable || !isDateSelected} // Disable if no doctor selected, no online slots available, or no date selected
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
              </div>
              <Group align="center" justify="space-between" mt="xl">
                <Group>
                  <Text style={{ color: "black" }}>
                    Online Slots Available: {onlineSlotsAvailable}
                  </Text>
                  {/* <Text style={{ color: "black" }}>
                    Offline Slots Available: {offlineSlotsAvailable}
                  </Text> */}
                </Group>

                <Button
                  className="book-btn"
                  type="submit"
                  // onClick={handleSubmit}
                  disabled={!isDateSelected || !isSlotAvailable}
                  style={{ background: "#0a0059" }}
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
