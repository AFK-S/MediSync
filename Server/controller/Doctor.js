import ShortUniqueId from "short-unique-id";
import DoctorSchema from "../models/DoctorSchema.js";
import bucket from "../firebase.js";

const { randomUUID } = new ShortUniqueId({ length: 8 });

const Register = async (req, res) => {
  try {
    const { hospital_id } = req.params;
    const {
      rfid_tag,
      doctor_name,
      specialization,
      experience,
      age,
      license_number,
      availability,
      average_time,
      gender,
      fees,
      phone_number,
    } = req.body;
    const { file } = req.files;
    if (!file) return res.status(400).send("No file uploaded.");
    console.log(file);
    const blob = bucket.file(file.name);
    const blobStream = blob.createWriteStream();
    blobStream.on("error", (err) => {
      return res.status(400).send("Error uploading file.");
    });
    blobStream.on("finish", async () => {
      const downloadUrl = await blob.getSignedUrl({
        action: "read",
        expires: "03-09-2491",
      });
      console.log(downloadUrl);
      const username = randomUUID();
      const password = randomUUID();
      const doctor = await DoctorSchema.create({
        hospital_id,
        rfid_tag,
        name: doctor_name,
        photo_url: downloadUrl[0],
        specialization,
        experience,
        age,
        license_number,
        availability: JSON.parse(availability),
        average_time,
        gender,
        fees,
        phone_number,
        username,
        password,
      });
      return res.status(200).json({
        _id: doctor._id,
        username,
        password,
      });
    });
    blobStream.end(file.buffer);
  } catch (err) {
    console.error(err);
    res.status(400).send(err.message);
  }
};

const UpdateDetails = async (req, res) => {
  try {
    const { doctor_id } = req.params;
    const data = req.body;
    const doctor = await DoctorSchema.findById(doctor_id);
    if (!doctor) {
      return res.status(400).send("Doctor not found");
    }
    for (const [key, value] of Object.entries(data)) {
      if (doctor[key] && typeof doctor[key] !== "object") {
        doctor[key] = value;
      } else if (doctor[key] && typeof doctor[key] === "object") {
        for (const [subKey, subValue] of Object.entries(value)) {
          if (doctor[key][subKey]) doctor[key][subKey] = subValue;
        }
      }
    }
    await doctor.save();
    res.status(200).send("Doctor details updated successfully");
  } catch (err) {
    console.error(err);
    res.status(400).send(err.message);
  }
};

const DeleteDoctor = async (req, res) => {
  try {
    const { doctor_id } = req.params;
    await DoctorSchema.findByIdAndDelete(doctor_id);
    res.status(200).send("Doctor successfully deleted");
  } catch (err) {
    console.error(err);
    res.status(400).send(err.message);
  }
};

const DoctorInfo = async (req, res) => {
  try {
    const { doctor_id } = req.params;
    const doctor = await DoctorSchema.findById(doctor_id).lean();
    res.status(200).json(doctor);
  } catch (err) {
    console.error(err);
    res.status(400).send(err.message);
  }
};

const HospitalDoctorsList = async (req, res) => {
  try {
    const { hospital_id } = req.params;
    const doctors = await DoctorSchema.find({
      hospital_id: hospital_id,
    }).lean();
    res.status(200).json(doctors);
  } catch (err) {
    console.error(err);
    res.status(400).send(err.message);
  }
};

const AllHospitalDoctorsList = async (req, res) => {
  try {
    const response = await DoctorSchema.aggregate([
      {
        $lookup: {
          from: "hospitals",
          localField: "hospital_id",
          foreignField: "_id",
          as: "hospital",
        },
      },
      {
        $unwind: "$hospital",
      },
    ]);
    res.status(200).json(response);
  } catch (err) {
    console.error(err);
    res.status(400).send(err.message);
  }
};

const AllDoctors = async (req, res) => {
  try {
    const doctors = await DoctorSchema.find().lean();
    res.status(200).json(doctors);
  } catch (err) {
    console.error(err);
    res.status(400).send(err.message);
  }
};

export {
  Register,
  UpdateDetails,
  DeleteDoctor,
  DoctorInfo,
  HospitalDoctorsList,
  AllHospitalDoctorsList,
  AllDoctors,
};
