import React from "react";
import { Accordion } from "@mantine/core";

const DummyHospitalList = [
  {
    id: 1,
    name: "Hospital A",
    city: "City X",
    contact: "123-456-7890",
  },
  {
    id: 2,
    name: "Hospital B",
    city: "City Y",
    contact: "987-654-3210",
  },
];

function ViewHospital() {

  const items = DummyHospitalList.map((item) => (
    <Accordion.Item key={item.id} value={item.name} style={{margin:"20px"}}>
      <Accordion.Control style={{textAlign : "center" }}>{item.name}</Accordion.Control>
      <Accordion.Panel style={{textAlign : "left"}}>
        <p>
          <strong>City:</strong> {item.city}
        </p>
        <p>
          <strong>Contact:</strong> {item.contact}
        </p>
        <p>
          <strong>Name:</strong> {item.name}
        </p>
      
      </Accordion.Panel>
    </Accordion.Item>
  ));
  return (
    <Accordion variant="separated">
    {items}
  </Accordion>


  );
}

export default ViewHospital;
