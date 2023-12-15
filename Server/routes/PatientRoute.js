import express from "express";
import {
  VerifyPatient,
  UpdateDetails as UpdatePatient,
  DeletePatient,
  PatientInfo,
  HospitalPatient,
  DoctorsPatient,
  AllPatients,
  AllSpecialization,
  AllSpecializedDoctors,
} from "../controller/Patient.js";
import { PatientLogin } from "../controller/Login.js";
import { SendOTP, VerifyOTP } from "../middleware/OTP.js";

const router = express.Router();

router.put("/otp/:phone_number", SendOTP);
router.put("/otp/verify/:otp", VerifyOTP);
router.get("/patient/verify/:phone_number", VerifyPatient);
router.post("/patient/login", PatientLogin);
router.put("/patient/update/:patient_id", UpdatePatient);
router.delete("/patient/delete/:patient_id", DeletePatient);
router.get("/patient/:patient_id", PatientInfo);
router.get("/patient/hospital/:hospital_id", HospitalPatient);
router.get("/patient/doctor/:doctor_id", DoctorsPatient);
router.get("/patients", AllPatients);
router.get("/specializations/:hospital_id", AllSpecialization);
router.get(
  "/appointment/doctor/:hospital_id/:specialization",
  AllSpecializedDoctors
);

export default router;
