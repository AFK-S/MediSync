import React, { useState, useEffect } from "react";
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
import { useCookies } from "react-cookie";

import { useDispatch, useSelector } from "react-redux";

export default function Login() {
  const [otpSent, setOtpSent] = useState(false);
  const [otpConfirm, setOtpConfirm] = useState(false);
  const [otp, setOtp] = useState("");
  const [user, setUser] = useState(null);

  const navigate = useNavigate();
  const [cookies] = useCookies();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user);

  useEffect(() => {
    console.log("login");
    console.log(cookies._id);
    if (cookies._id) {
      console.log("cookies hai: ", cookies._id);
      navigate("/home");
    }
  }, [cookies]);

  const form = useForm({
    initialValues: {
      name: "",
      age: "",
      phone_number: "",
    },
    validate: {},
  });

  const handleSendOTP = async () => {
    try {
      // const PhoneNumber = "+91" + form.values.phone_number;
      // const recaptcha = new RecaptchaVerifier(auth, "recaptcha", {});
      // const confirmation = await signInWithPhoneNumber(
      //   auth,
      //   PhoneNumber,
      //   recaptcha
      // );

      // console.log(confirmation);
      // setUser(confirmation);
      alert("OTP sent successfully!");

      setOtpSent(true);
      console.log(form.values);
    } catch (error) {
      console.error("Error sending OTP:", error);
    }
  };

  const handleVerifyOTP = async () => {
    try {
      // await user.confirm(otp);
      const response = await axios.get(
        `/api/patient/verify/${form.values.phone_number}`
      );

      if (response.status == 200) {
        navigate("/home");
      } else {
        setOtpConfirm(true);
        alert("OTP verified!");
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
    }
  };

  const handleSignUpSubmit = async (values) => {
    console.log(form);
    try {
      const { data } = await axios.post("api/patient/login/", form);
      console.log(data);

      alert(`Welcome ${values.name}! You are now registered.`);
      navigate("/home");
      console.log(form);
    } catch (err) {
      console.log(err);
      alert(`Something went wrong: ${err.response && err.response.data.msg}`);
    } finally {
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
              <Button type="submit" radius="lg">
                Sign Up
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
              <Button type="submit" radius="lg">
                Submit
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
                radius="md"
                value={form.values.phone_number}
                onChange={(event) =>
                  form.setFieldValue("phone_number", event.currentTarget.value)
                }
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
