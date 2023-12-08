import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./pages/MainLayout";
import { LoadingOverlay } from "@mantine/core";
import { useState } from "react";

function App() {
  // const loading = useSelector((state) => state.app.loading);
  const [loading, setLoading] = useState(false);

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
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
