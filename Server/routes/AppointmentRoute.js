import express from "express";
import {
  OnlineRegister as AppointmentOnlineRegister,
  WalkInRegister as AppointmentWalkInRegister,
  UpdateDetails as UpdateAppointment,
  DeleteAppointment,
  AppointmentInfo,
  TodayHospitalAppointment,
  HospitalAppointment,
  TodayDoctorAppointment,
  AllDoctorAppointment,
  DoctorAvailableSlots,
  MarkAsDone,
  TodayWalkInAppointment,
} from "../controller/Appointment.js";

const router = express.Router();

router.post("/appointment/online/register", AppointmentOnlineRegister);
router.post("/appointment/walk_in/register", AppointmentWalkInRegister);
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
router.get("/appointment/walk_in/today/:hospital_id", TodayWalkInAppointment);

export default router;
