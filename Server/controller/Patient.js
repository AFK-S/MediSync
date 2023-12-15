import PatientSchema from "../models/PatientSchema.js";
import AppointmentSchema from "../models/AppointmentSchema.js";
import DoctorSchema from "../models/DoctorSchema.js";

const AllSpecialization = async (req, res) => {
  const { hospital_id } = req.params;
  try {
    const specialization = await DoctorSchema.find({
      hospital_id,
    }).distinct("specialization");
    res.status(200).json(specialization);
  } catch (err) {
    console.error(err);
    res.status(400).send(err.message);
  }
};

const AllSpecializedDoctors = async (req, res) => {
  const { hospital_id, specialization } = req.params;
  try {
    const doctors = await DoctorSchema.find({
      hospital_id,
      specialization,
    }).lean();
    res.status(200).json(doctors);
  } catch (err) {
    console.error(err);
    res.status(400).send(err.message);
  }
};

const VerifyPatient = async (req, res) => {
  try {
    const { phone_number } = req.params;
    const response = await PatientSchema.findOne({
      phone_number,
    })
      .select(["_id"])
      .lean();
    if (!response) return res.status(201).send(false);
    res
      .cookie("_id", response._id, {
        maxAge: 1000 * 60 * 60 * 24 * 7,
      })
      .status(200)
      .send(response._id);
  } catch (err) {
    console.error(err);
    res.status(400).send(err.message);
  }
};

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
    const patient_ids = await AppointmentSchema.find({
      hospital_id,
    }).distinct("patient_id");
    const response = await PatientSchema.find({
      _id: {
        $in: patient_ids,
      },
    }).lean();
    res.status(200).json(response);
  } catch (err) {
    console.error(err);
    res.status(400).send(err.message);
  }
};

const DoctorsPatient = async (req, res) => {
  try {
    const { doctor_id } = req.params;
    const patient_ids = await AppointmentSchema.find({
      doctor_id,
    }).distinct("patient_id");
    const response = await PatientSchema.find({
      _id: {
        $in: patient_ids,
      },
    }).lean();
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
  VerifyPatient,
  UpdateDetails,
  DeletePatient,
  PatientInfo,
  HospitalPatient,
  DoctorsPatient,
  AllPatients,
  AllSpecialization,
  AllSpecializedDoctors,
};
