import express from "express";
import {
  Register as RegisterAttendance,
  DoctorUnavailableRegister as DoctorUnavailableRegisterAttendance,
  DeleteAttendance,
  AttendanceInfo,
  TodayDoctorAttendance,
  DoctorAttendanceHistory,
  TodayDoctorsAttendance,
} from "../controller/Attendance.js";

const router = express.Router();

router.post("/attendance/register/:rfid_tag", RegisterAttendance);
router.post(
  "/attendance/unavailable/register/:doctor_id",
  DoctorUnavailableRegisterAttendance
);
router.delete("/attendance/delete/:attendance_id", DeleteAttendance);
router.get("/attendance/:attendance_id", AttendanceInfo);
router.get("/attendance/doctor/:doctor_id/today", TodayDoctorAttendance);
router.get("/attendance/doctor/:doctor_id/history", DoctorAttendanceHistory);
router.get("/attendance/hospital/:hospital_id/today", TodayDoctorsAttendance);

export default router;
