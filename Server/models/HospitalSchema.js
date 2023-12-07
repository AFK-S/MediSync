const { Schema, connection } = require("mongoose");

const HospitalSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "Please add the Hospital Name"],
    },
    coordinates: {
      latitude: {
        type: Number,
        required: [true, "Please add the Latitude"],
      },
      longitude: {
        type: Number,
        required: [true, "Please add the Longitude"],
      },
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
        required: [true, "Please add the City"],
      },
      state: {
        type: String,
        trim: true,
        required: [true, "Please add the State"],
      },
      zipCode: {
        type: String,
        trim: true,
        required: [true, "Please add the ZIP Code"],
      },
      country: {
        type: String,
        trim: true,
        required: [true, "Please add the Country"],
      },
    },
    contact: {
      phone: {
        type: String,
        trim: true,
        required: [true, "Please add the Contact Phone"],
      },
      email: {
        type: String,
        trim: true,
        lowercase: true,
        match: [
          /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/,
          (props) => `${props.value} is not a valid email`,
        ],
        required: [true, "Please add the Contact Email"],
      },
    },
    username: {
      type: String,
      trim: true,
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

module.exports = connection.useDb("MediSync").model("Hospital", HospitalSchema);
