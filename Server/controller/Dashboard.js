import DoctorSchema from "../models/DoctorSchema.js";
import mongoose from "mongoose";
const { ObjectId } = mongoose.Types;

const Doctor = async (req, res) => {
  try {
    const { doctor_id } = req.params;
    const response = await DoctorSchema.aggregate([
      {
        $match: {
          _id: new ObjectId(doctor_id),
        },
      },
      {
        $lookup: {
          from: "attendances",
          localField: "_id",
          foreignField: "doctor_id",
          as: "attendance",
        },
      },
      {
        $lookup: {
          from: "logs",
          localField: "_id",
          foreignField: "doctor_id",
          as: "log",
        },
      },
    ]);
    if (response.length == 0) return res.status(404).send("Doctor not found");
    res.status(200).json(response[0]);
  } catch (err) {
    console.error(err);
    res.status(400).send(err.message);
  }
};

export { Doctor };
