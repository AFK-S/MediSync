import mongoose from "mongoose";
const { Schema, connection } = mongoose;

const AppointmentSchema = new Schema(
  {
    hospital_id: {
      type: Schema.Types.ObjectId,
      required: [true, "Please provide a Hospital ID"],
    },
    doctor_id: {
      type: Schema.Types.ObjectId,
      required: [true, "Please provide a Doctor ID"],
    },
    patient_id: {
      type: Schema.Types.ObjectId,
      required: [true, "Please provide a Patient ID"],
    },
    symptoms: {
      type: Array,
    },
    medical_history: {
      type: Array,
    },
    date: {
      type: Date,
      required: [true, "Please provide a Date"],
    },
    time_slot: {
      type: String,
      required: [true, "Please provide a Time Slot"],
    },
    e_prescription: {
      type: String,
      trim: true,
      match: [
        /^https?:\/\/.*\.(?:png|jpg|jpeg)$/i,
        (props) => `${props.value} is not a valid report`,
      ],
    },
    report: {
      type: String,
      trim: true,
      match: [
        /^https?:\/\/.*\.(?:png|jpg|jpeg)$/i,
        (props) => `${props.value} is not a valid report`,
      ],
    },
    shift: {
      type: Number,
      default: 0,
      required: [true, "Please provide a Shift"],
    },
  },
  { timestamps: true }
);

export default connection
  .useDb("MediSync")
  .model("Appointment", AppointmentSchema);
