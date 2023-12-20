import AppointmentSchema from "../models/AppointmentSchema.js";
import DoctorSchema from "../models/DoctorSchema.js";
import ReportSchema from "../models/ReportSchema.js";
import PatientSchema from "../models/PatientSchema.js";
import { addMinutes, minusMinutes } from "../middleware/Function.js";
import mongoose from "mongoose";
import axios from "axios";
import { FLASK_URL } from "../config.js";
const { ObjectId } = mongoose.Types;

const OnlineRegister = async (req, res) => {
  try {
    const {
      hospital_id,
      doctor_id,
      patient_id,
      date,
      time_slot,
      symptoms,
      coordinates,
      auto_booked,
    } = req.body;
    const patient = await PatientSchema.findById(patient_id).lean();
    const reports = await ReportSchema.find({ patient_id })
      .select("disease")
      .lean();
    const disease_list = reports.flatMap((report) => report.disease);
    const { data } = await axios.post(
      `${FLASK_URL}/api/patient/severity_index`,
      {
        age: patient.age,
        symptoms,
        past_disease: disease_list,
        lifestyle: patient.lifestyle,
        habits: patient.habits,
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
      coordinates,
      auto_booked,
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
      habits,
      lifestyle,
      coordinates,
      date,
      time_slot,
      symptoms,
    } = req.body;
    let patient = await PatientSchema.findOne({
      phone_number,
    }).lean();
    if (!patient) {
      patient = await PatientSchema.create({
        phone_number,
        name,
        age,
        gender,
        habits,
        lifestyle,
      });
    }
    const reports = await ReportSchema.find({ patient_id: patient._id })
      .select("disease")
      .lean();
    const disease_list = reports.flatMap((report) => report.disease);
    const { data } = await axios.post(
      `${FLASK_URL}/api/patient/severity_index`,
      {
        age: patient.age,
        symptoms,
        past_disease: disease_list,
        lifestyle: patient.lifestyle,
        habits: patient.habits,
      }
    );
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const today_online_appointment = await AppointmentSchema.aggregate([
      {
        $match: {
          doctor_id: new ObjectId(doctor_id),
          date: {
            $gte: today,
            $lte: new Date(today.getTime() + 24 * 60 * 60 * 1000),
          },
          type: "online",
        },
      },
    ]).sort({ severity_index: -1, severity_count: -1 });
    const today_walk_in_appointment = await AppointmentSchema.aggregate([
      {
        $match: {
          doctor_id: new ObjectId(doctor_id),
          date: {
            $gte: today,
            $lte: new Date(today.getTime() + 24 * 60 * 60 * 1000),
          },
          type: "walk_in",
        },
      },
    ]).sort({ date: 1 });
    const today_appointment = [
      ...today_online_appointment,
      ...today_walk_in_appointment,
    ];
    const last_appointment_allocated_time = today_appointment[-1]
      ? today_appointment[-1].alloted_time
      : "00:00";
    const doctor = await DoctorSchema.findById(doctor_id).lean();
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
      coordinates,
      alloted_time: addMinutes(
        last_appointment_allocated_time,
        doctor.average_time
      ),
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
      return res.status(400).send("Appointment not found");
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
          slot_count: `$slot_count.${type}`,
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
    const { diagnosis_result } = req.body;
    const appointment = await AppointmentSchema.findById(appointment_id);
    if (!appointment) return res.status(400).send("Appointment not found");
    appointment.treated = !appointment.treated;
    if (diagnosis_result) appointment.diagnosis_result = diagnosis_result;
    await appointment.save();
    res.status(200).send("Patient treated successfully marked");
  } catch (err) {
    console.error(err);
    res.status(400).send(err.message);
  }
};

const UpdateRating = async (req, res) => {
  try {
    const { appointment_id } = req.params;
    const { rating } = req.body;
    await AppointmentSchema.findByIdAndUpdate(appointment_id, {
      rating,
    });
    res.status(200).send("Appointment details updated successfully");
  } catch (err) {
    console.error(err);
    res.status(400).send(err.message);
  }
};

const AllocateAppointmentSlot = async (doctor_id) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const dayAfterTomorrow = new Date(today);
  dayAfterTomorrow.setDate(dayAfterTomorrow.getDate() + 2);
  const doctor = await DoctorSchema.findById(doctor_id);
  let tomorrow_slot = doctor.availability.filter((item) => {
    const itemDate = new Date(item.date);
    return (
      itemDate.getTime() >= tomorrow.getTime() &&
      itemDate.getTime() < dayAfterTomorrow.getTime()
    );
  });
  tomorrow_slot = tomorrow_slot[0] ? tomorrow_slot[0] : null;
  if (tomorrow_slot == null) return;
  const tomorrow_date = new Date(tomorrow_slot.date);
  tomorrow_date.setHours(0, 0, 0, 0);
  const tomorrow_appointment = await AppointmentSchema.find({
    doctor_id: new ObjectId(doctor_id),
    date: {
      $gte: tomorrow_date,
      $lte: new Date(tomorrow_date.getTime() + 24 * 60 * 60 * 1000),
    },
    treated: false,
  }).sort({
    severity_index: -1,
    severity_count: -1,
  });
  let tomorrow_time = minusMinutes(
    tomorrow_slot.start_time,
    doctor.average_time
  );
  for (const object of tomorrow_appointment) {
    object.alloted_time = addMinutes(tomorrow_time, doctor.average_time);
    tomorrow_time = object.alloted_time;
  }
  await Promise.all(tomorrow_appointment.map((item) => item.save()));
};

