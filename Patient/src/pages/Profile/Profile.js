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
import { IconFile } from "@tabler/icons-react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { useCookies } from "react-cookie";

const Table = ({ data, columns }) => {
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
                {columns.map((col, colIndex) => (
                  <td key={colIndex} style={{ whiteSpace: "nowrap" }}>
                    {item[col.toLowerCase()]}
                  </td>
                ))}
                <td>
                  <NavLink to={item.reportlink}>Report</NavLink>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

const Profile = () => {
  const [doctors, setDoctors] = useState([
    {
      doctorname: "Dr. Karandeep Singh Sandhu",
      specialty: "Cardiologist",
      date: "18/10/2023",
      timeslot: "12:00pm - 03:00pm",
      hospitalname: "CardioCare Hospital",
      address: "Navghar Road, Mulund East, Mumbai",
      contact: "8169645464",
      reportlink: "https://example.com/report",
      experience: 21,
    },
    {
      doctorname: "Dr. Karandeep Singh Sandhu",
      specialty: "Cardiologist",
      date: "18/10/2023",
      timeslot: "12:00pm - 03:00pm",
      hospitalname: "CardioCare Hospital",
      address: "Navghar Road, Mulund East, Mumbai",
      contact: "8169645464",
      reportlink: "https://example.com/report",
      experience: 21,
    },
    {
      doctorname: "Dr. Karandeep Singh Sandhu",
      specialty: "Cardiologist",
      date: "18/10/2023",
      timeslot: "12:00pm - 03:00pm",
      hospitalname: "CardioCare Hospital",
      address: "Navghar Road, Mulund East, Mumbai",
      contact: "8169645464",
      reportlink: "https://example.com/report",
      experience: 21,
    },
    {
      doctorname: "Dr. Karandeep Singh Sandhu",
      specialty: "Cardiologist",
      date: "18/10/2023",
      timeslot: "12:00pm - 03:00pm",
      hospitalname: "CardioCare Hospital",
      address: "Navghar Road, Mulund East, Mumbai",
      contact: "8169645464",
      reportlink: "https://example.com/report",
      experience: 21,
    },
  ]);

  const [cookies] = useCookies();

  const [patient, setPatient] = useState(null);

  useEffect(() => {
    const fetchPatientInfo = async () => {
      try {
        const response = await axios.get(`/api/patient/${cookies._id}`);
        setPatient(response.data);
        console.log(response);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPatientInfo();
  }, []);

  const [uploadedFiles, setUploadedFiles] = useState([
    "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-2.png",
    "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-2.png",
    "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-2.png",
    "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-2.png",
    "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-2.png",
    "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-2.png",
    "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-2.png",
    "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-2.png",
  ]);

  const [imagePreview, setImagePreview] = useState([]);

  const handleImageUpload = (file) => {
    form.setFieldValue("file", file);
    const previewUrl = URL.createObjectURL(file);
    setImagePreview(previewUrl);
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
      {patient && (
        <Group wrap="nowrap">
          <Grid>
            <Grid.Col span={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
              <div className="c-card w-100">
                <Grid>
                  <Grid.Col
                    className="d-flex w-100 justify-content-center align-item-center"
                    span={{ xs: 12, sm: 6, md: 6, lg: 6 }}
                  >
                    <Avatar
                      src=""
                      size={200}
                      style={{ borderRadius: "200px" }}
                    />
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
                        Name : {patient.name}
                      </Text>

                      <Text className="profile-text" fz="xl" fw={500}>
                        Age : {patient.age}
                      </Text>

                      <Text className="profile-text" fz="lg" c="dimmed">
                        Phone : {patient.phone_number}
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
                    <Text className="profile-text">Uploaded Files</Text>
                    <div className="d-flex flex-wrap">
                      {uploadedFiles.map((file, index) => (
                        <Image
                          style={{ width: "80px", margin: "5px" }}
                          key={index}
                          src={file}
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
                <form onSubmit={form.onSubmit((values) => console.log(values))}>
                  <Grid>
                    <Grid.Col span={12}>
                      <div className="d-flex flex-wrap">
                        <MultiSelect
                          label="Select Past Medical Conditions"
                          placeholder="Past Medical Conditions"
                          // mt="md"
                          onChange={(value) => {
                            form.setValues({
                              ...form.values,
                              pastMedicalCondition: value,
                            });
                          }}
                          // {...form.getInputProps("pastMedicalCondition")}
                          // value={form.values.pastMedicalCondition}
                          // data={[
                          //   { value: "Hospital 1", label: "Hospital 1" },
                          //   { value: "Hospital 2", label: "Hospital 2" },
                          //   { value: "Hospital 3", label: "Hospital 3" },
                          // ]}
                          data={[
                            "Asthma",
                            "Cancer",
                            "Diabetes",
                            "Heart Disease",
                            "Hypertension",
                            "Kidney Disease",
                            "Liver Disease",
                            "Stroke",
                            "Thyroid Disease",
                          ]}
                          searchable
                          nothingFoundMessage="Nothing found..."
                        />
                      </div>
                    </Grid.Col>
                  </Grid>
                  <Grid>
                    <Grid.Col span={12} mt={20}>
                      <Group>
                        <FileInput
                          rightSection={icon}
                          style={{ width: "180px", color: "black" }}
                          onChange={(files) => handleImageUpload(files)}
                          label="Upload Related Document"
                          placeholder="Upload your file"
                          description="You can upload your documents here."
                        />
                        <Button
                          type="submit"
                          style={{ background: "#1b03a3", marginTop: "75px" }}
                        >
                          Upload
                        </Button>
                      </Group>
                    </Grid.Col>
                  </Grid>
                  <Grid>
                    <Grid.Col span={12} mt={20}>
                      {/* Preview Image */}
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
                    </Grid.Col>
                  </Grid>
                </form>
              </div>
            </Grid.Col>
          </Grid>
        </Group>
      )}
      <div className="container-fluid c-card my-4">
        <h4 className="mb-2">Past Visit to Doctor</h4>
        <Table
          data={doctors && doctors}
          columns={[
            "DoctorName",
            "Specialty",
            "Date",
            "Timeslot",
            "HospitalName",
            "",
          ]}
        />
      </div>
    </div>
  );
};

export default Profile;
