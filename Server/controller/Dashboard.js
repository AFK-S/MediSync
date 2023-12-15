import DoctorSchema from "../models/DoctorSchema.js";
import mongoose from "mongoose";
const { ObjectId } = mongoose.Types;

const Doctor = async (req, res) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
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
      {
        $lookup: {
          from: "appointments",
          pipeline: [
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
          ],
          as: "today_appointment",
        },
      },
      {
        $lookup: {
          from: "appointments",
          pipeline: [
            {
              $match: {
                doctor_id: new ObjectId(doctor_id),
                treated: true,
              },
            },
          ],
          as: "all_appointment",
        },
      },
      {
        $lookup: {
          from: "appointments",
          pipeline: [
            {
              $match: {
                doctor_id: new ObjectId(doctor_id),
                treated: false,
                date: {
                  $gte: tomorrow,
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
          ],
          as: "upcoming_appointment",
        },
      },
      {
        $lookup: {
          from: "patients",
          localField: "all_appointment.patient_id",
          foreignField: "_id",
          as: "treated_patient",
        },
      },
      {
        $addFields: {
          treated_patient_count: {
            $size: "$treated_patient",
          },
          today_appointment_count: {
            $size: "$today_appointment",
          },
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
