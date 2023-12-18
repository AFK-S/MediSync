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
      match: [
        /^[a-zA-Z]+$/,
        (props) => `${props.value} is not a valid appointment type`,
      ],
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
  },
  { timestamps: true }
);

export default connection
  .useDb("MediSync")
  .model("Appointment", AppointmentSchema);
