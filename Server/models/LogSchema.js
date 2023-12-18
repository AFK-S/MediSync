import mongoose from "mongoose";
const { Schema, connection } = mongoose;

const LogSchema = new Schema(
  {
    doctor_id: {
      type: Schema.Types.ObjectId,
      required: [true, "Please provide a Doctor ID"],
    },
    type: {
      type: String,
      enum: ["CCTV Camera", "Wifi Network", "RFID"],
      required: [true, "Please provide a Availability"],
    },
    status: {
      type: String,
      required: [true, "Please provide a Status"],
    },
  },
  { timestamps: true }
);

export default connection.useDb("MediSync").model("Log", LogSchema);
