import DispensarySchema from "../models/DispensarySchema.js";
import AppointmentSchema from "../models/AppointmentSchema.js";
import mongoose from "mongoose";
const { ObjectId } = mongoose.Types;

const Register = async (req, res, next) => {
  try {
    const { dispensary_name, doctor_name } = req.body;
    const dispensary = await DispensarySchema.create({
      name: dispensary_name,
      doctor_name,
    });
    res.status(200).send(dispensary._id);
  } catch (err) {
    console.error(err);
    res.status(400).send(err.message);
  }
};

const UpdateDetails = async (req, res) => {
  try {
    const { dispensary_id } = req.params;
    const data = req.body;
    const dispensary = await DispensarySchema.findById(dispensary_id);
    if (!dispensary) {
      return res.status(400).send("Dispensary not found");
    }
    for (const [key, value] of Object.entries(data)) {
      if (hospital[key]) hospital[key] = value;
    }
    await dispensary.save();
    res.status(200).send("Dispensary details updated successfully");
  } catch (err) {
    console.error(err);
    res.status(400).send(err.message);
  }
};

const DeleteDispensary = async (req, res) => {
  try {
    const { dispensary_id } = req.params;
    await DispensarySchema.findByIdAndDelete(dispensary_id);
    res.status(200).send("Dispensary successfully deleted");
  } catch (err) {
    console.error(err);
    res.status(400).send(err.message);
  }
};

const DispensaryInfo = async (req, res) => {
  try {
    const { dispensary_id } = req.params;
    const dispensary = await DispensarySchema.findById(dispensary_id).lean();
    res.status(200).json(dispensary);
  } catch (err) {
    console.error(err);
    res.status(400).send(err.message);
  }
};

const RedirectToDispensary = async (req, res) => {
  try {
    const { appointment_id, dispensary_id } = req.params;
    await AppointmentSchema.findByIdAndUpdate(appointment_id, {
      isRerouting: true,
      dispensary_id,
    });
    res.status(200).send("Patient Rerouted Successfully");
  } catch (err) {
    console.error(err);
    res.status(400).send(err.message);
  }
};

const Patient = async (req, res) => {
  try {
    const { dispensary_id } = req.params;
    const appointment = await AppointmentSchema.aggregate([
      {
        $match: {
          dispensary_id: {
            $exists: true,
          },
          dispensary_id: new ObjectId(dispensary_id),
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
    ]).sort({ updatedAt: -1 });
    res.status(200).json(appointment);
  } catch (err) {
    console.error(err);
    res.status(400).send(err.message);
  }
};

export {
  Register,
  UpdateDetails,
  DeleteDispensary,
  DispensaryInfo,
  RedirectToDispensary,
  Patient,
};
