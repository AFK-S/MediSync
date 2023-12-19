import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  Grid,
  Card,
  Group,
  Badge,
  Text,
  TextInput,
  Button,
} from "@mantine/core";
import { useDispatch } from "react-redux";
import { setFormData } from "../../slice/AppSclice.js";
import doctorIcon from "../../assets/doctor.png";
import axios from "axios";

const DoctorCard = ({ doctor, hospital }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // console.log(doctor);

  const handleBooked = () => {
    dispatch(
      setFormData({
        doctor: doctor.name,
        hospital: hospital,
        specialization: doctor.specialization,
        experience: doctor.experience,
        doctor_id: doctor._id,
      })
    );
    navigate("/appointments");
  };

  return (
    <Grid.Col span={{ xs: 6, sm: 6, lg: 4 }}>
      <Card withBorder padding="lg" radius="md">
        <div className="d-flex w-100 flex-row align-items-between justify-content-between">
          <div className="avatar">
            <img
              src={doctorIcon}
              style={{ width: "30px", height: "30px" }}
              alt="doctor"
            />
          </div>
          <Badge color="#EDEDED" p={12}>
            <Text
              fw={600}
              style={{ color: "black", textTransform: "capitalize" }}
            >
              {doctor.name}
            </Text>
          </Badge>
        </div>
        <Text style={{ color: "black" }} fz="md" mt="lg">
          Speciality: {doctor.specialization}
        </Text>
        <Text style={{ color: "black" }} fz="md" mt={5}>
          Experience: {doctor.experience}
        </Text>
        <Text
          fz="md"
          style={{
            textTransform: "capitalize",
            color: "black",
          }}
        >
          Hospital: {hospital}
        </Text>
        <button
          style={{
            width: "100px",
            padding: "5px",
            backgroundColor: "#0a0059",
            color: "white",
            borderRadius: "10px",
            marginTop: "15px",
            fontWeight: "500",
            border: "none",
            outline: "none",
          }}
          onClick={handleBooked}
        >
          Book
        </button>
      </Card>
    </Grid.Col>
  );
};

const AllDoctors = () => {
  const [searchInput, setSearchInput] = useState("");
  const [location, setLocation] = useState({});
  const [locationPermissionGranted, setLocationPermissionGranted] =
    useState(false);

  const fetchDoctors = async () => {
    try {
      const { data } = await axios.get("/api/doctors");
      setDoctors(data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchDoctors();
  }, []);

  useEffect(() => {
    // Function to get the user's location
    const getLocation = () => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error getting location:", error.message);
        }
      );
    };

    // Ask for location permission and get the location
    const askForLocationPermission = () => {
      navigator.permissions.query({ name: "geolocation" }).then((result) => {
        if (result.state === "granted") {
          setLocationPermissionGranted(true);

          getLocation();
        } else if (result.state === "prompt") {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              console.log("Latitude:", position.coords.latitude);
              console.log("Longitude:", position.coords.longitude);
            },
            (error) => {
              console.error("Error getting location:", error.message);
              setLocationPermissionGranted(false);
            }
          );
        }
      });
    };

    askForLocationPermission();
  }, []);

  useEffect(() => {
    const getNearbyHospitals = async () => {
      try {
        const { data } = await axios.post("/api/nearby/hospitals", location);
        setHospitals(data);
        // console.log(data);
      } catch (err) {
        console.log(err);
      }
    };

    if (locationPermissionGranted) {
      getNearbyHospitals();
    }
  }, [location]);

  const [doctors, setDoctors] = useState([]);

  const [hospitals, setHospitals] = useState([]);

  const filteredDoctors = doctors.filter((doctor) =>
    doctor.name.toLowerCase().includes(searchInput.toLowerCase())
  );

  const handleInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  const filteredData = searchInput.trim() === "" ? hospitals : doctors;

  // console.log(hospitals);

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
          {!locationPermissionGranted && searchInput.trim() === "" && (
            <p>Please Grant Location Permission for Nearby Hospitals</p>
          )}

          {locationPermissionGranted &&
            searchInput.trim() === "" &&
            hospitals.length > 0 && (
              <div className="hospital-list">
                <h4>Nearby Hospitals</h4>
                <Grid className="mt-3">
                  {hospitals.map((hospital, index) => (
                    <Grid.Col span={12} key={index}>
                      <div className="c-card">
                        <h5>{hospital.name}</h5>

                        <Grid mt={15}>
                          {hospital.doctors.map((doctor, index) => (
                            <DoctorCard
                              hospital={hospital.name}
                              doctor={doctor}
                              key={index}
                            />
                          ))}
                        </Grid>
                      </div>
                    </Grid.Col>
                  ))}
                </Grid>
              </div>
            )}

          {searchInput.trim() !== "" && (
            <div>
              <h4>Search Results</h4>
              {filteredDoctors.length > 0 ? (
                <Grid>
                  {filteredDoctors.map((doctor, index) => (
                    <DoctorCard
                      hospital={doctor.hospital.name}
                      doctor={doctor}
                      key={index}
                    />
                  ))}
                </Grid>
              ) : (
                <p>No matching doctors found</p>
              )}
            </div>
          )}

          {locationPermissionGranted &&
            searchInput.trim() === "" &&
            hospitals.length === 0 && <p>No Nearby Hospitals found</p>}
        </div>
      </div>
    </div>
  );
};

export default AllDoctors;
