import DoctorSchema from "../models/DoctorSchema.js";
import LogSchema from "../models/LogSchema.js";

const CCTVRegister = async (req, res) => {
  try {
    const { photo_url } = req.params;
    const status = req.body;
    const doctor = await DoctorSchema.findOne({ photo_url });
    if (!doctor) return res.status(400).send("Doctor not found");
    const log = await LogSchema.create({
      doctor_id: doctor._id,
      type: "CCTV Camera",
      status: "Found in" + status,
    });
    res.status(200).send(log._id);
  } catch (err) {
    console.error(err);
    res.status(400).send(err.message);
  }
};

const WIFIRegister = async (mac_addresses) => {
  try {
    for (let i = 0; i < mac_addresses.length; i++) {
      const doctor = await DoctorSchema.findOne({
        mac_address: mac_addresses[i],
      }).select("_id");
      if (!doctor) continue;
      await LogSchema.create({
        doctor_id: doctor._id,
        type: "Wifi Network",
        status: "Disconnected",
      });
    }
  } catch (err) {
    console.error(err);
  }
};

const AllDoctorsPhotoURL = async (req, res) => {
  try {
    const response = await DoctorSchema.find().distinct("photo_url").lean();
    res.status(200).json(response);
  } catch (err) {
    console.error(err);
    res.status(400).send(err.message);
  }
};

const DeleteLog = async (req, res) => {
  try {
    const { log_id } = req.params;
    await AttendanceSchema.findByIdAndDelete(log_id);
    res.status(200).send("Log successfully deleted");
  } catch (err) {
    console.error(err);
    res.status(400).send(err.message);
  }
};

const LogInfo = async (req, res) => {
  try {
    const { log_id } = req.params;
    const log = await AttendanceSchema.findById(log_id).lean();
    res.status(200).json(log);
  } catch (err) {
    console.error(err);
    res.status(400).send(err.message);
  }
};

export { CCTVRegister, WIFIRegister, DeleteLog, LogInfo, AllDoctorsPhotoURL };
