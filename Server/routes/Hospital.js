import express from "express";

import {
  Login as HospitalLogin,
  Register as RegisterHospital,
  UpdateDetails as UpdateHospital,
  DeleteHospital,
  HospitalInfo,
  AllHospitals,
} from "../controller/Hospital.js";
import { RegisterationMail } from "../middleware/Email.js";

const router = express.Router();

router.post("/hospital/login", HospitalLogin);
router.post("/hospital/register", RegisterHospital, RegisterationMail);
router.put("/hospital/update/:hospital_id", UpdateHospital);
router.delete("/hospital/delete/:hospital_id", DeleteHospital);
router.get("/hospital/:hospital_id", HospitalInfo);
router.get("/hospital/all", AllHospitals);

export default router;
