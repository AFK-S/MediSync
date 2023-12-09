import express from "express";
import {
  Register as RegisterHospital,
  UpdateDetails as UpdateHospital,
  HospitalInfo,
  AllHospitals,
} from "../controller/Hospital.js";

const router = express.Router();

router.post("/hospital/register", RegisterHospital);
router.put("/hospital/update/:hospital_id", UpdateHospital);
router.get("/hospital/all", AllHospitals);
router.get("/hospital/:hospital_id", HospitalInfo);

export default router;
