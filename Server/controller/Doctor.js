import ShortUniqueId from "short-unique-id";
import { validationResult } from "express-validator";

import DoctorSchema from "../models/DoctorSchema.js";

const { randomUUID } = new ShortUniqueId({ length: 8 });

const Login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array() });
  }

  const { user_name, password } = req.body;
  try {
    const response = await DoctorSchema.findOne({
      user_id: user_name,
      password: password,
    })
      .select(["_id"])
      .lean();
    if (response === null) {
      return res.status(400).json({
        error: "Invalid Credential",
      });
    }

    req.session._id = response._id;
    res.status(200).send(response._id);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err });
  }
};

const Register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array() });
  }

  const { hospital_id } = req.params;
  const {
    doctor_name,
    specialization,
    experience,
    age,
    availability,
    gender,
    fees,
    phone_number,
  } = req.body;
  const username = randomUUID();
  const password = randomUUID();

  try {
    const doctor = await DoctorSchema.create({
      hospital_id,
      name: doctor_name,
      specialization,
      experience,
      age,
      availability,
      gender,
      fees,
      phone_number,
      username,
      password,
    });

    res.status(200).send(doctor._id);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err });
  }
};

const UpdateDetails = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array() });
  }

  const { doctor_id } = req.params;
  const data = req.body;

  try {
    const doctor = await DoctorSchema.findById(doctor_id);
    if (!doctor) {
      return res.status(400).json({ error: "Doctor not found" });
    }
    for (const [key, value] of Object.entries(data)) {
      if (doctor[key] && typeof doctor[key] !== "object") {
        doctor[key] = value;
      } else if (doctor[key] && typeof doctor[key] === "object") {
        for (const [subKey, subValue] of Object.entries(value)) {
          if (doctor[key][subKey]) doctor[key][subKey] = subValue;
        }
      }
    }
    await doctor.save();

    res.status(200).json({ message: "Doctor details updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err });
  }
};

const DeleteDoctor = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array() });
  }

  const { doctor_id } = req.params;

  try {
    await DoctorSchema.findByIdAndDelete(doctor_id);
    res.status(200).json({ message: "Doctor successfully deleted" });
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err });
  }
};

const DoctorInfo = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array() });
  }

  const { doctor_id } = req.params;
  try {
    const doctor = await DoctorSchema.findById(doctor_id).lean();
    res.status(200).json(doctor);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err });
  }
};

const HospitalDoctorsLList = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array() });
  }

  const { hospital_id } = req.params;
  try {
    const doctors = await DoctorSchema.find({
      hospital_id,
    }).lean();
    res.status(200).json(doctors);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err });
  }
};

const AllDoctors = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array() });
  }

  try {
    const doctors = await DoctorSchema.find().lean();
    res.status(200).json(doctors);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err });
  }
};

export {
  Login,
  Register,
  UpdateDetails,
  DeleteDoctor,
  DoctorInfo,
  HospitalDoctorsLList,
  AllDoctors,
};
