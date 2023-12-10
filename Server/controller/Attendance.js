import AttendanceSchema from "../models/AttendanceSchema.js";

const Register = async (req, res) => {
  try {
    const { doctor_id } = req.params;
    const attendance = await AttendanceSchema.create({
      doctor_id,
      date: new Date(),
    });
    res.status(200).send(attendance._id);
  } catch (err) {
    console.error(err);
    res.status(400).send(err.message);
  }
};

const DoctorUnavailableRegister = async (req, res) => {
  try {
    const { doctor_id } = req.params;
    const data = req.body;
    const attendance = await AttendanceSchema.create({
      doctor_id,
      absent: true,
      date: data,
    });
    res.status(200).send(attendance._id);
  } catch (err) {
    console.error(err);
    res.status(400).send(err.message);
  }
};

const DeleteAttendance = async (req, res) => {
  try {
    const { attendance_id } = req.params;
    await AttendanceSchema.findByIdAndDelete(attendance_id);
    res.status(200).send("Attendance successfully deleted");
  } catch (err) {
    console.error(err);
    res.status(400).send(err.message);
  }
};

const AttendanceInfo = async (req, res) => {
  try {
    const { attendance_id } = req.params;
    const attendance = await AttendanceSchema.findById(attendance_id).lean();
    res.status(200).json(attendance);
  } catch (err) {
    console.error(err);
    res.status(400).send(err.message);
  }
};

const TodayDoctorsAttendance = async (req, res) => {
  try {
    const { doctor_id } = req.params;
    const attendance = await AttendanceSchema.find({
      doctor_id,
      absent: false,
    }).lean();
    res.status(200).json(attendance);
  } catch (err) {
    console.error(err);
    res.status(400).send(err.message);
  }
};

const DoctorAttendanceHistory = async (req, res) => {
  try {
    const { doctor_id } = req.params;
    const attendance = await AttendanceSchema.find({
      doctor_id,
      createdAt: {
        $gte: new Date(new Date().setHours(0, 0, 0)),
        $lt: new Date(new Date().setHours(23, 59, 59)),
      },
      absent: false,
    }).lean();
    res.status(200).json(attendance);
  } catch (err) {
    console.error(err);
    res.status(400).send(err.message);
  }
};

export {
  Register,
  DoctorUnavailableRegister,
  DeleteAttendance,
  AttendanceInfo,
  TodayDoctorsAttendance,
  DoctorAttendanceHistory,
};
