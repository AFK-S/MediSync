import mongoose from "mongoose";
const { Schema, connection } = mongoose;

const ReportSchema = new Schema(
  {
    patient_id: {
      type: Schema.Types.ObjectId,
      required: [true, "Please provide a Patient ID"],
    },
    type: {
      type: String,
      trim: true,
      enum: ["patient", "doctor", "pathology"],
      match: [
        /^[a-zA-Z]+$/,
        (props) => `${props.value} is not a valid report type`,
      ],
      required: [true, "Please provide the Report Type"],
    },
    disease: {
      type: Array,
      trim: true,
      required: [true, "Please provide the Disease"],
    },
    url: {
      type: String,
      trim: true,
      required: [true, "Please provide a Report URL"],
    },
  },
  { timestamps: true }
);

export default connection.useDb("MediSync").model("Report", ReportSchema);
