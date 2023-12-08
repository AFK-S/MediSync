import React, { useState } from "react";
import {
  Box,
  Button,
  Grid,
  Col,
  TextInput,
  useMantineTheme,
  Modal,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import "./Register.css";
import { SERVER_URL } from "../../config";
import axios from "axios";

function Register() {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false); // State for confirmation
  const [isModalOpen, setModalOpen] = useState(false);

  const form = useForm({
    validateInputOnChange: true,
    initialValues: {
      name: "",
      latitude: "",
      longitude: "",
      street: "",
      city: "",
      state: "",
      zipCode: "",
      country: "",
      phone: "",
      email: "",
    },
    validate: {},
  });

  const API_URL = `${SERVER_URL}/api/government/register`;

  const handleSubmit = async (values) => {
    try {
      setLoading(true);

      const requestData = {
        name: values.name,
        coordinates: {
          latitude: parseFloat(values.latitude),
          longitude: parseFloat(values.longitude),
        },
        address: {
          street: values.street,
          city: values.city,
          state: values.state,
          zipCode: values.zipCode,
          country: values.country,
        },
        contact: {
          phone: values.phone,
          email: values.email,
        },
      };

      const response = await axios.post(API_URL, requestData);

      console.log("API Response:", response.data);

      // Reset form and show modal
      form.reset();
      setSubmitted(true);
      setModalOpen(true);

      notifications.show({
        message: "Registration successful!",
        color: "green",
      });
    } catch (error) {
      console.error("Error submitting form:", error);

      notifications.show({
        message: "Registration failed. Please try again.",
        color: "red",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleError = (errors) => {
    console.log("Form errors:", errors);
  };

  const handleConfirmationClose = () => {
    setSubmitted(false);
    setModalOpen(false);
  };

  return (
    <Box maxWidth={600} mx="auto" style={{ padding: "40px" }}>
      <form onSubmit={form.onSubmit(handleSubmit, handleError)}>
        <Grid>
          <Col span={12}>
            <TextInput
              label="Name"
              placeholder="Name"
              {...form.getInputProps("name")}
            />
          </Col>
          <Col sm={12} md={6}>
            <TextInput
              label="Latitude"
              placeholder="Latitude"
              {...form.getInputProps("latitude")}
            />
          </Col>
          <Col sm={12} md={6}>
            <TextInput
              label="Longitude"
              placeholder="Longitude"
              {...form.getInputProps("longitude")}
            />
          </Col>
          <Col sm={12} md={6}>
            <TextInput
              label="Phone"
              placeholder="Phone"
              {...form.getInputProps("phone")}
            />
          </Col>
          <Col sm={12} md={6}>
            <TextInput
              label="Hospital Email"
              placeholder="Hospital Email"
              {...form.getInputProps("email")}
            />
          </Col>
          <Col sm={12} md={8}>
            <TextInput
              label="Street"
              placeholder="Street"
              {...form.getInputProps("street")}
            />
          </Col>
          <Col sm={12} md={4}>
            <TextInput
              label="City (Hospital)"
              placeholder="City (Hospital)"
              {...form.getInputProps("city")}
            />
          </Col>
          <Col span={12}>
            <TextInput
              label="State (Hospital)"
              placeholder="State (Hospital)"
              {...form.getInputProps("state")}
            />
          </Col>
          <Col sm={12} md={3}>
            <TextInput
              label="Zip Code"
              placeholder="Zip Code"
              {...form.getInputProps("zipCode")}
            />
          </Col>
          <Col sm={12} md={3}>
            <TextInput
              label="Country"
              placeholder="Country"
              {...form.getInputProps("country")}
            />
          </Col>
        </Grid>
        <Button
          type="submit"
          mt="xl"
          className="register-button"
          disabled={form.loading}
        >
          {form.loading ? "Submitting..." : "Submit"}
        </Button>
      </form>

      {/* Confirmation modal */}
      <Modal
        title="Hospital has been created!"
        opened={isModalOpen}
        onClose={handleConfirmationClose}
        size="md"
      >
        {/* <div>
          <p>Your registration has been successfully submitted.</p>
        </div> */}
        <div className="w-100 d-flex align-item-center justify-content-center">
          <Button className="register-button" onClick={handleConfirmationClose}>
            Close
          </Button>
        </div>
      </Modal>
    </Box>
  );
}

export default Register;
