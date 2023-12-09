import React, { useState } from "react";
import { Routes, Route, NavLink } from "react-router-dom";
import AllPatients from "../components/Patients/AllPatients";
import PatientProfile from "../components/Patients/PatientProfile";

const Patients = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<AllPatients />} />
        <Route path="/profile/:id" element={<PatientProfile />} />
      </Routes>
    </div>
  );
};

export default Patients;
