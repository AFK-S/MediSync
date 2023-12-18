import express from "express";
import {
  Register as AppointmentRegister,
  UpdateDetails as UpdateAppointment,
  DeleteAppointment,
  AppointmentInfo,
  TodayHospitalAppointment,
  HospitalAppointment,
  TodayDoctorAppointment,
  AllDoctorAppointment,
  DoctorAvailableSlots,
  MarkAsDone,
} from "../controller/Appointment.js";

const router = express.Router();

router.post("/appointment/register", AppointmentRegister);
router.put("/appointment/update/:appointment_id", UpdateAppointment);
router.delete("/appointment/delete/:appointment_id", DeleteAppointment);
router.get("/appointment/:appointment_id", AppointmentInfo);
router.get(
  "/appointment/hospital/:hospital_id/today",
  TodayHospitalAppointment
);
router.get("/appointment/hospital/:hospital_id", HospitalAppointment);
router.get("/appointment/doctor/:doctor_id/today", TodayDoctorAppointment);
router.get("/appointment/doctor/:doctor_id", AllDoctorAppointment);
router.post("/appointment/doctor/slots/:type/:doctor_id", DoctorAvailableSlots);
router.put("/appointment/mark_as_done/:appointment_id", MarkAsDone);

export default router;
