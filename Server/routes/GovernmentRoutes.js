// GovernmentRoutes.js

import express from "express";
import {
  RegisterHospital,
  GetAllHospitals,
  UpdateHospitalField,
  GetBasicHospitalInfo, // Import the new API endpoint
} from "../controller/GovernmentController.js";

const router = express.Router();

router.post("/government/register", RegisterHospital);
router.get("/government/all", GetAllHospitals);
router.put("/government/update/:hospitalId", UpdateHospitalField);
router.get("/government/basic-info", GetBasicHospitalInfo); // Add the new API endpoint

export default router;
