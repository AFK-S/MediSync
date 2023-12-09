import express from "express";

import {
  Login as DoctorLogin,
  Register as RegisterDoctor,
  UpdateDetails as UpdateDoctor,
  DeleteDoctor,
  DoctorInfo,
  HospitalDoctorsLList,
  AllDoctors,
} from "../controller/Doctor.js";

const router = express.Router();

router.post("/doctor/login", DoctorLogin);
router.post("/doctor/register", RegisterDoctor);
router.put("/doctor/update/:doctor_id", UpdateDoctor);
router.delete("/doctor/delete/:doctor_id", DeleteDoctor);
router.get("/doctor/:doctor_id", DoctorInfo);
router.get("/doctor/hospital/:hospital_id", HospitalDoctorsLList);
router.get("/doctor/all", AllDoctors);

export default router;
