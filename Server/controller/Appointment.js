import AppointmentSchema from "../models/AppointmentSchema.js";
import DoctorSchema from "../models/DoctorSchema.js";
import ReportSchema from "../models/ReportSchema.js";
import PatientSchema from "../models/PatientSchema.js";
import mongoose from "mongoose";
import axios from "axios";
const { ObjectId } = mongoose.Types;

const OnlineRegister = async (req, res) => {
  try {
    const { hospital_id, doctor_id, patient_id, date, time_slot, symptoms } =
      req.body;
    const patient = await PatientSchema.findById(patient_id)
      .select("age")
      .lean();
    const reports = await ReportSchema.find({ patient_id })
      .select("disease")
      .lean();
    const disease_list = reports.flatMap((report) => report.disease);
    const { data } = await axios.post(
      "http://192.168.0.108:5000/api/patient/severity_index",
      {
        age: patient.age,
        symptoms,
        past_disease: disease_list,
      }
    );
    const appointment = await AppointmentSchema.create({
      hospital_id,
      doctor_id,
      patient_id,
      type: "online",
      symptoms,
      severity_index: data.severity_index,
      severity_count: data.severity_count,
      date: date,
      time_slot,
    });
    res.status(200).send(appointment._id);
  } catch (err) {
    console.error(err);
    res.status(400).send(err.message);
  }
};

const WalkInRegister = async (req, res) => {
  try {
    const {
      hospital_id,
      doctor_id,
      phone_number,
      name,
      age,
      gender,
      date,
      time_slot,
      symptoms,
    } = req.body;
    let patient = await PatientSchema.findOne({
      phone_number,
    })
      .select("age")
      .lean();
    if (!patient) {
      patient = await PatientSchema.create({
        phone_number,
        name,
        age,
        gender,
      });
    }
    const reports = await ReportSchema.find({ patient_id: patient._id })
      .select("disease")
      .lean();
    const disease_list = reports.flatMap((report) => report.disease);
    const { data } = await axios.post(
      "http://192.168.0.108:5000/api/patient/severity_index",
      {
        age: patient.age,
        symptoms,
        past_disease: disease_list,
      }
    );
    const appointment = await AppointmentSchema.create({
      hospital_id,
      doctor_id,
      patient_id: patient._id,
      type: "walk_in",
      symptoms,
      severity_index: data.severity_index,
      severity_count: data.severity_count,
      date: date,
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

const DoctorAvailableSlots = async (req, res) => {
  try {
    const { doctor_id, type } = req.params;
    const { date } = req.body;
    const appointment_date = new Date(date);
    appointment_date.setHours(0, 0, 0, 0);
    const response = await DoctorSchema.aggregate([
      {
        $match: {
          _id: new ObjectId(doctor_id),
        },
      },
      {
        $lookup: {
          from: "appointments",
          pipeline: [
            {
              $match: {
                doctor_id: new ObjectId(doctor_id),
                type,
                date: {
                  $gte: appointment_date,
                  $lte: new Date(
                    appointment_date.getTime() + 24 * 60 * 60 * 1000
                  ),
                },
              },
            },
          ],
          as: "appointment",
        },
      },
      {
        $project: {
          _id: 0,
          slot_booked: {
            $size: "$appointment",
          },
          "slot_count.online": 1,
          "slot_count.walk_in": 1,
        },
      },
    ]);
    if (response.length === 0) return res.status(400).send("Doctor not found");
    res.status(200).json(response[0]);
  } catch (err) {
    console.error(err);
    res.status(400).send(err.message);
  }
};

const MarkAsDone = async (req, res) => {
  try {
    const { appointment_id } = req.params;
    const appointment = await AppointmentSchema.findById(appointment_id);
    if (!appointment) return res.status(400).send("Appointment not found");
    appointment.treated = !appointment.treated;
    await appointment.save();
    res.status(200).send("Appointment successfully marked");
  } catch (err) {
    console.error(err);
    res.status(400).send(err.message);
  }
};

export {
  OnlineRegister,
  WalkInRegister,
  UpdateDetails,
  DeleteAppointment,
  AppointmentInfo,
  TodayHospitalAppointment,
  HospitalAppointment,
  TodayDoctorAppointment,
  AllDoctorAppointment,
  DoctorAvailableSlots,
  MarkAsDone,
};
