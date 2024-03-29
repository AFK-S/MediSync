import ShortUniqueId from "short-unique-id";
import DoctorSchema from "../models/DoctorSchema.js";
import HospitalSchema from "../models/HospitalSchema.js";
import bucket from "../firebase.js";
import {
  AllocateAppointmentSlot,
  AllocateTodayAppointmentSlot,
} from "./Appointment.js";
import { calculateTotalMinutes } from "../middleware/Function.js";
import axios from "axios";
import { FLASK_URL } from "../config.js";

const { randomUUID } = new ShortUniqueId({ length: 8 });

const Register = async (req, res) => {
  try {
    const { hospital_id } = req.params;
    const {
      rfid_tag,
      doctor_name,
      specialization,
      experience,
      age,
      license_number,
      availability,
      average_time,
      gender,
      fees,
      phone_number,
      start_time,
      end_time,
    } = req.body;
    const file = req.file;
    if (!file) return res.status(400).send("No file uploaded.");
    const blob = bucket.file(file.originalname);
    const blobStream = blob.createWriteStream();
    blobStream.on("error", (err) => {
      return res.status(400).send("Error uploading file.");
    });
    blobStream.on("finish", async () => {
      const downloadUrl = await blob.getSignedUrl({
        action: "read",
        expires: "03-09-2491",
      });
      const username = randomUUID();
      const password = randomUUID();
      const totalMinutes = calculateTotalMinutes(start_time, end_time);
      const totalCount = totalMinutes / parseInt(average_time);
      const online = Math.round(totalCount * 0.5);
      const walk_in = Math.round(totalCount * 0.5);
      const doctor = await DoctorSchema.create({
        hospital_id,
        rfid_tag,
        name: doctor_name,
        mac_address: "AFKS" + randomUUID(),
        photo_url: downloadUrl[0],
        specialization,
        experience,
        age,
        license_number,
        availability: JSON.parse(availability),
        slot_count: {
          online,
          walk_in,
        },
        average_time,
        gender,
        fees,
        phone_number,
        username,
        password,
      });
      return res.status(200).json({
        _id: doctor._id,
        username,
        password,
      });
    });
    blobStream.end(file.buffer);
  } catch (err) {
    console.error(err);
    res.status(400).send(err.message);
  }
};

