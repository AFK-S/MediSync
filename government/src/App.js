import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useState } from "react";
import { LoadingOverlay } from "@mantine/core";

import SideNavigation from "./components/SideNavigation/SideNavigation.js";
import TopBar from "./components/TopBar/TopBar.js";
import MobileNav from "./components/MobileNav/MobileNav.js";
import Register from "./components/Register/Register.js";
import HospitalList from "./components/HospitalList/HospitalList.js";
import Map from "./components/MapView/Map.js";
import Statistics from "./components/Statictics/Statistics.js";

function App() {
  const [loading, setLoading] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const ToggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

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
          <Route
            path="/*"
            element={
              <div className="container-fluid p-0 m-0">
                <div className="row g-0">
                  <div className="d-block d-md-none mobile-menu">
                    <MobileNav
                      isMenuOpen={isMenuOpen}
                      ToggleMenu={ToggleMenu}
                    />
                  </div>
                  <div
                    className="d-none d-md-flex col-md-4 col-lg-3 p-3 py-4  align-items-center justify-content-center "
                    id="screen"
                    style={{
                      height: "100vh",
                      position: "sticky",
                      top: 0,
                      left: 0,
                    }}
                  >
                    <SideNavigation />
                  </div>
                  <div className="col-md-8 col-lg-9 px-4 px-md-0 py-4 pe-md-3 ">
                    <TopBar ToggleMenu={ToggleMenu} />

                    <Routes>
                      <Route
                        path="/"
                        element={<HospitalList setLoading={setLoading} />}
                      />
                      <Route
                        path="/register"
                        element={<Register setLoading={setLoading} />}
                      />
                      <Route
                        path="/map"
                        element={<Map setLoading={setLoading} />}
                      />
                      <Route
                        path="/stats"
                        element={<Statistics setLoading={setLoading} />}
                      />
                    </Routes>
                  </div>
                </div>
              </div>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
