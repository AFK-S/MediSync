import ReportSchema from "../models/ReportSchema.js";
import bucket from "../firebase.js";

const Register = async (req, res) => {
  try {
    const { patient_id, type, disease } = req.body;
    const file = req.file;
    if (!file) return res.status(400).send("No file uploaded.");
    const blob = bucket.file(file.originalname);
    const blobStream = blob.createWriteStream();
    blobStream.on("error", (err) => {
      return res.status(400).send("Error uploading file.");
    });
    blobStream.on("finish", async () => {
      const downloadUrl = await blob.getSignedUrl({
        action: "read",
        expires: "03-09-2491",
      });
      const report = await ReportSchema.create({
        patient_id,
        type,
        disease: JSON.parse(disease),
        url: downloadUrl[0],
      });
      return res.status(200).send(report._id);
    });
    blobStream.end(file.buffer);
  } catch (err) {
    console.error(err);
    res.status(400).send(err.message);
  }
};

const UpdateDetails = async (req, res) => {
  try {
    const { report_id } = req.params;
    const data = req.body;
    const report = await ReportSchema.findById(report_id);
    if (!report) {
      return res.status(400).send("Patient not found");
    }
    for (const [key, value] of Object.entries(data)) {
      if (report[key] && typeof report[key] !== "object") {
        report[key] = value;
      } else if (report[key] && typeof report[key] === "object") {
        for (const [subKey, subValue] of Object.entries(value)) {
          if (report[key][subKey]) report[key][subKey] = subValue;
        }
      }
    }
    await report.save();
    res.status(200).send("Report details updated successfully");
  } catch (err) {
    console.error(err);
    res.status(400).send(err.message);
  }
};

const DeleteReport = async (req, res) => {
  try {
    const { report_id } = req.params;
    await ReportSchema.findByIdAndDelete(report_id);
    res.status(200).send("Report successfully deleted");
  } catch (err) {
    console.error(err);
    res.status(400).send(err.message);
  }
};

const ReportInfo = async (req, res) => {
  try {
    const { report_id } = req.params;
    const report = await ReportSchema.findById(report_id).lean();
    res.status(200).json(report);
  } catch (err) {
    console.error(err);
    res.status(400).send(err.message);
  }
};

export { Register, UpdateDetails, DeleteReport, ReportInfo };
