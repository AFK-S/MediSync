import ShortUniqueId from "short-unique-id";
import HospitalSchema from "../models/HospitalSchema.js";
import geolib from "geolib";

const { randomUUID } = new ShortUniqueId({ length: 8 });

const Register = async (req, res, next) => {
  try {
    const {
      hospital_name,
      coordinates: { latitude, longitude },
      address: { street, city, state, zipCode, country },
      contact_details: { phone_number, email_address },
    } = req.body;
    const username = randomUUID();
    const password = randomUUID();
    const hospital = await HospitalSchema.create({
      name: hospital_name,
      coordinates: {
        latitude,
        longitude,
      },
      address: {
        street,
        city,
        state,
        zipCode,
        country,
      },
      contact_details: {
        phone_number,
        email_address,
      },
      username,
      password,
    });

    req.data = {
      name: hospital_name,
      email_address,
      username,
      password,
    };
    res.status(200).json({
      _id: hospital._id,
      username,
      password,
    });
    next();
  } catch (err) {
    console.error(err);
    res.status(400).send(err.message);
  }
};

const UpdateDetails = async (req, res) => {
  try {
    const { hospital_id } = req.params;
    const data = req.body;
    const hospital = await HospitalSchema.findById(hospital_id);
    if (!hospital) {
      return res.status(400).send("Hospital not found");
    }
    for (const [key, value] of Object.entries(data)) {
      if (hospital[key] && typeof hospital[key] !== "object") {
        hospital[key] = value;
      } else if (hospital[key] && typeof hospital[key] === "object") {
        for (const [subKey, subValue] of Object.entries(value)) {
          if (hospital[key][subKey]) hospital[key][subKey] = subValue;
        }
      }
    }
    await hospital.save();
    res.status(200).send("Hospital details updated successfully");
  } catch (err) {
    console.error(err);
    res.status(400).send(err.message);
  }
};

const DeleteHospital = async (req, res) => {
  try {
    const { hospital_id } = req.params;
    await HospitalSchema.findByIdAndDelete(hospital_id);
    res.status(200).send("Hospital successfully deleted");
  } catch (err) {
    console.error(err);
    res.status(400).send(err.message);
  }
};

const HospitalInfo = async (req, res) => {
  try {
    const { hospital_id } = req.params;
    const hospital = await HospitalSchema.findById(hospital_id).lean();
    res.status(200).json(hospital);
  } catch (err) {
    console.error(err);
    res.status(400).send(err.message);
  }
};

const AllHospitals = async (req, res) => {
  try {
    const hospitals = await HospitalSchema.find().lean();
    res.status(200).json(hospitals);
  } catch (err) {
    console.error(err);
    res.status(400).send(err.message);
  }
};

const NearByHospitals = async (req, res) => {
  try {
    const { latitude, longitude } = req.body;
    const hospitals = await HospitalSchema.find().lean();
    const closest_hospital_ids = hospitals
      .map((hospital) => {
        const distance = geolib.getDistance(
          { latitude, longitude },
          hospital.coordinates
        );
        if (distance <= 5 * 1000) return hospital._id;
      })
      .sort((a, b) => a.distance - b.distance);
    const nearby_hospitals = await HospitalSchema.aggregate([
      {
        $match: {
          _id: {
            $in: closest_hospital_ids,
          },
        },
      },
      {
        $lookup: {
          from: "doctors",
          localField: "_id",
          foreignField: "hospital_id",
          as: "doctors",
        },
      },
    ]);
    res.status(200).json(nearby_hospitals);
  } catch (err) {
    console.error(err);
    res.status(400).send(err.message);
  }
};

export {
  Register,
  UpdateDetails,
  DeleteHospital,
  HospitalInfo,
  AllHospitals,
  NearByHospitals,
};