const UpdateDetails = async (req, res) => {
  try {
    const { doctor_id } = req.params;
    const data = req.body;
    const doctor = await DoctorSchema.findById(doctor_id);
    if (!doctor) {
      return res.status(400).send("Doctor not found");
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
    res.status(200).send("Doctor details updated successfully");
  } catch (err) {
    console.error(err);
    res.status(400).send(err.message);
  }
};

const DeleteDoctor = async (req, res) => {
  try {
    const { doctor_id } = req.params;
    await DoctorSchema.findByIdAndDelete(doctor_id);
    res.status(200).send("Doctor successfully deleted");
  } catch (err) {
    console.error(err);
    res.status(400).send(err.message);
  }
};

const DoctorInfo = async (req, res) => {
  try {
    const { doctor_id } = req.params;
    const doctor = await DoctorSchema.findById(doctor_id).lean();
    res.status(200).json(doctor);
  } catch (err) {
    console.error(err);
    res.status(400).send(err.message);
  }
};
const VerifyDoctor = async (req, res) => {
  try {
    const { mac_address } = req.params;
    const doctor = await DoctorSchema.findOne({
      mac_address: mac_address,
    }).lean();
    res.status(200).send(doctor ? true : false);
  } catch (err) {
    console.error(err);
    res.status(400).send(err.message);
  }
};

const HospitalDoctorsList = async (req, res) => {
  try {
    const { hospital_id } = req.params;
    const doctors = await DoctorSchema.find({
      hospital_id: hospital_id,
    }).lean();
    res.status(200).json(doctors);
  } catch (err) {
    console.error(err);
    res.status(400).send(err.message);
  }
};

const AllHospitalDoctorsList = async (req, res) => {
  try {
    const response = await DoctorSchema.aggregate([
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
    ]);
    res.status(200).json(response);
  } catch (err) {
    console.error(err);
    res.status(400).send(err.message);
  }
};

const AllDoctors = async (req, res) => {
  try {
    const doctors = await DoctorSchema.aggregate([
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
    ]);
    res.status(200).json(doctors);
  } catch (err) {
    console.error(err);
    res.status(400).send(err.message);
  }
};

const HospitalSpecialization = async (req, res) => {
  const { hospital_id } = req.params;
  try {
    const specialization = await DoctorSchema.find({
      hospital_id,
    })
      .distinct("specialization")
      .lean();
    res.status(200).json(specialization);
  } catch (err) {
    console.error(err);
    res.status(400).send(err.message);
  }
};

const HospitalSpecializedDoctors = async (req, res) => {
  const { hospital_id, specialization } = req.params;
  try {
    const doctors = await DoctorSchema.find({
      hospital_id,
      specialization,
    }).lean();
    for (let doctor of doctors) {
      const today = new Date();
      const sorted_availability = doctor.availability.sort(
        (dateA, dateB) => Number(dateA.date) - Number(dateB.date)
      );
      doctor.availability = sorted_availability;
      const filter_availability = doctor.availability.filter((item) => {
        const itemDate = new Date(item.date);
        return itemDate >= today;
      });
      doctor.availability = filter_availability;
    }
    res.status(200).json(doctors);
  } catch (err) {
    console.error(err);
    res.status(400).send(err.message);
  }
};

const SpecializedHospitals = async (req, res) => {
  try {
    const { specialization } = req.params;
    const hospital_ids = await DoctorSchema.find({
      specialization,
    }).distinct("hospital_id");
    const hospitals = await HospitalSchema.find({
      _id: {
        $in: hospital_ids,
      },
    }).lean();
    res.status(200).json(hospitals);
  } catch (err) {
    console.error(err);
    res.status(400).send(err.message);
  }
};

const AllocateDoctorSlot = async () => {
  const hospitals = await HospitalSchema.find().lean();
  for (let hospital of hospitals) {
    const doctors = await DoctorSchema.find({
      hospital_id: hospital._id,
    }).lean();
    for (let doctor of doctors) {
      await AllocateAppointmentSlot(doctor._id);
    }
  }
};

const AllocateTodayDoctorSlot = async () => {
  const hospitals = await HospitalSchema.find().lean();
  for (let hospital of hospitals) {
    const doctors = await DoctorSchema.find({
      hospital_id: hospital._id,
    }).lean();
    for (let doctor of doctors) {
      await AllocateTodayAppointmentSlot(doctor._id);
    }
  }
};

const SuggestDoctor = async (req, res) => {
  try {
    const { symptoms } = req.body;
    const { data } = await axios.post(
      `${FLASK_URL}/api/max_no_of_specialization`,
      {
        symptoms,
      }
    );
    const specialization = data;
    const doctors = await DoctorSchema.aggregate([
      {
        $match: {
          specialization,
        },
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
      {
        $lookup: {
          from: "appointments",
          localField: "_id",
          foreignField: "doctor_id",
          as: "appointments",
        },
      },
    ])
      .project({
        _id: 1,
        name: 1,
        specialization: 1,
        hospital_id: 1,
        "hospital.name": 1,
        rating: {
          $avg: "$appointments.rating",
        },
      })
      .sort({
        rating: -1,
      })
      .limit(5);
    res.status(200).json(doctors);
  } catch (err) {
    console.error(err);
    res.status(400).send(err.message);
  }
};

export {
  Register,
  UpdateDetails,
  DeleteDoctor,
  DoctorInfo,
  VerifyDoctor,
  HospitalDoctorsList,
  AllHospitalDoctorsList,
  AllDoctors,
  HospitalSpecialization,
  HospitalSpecializedDoctors,
  SpecializedHospitals,
  AllocateDoctorSlot,
  AllocateTodayDoctorSlot,
  SuggestDoctor,
};
