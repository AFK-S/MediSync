import express from "express";
import {
  Register as RegisterDoctor,
  UpdateDetails as UpdateDoctor,
  DeleteDoctor,
  DoctorInfo,
  HospitalDoctorsList,
  AllHospitalDoctorsList,
  AllDoctors,
} from "../controller/Doctor.js";
import { DoctorLogin } from "../controller/Login.js";

const router = express.Router();

router.post("/doctor/login", DoctorLogin);
router.post("/doctor/register/:hospital_id", RegisterDoctor);
router.put("/doctor/update/:doctor_id", UpdateDoctor);
router.delete("/doctor/delete/:doctor_id", DeleteDoctor);
router.get("/doctor/:doctor_id", DoctorInfo);
router.get("/doctor/hospital/:hospital_id", HospitalDoctorsList);
router.get("/doctors/hospital", AllHospitalDoctorsList);
router.get("/doctors", AllDoctors);

export default router;
