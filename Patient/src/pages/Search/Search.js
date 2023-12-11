import React, { useState } from "react";
import { Routes, Route, NavLink } from "react-router-dom";
import AllDoctors from "../../components/AllDoctors/AllDoctors";
import Appointments from "../Appointment/Appointments";

const Patients = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<AllDoctors />} />
        <Route path="/appointment" element={<Appointments />} />
      </Routes>
    </div>
  );
};

export default Patients;
