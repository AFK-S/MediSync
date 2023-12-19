import express from "express";
import {
  Register as RegisterDoctor,
  UpdateDetails as UpdateDoctor,
  DeleteDoctor,
  DoctorInfo,
  VerifyDoctor,
  HospitalDoctorsList,
  AllHospitalDoctorsList,
  AllDoctors,
  HospitalSpecialization,
  HospitalSpecializedDoctors,
} from "../controller/Doctor.js";
import { FirstTimeDoctorLogin, DoctorLogin } from "../controller/Login.js";
import { CheckMacAddress } from "../controller/TpLink.js";
import multer from "multer";

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const router = express.Router();

router.post("/doctor/first_time/login", FirstTimeDoctorLogin, CheckMacAddress);
router.post("/doctor/login", DoctorLogin);
router.post(
  "/doctor/register/:hospital_id",
  upload.single("file"),
  RegisterDoctor
);
router.put("/doctor/update/:doctor_id", UpdateDoctor);
router.delete("/doctor/delete/:doctor_id", DeleteDoctor);
router.get("/doctor/:doctor_id", DoctorInfo);
router.get("/doctor/verify/:mac_address", VerifyDoctor);
router.get("/doctor/hospital/:hospital_id", HospitalDoctorsList);
router.get("/doctors/hospital", AllHospitalDoctorsList);
router.get("/doctors", AllDoctors);
router.get("/doctors/specialization/:hospital_id", HospitalSpecialization);
router.get(
  "/doctors/specialization/:hospital_id/:specialization",
  HospitalSpecializedDoctors
);

export default router;
