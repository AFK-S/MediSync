import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  Grid,
  Card,
  Group,
  Badge,
  Text,
  TextInput,
  Button,
} from "@mantine/core";
import { IconBuildingHospital } from "@tabler/icons-react";

const Table = ({ data, columns }) => {
  return (
    <div
      className="inner-container"
      style={{ overflowY: "auto", maxHeight: "300px" }}
    >
      <table className="table table-hover text-no-wrap table-borderless">
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
              <tr
                key={index}
                style={{
                  whiteSpace: "nowrap",
                  backgroundColor: "#fff",
                  borderRadius: "20px",
                  padding: "1rem",
                  border: 0,
                  marginBottom: "1rem",
                }}
              >
                {columns.map((col, colIndex) => (
                  <td key={colIndex}>{item[col.toLowerCase()]}</td>
                ))}
                <td>
                  <NavLink to={`profile/${item.id}`}>View More</NavLink>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

const DoctorCard = ({ doctor }) => {
  return (
    <Grid.Col span={{ xs: 6, sm: 6, lg: 4 }}>
      <Card withBorder padding="lg" radius="md">
        <Group position="apart">
          <div className="avatar">
            <IconBuildingHospital />
          </div>
          <Badge color="#1b03a3" p={5}>
            {doctor.name}
          </Badge>
        </Group>
        <Text style={{ color: "black" }} fz="sm" mt="lg">
          Speciality: {doctor.speciality}
        </Text>
        <Text style={{ color: "black" }} fz="sm" mt={5}>
          Experience: {doctor.experience}
        </Text>
        <Text
          fz="sm"
          style={{
            textTransform: "capitalize",
            color: "black",
          }}
        >
          Hospital: {doctor.hospital}
        </Text>
        <button
          style={{
            width: "80px",
            // padding: "10px",
            backgroundColor: "#1b03a3",
            color: "white",
            borderRadius: "10px",
            marginTop: "5px",
            fontWeight: "500",
          }}
        >
          Book
        </button>
      </Card>
    </Grid.Col>
  );
};

const AllDoctors = () => {
  const [searchInput, setSearchInput] = useState("");
  const [doctors, setDoctors] = useState([
    {
      name: "Karandeep Singh",
      speciality: "ABC",
      hospital: "Airoli",
      experience: "20+",
    },
    {
      name: "Karandeep",
      speciality: "ABC",
      hospital: "Airoli",
      experience: "20+",
    },
    {
      name: "Karandeep",
      speciality: "ABC",
      hospital: "Airoli",
      experience: "20+",
    },
  ]);

  const [hospitals, setHospitals] = useState([
    // Updated hospitals data
    {
      name: "City Hospital 1",
      doctors: [
        {
          doctor_details: {
            name: "Karandeep Singh",
            speciality: "orthology",
            experience: "20 years",
            hospital: "City Hospital 1",
          },
        },
        {
          doctor_details: {
            name: "Another Doctor",
            speciality: "Another Speciality",
            experience: "10 years",
            hospital: "City Hospital 1",
          },
        },
        {
          doctor_details: {
            name: "Another Doctor",
            speciality: "Another Speciality",
            experience: "10 years",
            hospital: "City Hospital 1",
          },
        },
      ],
    },
    {
      name: "City Hospital 1",
      doctors: [
        {
          doctor_details: {
            name: "Karandeep Singh",
            speciality: "orthology",
            experience: "20 years",
            hospital: "City Hospital 1",
          },
        },
        {
          doctor_details: {
            name: "Another Doctor",
            speciality: "Another Speciality",
            experience: "10 years",
            hospital: "City Hospital 1",
          },
        },
        {
          doctor_details: {
            name: "Another Doctor",
            speciality: "Another Speciality",
            experience: "10 years",
            hospital: "City Hospital 1",
          },
        },
      ],
    },
    {
      name: "City Hospital 1",
      doctors: [
        {
          doctor_details: {
            name: "Karandeep Singh Sandhu",
            speciality: "orthology",
            experience: "20 years",
            hospital: "City Hospital 1",
          },
        },
        {
          doctor_details: {
            name: "Another Doctor",
            speciality: "Another Speciality",
            experience: "10 years",
            hospital: "City Hospital 1",
          },
        },
        {
          doctor_details: {
            name: "Another Doctor",
            speciality: "Another Speciality",
            experience: "10 years",
            hospital: "City Hospital 1",
          },
        },
        {
          doctor_details: {
            name: "Another Doctor",
            speciality: "Another Speciality",
            experience: "10 years",
            hospital: "City Hospital 1",
          },
        },
      ],
    },
  ]);

  const handleInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  const filteredData = searchInput.trim() === "" ? hospitals : doctors;

  return (
    <div>
      <div
        className="c-card d-flex align-items-center"
        style={{ width: "100%" }}
      >
        <i className="fa-solid fa-magnifying-glass me-2"></i>
        <input
          type="text"
          style={{ width: "100%", outline: "none", border: "none" }}
          placeholder="Search Doctors"
          value={searchInput}
          onChange={handleInputChange}
        />
      </div>

      <div className="container-fluid">
        <div className="mt-4">
          {searchInput.trim() === "" ? (
            <div className="hospital-list">
              <h4>Nearby Hospitals</h4>
              <Grid className="mt-3">
                {hospitals.map((hospitals, index) => (
                  <Grid.Col span={12} key={index}>
                    <div className="c-card">
                      <h5>{hospitals.name}</h5>

                      <Grid mt={15}>
                        {hospitals.doctors.map((doctor, index) => (
                          <DoctorCard
                            doctor={doctor.doctor_details}
                            key={index}
                          />
                        ))}
                      </Grid>
                    </div>
                  </Grid.Col>
                ))}
              </Grid>
            </div>
          ) : (
            <div>
              <h4>Search Results</h4>
              <Grid>
                {filteredData.map((doctor) => (
                  <DoctorCard doctor={doctor} />
                ))}
              </Grid>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllDoctors;
