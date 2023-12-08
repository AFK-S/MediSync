import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import SideNavigation from "../components/SideNavigation/SideNavigation.js";
import TopBar from "../components/TopBar/TopBar.js";
import MobileNav from "../components/MobileNav/MobileNav.js";
import Dashboard from "./Dashboard.js";
// import { SERVER_URL } from "../config.js";
import axios from "axios";
import Register from "../components/Register/Register.js";
import HospitalList from "../components/HospitalList/HospitalList.js";

const MainLayout = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const ToggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <div className="container-fluid p-0 m-0">
        <div className="row g-0">
          <div className="d-block d-md-none mobile-menu">
            <MobileNav isMenuOpen={isMenuOpen} ToggleMenu={ToggleMenu} />
          </div>
          <div
            className="d-none d-md-flex col-md-4 col-lg-3 p-3 py-4  align-items-center justify-content-center "
            id="screen"
            style={{ height: "100vh", position: "sticky", top: 0, left: 0 }}
          >
            <SideNavigation />
          </div>
          <div className="col-md-8 col-lg-9 px-4 px-md-0 py-4 pe-md-3 ">
            <TopBar ToggleMenu={ToggleMenu} />

            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/register" element={<Register />} />
              <Route path="/hospitals" element={<HospitalList />} />
            </Routes>
          </div>
        </div>
      </div>
    </>
  );
};

export default MainLayout;
