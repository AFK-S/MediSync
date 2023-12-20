import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import SideNavigation from "../components/SideNavigation/SideNavigation.js";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import TopBar from "../components/TopBar/TopBar.js";
import MobileNav from "../components/MobileNav/MobileNav.js";
import Home from "./Home/Home.js";
// import { SERVER_URL } from "../config.js";
import axios from "axios";
import Appointments from "./Appointment/Appointments.js";
import Profile from "./Profile/Profile.js";
import Search from "./Search/Search.js";
import { useCookies } from "react-cookie";
import { setData } from "../slice/AppSclice.js";
import { useSelector } from "react-redux";
import Info from "./Info.js";

const MainLayout = () => {
  const navigate = useNavigate();
  const [cookies] = useCookies();

  useEffect(() => {
    if (!cookies._id) {
      console.log("cookies from main: ", cookies._id);
      navigate("/login");
    }
  }, [cookies]);

  useEffect(() => {
    const fetchPatientInfo = async () => {
      try {
        const response = await axios.get(
          `/api/dashboard/patient/${cookies._id}`
        );
        dispatch(setData(response.data));
      } catch (error) {
        console.error(error);
      }
    };

    fetchPatientInfo();
  }, []);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const dispatch = useDispatch();

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
              <Route path="/home" element={<Home />} />
              <Route path="/search/*" element={<Search />} />
              <Route path="/appointments" element={<Appointments />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/info" element={<Info />} />
            </Routes>
          </div>
        </div>
      </div>
    </>
  );
};

export default MainLayout;
