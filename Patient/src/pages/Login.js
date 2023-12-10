import React, { useState } from "react";
import { useForm } from "@mantine/form";
import {
  TextInput,
  PasswordInput,
  Text,
  Paper,
  Group,
  Button,
  Divider,
  Stack,
} from "@mantine/core";
import { PinInput } from "@mantine/core";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { Loader } from "@mantine/core";
import { useCookies } from "react-cookie";

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otpConfirm, setOtpConfirm] = useState(false);
  const Navigate = useNavigate();
  const form = useForm({
    initialValues: {
      mobile: "",
      otp: "",
      name: "",
      age: "",
    },
    validate: {
      // mobile: (val) => (/^\d{10}$/.test(val) ? null : "Invalid mobile number"),
      // otp: (val) => (val.trim().length === 6 ? null : "Invalid OTP"),
      // name: (val) => (val.trim() === "" ? "Name is required" : null),
      // age: (val) =>
      //   isNaN(val) || val <= 0 ? "Age should be a positive number" : null,
    },
  });

  const [cookies, setCookie] = useCookies(["token", "userId"]);

  const handleMobileSubmit = (values) => {
    // setLoading(true);
    try {
      form.reset();
      alert("OTP sent successfully!");
      setOtpSent(true);
    } catch (err) {
      console.log(err);
      alert(`Something went wrong: ${err.response && err.response.data.msg}`);
    } finally {
      // setLoading(false);
    }
  };

  const handleOtpSubmit = (values) => {
    setLoading(true);
    try {
      // Implement logic to verify OTP
      // For example, you can make an API call to verify OTP

      // Simulating successful OTP verification
      alert("OTP verified successfully!");
      setOtpConfirm(true);
    } catch (err) {
      console.log(err);
      alert(`Invalid OTP. Please try again.`);
    } finally {
      setLoading(false);
    }
  };

  const handleSignUpSubmit = (values) => {
    setLoading(true);
    try {
      alert(`Welcome ${values.name}! You are now registered.`);
      setTimeout(() => {
        Navigate("/home");
      }, 1000);
    } catch (err) {
      console.log(err);
      alert(`Something went wrong: ${err.response && err.response.data.msg}`);
    } finally {
      setLoading(false);
      form.reset();
    }
  };

  return (
    <div className="login">
      <Paper
        radius="md"
        p="xl"
        w={400}
        withBorder
        sx={{
          width: "80%",
          maxWidth: 450,
        }}
      >
        <Text
          size="lg"
          // weight={700}
          style={{ color: "black", fontWeight: "bolder" }}
        >
          Welcome to MediSync
        </Text>

        <Divider my="lg"></Divider>

        {otpConfirm ? (
          <form onSubmit={form.onSubmit((value) => handleSignUpSubmit(value))}>
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
            </Stack>

            <Group position="apart" mt="xl">
              <Button type="submit" radius="lg" disabled={loading}>
                {loading ? <Loader color="white" variant="dots" /> : "Sign Up"}
              </Button>
            </Group>
          </form>
        ) : otpSent ? (
          <form onSubmit={form.onSubmit((value) => handleOtpSubmit(value))}>
            <Stack>
              <Text style={{ color: "black" }}>
                Enter OTP received on you Phone
              </Text>
              <PinInput
                value={form.values.otp}
                onChange={(otp) => form.setFieldValue("otp", otp)}
                aria-label="One time code"
                type={/^[0-9]*$/}
                inputType="tel"
                inputMode="numeric"
              />
            </Stack>

            <Group position="apart" mt="xl">
              <Button type="submit" radius="lg" disabled={loading}>
                {loading ? <Loader color="white" variant="dots" /> : "Submit"}
              </Button>
              <NavLink to="/login">Edit Mobile Number</NavLink>
            </Group>
          </form>
        ) : (
          <form onSubmit={form.onSubmit(handleMobileSubmit)}>
            <Stack>
              <TextInput
                required
                type="tel"
                label="Mobile Number"
                placeholder="Enter your mobile number"
                value={form.values.mobile}
                onChange={(event) =>
                  form.setFieldValue("mobile", event.currentTarget.value)
                }
                error={form.errors.mobile && form.errors.mobile}
                radius="md"
              />
            </Stack>

            <Group position="apart" mt="xl">
              <Button type="submit" radius="lg">
                Send OTP
              </Button>
            </Group>
          </form>
        )}
      </Paper>
    </div>
  );
}
