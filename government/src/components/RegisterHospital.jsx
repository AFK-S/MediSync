import React from "react";
import { Box, Button, NumberInput, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";

function RegisterHospital() {
  const form = useForm({
    validateInputOnChange: true,
    initialValues: { name: "", email: "", age: 0, contactNumber: "", city: "" },

    validate: {
      name: (value) =>
        value.length < 2 ? "Name must have at least 2 letters" : null,
      city: (value) =>
        value.length < 2 ? "City must have at least 2 letters" : null,
      contactNumber: (value) =>
        /^[0-9]{10}$/.test(value)
          ? null
          : "Contact number must be a 10-digit number",
    },
  });

  const handleError = (errors) => {
    if (errors.name) {
      notifications.show({
        message: "Please fill the Name field",
        color: "red",
      });
    } else if (errors.city) {
      notifications.show({
        message: "Please fill the City field",
        color: "red",
      });
    } else if (errors.contactNumber) {
      notifications.show({
        message: "Please provide a valid Contact Number",
        color: "red",
      });
    }
  };

  return (
    <Box maxWidth={340} mx="auto" style={{ padding: "40px" }}>
      <form onSubmit={form.onSubmit(console.log, handleError)}>
        <TextInput
          label="Name"
          placeholder="Name"
          {...form.getInputProps("name")}
        />
        <TextInput
          label="City"
          placeholder="City"
          {...form.getInputProps("city")}
        />
        <NumberInput
          mt="sm"
          label="Contact Number"
          placeholder="Contact Number"
          {...form.getInputProps("contactNumber")}
        />
        <Button type="submit" mt="sm">
          Submit
        </Button>
      </form>
    </Box>
  );
}

export default RegisterHospital;
