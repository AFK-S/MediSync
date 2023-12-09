import ShortUniqueId from "short-unique-id";
import { validationResult } from "express-validator";

import HospitalSchema from "../models/HospitalSchema.js";

const { randomUUID } = new ShortUniqueId({ length: 8 });

const Register = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array() });
  }

  const {
    hospital_name,
    coordinates: { latitude, longitude },
    address: { street, city, state, zipCode, country },
    contact_details: { phone_number, email_address },
  } = req.body;
  const username = randomUUID();
  const password = randomUUID();

  try {
    const hospital = await HospitalSchema.create({
      name: hospital_name,
      coordinates: {
        latitude,
        longitude,
      },
      address: {
        street,
        city,
        state,
        zipCode,
        country,
      },
      contact_details: {
        phone_number,
        email_address,
      },
      username,
      password,
    });

    req.data = {
      name: hospital_name,
      email_address,
      username,
      password,
    };
    res.status(200).send(hospital._id);
    next();
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

  const { hospital_id } = req.params;
  const data = req.body;

  try {
    const hospital = await HospitalSchema.findById(hospital_id);
    if (!hospital) {
      return res.status(400).json({ error: "Hospital not found" });
    }
    for (const [key, value] of Object.entries(data)) {
      if (hospital[key] && typeof hospital[key] !== "object") {
        hospital[key] = value;
      } else if (hospital[key] && typeof hospital[key] === "object") {
        for (const [subKey, subValue] of Object.entries(value)) {
          if (hospital[key][subKey]) hospital[key][subKey] = subValue;
        }
      }
    }
    await hospital.save();

    res.status(200).json({ message: "Hospital details updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err });
  }
};

const DeleteHospital = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array() });
  }

  const { hospital_id } = req.params;

  try {
    await HospitalSchema.findByIdAndDelete(hospital_id);
    res.status(200).json({ message: "Hospital successfully deleted" });
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err });
  }
};

const HospitalInfo = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array() });
  }

  const { hospital_id } = req.params;
  try {
    const hospital = await HospitalSchema.findById(hospital_id).lean();
    res.status(200).json(hospital);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err });
  }
};

const AllHospitals = async (req, res) => {
  try {
    const hospitals = await HospitalSchema.find().lean();
    res.status(200).json(hospitals);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err });
  }
};

export { Register, UpdateDetails, DeleteHospital, HospitalInfo, AllHospitals };
