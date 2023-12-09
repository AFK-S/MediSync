import { validationResult } from "express-validator";

import AttendanceSchema from "../models/AttendanceSchema.js";

const Register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array() });
  }

  const { doctor_id } = req.params;

  try {
    const attendance = await AttendanceSchema.create({
      doctor_id,
    });

    res.status(200).send(attendance._id);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err });
  }
};

const DeleteAttendance = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array() });
  }

  const { attendance_id } = req.params;

  try {
    await AttendanceSchema.findByIdAndDelete(attendance_id);
    res.status(200).json({ message: "Attendance successfully deleted" });
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err });
  }
};

const AttendanceInfo = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array() });
  }

  const { doctor_id } = req.params;
  try {
    const doctor = await AttendanceSchema.findById(doctor_id).lean();
    res.status(200).json(doctor);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err });
  }
};

const todayDoctorAttendance = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array() });
  }

  const { doctor_id } = req.params;
  try {
    const doctors = await AttendanceSchema.find({
      doctor_id,
    }).lean();
    res.status(200).json(doctors);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err });
  }
};

const DoctorAttendanceHistory = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array() });
  }

  const { doctor_id } = req.params;
  try {
    const attendance = await AttendanceSchema.find({
      doctor_id,
      createdAt: {
        $gte: new Date(new Date().setHours(0, 0, 0)),
        $lt: new Date(new Date().setHours(23, 59, 59)),
      },
    }).lean();
    res.status(200).json(attendance);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err });
  }
};

export {
  Register,
  DeleteAttendance,
  AttendanceInfo,
  todayDoctorAttendance,
  DoctorAttendanceHistory,
};
