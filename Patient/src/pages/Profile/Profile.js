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
} from "@mantine/core";
import { IconFile } from "@tabler/icons-react";
import { NavLink } from "react-router-dom";

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
    // Add more entries as needed
  ]);

  const sampleImages = [
    "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-2.png",
    "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-2.png",
    "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-2.png",
    "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-2.png",
    "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-2.png",
    "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-2.png",
    "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-2.png",
    "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-2.png",
    // Add more sample image URLs as needed
  ];

  const [uploadedFiles, setUploadedFiles] = useState([]);

  const handleFileUpload = ({ files }) => {
    // Add the newly uploaded files to the existing files
    setUploadedFiles([...uploadedFiles, ...files]);
  };

  const handleUploadButtonClick = () => {
    // You can perform the upload logic here
    console.log("Uploading files:", uploadedFiles);
    // Reset the uploaded files state if needed
    setUploadedFiles([]);
  };

  useEffect(() => {
    // Initialize the state with sample images when the component mounts
    setUploadedFiles(
      sampleImages.map((url, index) => ({
        preview: url,
        name: `Sample Image ${index + 1}`,
      }))
    );
  }, []);

  const icon = (
    <IconFile style={{ width: "25px", height: "25px" }} stroke={1.5} />
  );

  return (
    <div>
      <Group wrap="nowrap">
        <Grid>
          <Grid.Col span={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
            <div className="d-flex w-100 justify-content-center align-item-center">
              <Grid className="c-card">
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
                      Name : Aditya Rai
                    </Text>

                    <Text className="profile-text" fz="xl" fw={500}>
                      Age : 21
                    </Text>

                    <Text className="profile-text" fz="lg" c="dimmed">
                      Phone : 8169645464
                    </Text>
                  </div>
                </Grid.Col>
              </Grid>
            </div>
          </Grid.Col>
          <Grid.Col span={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
            <div className="c-card">
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
                    src={file.preview}
                    alt={`Image ${index}`}
                  />
                ))}
              </div>
              {/* File upload component */}
              <Group className="d-flex w-100 flex-row">
                <FileInput
                  rightSection={icon}
                  style={{ width: "157px", color: "black" }}
                  accept="image/*" // Allow only image files
                  onChange={(files) => handleFileUpload(files)}
                  maxFiles={5} // Set a maximum number of files allowed
                  label="Upload Images"
                  placeholder="Upload your file"
                  description="You can upload up to 5 images."
                  format={(file) => file.name} // Display file names
                />
                <Button style={{ background: "#1b03a3", marginTop: "55px" }}>
                  Upload
                </Button>
              </Group>
            </div>
          </Grid.Col>
        </Grid>
      </Group>
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
          // doctorname: "Dr. Karandeep Singh Sandhu",
          // specialty: "Cardiologist",
          // date: "18/10/2023",
          // timeslot: "12:00pm - 03:00pm",
          // hospitalName: "CardioCare Hospital",
          // address: "Navghar Road, Mulund East, Mumbai",
          // contact: "8169645464",
          // reportLink: "https://example.com/report",
          // experience: 21,
        />
      </div>
    </div>
  );
};

export default Profile;
