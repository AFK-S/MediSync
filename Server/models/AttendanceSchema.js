import mongoose from "mongoose";
const { Schema, connection } = mongoose;

const AttendanceSchema = new Schema(
  {
    doctor_id: {
      type: Schema.Types.ObjectId,
      required: [true, "Please provide a Doctor ID"],
    },
    isPresent: {
      type: Boolean,
      default: true,
      required: [true, "Please provide a Present"],
    },
  },
  { timestamps: true }
);

export default connection
  .useDb("MediSync")
  .model("Attendance", AttendanceSchema);
