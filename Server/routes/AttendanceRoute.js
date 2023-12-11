import express from "express";
import {
  Register as RegisterAttendance,
  DoctorUnavailableRegister as DoctorUnavailableRegisterAttendance,
  DeleteAttendance,
  AttendanceInfo,
  TodayDoctorsAttendance,
  DoctorAttendanceHistory,
} from "../controller/Attendance.js";

const router = express.Router();

router.post("/attendance/register/:doctor_id", RegisterAttendance);
router.post(
  "/attendance/unavailable/register/:doctor_id",
  DoctorUnavailableRegisterAttendance
);
router.delete("/attendance/delete/:attendance_id", DeleteAttendance);
router.get("/attendance/:attendance_id", AttendanceInfo);
router.get("/attendance/doctor/:doctor_id/today", TodayDoctorsAttendance);
router.get("/attendance/doctor/:doctor_id/history", DoctorAttendanceHistory);

export default router;
