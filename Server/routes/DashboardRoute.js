import express from "express";
import { Hospital, Doctor, Patient } from "../controller/Dashboard.js";

const router = express.Router();

router.get("/dashboard/hospital/:hospital_id", Hospital);
router.get("/dashboard/doctor/:doctor_id", Doctor);
router.get("/dashboard/patient/:patient_id", Patient);

export default router;
