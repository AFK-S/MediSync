import mongoose from "mongoose";
const { Schema, connection } = mongoose;

const AlertSchema = new Schema(
  {
    doctor_id: {
      type: Schema.Types.ObjectId,
    },
    patient_id: {
      type: Schema.Types.ObjectId,
    },
    type: {
      type: String,
      trim: true,
      enum: ["redirecting"],
      required: [true, "Please provide the Alert Type"],
    },
    appointment_id: {
      type: Schema.Types.ObjectId,
    },
    status: {
      type: String,
      trim: true,
      enum: ["pending", "redirected"],
      default: "pending",
    },
  },
  { timestamps: true }
);

export default connection.useDb("MediSync").model("Alert", AlertSchema);
