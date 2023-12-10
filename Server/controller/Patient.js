import PatientSchema from "../models/PatientSchema.js";
import AppointmentSchema from "../models/AppointmentSchema.js";

const UpdateDetails = async (req, res) => {
  try {
    const { patient_id } = req.params;
    const data = req.body;
    const patient = await PatientSchema.findById(patient_id);
    if (!patient) {
      return res.status(400).send("Patient not found");
    }
    for (const [key, value] of Object.entries(data)) {
      if (patient[key] && typeof patient[key] !== "object") {
        patient[key] = value;
      } else if (patient[key] && typeof patient[key] === "object") {
        for (const [subKey, subValue] of Object.entries(value)) {
          if (patient[key][subKey]) patient[key][subKey] = subValue;
        }
      }
    }
    await patient.save();
    res.status(200).send("Patient details updated successfully");
  } catch (err) {
    console.error(err);
    res.status(400).send(err.message);
  }
};

const DeletePatient = async (req, res) => {
  try {
    const { patient_id } = req.params;
    await PatientSchema.findByIdAndDelete(patient_id);
    res.status(200).send("Patient successfully deleted");
  } catch (err) {
    console.error(err);
    res.status(400).send(err.message);
  }
};

const PatientInfo = async (req, res) => {
  try {
    const { patient_id } = req.params;
    const patient = await PatientSchema.findById(patient_id).lean();
    res.status(200).json(patient);
  } catch (err) {
    console.error(err);
    res.status(400).send(err.message);
  }
};

const HospitalPatient = async (req, res) => {
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

const TodayDoctorPatient = async (req, res) => {
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

const AllDoctorPatient = async (req, res) => {
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

const AllPatients = async (req, res) => {
  try {
    const patients = await PatientSchema.find().lean();
    res.status(200).json(patients);
  } catch (err) {
    console.error(err);
    res.status(400).send(err.message);
  }
};

export {
  UpdateDetails,
  DeletePatient,
  PatientInfo,
  HospitalPatient,
  TodayDoctorPatient,
  AllDoctorPatient,
  AllPatients,
};
