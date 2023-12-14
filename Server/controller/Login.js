import HospitalSchema from "../models/HospitalSchema.js";
import DoctorSchema from "../models/DoctorSchema.js";
import PatientSchema from "../models/PatientSchema.js";

const HospitalLogin = async (req, res) => {
  try {
    const { username, password } = req.body;
    const response = await HospitalSchema.findOne({
      username,
      password,
    })
      .select(["_id"])
      .lean();
    if (response === null) {
      return res.status(400).send("Invalid Credential");
    }
    res
      .cookie("_id", response._id, {
        maxAge: 1000 * 60 * 60 * 24 * 7,
      })
      .status(200)
      .end();
  } catch (err) {
    console.error(err);
    res.status(400).send(err.message);
  }
};
const FirstTimeDoctorLogin = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const response = await DoctorSchema.findOne({
      username,
      password,
    })
      .select(["_id", "mac_address"])
      .lean();
    if (response === null) {
      return res.status(400).send("Invalid Credential");
    }
    if (!response.mac_address.includes("AFKS")) {
      return res.status(400).send("Already Registered");
    }
    req._id = response._id;
    next();
  } catch (err) {
    console.error(err);
    res.status(400).send(err.message);
  }
};

const DoctorLogin = async (req, res) => {
  try {
    const { username, password, mac_address } = req.body;
    const response = await DoctorSchema.findOne({
      username,
      password,
      mac_address,
    })
      .select(["_id"])
      .lean();
    if (response === null) {
      return res.status(400).send("Invalid Credential");
    }
    res.status(200).send(response._id);
  } catch (err) {
    console.error(err);
    res.status(400).send(err.message);
  }
};

const PatientLogin = async (req, res) => {
  try {
    const { name, age, phone_number } = req.body;
    let response = await PatientSchema.findOne({
      phone_number,
    })
      .select(["_id"])
      .lean();
    if (response === null) {
      response = await PatientSchema.create({
        name,
        age,
        phone_number,
      });
    }
    res
      .cookie("_id", response._id, {
        maxAge: 1000 * 60 * 60 * 24 * 7,
      })
      .status(200)
      .end();
  } catch (err) {
    console.error(err);
    res.status(400).send(err.message);
  }
};

export { HospitalLogin, FirstTimeDoctorLogin, DoctorLogin, PatientLogin };
