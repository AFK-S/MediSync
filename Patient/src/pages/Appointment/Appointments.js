import React, { useEffect, useState } from "react";
import { useForm } from "@mantine/form";
import { TextInput, Button, Group, Select, NumberInput } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import axios from "axios";

import {
  PillsInput,
  Pill,
  Combobox,
  CheckIcon,
  useCombobox,
} from "@mantine/core";

import { useCookies } from "react-cookie";

const Appointments = () => {
  const [hospitals, setHospitals] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [fetchedSpecializations, setFetchedSpecializations] = useState([]);
  const [availability, setAvailability] = useState([]);

  const [timeSlot, setTimeSlot] = useState([]);

  const [cookies] = useCookies(["token"]);

  useEffect(async () => {
    const { data } = await axios.get("/api/hospitals");
    setHospitals(data);
    console.log(data);
  }, []);

  const handleSpecialization = async (hospital) => {
    const foundHospital = hospitals.find((item) => item.name === hospital);
    const hospitalId = foundHospital._id;

    // Update form values first
    form.setValues({
      ...form.values,
      hospital: hospital,
      hospital_id: hospitalId,
      specialization: "", // Reset specialization when hospital changes
      doctor: "", // Reset doctor when hospital changes
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

  const symptoms = [
    "Fever",
    "Cough",
    "Headache",
    "Body Ache",
    "Cold",
    "Sore Throat",
    "Nausea",
    "Vomiting",
    "Diarrhea",
    "Fatigue",
    "Shortness of Breath",
    "Loss of Smell",
    "Loss of Taste",
    "Chest Pain",
    "Abdominal Pain",
    "Rash",
    "Red Eyes",
    "Discoloration of Fingers or Toes",
    "Headache",
    "Confusion",
    "Seizures",
    "Stroke",
    "Difficulty Breathing",
  ];

  const form = useForm({
    initialValues: {
      hospital: "",
      hospital_id: "",
      specialization: "",
      doctor: "",
      doctor_id: "",
      patient_id: "",
      date: "",
      timeslot: "",
      symptoms: [],
    },
  });

  const handleSubmit = async (values) => {
    values.patient_id = cookies._id;
    try {
      const { data } = axios.post("/appointment/register", values);
      alert("Appointment Booked");
    } catch (error) {
      alert("Something went wrong");
      console.log(error);
    }
  };

  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
    onDropdownOpen: () => combobox.updateSelectedOptionIndex("active"),
  });

  const [search, setSearch] = useState("");
  const [value, setValue] = useState([]);

  const handleValueSelect = (val) => {
    setValue((current) =>
      current.includes(val)
        ? current.filter((v) => v !== val)
        : [...current, val]
    );
    form.setValues({
      ...form.values,
      symptoms: [...value, val],
    });
  };

  const handleValueRemove = (val) =>
    setValue((current) => current.filter((v) => v !== val));

  const values = value.map((item) => (
    <Pill key={item} withRemoveButton onRemove={() => handleValueRemove(item)}>
      {item}
    </Pill>
  ));

  const options = symptoms
    .filter((item) => item.toLowerCase().includes(search.trim().toLowerCase()))
    .map((item) => (
      <Combobox.Option value={item} key={item} active={value.includes(item)}>
        <Group gap="sm">
          {value.includes(item) ? <CheckIcon size={12} /> : null}
          <span>{item}</span>
        </Group>
      </Combobox.Option>
    ));

  const isHospitalSelected = form.values.hospital;
  const isDoctorSelected = form.values.doctor;
  const isSpecializationSelected = form.values.specialization;
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
                    disabled={!isSpecializationSelected}
                  />
                </div>
                <div className="col-md-6">
                  <Select
                    mt="md"
                    label="Select Time Slot"
                    placeholder="Select Time Slot"
                    disabled={!isDoctorSelected}
                    data={availability.map((slot) => ({
                      value: slot.date,
                      label: new Date(slot.date).toLocaleDateString(),
                    }))}
                    onChange={(value) => {
                      form.setValues({ ...form.values, date: value });
                      handleTimeSlots(value);
                    }}
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
                      form.setValues({ ...form.values, timeslot: value });
                    }}
                    value={form.values.timeslot}
                  />
                </div>
                <div className="col-md-6">
                  <Combobox
                    label="Symptoms"
                    mt="md"
                    store={combobox}
                    onOptionSubmit={handleValueSelect}
                  >
                    <Combobox.DropdownTarget>
                      <PillsInput
                        disabled={!isDoctorSelected}
                        onClick={() => combobox.openDropdown()}
                      >
                        <Pill.Group>
                          {values}

                          <Combobox.EventsTarget>
                            <PillsInput.Field
                              onFocus={() => combobox.openDropdown()}
                              onBlur={() => combobox.closeDropdown()}
                              value={search}
                              placeholder="Search values"
                              onChange={(event) => {
                                combobox.updateSelectedOptionIndex();
                                setSearch(event.currentTarget.value);
                              }}
                              onKeyDown={(event) => {
                                if (
                                  event.key === "Backspace" &&
                                  search.length === 0
                                ) {
                                  event.preventDefault();
                                  handleValueRemove(value[value.length - 1]);
                                }
                              }}
                            />
                          </Combobox.EventsTarget>
                        </Pill.Group>
                      </PillsInput>
                    </Combobox.DropdownTarget>

                    <Combobox.Dropdown>
                      <Combobox.Options>
                        {options.length > 0 ? (
                          options
                        ) : (
                          <Combobox.Empty>Nothing found...</Combobox.Empty>
                        )}
                      </Combobox.Options>
                    </Combobox.Dropdown>
                  </Combobox>
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
