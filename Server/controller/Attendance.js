import AttendanceSchema from "../models/AttendanceSchema.js";

const Register = async (req, res) => {
  try {
    const { doctor_id } = req.params;
    const response = await AttendanceSchema.findOne({
      doctor_id,
      date: {
        $gte: new Date(new Date().setHours(0, 0, 0)),
        $lt: new Date(new Date().setHours(23, 59, 59)),
      },
    });
    if (response) {
      response.checkOut = new Date();
      await response.save();
      return res.status(200).send(response._id);
    }
    const attendance = await AttendanceSchema.create({
      doctor_id: doctor_id,
      date: new Date(),
      checkIn: new Date(),
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
    const response = await AttendanceSchema.findOne({
      doctor_id,
      isAvailable: false,
      isPresent: false,
      date: data,
    });
    if (response) return res.status(400).send("Attendance already registered");
    const attendance = await AttendanceSchema.create({
      doctor_id,
      isAvailable: false,
      isPresent: false,
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
      date: {
        $gte: new Date(new Date().setHours(0, 0, 0)),
        $lt: new Date(new Date().setHours(23, 59, 59)),
      },
      isAvailable: true,
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
      isAvailable: true,
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
