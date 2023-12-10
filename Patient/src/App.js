import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LoadingOverlay, MantineProvider, createTheme } from "@mantine/core";
import { useSelector } from "react-redux";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MainLayout from "./pages/MainLayout";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";

function App() {
  const loading = useSelector((state) => state.app.loading);
  const theme = createTheme({
    fontFamily: "Poppins, sans-serif",
  });

  return (
    <MantineProvider theme={theme}>
      <LoadingOverlay
        sx={{
          position: "fixed",
          ".mantine-Overlay-root": {
            background: "#000",
            opacity: 0.4,
          },
        }}
        visible={loading}
        zIndex={1000}
        overlayProps={{ radius: "sm", blur: 2 }}
        loaderProps={{ color: "dark" }}
      />

      <style>
        {`
          body {
            background-color: #F5F6FA; 
          }
        `}
      </style>

      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<MainLayout />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </MantineProvider>
  );
}

export default App;
