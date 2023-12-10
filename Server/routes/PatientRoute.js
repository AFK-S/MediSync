import express from "express";
import {
  UpdateDetails as UpdatePatient,
  DeletePatient,
  PatientInfo,
  HospitalPatient,
  DoctorsPatient,
  AllPatients,
} from "../controller/Patient.js";
import { PatientLogin } from "../controller/Login.js";
import { SendOTP, VerifyOTP } from "../middleware/OTP.js";

const router = express.Router();

router.put("/otp/:phone_number", SendOTP);
router.put("/otp/verify/:otp", VerifyOTP);
router.post("/patient/login", PatientLogin);
router.put("/patient/update/:phone_number", UpdatePatient);
router.delete("/patient/delete/:phone_number", DeletePatient);
router.get("/patient/:phone_number", PatientInfo);
router.get("/patient/hospital/:hospital_id", HospitalPatient);
router.get("/patient/doctor/:doctor_id", DoctorsPatient);
router.get("/patients", AllPatients);

export default router;
