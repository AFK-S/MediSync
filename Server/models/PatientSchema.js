import mongoose from "mongoose";
const { Schema, connection } = mongoose;

const PatientSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      match: [
        /^[a-zA-Z0-9 ]+$/,
        (props) => `${props.value} is not a valid name`,
      ],
      required: [true, "Please provide a name"],
    },
    age: {
      type: Number,
      match: [/^[0-9]+$/, (props) => `${props.value} is not a valid age`],
      required: [true, "Please provide the Age"],
    },
    phone_number: {
      type: String,
      trim: true,
      match: [
        /^[0-9]{10}$/,
        (props) => `${props.value} is not a valid phone number`,
      ],
      unique: true,
      required: [true, "Please add a Phone Number"],
    },
    gender: {
      type: String,
      enum: ["male", "female", "others"],
      required: [true, "Please add the Gender"],
    },
  },
  { timestamps: true }
);

export default connection.useDb("MediSync").model("Patient", PatientSchema);
