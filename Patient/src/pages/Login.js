import React, { useState } from "react";
import { useForm } from "@mantine/form";
import { auth } from "../firebase.js"; // Update the path accordingly
import { signInWithPhoneNumber, RecaptchaVerifier } from "firebase/auth";

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
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [user, setUser] = useState(null);

  const Navigate = useNavigate();
  const form = useForm({
    initialValues: {
      mobile: "",
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

  const handleSendOTP = async () => {
    try {
      const PhoneNumber = "+91" + phoneNumber;
      const recaptcha = new RecaptchaVerifier(auth, "recaptcha", {});
      const confirmation = await signInWithPhoneNumber(
        auth,
        PhoneNumber,
        recaptcha
      );

      console.log(confirmation);
      setUser(confirmation);
      alert("OTP sent successfully!");
      setOtpSent(true);
    } catch (error) {
      console.error("Error sending OTP:", error);
    }
  };

  const handleVerifyOTP = async () => {
    try {
      await user.confirm(otp);
      alert("OTP verified successfully!");
      setOtpConfirm(true);
    } catch (error) {
      console.error("Error verifying OTP:", error);
      alert("Invalid OTP. Please try again.");
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
        <Text size="lg" style={{ color: "black", fontWeight: "bolder" }}>
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
          <form onSubmit={form.onSubmit(handleVerifyOTP)}>
            <Stack>
              <Text style={{ color: "black" }}>
                Enter OTP received on you Phone
              </Text>
              <TextInput
                onChange={(event) => setOtp(event.target.value)}
                label={"Enter OTP"}
                type={/^[0-9]*$/}
                radius="md"
                required
                value={otp}
                placeholder="Enter Your OTP"
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
          <form onSubmit={form.onSubmit(handleSendOTP)}>
            <Stack>
              <TextInput
                required
                type="tel"
                label="Mobile Number"
                placeholder="Enter your mobile number"
                value={phoneNumber}
                onChange={(event) => setPhoneNumber(event.target.value)}
                radius="md"
              />
              <div id="recaptcha"></div>
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
