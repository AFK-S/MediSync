// GovernmentRoutes.js

import express from "express";
import {
  RegisterHospital,
  GetAllHospitals,
  UpdateHospitalField,
} from "../controller/GovernmentController.js";

const router = express.Router();

router.post("/government/register", RegisterHospital);
router.get("/government/all", GetAllHospitals);
router.put("/government/update/:hospitalId", UpdateHospitalField);

export default router;
