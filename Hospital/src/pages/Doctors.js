import React from "react";
import { Routes, Route } from "react-router-dom";
import AllDcotors from "../components/Doctor/AllDcotors";
import DoctorProfile from "../components/Doctor/DoctorProfile";

const Doctors = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<AllDcotors />} />
        <Route path="/profile/:doctor_id" element={<DoctorProfile />} />
      </Routes>
    </>
  );
};

export default Doctors;
