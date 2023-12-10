import express from "express";
import {
  Register as RegisterHospital,
  UpdateDetails as UpdateHospital,
  DeleteHospital,
  HospitalInfo,
  AllHospitals,
} from "../controller/Hospital.js";
import { HospitalLogin } from "../controller/Login.js";
import { RegistrationMail } from "../middleware/Email.js";

const router = express.Router();

router.post("/hospital/login", HospitalLogin);
router.post("/hospital/register", RegisterHospital, RegistrationMail);
router.put("/hospital/update/:hospital_id", UpdateHospital);
router.delete("/hospital/delete/:hospital_id", DeleteHospital);
router.get("/hospital/:hospital_id", HospitalInfo);
router.get("/hospitals", AllHospitals);

export default router;
