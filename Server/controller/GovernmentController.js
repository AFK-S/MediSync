import crypto from "crypto";
import nodemailer from "nodemailer";
import HospitalSchema from "../models/HospitalSchema.js";
import { validationResult } from "express-validator";

const generateRandomString = (length) => {
  return crypto
    .randomBytes(Math.ceil(length / 2))
    .toString("hex")
    .slice(0, length);
};

const Mailer = (email_address, subject, template) => {
  nodemailer
    .createTransport({
      service: "gmail",
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_ID,
        pass: process.env.PASSWORD,
      },
      tls: {
        rejectUnauthorized: false,
      },
    })
    .sendMail(
      {
        from: process.env.EMAIL_ID,
        to: email_address,
        subject: subject,
        html: template,
      },
      function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
        }
      }
    );
};

const RegisterHospital = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, coordinates, address, contact } = req.body;

  const username = generateRandomString(8);
  const password = generateRandomString(12);

  try {
    const newHospital = await HospitalSchema.create({
      name,
      coordinates,
      address,
      contact,
      username,
      password,
    });

    const emailSubject = "Your Hospital Credentials";
    const emailText = `Your username: ${username}\nYour password: ${password}`;

    await Mailer(contact.email, emailSubject, emailText);

    res.status(201).json({
      hospital_id: newHospital._id,
      username: newHospital.username,
    });
  } catch (err) {
    console.error(err);
    res.status(400).send(err.message);
  }
};

const GetAllHospitals = async (req, res) => {
  try {
    const hospitals = await HospitalSchema.find();
    res.status(200).json(hospitals);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export { GetAllHospitals, RegisterHospital };
