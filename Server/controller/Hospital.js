import ShortUniqueId from "short-unique-id";
import { validationResult } from "express-validator";

import HospitalSchema from "../models/HospitalSchema.js";

const id_generate = new ShortUniqueId({
  length: 8,
});

const Register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array() });
  }

  const {
    hospital_name,
    coordinates: { latitude, longitude },
    address: { street, city, state, zipCode, country },
    contact: { phone_number, email_address },
  } = req.body;
  const username = id_generate();
  const password = id_generate();

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
      email_address,
      username,
      password,
    };
    res.status(200).send(hospital._id);
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
  const { field, value } = req.query;

  try {
    const hospital = await HospitalSchema.findById(hospital_id);
    if (!hospital) {
      return res.status(400).json({ error: "Hospital not found" });
    }
    if (!hospital[field]) {
      return res.status(400).json({ error: "Invalid field specified" });
    }

    hospital[field] = value;
    await hospital.save();

    res.status(200).json({ message: "Hospital field updated successfully" });
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

export { Register, UpdateDetails, HospitalInfo, AllHospitals };
