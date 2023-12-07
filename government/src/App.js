import "./App.css";
import React from "react";
import "@mantine/core/styles.css";
import { useDisclosure } from "@mantine/hooks";
import {
  AppShell,
  Flex,
  Burger,
  Button,
  AppShellHeader,
  Center,
  AppShellNavbar,
  useMantineColorScheme,
  useComputedColorScheme,
} from "@mantine/core";
import { useState } from "react";
import { FaSun, FaMoon } from "react-icons/fa";
import RegisterHospital from "./components/RegisterHospital";
import ViewHospital from "./components/ViewHospital";
import { Navigate } from "react-router";

function App() {
  const [opened, { toggle }] = useDisclosure();
  const [currentComponent, setcurrentComponent] = useState("Component1");
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme("light");

  const toggleColorScheme = () => {
    setColorScheme(computedColorScheme === "dark" ? "light" : "dark");
  };

  return (
    <div className="App" style={{ marginTop: "20px" }}>
      <AppShell
        header={{ height: 60 }}
        navbar={{
          width: 300,
          breakpoint: "sm",
          collapsed: { mobile: !opened },
        }}
      >
        <AppShellHeader>
          <Flex
            justify="space-between"
            align={Center}
            style={{ padding: "10px 20px" }}
          >
            <Burger
              opened={opened}
              onClick={toggle}
              hiddenFrom="sm"
              size={"sm"}
            />
            <div style={{ fontSize: "25px" }}>MEDISYNC - GOVERNTMENT </div>
            <Button
              size="md"
              variant="link"
              onClick={toggleColorScheme}
              style={{ background: "none", color: "black" }}
            >
              {computedColorScheme === "dark" ? <FaMoon /> : <FaSun />}
            </Button>
          </Flex>
        </AppShellHeader>

        <AppShellNavbar p="md" style={{ gap: "10px" }}>
          <Button
            className="view-hospital"
            onClick={() => setcurrentComponent("Component1")}
            style={{ margin: "5px", background: "black" }}
          >
            View Hospital
          </Button>
          <Button
            onClick={() => setcurrentComponent("Component2")}
            style={{ margin: "5px", background: "black" }}
          >
            Register Hospital
          </Button>
        </AppShellNavbar>

        <AppShell.Main>
          {currentComponent === "Component1" ? (
            <ViewHospital />
          ) : (
            <RegisterHospital />
          )}
        </AppShell.Main>
        <AppShell.Footer zIndex={300} style={{ color: "gray" }}>
          Government of Himachal Pradesh
        </AppShell.Footer>
      </AppShell>
    </div>
  );
}

export default App;
