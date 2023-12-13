import React, { useState, useRef } from "react";
import { Button, TextInput, Select, ActionIcon, rem } from "@mantine/core";
import { useForm } from "@mantine/form";
import { Calendar } from "@mantine/dates";
import dayjs from "dayjs";
import { TimeInput } from "@mantine/dates";
import { IconClock } from "@tabler/icons-react";
import axios from "axios";
import { useCookies } from "react-cookie";

const Register = () => {
  const [cookies] = useCookies();
  const form = useForm({
    initialValues: {
      doctor_name: "",
      phone_number: "",
      file: "",
      specialization: "",
      age: "",
      experience: "",
      license_number: "",
      rfid_tag: "",
      gender: "",
      fees: "",
      availability: [],
      start_time: "",
      end_time: "",
      average_time: "",
    },
  });

  const refStart = useRef(null);
  const refEnd = useRef(null);
  const [imagePreview, setImagePreview] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    form.setFieldValue("file", file);
    const previewUrl = URL.createObjectURL(file);
    setImagePreview(previewUrl);
  };

  const pickerControlStart = (
    <ActionIcon
      variant="subtle"
      color="gray"
      onClick={() => refStart.current?.showPicker()}
    >
      <IconClock style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
    </ActionIcon>
  );

  const pickerControlEnd = (
    <ActionIcon
      variant="subtle"
      color="gray"
      onClick={() => refEnd.current?.showPicker()}
    >
      <IconClock style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
    </ActionIcon>
  );

  const [selected, setSelected] = useState([]);

  const handleSelect = (date) => {
    const formattedDate = dayjs(date).format("YYYY-MM-DD");
    const isSelected = selected.some((s) =>
      dayjs(s).isSame(formattedDate, "date")
    );
    if (isSelected) {
      setSelected((current) =>
        current.filter((d) => !dayjs(d).isSame(formattedDate, "date"))
      );
    } else if (selected.length < 7) {
      setSelected((current) => [...current, formattedDate]);
    }
  };

  const handleSubmit = async (values) => {
    values.availability = [];
    for (const index in selected) {
      values.availability.push({
        date: selected[index],
        start_time: values.start_time,
        end_time: values.end_time,
      });
    }
    if (values.availability.length === 0) {
      return alert("Enter Doctor Available Dates and Time");
    }
    console.log(values);
    const formData = new FormData();
    formData.append("doctor_name", values.doctor_name);
    formData.append("phone_number", values.phone_number);
    formData.append("specialization", values.specialization);
    formData.append("age", values.age);
    formData.append("experience", values.experience);
    formData.append("license_number", values.license_number);
    formData.append("rfid_tag", values.rfid_tag);
    formData.append("gender", values.gender);
    formData.append("fees", values.fees);
    formData.append("availability", JSON.stringify(values.availability));
    formData.append("start_time", values.start_time);
    formData.append("end_time", values.end_time);
    formData.append("average_time", values.average_time);
    formData.append("file", values.file);
    try {
      const { data } = await axios.post(
        `api/doctor/register/${cookies._id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      form.reset();
      setSelected([]);
      setImagePreview(null);
      console.log(data);
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  const specializationOptions = [
    { label: "Dermatologist", value: "dermatologist" },
    { label: "Gastroenterologist", value: "gastroenterologist" },
    { label: "Hepatologist", value: "hepatologist" },
    { label: "Osteopathic", value: "osteopathic" },
    { label: "Endocrinologist", value: "endocrinologist" },
    { label: "Pulmonologist", value: "pulmonologist" },
    { label: "Neurologist", value: "neurologist" },
    { label: "Pediatrician", value: "pediatrician" },
    { label: "Cardiologist", value: "cardiologist" },
    { label: "Phlebologist", value: "phlebologist" },
    { label: "Osteoarthristis", value: "osteoarthristis" },
    { label: "Rheumatologists", value: "rheumatologists" },
    { label: "Otolaryngologist", value: "otolaryngologist" },
    { label: "Gynecologist", value: "gynecologist" },
    { label: "General", value: "general" },
  ];

  return (
    <div className="register overflow-hidden">
      <div className="c-card" style={{ height: "auto" }}>
        <div className="container-fluid">
          <form onSubmit={form.onSubmit(handleSubmit)}>
            <div className="row gy-4">
              <div className="col-md-6">
                <TextInput
                  label="Name"
                  placeholder="Enter your name"
                  required
                  {...form.getInputProps("doctor_name")}
                  error={form.errors.doctor_name}
                />
              </div>
              <div className="col-md-6">
                <TextInput
                  label="Contact"
                  type="number"
                  placeholder="Enter your contact"
                  required
                  pattern="[0-9]*"
                  max={9999999999}
                  {...form.getInputProps("phone_number")}
                  error={form.errors.phone_number}
                />
              </div>
              <div className="col-md-6">
                <Select
                  placeholder="Select specialization"
                  label="Specialization"
                  data={specializationOptions}
                  value={(option) => option.value}
                  required
                  {...form.getInputProps("specialization")}
                  error={form.errors.specialization}
                />
              </div>
              <div className="col-md-6">
                <TextInput
                  label="Age"
                  type="number"
                  placeholder="Enter your age"
                  max={150}
                  required
                  {...form.getInputProps("age")}
                  error={form.errors.age}
                />
              </div>
              <div className="col-md-6">
                <TextInput
                  label="Experience"
                  type="number"
                  placeholder="Enter experience"
                  max={150}
                  required
                  {...form.getInputProps("experience")}
                  error={form.errors.experience}
                />
              </div>
              <div className="col-md-6">
                <TextInput
                  label="Fees"
                  type="number"
                  placeholder="Enter Fees"
                  required
                  {...form.getInputProps("fees")}
                  error={form.errors.fees}
                />
              </div>
              <div className="col-md-6">
                <TextInput
                  label="Licence Number"
                  type="number"
                  placeholder="Enter Licence Number"
                  required
                  {...form.getInputProps("license_number")}
                  error={form.errors.license_number}
                />
              </div>
              <div className="col-md-6">
                <TextInput
                  label="RFID Tag No."
                  type="text"
                  placeholder="Enter RFID Tag"
                  required
                  {...form.getInputProps("rfid_tag")}
                  error={form.errors.rfid_tag}
                />
              </div>
              <div className="row gx-2 " style={{ marginTop: "1rem" }}>
                <div className="col-md-6 d-flex align-items-center justify-content-center">
                  <Calendar
                    label="Date"
                    required
                    getDayProps={(date) => ({
                      selected: selected.some((s) =>
                        dayjs(date).isSame(s, "date")
                      ),
                      onClick: () => handleSelect(date),
                    })}
                  />
                </div>
                <div className="col-md-6">
                  <div className="row">
                    <div className="col-md-12">
                      <TimeInput
                        label="Enter Start Time"
                        ref={refStart}
                        rightSection={pickerControlStart}
                        {...form.getInputProps("start_time")}
                        error={form.errors.start_time}
                        style={{ marginTop: "3rem" }}
                        required
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <TimeInput
                        label="Enter End Time"
                        ref={refEnd}
                        rightSection={pickerControlEnd}
                        {...form.getInputProps("end_time")}
                        error={form.errors.end_time}
                        style={{ marginTop: "1rem", margin: "0", padding: 0 }}
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <Select
                  {...form.getInputProps("gender")}
                  label="Your Gender"
                  placeholder="Pick value"
                  data={[
                    {
                      value: "male",
                      label: "Male",
                    },
                    {
                      value: "female",
                      label: "Female",
                    },
                    {
                      value: "other",
                      label: "Other",
                    },
                  ]}
                  required
                />
              </div>
              <div className="col-md-6">
                <TextInput
                  label="Average Time for Appointment"
                  type="number"
                  placeholder="Enter Time"
                  required
                  {...form.getInputProps("average_time")}
                  error={form.errors.average_time}
                />
              </div>

              <div className="col-md-6">
                <div className="custom-file-input">
                  <label
                    htmlFor="image"
                    style={{ fontWeight: "500", marginRight: "0.5rem" }}
                  >
                    Upload Doctor's Image:{" "}
                  </label>
                  <input
                    type="file"
                    id="image"
                    accept="image/*"
                    onChange={handleImageUpload}
                    required
                  />

                  {form.errors.image && (
                    <div style={{ color: "red" }}>{form.errors.image}</div>
                  )}
                </div>
              </div>
              {/* Display image preview */}
              <div className="col-md-6">
                {imagePreview && (
                  <div>
                    <img
                      src={imagePreview}
                      alt="Preview"
                      style={{
                        width: "100%",
                        height: "auto",
                        maxWidth: "300px",
                      }}
                    />
                  </div>
                )}
              </div>
            </div>
            <Button type="submit" loading={form.loading} mt="md">
              Register
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
