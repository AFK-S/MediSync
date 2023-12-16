import React, { useState, useEffect } from "react";
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
import axios from "axios";
import "./HospitalList.css";

function HospitalList({ setLoading }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [hospitals, setHospitals] = useState([]);
  const [filteredHospitals, setFilteredHospitals] = useState([]);
  const [reFetch, setReFetch] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const { data } = await axios.get("/api/hospitals");
        setHospitals(data);
        setFilteredHospitals(data);
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    })();
  }, [reFetch]);

  useEffect(() => {
    (() => {
      const filteredData = hospitals.filter((item) =>
        Object.values(item).some(
          (value) =>
            typeof value === "string" &&
            value.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
      setFilteredHospitals(filteredData);
    })();
  }, [searchQuery, hospitals]);

  const deleteHospital = async (hospital_id) => {
    setLoading(true);
    try {
      await axios.delete(`/api/hospital/delete/${hospital_id}`);
      setReFetch(!reFetch);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <div>
      <TextInput
        placeholder="Search Hospital Name, City, Email...."
        value={searchQuery}
        onChange={(event) => setSearchQuery(event.target.value)}
        style={{ marginBottom: "20px" }}
      />

      <Grid gutterXl={30}>
        {filteredHospitals.map((item, index) => {
          return (
            <Grid.Col md={4} sm={12} key={index}>
              <Card
                withBorder
                padding="lg"
                radius="md"
                style={{ height: "100%" }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    height: "100%",
                  }}
                >
                  <div>
                    <Group position="apart">
                      <div className="avatar">
                        <IconBuildingHospital />
                      </div>
                      <Badge color="dark" p={5}>
                        {item.name}
                      </Badge>
                    </Group>
                    <Text fz="sm" mt="lg">
                      Email: {item.contact_details.email_address}
                    </Text>
                    <Text fz="sm" mt={5}>
                      Phone: {item.contact_details.phone_number}
                    </Text>
                    <Text fz="sm" style={{ textTransform: "capitalize" }}>
                      Location: {item.address.street}, {item.address.city},{" "}
                      {item.address.state},{item.address.country},
                      {item.address.zipCode}
                    </Text>
                  </div>

                  <div>
                    <Button
                      variant="filled"
                      onClick={() => deleteHospital(item._id)}
                      mt={60}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              </Card>
            </Grid.Col>
          );
        })}
      </Grid>
    </div>
  );
}

export default HospitalList;
