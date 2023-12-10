import mongoose from "mongoose";
const { Schema, connection } = mongoose;

const DoctorSchema = new Schema(
  {
    hospital_id: {
      type: Schema.Types.ObjectId,
      required: [true, "Please provide a Hospital ID"],
    },
    name: {
      type: String,
      trim: true,
      match: [/^[a-zA-Z ]+$/, (props) => `${props.value} is not a valid name`],
      required: [true, "Please provide the Doctor's Name"],
    },
    photo: {
      type: String,
      trim: true,
      match: [
        /^https?:\/\/.*\.(?:png|jpg|jpeg)$/i,
        (props) => `${props.value} is not a valid photo`,
      ],
      required: [true, "Please provide the Photo"],
    },
    specialization: {
      type: String,
      trim: true,
      match: [
        /^[a-zA-Z ]+$/,
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
    availability: [
      {
        day: {
          type: String,
          enum: [
            "monday",
            "tuesday",
            "wednesday",
            "thursday",
            "friday",
            "saturday",
            "sunday",
          ],
          match: [
            /^[a-zA-Z]+$/,
            (props) => `${props.value} is not a valid day`,
          ],
          required: [true, "Please provide the Day"],
        },
        slots: [
          {
            from: {
              type: String,
              required: [true, "Please provide the starting time"],
            },
            till: {
              type: String,
              required: [true, "Please provide the ending time"],
            },
          },
        ],
      },
    ],
    gender: {
      type: String,
      enum: ["male", "female"],
      match: [/^[a-zA-Z]+$/, (props) => `${props.value} is not a valid gender`],
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
