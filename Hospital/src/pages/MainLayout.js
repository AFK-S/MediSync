import React, { useEffect, useState, useContext } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import SideNavigation from "../components/SideNavigation/SideNavigation.js";
import TopBar from "../components/TopBar/TopBar.js";
import MobileNav from "../components/MobileNav/MobileNav.js";
import Dashboard from "./Dashboard.js";
import axios from "axios";
import Doctors from "./Doctors.js";
import Appointments from "./Appointments.js";
import Patients from "./Patients.js";
import Register from "./Register.js";
import { StateContext } from "../context/StateContext.js";
import { useCookies } from "react-cookie";

const MainLayout = () => {
  const [cookies] = useCookies();
  const { isLogin, setDoctorsList, setLoading, getHospital, hospital } =
    useContext(StateContext);
  const Navigate = useNavigate();

  useEffect(() => {
    if (!isLogin) Navigate("/login");
    getHospital(cookies._id);
  }, [isLogin]);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const ToggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(`/api/doctor/hospital/${cookies._id}`);
        setDoctorsList(data);
      } catch (error) {
        alert("Failed to fetch data");
        console.error("Failed to fetch data: ", error);
      }
      setLoading(false);
    })();
  }, []);

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
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/doctors/*" element={<Doctors />} />
              <Route path="/appointments" element={<Appointments />} />
              <Route path="/patients/*" element={<Patients />} />
              <Route path="/reg-doc" element={<Register />} />
            </Routes>
          </div>
        </div>
      </div>
    </>
  );
};

export default MainLayout;
