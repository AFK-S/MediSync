import mongoose from "mongoose";
const { Schema, connection } = mongoose;

const DoctorSchema = new Schema(
  {
    hospital_id: {
      type: Schema.Types.ObjectId,
      required: [true, "Please provide a Hospital ID"],
    },
    rfid_tag: {
      type: String,
      unique: true,
      trim: true,
      required: [true, "Please provide the RFID Tag"],
    },
    name: {
      type: String,
      trim: true,
    },
    mac_address: {
      type: String,
      trim: true,
      unique: true,
      required: [true, "Please provide the MAC Address"],
    },
    photo_url: {
      type: String,
      trim: true,
      default: "https://www.pexels.com/photo/man-in-brown-polo-shirt-614810/",
      required: [true, "Please provide the Photo"],
    },
    specialization: {
      type: String,
      trim: true,
      enum: [
        "general",
        "ent",
        "gynecologist",
        "pediatrician",
        "dental",
        "dermatologist",
        "orthologist",
        "ophthalmologist",
      ],
      match: [
        /^[a-zA-Z]+$/,
        (props) => `${props.value} is not a valid specialization`,
      ],
      required: [true, "Please provide the Specialization"],
    },
    experience: {
      type: Number,
      match: [
        /^[0-9]+$/,
        (props) => `${props.value} is not a valid experience`,
      ],
      required: [true, "Please provide the Experience"],
    },
    age: {
      type: Number,
      match: [/^[0-9]+$/, (props) => `${props.value} is not a valid age`],
      required: [true, "Please provide the Age"],
    },
    license_number: {
      type: String,
      trim: true,
      match: [
        /^[a-zA-Z0-9]+$/,
        (props) => `${props.value} is not a valid license number`,
      ],
      required: [true, "Please provide the License Number"],
    },
    availability: [
      {
        date: {
          type: Date,
          required: [true, "Please provide the Date"],
        },
        start_time: {
          type: String,
          required: [true, "Please provide the Starting Time"],
        },
        end_time: {
          type: String,
          required: [true, "Please provide the Ending Time"],
        },
      },
    ],
    slot_count: {
      online: {
        type: Number,
        match: [
          /^[0-9]+$/,
          (props) => `${props.value} is not a valid slot count`,
        ],
        required: [true, "Please provide the Online Slot Count"],
      },
      walk_in: {
        type: Number,
        match: [
          /^[0-9]+$/,
          (props) => `${props.value} is not a valid slot count`,
        ],
        required: [true, "Please provide the Walk In Slot Count"],
      },
    },
    average_time: {
      type: Number,
      match: [
        /^[0-9]+$/,
        (props) => `${props.value} is not a valid average time`,
      ],
      required: [true, "Please provide the Average Time"],
    },
    gender: {
      type: String,
      enum: ["male", "female", "other"],
      required: [true, "Please provide the Gender"],
    },
    fees: {
      type: Number,
      match: [/^[0-9]+$/, (props) => `${props.value} is not a valid fees`],
      required: [true, "Please provide the Fees"],
    },
    phone_number: {
      type: String,
      trim: true,
      match: [
        /^[0-9]{10}$/,
        (props) => `${props.value} is not a valid phone number`,
      ],
      required: [true, "Please add a Phone Number"],
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

export default connection.useDb("MediSync").model("Doctor", DoctorSchema);
