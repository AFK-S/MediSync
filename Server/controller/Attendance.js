import AttendanceSchema from "../models/AttendanceSchema.js";
import DoctorSchema from "../models/DoctorSchema.js";

const Register = async (req, res) => {
  try {
    const { rfid_tag } = req.params;
    const doctor = await DoctorSchema.findOne({ rfid_tag });
    const response = await AttendanceSchema.findOne({
      doctor_id: doctor._id,
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
      doctor_id: doctor._id,
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
    const response = await AttendanceSchema.findOneAndUpdate(
      {
        doctor_id,
        date: {
          $gte: new Date(new Date().setHours(0, 0, 0)),
          $lt: new Date(new Date().setHours(23, 59, 59)),
        },
      },
      {
        isAvailable: false,
      }
    );
    res.status(200).send(response._id);
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

const TodayDoctorAttendance = async (req, res) => {
  try {
    const { doctor_id } = req.params;
    const attendance = await AttendanceSchema.findOne({
      doctor_id,
      date: {
        $gte: new Date(new Date().setHours(0, 0, 0)),
        $lt: new Date(new Date().setHours(23, 59, 59)),
      },
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

const TodayDoctorsAttendance = async (req, res) => {
  try {
    const { hospital_id } = req.params;
    const doctor_ids = await DoctorSchema.find({ hospital_id }).lean();
    const attendance = await AttendanceSchema.findOne({
      doctor_id: { $in: doctor_ids },
      date: {
        $gte: new Date(new Date().setHours(0, 0, 0)),
        $lt: new Date(new Date().setHours(23, 59, 59)),
      },
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
  TodayDoctorAttendance,
  DoctorAttendanceHistory,
  TodayDoctorsAttendance,
};
