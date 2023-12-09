import mongoose from "mongoose";
const { Schema, connection } = mongoose;

const HospitalSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      match: [
        /^[a-zA-Z0-9 ]+$/,
        (props) => `${props.value} is not a valid name`,
      ],
      required: [true, "Please add the Hospital Name"],
    },
    coordinates: {
      type: Object,
      required: [true, "Please add a Coordinates"],
    },
    address: {
      street: {
        type: String,
        trim: true,
        required: [true, "Please add the Street Address"],
      },
      city: {
        type: String,
        trim: true,
        match: [
          /^[a-zA-Z ]+$/,
          (props) => `${props.value} is not a valid city name`,
        ],
        required: [true, "Please add the City"],
      },
      state: {
        type: String,
        trim: true,
        match: [
          /^[a-zA-Z ]+$/,
          (props) => `${props.value} is not a valid city name`,
        ],
        required: [true, "Please add the State"],
      },
      zipCode: {
        type: String,
        trim: true,
        match: [
          /^[0-9]{6}$/,
          (props) => `${props.value} is not a valid ZIP Code`,
        ],
        required: [true, "Please add the ZIP Code"],
      },
      country: {
        type: String,
        trim: true,
        match: [
          /^[a-zA-Z ]+$/,
          (props) => `${props.value} is not a valid country name`,
        ],
        required: [true, "Please add the Country"],
      },
    },
    contact_details: {
      phone_number: {
        type: String,
        trim: true,
        match: [
          /^[0-9]{10}$/,
          (props) => `${props.value} is not a valid phone number`,
        ],
        required: [true, "Please add a Phone Number"],
      },
      email_address: {
        type: String,
        trim: true,
        lowercase: true,
        match: [
          /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/,
          (props) => `${props.value} is not a valid email`,
        ],
        required: [true, "Please add an Email Address"],
      },
    },
    username: {
      type: String,
      unique: true,
      required: [true, "Please add the Username"],
    },
    password: {
      type: String,
      required: [true, "Please add the Password"],
    },
  },
  {
    timestamps: true,
  }
);

export default connection.useDb("MediSync").model("Hospital", HospitalSchema);
