import React, { useState, useEffect, useContext } from "react";
import { useForm } from "@mantine/form";
import {
  TextInput,
  PasswordInput,
  Text,
  Paper,
  Button,
  Divider,
  Stack,
  Group,
} from "@mantine/core";
import axios from "axios";
import { Loader } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { StateContext } from "../context/StateContext";

export default function Login() {
  const { isLogin, setIsLogin } = useContext(StateContext);
  const [loading, setLoading] = useState(false);
  const Navigate = useNavigate();

  useEffect(() => {
    if (isLogin) Navigate("/dashboard");
  }, [isLogin]);

  const form = useForm({
    initialValues: {
      username: "",
      password: "",
    },
    validate: {},
  });

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      await axios.post("/api/hospital/login", values);
      setIsLogin(true);
      form.reset();
      Navigate("/dashboard");
    } catch (err) {
      console.log(err);
      alert(`Something went wrong: ${err.response && err.response.data}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login">
      <Paper
        radius="md"
        p="xl"
        withBorder
        style={{ width: "80vw", maxWidth: 450 }}
      >
        <Text size="lg" weight={500}>
          Welcome to MediSync
        </Text>

        <Divider my="lg"></Divider>

        <form onSubmit={form.onSubmit((value) => handleSubmit(value))}>
          <Stack>
            <TextInput
              required
              label="username"
              placeholder="username"
              value={form.values.username}
              onChange={(event) =>
                form.setFieldValue("username", event.currentTarget.value)
              }
              error={form.errors.username && "Invalid username"}
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
              {loading ? <Loader color="white" variant="dots" /> : "Login"}
            </Button>
          </Group>
        </form>
      </Paper>
    </div>
  );
}
