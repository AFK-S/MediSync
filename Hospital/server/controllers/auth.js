import Admin from "../models/Admin.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const alreadyRegistered = await Admin.findOne({ email: email });
    if (alreadyRegistered)
      return res.status(400).json({ message: "Admin already exists" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newAdmin = new Admin({
      name,
      email,
      password: hashedPassword,
    });
    const savedAdmin = await newAdmin.save();
    res
      .status(201)
      .json({ message: ` ${savedAdmin.email} registered successfully` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email: email });
    if (!admin) return res.status(400).json({ msg: "Admin does not exist" });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid Credentials" });

    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.status(200).json({
      id: admin._id,
      name: admin.name,
      email: admin.email,
      token: token,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const verifyAdmin = async (req, res) => {
  try {
    const token = req.header("x-auth-token");
    if (!token)
      return res.status(401).json({ msg: "No token, authorization denied" });

    try {
      const verified = jwt.verify(token, process.env.JWT_SECRET);
      const user = await Admin.findById(verified.id);
      if (!user)
        return res.status(401).json({ msg: "No user found with this token" });

      res
        .status(200)
        .json({ id: user._id, name: user.name, email: user.email });
    } catch (error) {
      return res.status(401).json({ msg: "Token is not valid" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