const AllocateTodayAppointmentSlot = async (doctor_id) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const doctor = await DoctorSchema.findById(doctor_id);
  let today_slot = doctor.availability.filter((item) => {
    const itemDate = new Date(item.date);
    return (
      itemDate.getTime() >= today.getTime() &&
      itemDate.getTime() < tomorrow.getTime()
    );
  });
  today_slot = today_slot[0] ? today_slot[0] : null;
  if (today_slot == null) return;
  const today_date = new Date(today_slot.date);
  today_date.setHours(0, 0, 0, 0);
  const tomorrow_appointment = await AppointmentSchema.find({
    doctor_id: new ObjectId(doctor_id),
    date: {
      $gte: today_date,
      $lte: new Date(today_date.getTime() + 24 * 60 * 60 * 1000),
    },
    treated: false,
  }).sort({
    severity_index: -1,
    severity_count: -1,
  });
  let today_time = minusMinutes(today_slot.start_time, doctor.average_time);
  for (const object of tomorrow_appointment) {
    object.alloted_time = addMinutes(today_time, doctor.average_time);
    today_time = object.alloted_time;
  }
  await Promise.all(tomorrow_appointment.map((item) => item.save()));
};

const TodayWalkInAppointment = async (req, res) => {
  try {
    const { hospital_id } = req.params;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const today_walk_in_appointment = await AppointmentSchema.aggregate([
      {
        $match: {
          hospital_id: new ObjectId(hospital_id),
          date: {
            $gte: today,
            $lte: new Date(today.getTime() + 24 * 60 * 60 * 1000),
          },
          type: "walk_in",
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
      {
        $unwind: "$patient",
      },
      {
        $lookup: {
          from: "doctors",
          localField: "doctor_id",
          foreignField: "_id",
          as: "doctor",
        },
      },
      {
        $unwind: "$doctor",
      },
    ]);
    res.status(200).send(today_walk_in_appointment);
  } catch (err) {
    console.error(err);
    res.status(400).send(err.message);
  }
};

const DiseaseAppointment = async (req, res) => {
  try {
    const { disease } = req.params;
    const appointment = await AppointmentSchema.aggregate([
      {
        $match: {
          diagnosis_result: disease,
          coordinates: {
            $exists: true,
          },
        },
      },
    ]);
    res.status(200).send(appointment);
  } catch (err) {
    console.error(err);
    res.status(400).send(err.message);
  }
};

const AutoBookedAppointmentSlot = async (patient_id) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const appointments = await AppointmentSchema.find({
    patient_id: patient_id,
  });
  for (const appointment of appointments) {
    if (appointment.auto_booked) {
      if (appointment.date.getMonth() != today.getMonth()) continue;
      console.log(appointment);
      const nextMonth = new Date(appointment.date);
      nextMonth.setMonth(nextMonth.getMonth() + 1);
      const checkAppointment = await AppointmentSchema.findOne({
        patient_id: patient_id,
        doctor_id: appointment.doctor_id,
        hospital_id: appointment.hospital_id,
        date: nextMonth,
        time_slot: appointment.time_slot,
        type: appointment.type,
      });
      if (checkAppointment) continue;
      await AppointmentSchema.create({
        patient_id: patient_id,
        doctor_id: appointment.doctor_id,
        hospital_id: appointment.hospital_id,
        date: nextMonth,
        time_slot: appointment.time_slot,
        symptoms: appointment.symptoms,
        coordinates: appointment.coordinates,
        type: appointment.type,
        auto_booked: true,
      });
      appointment.auto_booked = false;
    }
  }
  await Promise.all(appointments.map((item) => item.save()));
};

const AutoBookedPatientSlot = async () => {
  const patients = await PatientSchema.find().lean();
  for (const patient of patients) {
    await AutoBookedAppointmentSlot(patient._id);
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
  UpdateRating,
  AllocateAppointmentSlot,
  AllocateTodayAppointmentSlot,
  TodayWalkInAppointment,
  DiseaseAppointment,
  AutoBookedPatientSlot,
};
