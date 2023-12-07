import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MainLayout from "./pages/MainLayout";
import { useSelector } from "react-redux";
import { LoadingOverlay } from "@mantine/core";

function App() {
  const loading = useSelector((state) => state.app.loading);

  return (
    <>
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

      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<MainLayout />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
