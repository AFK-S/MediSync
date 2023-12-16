import DoctorSchema from "../models/DoctorSchema.js";
import AppointmentSchema from "../models/AppointmentSchema.js";
import AttendanceSchema from "../models/AttendanceSchema.js";
import LogSchema from "../models/LogSchema.js";
import PatientSchema from "../models/PatientSchema.js";
import mongoose from "mongoose";
const { ObjectId } = mongoose.Types;

const Doctor = async (req, res) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  try {
    const { doctor_id } = req.params;
    const doctor = await DoctorSchema.findById(doctor_id).lean();
    if (!doctor) return res.status(404).send("Doctor not found");
    const sorted_availability = doctor.availability.sort(
      (dateA, dateB) => Number(dateA.date) - Number(dateB.date)
    );
    const filter_availability = sorted_availability.filter((item) => {
      const itemDate = new Date(item.date);
      return itemDate >= today;
    });
    doctor.availability = filter_availability;
    const attendance = await AttendanceSchema.find({
      doctor_id: doctor_id,
    })
      .sort({ date: -1 })
      .lean();
    doctor.attendance = attendance;
    const log = await LogSchema.find({
      doctor_id: doctor_id,
      createdAt: {
        $gte: today,
        $lte: new Date(today.getTime() + 24 * 60 * 60 * 1000),
      },
    })
      .sort({ date: -1 })
      .lean();
    doctor.log = log;
    const today_appointment = await AppointmentSchema.aggregate([
      {
        $match: {
          doctor_id: new ObjectId(doctor_id),
          date: {
            $gte: today,
            $lte: new Date(today.getTime() + 24 * 60 * 60 * 1000),
          },
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
    ]);
    doctor.today_appointment = today_appointment;
    doctor.next_date =
      doctor.availability[0].date.toISOString().split("T")[0] ===
      new Date().toISOString().split("T")[0]
        ? doctor.availability[1].date
        : doctor.availability[0].date;
    const next_date = new Date(doctor.next_date);
    next_date.setHours(0, 0, 0, 0);
    const next_date_appointment = await AppointmentSchema.aggregate([
      {
        $match: {
          doctor_id: new ObjectId(doctor_id),
          date: {
            $gte: next_date,
            $lte: new Date(next_date.getTime() + 24 * 60 * 60 * 1000),
          },
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
    ]);
    doctor.next_date_appointment = next_date_appointment;
    const treated_patient_ids = await AppointmentSchema.find({
      doctor_id: doctor_id,
      treated: true,
    })
      .distinct("patient_id")
      .lean();
    const treated_patient = await PatientSchema.find({
      _id: {
        $in: treated_patient_ids,
      },
    }).lean();
    doctor.treated_patient = treated_patient;
    doctor.today_appointment_count = today_appointment.length;
    doctor.next_date_appointment_count = next_date_appointment.length;
    doctor.treated_patient_count = treated_patient.length;
    res.status(200).json(doctor);
  } catch (err) {
    console.error(err);
    res.status(400).send(err.message);
  }
};

const Patient = async (req, res) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  try {
    const { patient_id } = req.params;
    const patient = await PatientSchema.findById(patient_id).lean();
    if (!patient) return res.status(404).send("Patient not found");
    const upcoming_appointment = await AppointmentSchema.aggregate([
      {
        $match: {
          patient_id: new ObjectId(patient_id),
          date: {
            $gte: today,
          },
        },
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
      {
        $lookup: {
          from: "hospitals",
          localField: "hospital_id",
          foreignField: "_id",
          as: "hospital",
        },
      },
      {
        $unwind: "$hospital",
      },
    ]).project({
      "doctor.availability": 0,
    });
    patient.upcoming_appointment = upcoming_appointment;
    const past_visit = await AppointmentSchema.aggregate([
      {
        $match: {
          patient_id: new ObjectId(patient_id),
          treated: true,
        },
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
      {
        $lookup: {
          from: "hospitals",
          localField: "hospital_id",
          foreignField: "_id",
          as: "hospital",
        },
      },
      {
        $unwind: "$hospital",
      },
    ]).project({
      "doctor.availability": 0,
    });
    patient.past_visit = past_visit;
    patient.upcoming_appointment_count = upcoming_appointment.length;
    patient.past_visit_count = past_visit.length;
    res.status(200).json(patient);
  } catch (err) {
    console.error(err);
    res.status(400).send(err.message);
  }
};

export { Doctor, Patient };
