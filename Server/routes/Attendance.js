import express from "express";

import {
  Register as RegisterAttendance,
  DeleteAttendance,
  AttendanceInfo,
  todayDoctorAttendance,
  DoctorAttendanceHistory,
} from "../controller/Attendance.js";

const router = express.Router();

router.post("/attendance/register/:doctor_id", RegisterAttendance);
router.delete("/attendance/delete/:attendance_id", DeleteAttendance);
router.get("/attendance/:doctor_id", AttendanceInfo);
router.get("/attendance/doctor/today/:doctor_id", todayDoctorAttendance);
router.get("/attendance/doctor/history/:doctor_id", DoctorAttendanceHistory);

export default router;
