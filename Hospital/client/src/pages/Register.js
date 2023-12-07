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
  Anchor,
  Stack,
} from "@mantine/core";
import { NavLink } from "react-router-dom";
import axios from "axios";
// import { SERVER_URL } from "../config.js";
import { Notification } from "@mantine/core";
import { IconCheck, IconX } from "@tabler/icons-react";
import { Loader } from "@mantine/core";
import { useNavigate } from "react-router-dom";

export default function Register(PaperProps) {
  const [loading, setLoading] = useState(false);
  const [notificationVisible, setNotificationVisible] = useState({
    visible: false,
    type: "",
    message: "",
  });
  const Navigate = useNavigate();
  const form = useForm({
    initialValues: {
      email: "",
      name: "",
      password: "",
    },

    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : "Invalid email"),
      password: (val) =>
        val.trim().length <= 6
          ? "Password should include at least 6 characters"
          : null,
    },
  });

  // const handleSubmit = async (values) => {
  //   setLoading(true);
  //   try {
  //     const { data } = await axios.post(
  //       `${SERVER_URL}/api/auth/register`,
  //       values
  //     );
  //     setNotificationVisible({
  //       title: "User created successfully",
  //       visible: true,
  //       color: "green",
  //       icon: <IconCheck />,
  //       message: data.message,
  //     });
  //     setTimeout(() => {
  //       Navigate("/login");
  //     }, 3000);
  //   } catch (err) {
  //     console.log(err);
  //     setNotificationVisible({
  //       title: "Something went wrong",
  //       visible: true,
  //       color: "red",
  //       icon: <IconX />,
  //       message: err.response && err.response.data.message,
  //     });
  //   }
  //   setLoading(false);
  //   setTimeout(() => {
  //     setNotificationVisible({
  //       visible: false,
  //       type: "",
  //       message: "",
  //     });
  //   }, 3000);
  // };

  return (
    <div className="login">
      {notificationVisible.visible && (
        <Notification
          style={{ zIndex: 1000, position: "fixed", top: 20, right: 20 }}
          title={notificationVisible.title}
          color={notificationVisible.color}
          icon={notificationVisible.icon}
          onClose={() =>
            setNotificationVisible({
              visible: false,
              type: "",
              message: "",
            })
          }
          withCloseButton
        >
          {notificationVisible.message}
        </Notification>
      )}
      <Paper
        radius="md"
        p="xl"
        withBorder
        sx={{
          width: "100%",
          maxWidth: 450,
        }}
      >
        <Text size="lg" weight={500}>
          Register for MediSync
        </Text>

        <Divider my="lg"></Divider>

        <form
          onSubmit={form.onSubmit((value) => {
            // handleSubmit(value);
            form.reset();
          })}
        >
          <Stack>
            <TextInput
              withAsterisk
              label="Name"
              placeholder="Your name"
              value={form.values.name}
              onChange={(event) =>
                form.setFieldValue("name", event.currentTarget.value)
              }
              radius="md"
            />

            <TextInput
              required
              label="Email"
              placeholder="hello@mantine.dev"
              value={form.values.email}
              onChange={(event) =>
                form.setFieldValue("email", event.currentTarget.value)
              }
              error={form.errors.email && "Invalid email"}
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
            <Anchor component="button" type="button" color="dimmed" size="xs">
              Already have an account? <NavLink to="/login">Login</NavLink>
            </Anchor>
            <Button type="submit" radius="xl">
              {loading ? <Loader color="orange" variant="dots" /> : "Register"}
            </Button>
          </Group>
        </form>
      </Paper>
    </div>
  );
}
