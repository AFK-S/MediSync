import express from "express";

import {
  Register as RegisterHospital,
  UpdateDetails as UpdateHospital,
  HospitalInfo,
  AllHospitals,
} from "../controller/Hospital.js";
import { RegisterationMail } from "../middleware/Email.js";

const router = express.Router();

router.post("/hospital/register", RegisterHospital, RegisterationMail);
router.put("/hospital/update/:hospital_id", UpdateHospital);
router.get("/hospital/all", AllHospitals);
router.get("/hospital/:hospital_id", HospitalInfo);

export default router;
