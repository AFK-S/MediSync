import mongoose from "mongoose";
const { Schema, connection } = mongoose;

const AttendanceSchema = new Schema(
  {
    doctor_id: {
      type: Schema.Types.ObjectId,
      required: [true, "Please provide a Doctor ID"],
    },
    isAvailable: {
      type: Boolean,
      default: true,
      required: [true, "Please provide a Absent"],
    },
    isPresent: {
      type: Boolean,
      default: true,
      required: [true, "Please provide a Present"],
    },
    date: {
      type: Date,
      required: [true, "Please provide a Date"],
    },
    checkIn: {
      type: Date,
    },
    checkOut: {
      type: Date,
    },
  },
  { timestamps: true }
);

export default connection
  .useDb("MediSync")
  .model("Attendance", AttendanceSchema);
