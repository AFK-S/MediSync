import PatientSchema from "../models/PatientSchema.js";
import AppointmentSchema from "../models/AppointmentSchema.js";

const Register = async (req, res) => {
  try {
    const {
      hospital_id,
      doctor_id,
      name,
      age,
      phone_number,
      symptoms,
      medical_history,
      date,
      time_slot,
    } = req.body;
    let patient = await PatientSchema.findOne({
      phone_number,
    })
      .select(["_id"])
      .lean();
    if (patient === null) {
      patient = await PatientSchema.create({
        name,
        age,
        phone_number,
      });
    }
    const appointment = await AppointmentSchema.create({
      hospital_id,
      doctor_id,
      patient_id: patient._id,
      symptoms,
      medical_history,
      date,
      time_slot,
    });
    res.status(200).send(appointment._id);
  } catch (err) {
    console.error(err);
    res.status(400).send(err.message);
  }
};

const UpdateDetails = async (req, res) => {
  try {
    const { appointment_id } = req.params;
    const data = req.body;
    const appointment = await AppointmentSchema.findById(appointment_id);
    if (!appointment) {
      return res.status(400).send("Patient not found");
    }
    for (const [key, value] of Object.entries(data)) {
      if (appointment[key] && typeof appointment[key] !== "object") {
        appointment[key] = value;
      } else if (appointment[key] && typeof appointment[key] === "object") {
        for (const [subKey, subValue] of Object.entries(value)) {
          if (appointment[key][subKey]) appointment[key][subKey] = subValue;
        }
      }
    }
    await appointment.save();
    res.status(200).send("Appointment details updated successfully");
  } catch (err) {
    console.error(err);
    res.status(400).send(err.message);
  }
};

const DeleteAppointment = async (req, res) => {
  try {
    const { appointment_id } = req.params;
    await AppointmentSchema.findByIdAndDelete(appointment_id);
    res.status(200).send("Appointment successfully deleted");
  } catch (err) {
    console.error(err);
    res.status(400).send(err.message);
  }
};

const AppointmentInfo = async (req, res) => {
  try {
    const { appointment_id } = req.params;
    const patient = await AppointmentSchema.findById(appointment_id).lean();
    res.status(200).json(patient);
  } catch (err) {
    console.error(err);
    res.status(400).send(err.message);
  }
};

const TodayHospitalAppointment = async (req, res) => {
  try {
    const { hospital_id } = req.params;
    const response = await AppointmentSchema.aggregate([
      {
        $match: {
          hospital_id,
          date: new Date().toISOString().split("T")[0],
        },
      },
      {
        $lookup: {
          from: "patients",
          localField: "patient_id",
          foreignField: "_id",
          as: "patient",
        },
      },
    ]);
    res.status(200).json(response);
  } catch (err) {
    console.error(err);
    res.status(400).send(err.message);
  }
};

const HospitalAppointment = async (req, res) => {
  try {
    const { hospital_id } = req.params;
    const response = await AppointmentSchema.aggregate([
      {
        $match: {
          hospital_id,
        },
      },
      {
        $lookup: {
          from: "patients",
          localField: "patient_id",
          foreignField: "_id",
          as: "patient",
        },
      },
    ]);
    res.status(200).json(response);
  } catch (err) {
    console.error(err);
    res.status(400).send(err.message);
  }
};

const TodayDoctorAppointment = async (req, res) => {
  try {
    const { doctor_id } = req.params;
    const response = await AppointmentSchema.aggregate([
      {
        $match: {
          doctor_id,
          date: new Date().toISOString().split("T")[0],
        },
      },
      {
        $lookup: {
          from: "patients",
          localField: "patient_id",
          foreignField: "_id",
          as: "patient",
        },
      },
    ]);
    res.status(200).json(response);
  } catch (err) {
    console.error(err);
    res.status(400).send(err.message);
  }
};

const AllDoctorAppointment = async (req, res) => {
  try {
    const { doctor_id } = req.params;
    const response = await AppointmentSchema.aggregate([
      {
        $match: {
          doctor_id,
        },
      },
      {
        $lookup: {
          from: "patients",
          localField: "patient_id",
          foreignField: "_id",
          as: "patient",
        },
      },
    ]);
    res.status(200).json(response);
  } catch (err) {
    console.error(err);
    res.status(400).send(err.message);
  }
};

export {
  Register,
  UpdateDetails,
  DeleteAppointment,
  AppointmentInfo,
  TodayHospitalAppointment,
  HospitalAppointment,
  TodayDoctorAppointment,
  AllDoctorAppointment,
};
