import HospitalSchema from "../models/HospitalSchema.js";

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

export { HospitalLogin };
