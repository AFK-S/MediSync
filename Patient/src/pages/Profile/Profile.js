import React, { useState, useEffect } from "react";
import "./Profile.css";
import {
  Avatar,
  Text,
  Group,
  Grid,
  Image,
  FileInput,
  Button,
  TextInput,
  Select,
  MultiSelect,
} from "@mantine/core";

import { useForm } from "@mantine/form";
import { IconFile, IconH1 } from "@tabler/icons-react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";

const Table = ({ data, columns }) => {
  const upvote = async (id) => {
    try {
      const { data } = await axios.put(`/api/appointment/rating/${id}`, {
        rating: 1,
      });
      alert("Upvoted");
    } catch (error) {
      alert("Error in upvoting");
    }
  };
  const downvote = async (id) => {
    try {
      const { data } = await axios.put(`/api/appointment/rating/${id}`, {
        rating: -1,
      });
      alert("Downvoted");
      console.log(data);
    } catch (error) {
      alert("Error in upvoting");
    }
  };

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
                <td>{item.doctor.name}</td>
                <td>{item.doctor.specialization}</td>
                <td>{new Date(item.date).toLocaleDateString("en-GB")}</td>
                <td>{item.time_slot}</td>
                <td>{item.hospital.name}</td>

                <td>
                  <NavLink to={item.reportlink}>Report</NavLink>
                </td>
                <td>
                  {item.rating === 0 ? (
                    <div className="d-flex align-items-center justify-content-center">
                      <button
                        onClick={() => upvote(item._id)}
                        style={{
                          background: "#fff",
                          color: "green",
                          border: "none",
                          borderRadius: "5px",
                          margin: "5px",
                          height: "30px",
                          width: "30px",
                        }}
                      >
                        <i className="fa-solid fa-up-long"></i>
                      </button>
                      <button
                        onClick={() => downvote(item._id)}
                        style={{
                          background: "#fff",
                          color: "red",
                          border: "none",
                          borderRadius: "5px",
                          margin: "5px",
                          height: "30px",
                          width: "30px",
                        }}
                      >
                        <i className="fa-solid fa-down-long"></i>
                      </button>
                    </div>
                  ) : (
                    "Already Voted"
                  )}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

const Profile = () => {
  const [cookies] = useCookies();
  const patient = useSelector((state) => state.app.appData);

  const [pdfPreview, setPdfPreview] = useState([]);

  const handleImageUpload = (file) => {
    form.setFieldValue("file", file);

    form.setFieldValue("file", file);

    const previewUrl = URL.createObjectURL(file);
    setPdfPreview(previewUrl);
  };

  const handleSubmit = async (values) => {
    try {
      const formData = new FormData();
      formData.append("file", values.file);
      formData.append("disease", JSON.stringify(values.pastMedicalCondition));
      formData.append("patient_id", cookies._id);
      formData.append("type", "patient");
      const response = await axios.post("/api/report/register", formData);
      console.log(response);
      alert("Medical History Submitted successfully");
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  const form = useForm({
    initialValues: {
      file: [],
      pastMedicalCondition: "",
    },
  });

  const icon = (
    <IconFile style={{ width: "25px", height: "25px" }} stroke={1.5} />
  );

  return (
    <div>
      <Group wrap="nowrap">
        <Grid>
          <Grid.Col span={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
            <div className="c-card w-100">
              <Grid>
                <Grid.Col
                  className="d-flex w-100 justify-content-center align-item-center"
                  span={{ xs: 12, sm: 6, md: 6, lg: 6 }}
                >
                  <Avatar src="" size={200} style={{ borderRadius: "200px" }} />
                </Grid.Col>
                <Grid.Col
                  className="d-flex w-100 justify-content-center align-item-center "
                  span={{ xs: 12, sm: 6, md: 6, lg: 6 }}
                >
                  <div className="d-flex w-100 justify-content-center align-item-center flex-column">
                    <Text
                      className="profile-text"
                      tt="uppercase"
                      fw={700}
                      c="dimmed"
                    >
                      Name : {patient && patient.name}
                    </Text>

                    <Text className="profile-text" fz="xl" fw={500}>
                      <span style={{ fontWeight: "600" }}>Age : </span>
                      {patient && patient.age}
                    </Text>

                    <Text className="profile-text" fz="xl" fw={500}>
                      <span style={{ fontWeight: "600" }}>Phone : </span>
                      {patient && patient.phone_number}
                    </Text>
                    <Text className="profile-text" fz="xl" fw={500}>
                      <span style={{ fontWeight: "600" }}>
                        Past Medical Conditions:{" "}
                      </span>
                      {patient?.disease && patient.disease.length > 0
                        ? patient.disease.map((item, index) => (
                            <span key={item}>
                              {item}
                              {index !== patient.disease.length - 1 && ", "}
                            </span>
                          ))
                        : "NA"}
                    </Text>

                    <Text className="profile-text" fz="xl" fw={500}>
                      <span style={{ fontWeight: "600" }}>
                        Drinking/Smoking habits :{" "}
                      </span>
                      Yes
                      {/* {patient && patient.phone_number} */}
                    </Text>
                    <Text className="profile-text" fz="xl" fw={500}>
                      <span style={{ fontWeight: "600" }}>Lifestyle : </span>
                      Urban
                      {/* {patient && patient.phone_number} */}
                    </Text>
                  </div>
                </Grid.Col>
              </Grid>
              <Grid>
                <Grid.Col span={12}>
                  <Text fw={700} className="profile-text">
                    Medical History
                  </Text>
                  {/* Display fetched images */}
                  <Text className="profile-text">Uploaded Reports</Text>
                  <div className="d-flex flex-wrap">
                    {patient.reports &&
                      patient.reports.map((file, index) => (
                        // <h1>ok</h1>
                        <Image
                          onClick={() => {
                            window.open(file.url, "_blank");
                          }}
                          style={{
                            width: "80px",
                            margin: "5px",
                            cursor: "pointer",
                          }}
                          key={index}
                          src={file.url}
                          alt={`Image ${index}`}
                        />
                      ))}
                  </div>
                </Grid.Col>
              </Grid>
            </div>
          </Grid.Col>
          <Grid.Col span={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
            <div className="c-card">
              <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
                <Grid>
                  <Grid.Col span={12}>
                    <MultiSelect
                      pt={30}
                      label="Select Past Medical Conditions"
                      placeholder="Past Medical Conditions"
                      onChange={(value) => {
                        form.setValues({
                          ...form.values,
                          pastMedicalCondition: value,
                        });
                      }}
                      data={[
                        "Fungal infection",
                        "Allergy",
                        "GERD",
                        "Chronic cholestasis",
                        "Drug Reaction",
                        "Peptic ulcer disease",
                        "AIDS",
                        "Diabetes",
                        "Gastroenteritis",
                        "Bronchial Asthma",
                        "Hypertension",
                        "Migraine",
                        "Cervical spondylosis",
                        "Paralysis (brain hemorrhage)",
                        "Jaundice",
                        "Malaria",
                        "Chickenpox",
                        "Dengue",
                        "Typhoid",
                        "Hepatitis A",
                        "Hepatitis B",
                        "Hepatitis C",
                        "Hepatitis D",
                        "Hepatitis E",
                        "Alcoholic hepatitis",
                        "Tuberculosis",
                        "Common Cold",
                        "Pneumonia",
                        "Dimorphic hemmorhoids(piles)",
                        "Heart attack",
                        "Varicose veins",
                        "Hypothyroidism",
                        "Hyperthyroidism",
                        "Hypoglycemia",
                        "Osteoarthritis",
                        "Arthritis",
                        "Paroxysmal Positional Vertigo",
                        "Acne",
                        "Urinary tract infection",
                        "Psoriasis",
                        "Impetigo",
                      ]}
                      searchable
                      nothingFoundMessage="Nothing found..."
                    />
                  </Grid.Col>
                </Grid>
                <Grid>
                  <Grid.Col span={12} mt={20}>
                    <Group>
                      <FileInput
                        rightSection={icon}
                        style={{ width: "100%", color: "black" }}
                        onChange={(files) => handleImageUpload(files)}
                        label="Upload Related Document"
                        placeholder="Upload your file"
                        description="You can upload your documents here."
                      />
                      <Button type="submit" style={{ background: "#1b03a3" }}>
                        Upload
                      </Button>
                    </Group>
                  </Grid.Col>
                </Grid>
                <Grid>
                  <Grid.Col span={12} mt={20}>
                    {/* Preview Image */}
                    {pdfPreview && (
                      <div>
                        <object
                          data={pdfPreview}
                          type="application/pdf"
                          width="100%"
                          height="100%"
                        >
                          <p>
                            It appears you don't have a PDF plugin for this
                            browser.
                          </p>
                        </object>
                      </div>
                    )}
                  </Grid.Col>
                </Grid>
              </form>
            </div>
          </Grid.Col>
        </Grid>
      </Group>

      <div className="container-fluid c-card my-4">
        <h4 className="mb-2">Past Visit to Doctor</h4>
        <Table
          data={patient.past_visit && patient.past_visit}
          columns={[
            "DoctorName",
            "Specialty",
            "Date",
            "Timeslot",
            "HospitalName",
            "Reports",
            "Votes",
          ]}
        />
      </div>
    </div>
  );
};

export default Profile;
