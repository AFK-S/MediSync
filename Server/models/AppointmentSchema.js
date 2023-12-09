import mongoose from "mongoose";
const { Schema, connection } = mongoose;

const AppointmentSchema = new Schema(
  {
    doctor_id: {
      type: Schema.Types.ObjectId,
      required: [true, "Please provide a Doctor ID"],
    },
    patient_id: {
      type: Schema.Types.ObjectId,
      required: [true, "Please provide a Patient ID"],
    },
    date: {
      type: Date,
      required: [true, "Please provide a Date"],
    },
    time_slot: {
      type: String,
      required: [true, "Please provide a Time Slot"],
    },
  },
  { timestamps: true }
);

export default connection
  .useDb("MediSync")
  .model("Appointment", AppointmentSchema);
