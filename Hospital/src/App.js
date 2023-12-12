import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { LoadingOverlay, MantineProvider, createTheme } from "@mantine/core";
import { useSelector } from "react-redux";
import Login from "./pages/Login";
import MainLayout from "./pages/MainLayout";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import StateProvider from "./context/StateContext";

function App() {
  const loading = useSelector((state) => state.app.loading);
  const theme = createTheme({
    fontFamily: "Poppins, sans-serif",
  });

  return (
    <StateProvider>
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
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/login" element={<Login />} />
            <Route path="/*" element={<MainLayout />} />
          </Routes>
        </BrowserRouter>
      </MantineProvider>
    </StateProvider>
  );
}

export default App;
