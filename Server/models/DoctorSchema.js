const { Schema, connection } = require("mongoose");

const DoctorSchema = new Schema(
  {
    hospital: {
      type: Schema.Types.ObjectId,
      ref: "Hospital",
      required: [true, "Please provide a Hospital ID"],
    },
    name: {
      type: String,
      trim: true,
      required: [true, "Please provide the Doctor's Name"],
    },
    specialization: {
      type: String,
      trim: true,
      required: [true, "Please provide the Specialization"],
    },
    experience: {
      type: Number,
      required: [true, "Please provide the Experience"],
    },
    age: {
      type: Number,
      required: [true, "Please provide the Age"],
    },
    availability: [
      {
        day: {
          type: String,
          required: [true, "Please provide the Day"],
        },
        slots: [
          {
            from: {
              type: String,
              required: [
                true,
                "Please provide the starting time of the time slot",
              ],
            },
            till: {
              type: String,
              required: [
                true,
                "Please provide the ending time of the time slot",
              ],
            },
          },
        ],
      },
    ],
    gender: {
      type: String,
      enum: ["male", "female"],
      required: [true, "Please provide the Gender"],
    },
    fees: {
      type: Number,
      required: [true, "Please provide the Fees"],
    },
    contact: {
      type: String,
      trim: true,
      required: [true, "Please provide the Contact Information"],
    },
    username: {
      type: String,
      default: () => Math.random().toString(36).substring(7),
      unique: true,
    },
    password: {
      type: String,
      default: () => Math.random().toString(36).substring(7),
      required: [true, "Please provide a Password"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = connection.useDb("YourDB").model("Doctor", DoctorSchema);
