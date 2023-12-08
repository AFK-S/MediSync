import React, { useState, useEffect } from "react";
import { Grid, Card, Group, Badge, Text, TextInput } from "@mantine/core";
import { IconBuildingHospital } from "@tabler/icons-react";
import axios from "axios";
import "./HospitalList.css";
import { SERVER_URL } from "../../config";

const API_URL = `${SERVER_URL}/api/government/basic-info`;

function HospitalList() {
  const [hospitalData, setHospitalData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredHospitalData, setFilteredHospitalData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(API_URL);
        const data = response.data;
        setHospitalData(data);
        setFilteredHospitalData(data);
      } catch (error) {
        console.error("API Error:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const filterHospitals = () => {
      const filteredData = hospitalData.filter((item) =>
        Object.values(item).some(
          (value) =>
            typeof value === "string" &&
            value.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
      setFilteredHospitalData(filteredData);
    };

    filterHospitals();
  }, [searchQuery, hospitalData]);

  return (
    <div>
      <TextInput
        placeholder="Search Hospital Name, City, Email...."
        value={searchQuery}
        onChange={(event) => setSearchQuery(event.target.value)}
        style={{ marginBottom: "20px" }}
      />

      <Grid gutterXl={30}>
        {filteredHospitalData.map((item, index) => {
          return (
            <Grid.Col md={4} sm={12} key={index}>
              <Card withBorder padding="lg" radius="md" h={170}>
                <Group position="apart">
                  <div className="avatar">
                    <IconBuildingHospital />
                  </div>
                  <Badge color="dark" p={5}>
                    {item.name}
                  </Badge>
                </Group>
                <Text fz="sm" mt="lg">
                  Email: {item.email}
                </Text>
                <Text fz="sm" mt={5}>
                  Phone: {item.phone}
                </Text>
                <Text fz="sm" style={{ textTransform: "capitalize" }}>
                  Location: {item.street}, {item.city}, {item.state},
                  {item.country},{item.zipCode}
                </Text>
              </Card>
            </Grid.Col>
          );
        })}
      </Grid>
    </div>
  );
}

export default HospitalList;
