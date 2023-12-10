import React from "react";
import { useForm } from "@mantine/form";

import {
  TextInput,
  PasswordInput,
  Text,
  Paper,
  Group,
  PaperProps,
  Button,
  Divider,
  Anchor,
  Stack,
} from "@mantine/core";
import { NavLink } from "react-router-dom";

import { Loader } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Register = () => {
  const [loading, setLoading] = useState(false);
  const Navigate = useNavigate();
  const form = useForm({
    initialValues: {
      name: "",
      age: "",
      medicalCondition: "",
      email: "",
      phoneNumber: "",
      password: "",
    },
    validate: {
      name: (val) => (val.trim() === "" ? "Name is required" : null),
      age: (val) =>
        isNaN(val) || val <= 0 ? "Age should be a positive number" : null,
      medicalCondition: (val) =>
        val.trim() === "" ? "Medical condition is required" : null,
      email: (val) => (/^\S+@\S+$/.test(val) ? null : "Invalid email"),
      phoneNumber: (val) =>
        /^\d{10}$/.test(val) ? null : "Invalid phone number",
      password: (val) =>
        val.trim().length <= 6
          ? "Password should include at least 6 characters"
          : null,
    },
  });
  const handleSubmit = async (values) => {
    setLoading(true);
    // Perform registration logic here
    form.reset();
  };

  return (
    <div className="register">
      <Paper
        radius="md"
        p="xl"
        withBorder
        sx={{
          width: "80%",
          maxWidth: 450,
          margin: "auto",
        }}
      >
        <Text size="lg" weight={500}>
          Register to MediSync!
        </Text>

        <Divider my="lg"></Divider>

        <form onSubmit={form.onSubmit((value) => handleSubmit(value))}>
          <Stack>
            <TextInput
              required
              label="Name"
              placeholder="Your Name"
              value={form.values.name}
              onChange={(event) =>
                form.setFieldValue("name", event.currentTarget.value)
              }
              error={form.errors.name && form.errors.name}
              radius="md"
            />

            <TextInput
              required
              type="number"
              label="Age"
              placeholder="Your Age"
              value={form.values.age}
              onChange={(event) =>
                form.setFieldValue("age", event.currentTarget.value)
              }
              error={form.errors.age && form.errors.age}
              radius="md"
            />

            <TextInput
              required
              label="Past Medical Condition"
              placeholder="Your Medical Condition"
              value={form.values.medicalCondition}
              onChange={(event) =>
                form.setFieldValue(
                  "medicalCondition",
                  event.currentTarget.value
                )
              }
              error={
                form.errors.medicalCondition && form.errors.medicalCondition
              }
              radius="md"
            />

            <TextInput
              required
              label="Email"
              placeholder="something@something.dev"
              value={form.values.email}
              onChange={(event) =>
                form.setFieldValue("email", event.currentTarget.value)
              }
              error={form.errors.email && "Invalid email"}
              radius="md"
            />

            <TextInput
              required
              type="tel"
              label="Phone Number"
              placeholder="Your Phone Number"
              value={form.values.phoneNumber}
              onChange={(event) =>
                form.setFieldValue("phoneNumber", event.currentTarget.value)
              }
              error={form.errors.phoneNumber && form.errors.phoneNumber}
              radius="md"
            />

            <PasswordInput
              required
              label="Password"
              placeholder="Your password"
              value={form.values.password}
              onChange={(event) =>
                form.setFieldValue("password", event.currentTarget.value)
              }
              error={
                form.errors.password &&
                "Password should include at least 6 characters"
              }
              radius="md"
            />
          </Stack>

          <Group position="apart" mt="xl">
            <Button type="submit" radius="xl" disabled={loading}>
              {loading ? <Loader color="white" variant="dots" /> : "Register"}
            </Button>
            <NavLink to="/login">Already have an account? Login</NavLink>
          </Group>
        </form>
      </Paper>
    </div>
  );
};

export default Register;
