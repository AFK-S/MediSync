import HospitalSchema from "../models/HospitalSchema.js";
import DoctorSchema from "../models/DoctorSchema.js";

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

const DoctorLogin = async (req, res) => {
  try {
    const { username, password } = req.body;
    const response = await DoctorSchema.findOne({
      username,
      password,
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

export { HospitalLogin, DoctorLogin };
