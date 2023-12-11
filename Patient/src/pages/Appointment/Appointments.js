import React, { useState } from "react";
import { useForm } from "@mantine/form";
import { TextInput, Button, Group, Select, NumberInput } from "@mantine/core";
import { DateInput } from "@mantine/dates";

import {
  PillsInput,
  Pill,
  Combobox,
  CheckIcon,
  useCombobox,
} from "@mantine/core";

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
  const groceries = ["sneezing", "coughing", "headache"];

  const form = useForm({
    initialValues: {
      hospital: "",
      doctor: "",
      symptoms: "",
      phone_number: "",
      date: "",
      timeslot: "",
    },
  });

  const handleSubmit = () => {
    // Handle form submission logic here
    const formData = form.values;
    // Add logic to handle the form data (e.g., API call, state update)
    console.log(formData);
  };

  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
    onDropdownOpen: () => combobox.updateSelectedOptionIndex("active"),
  });

  const [search, setSearch] = useState("");
  const [value, setValue] = useState([]);

  const handleValueSelect = (val) =>
    setValue((current) =>
      current.includes(val)
        ? current.filter((v) => v !== val)
        : [...current, val]
    );

  const handleValueRemove = (val) =>
    setValue((current) => current.filter((v) => v !== val));

  const values = value.map((item) => (
    <Pill key={item} withRemoveButton onRemove={() => handleValueRemove(item)}>
      {item}
    </Pill>
  ));

  const options = groceries
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

  return (
    <div>
      <div className="container-fluid">
        <div className="c-card">
          <h4>Book an Appointment</h4>
          <div className="container-fluid p-0 mt-3">
            <div className="row">
              <div className="col-md-6">
                <Select
                  label="Select Hospital"
                  placeholder="Select Hospital"
                  data={doctors.map((doctor) => ({
                    value: doctor,
                    label: doctor,
                  }))}
                  onChange={(value) =>
                    form.setValues({
                      ...form.values,
                      hospital: value,
                      doctor: "",
                      symptoms: [],
                    })
                  }
                  value={form.values.hospital}
                />
              </div>
              <div className="col-md-6 mt-3 mt-md-0">
                <Select
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
                  disabled={!isHospitalSelected}
                />
              </div>
              <div className="col-md-6">
                {/* Symptom select  */}
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
              <div className="col-md-6">
                <NumberInput
                  mt="md"
                  label="Phone Number"
                  placeholder="Phone Number"
                  disabled={!isDoctorSelected}
                  {...form.getInputProps("phone_number")}
                />
              </div>

              <div className="col-md-6">
                <DateInput
                  mt="md"
                  label="Select Date"
                  placeholder="Select Date"
                  disabled={!isDoctorSelected}
                  {...form.getInputProps("date")}
                />
              </div>
              <div className="col-md-6">
                <Select
                  mt="md"
                  label="Select Time Slot"
                  placeholder="Select Time Slot"
                  disabled={!isDoctorSelected}
                  data={timeSlots.map((slot) => ({ value: slot, label: slot }))}
                  onChange={(value) =>
                    form.setValues({ ...form.values, timeslot: value })
                  }
                  value={form.values.timeslot}
                />
              </div>
            </div>
            <Group justify="end" mt="xl">
              <Button
                className="book-btn"
                onClick={handleSubmit}
                disabled={!isDoctorSelected}
                style={{ background: "#1b03a3" }}
              >
                Book
              </Button>
            </Group>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Appointments;
