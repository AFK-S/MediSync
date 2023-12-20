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
    type: {
      type: String,
      trim: true,
      enum: ["online", "walk_in"],
      required: [true, "Please provide the Appointment Type"],
    },
    severity_index: {
      type: Number,
      default: 0,
      required: [true, "Please provide a Severity Index"],
    },
    severity_count: {
      type: Number,
      default: 0,
      required: [true, "Please provide a Severity Count"],
    },
    treated: {
      type: Boolean,
      default: false,
      required: [true, "Please provide a Treated"],
    },
    symptoms: {
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
    alloted_time: {
      type: String,
    },
    e_prescription: {
      type: String,
      trim: true,
    },
    shift: {
      type: Number,
      default: 0,
      required: [true, "Please provide a Shift"],
    },
    rating: {
      type: Number,
      default: 0,
      enum: [-1, 0, 1],
      required: [true, "Please provide a Rating"],
    },
    diagnosis_result: {
      type: String,
      trim: true,
    },
    coordinates: {
      latitude: {
        type: Number,
      },
      longitude: {
        type: Number,
      },
    },
    isRerouting: {
      type: Boolean,
      default: false,
    },
    dispensary_id: {
      type: Schema.Types.ObjectId,
    },
    auto_booked: {
      type: Boolean,
      default: false,
      required: [true, "Please provide a Auto Booked"],
    },
  },
  { timestamps: true }
);

export default connection
  .useDb("MediSync")
  .model("Appointment", AppointmentSchema);
