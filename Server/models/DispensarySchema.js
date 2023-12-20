import mongoose from "mongoose";
const { Schema, connection } = mongoose;

const DispensarySchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "Please add the Dispensary Name"],
    },
    doctor_name: {
      type: String,
      trim: true,
      required: [true, "Please add the Doctor Name"],
    },
  },
  {
    timestamps: true,
  }
);

export default connection
  .useDb("MediSync")
  .model("Dispensary", DispensarySchema);
