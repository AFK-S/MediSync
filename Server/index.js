import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import HospitalRoute from "./routes/HospitalRoute.js";
import DoctorRoute from "./routes/DoctorRoute.js";
import TpLinkRoute from "./routes/TpLinkRoute.js";
import AttendanceRoute from "./routes/AttendanceRoute.js";
import PatientRoute from "./routes/PatientRoute.js";
import AppointmentRoute from "./routes/AppointmentRoute.js";
import LogRoute from "./routes/LogRoute.js";
import { VerifyConnectedDevices } from "./controller/TpLink.js";
import { WIFIRegister } from "./controller/Log.js";
import DashboardRoute from "./routes/DashboardRoute.js";
import ReportRoute from "./routes/ReportRoute.js";
import { AllocateAppointmentSlot } from "./controller/Appointment.js";

const app = express();
dotenv.config();

try {
  mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
} catch (error) {
  console.log(error);
}

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(
  cors({
    origin: "*",
    methods: ["POST", "GET", "DELETE", "PATCH", "PUT"],
    credentials: true,
  })
);
app.use(cookieParser());

app.use("/api", HospitalRoute);
app.use("/api", DoctorRoute);
app.use("/api", TpLinkRoute);
app.use("/api", AttendanceRoute);
app.use("/api", PatientRoute);
app.use("/api", AppointmentRoute);
app.use("/api", LogRoute);
app.use("/api", DashboardRoute);
app.use("/api", ReportRoute);

app.get("/api/logout", async (req, res) => {
  res.clearCookie("_id").status(200).end();
});

app.get("/", (req, res) => {
  res.send("MediSync is up and running!!");
});

const interval = 1 * 60 * 1000;
let result = [];

// AllocateAppointmentSlot("65804330a0d8f9a9b7f8d779");
async function startServer() {
  try {
    app.listen(8000, () => {
      console.log("Server listening on port 8000");
    });
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

// Call the async function to start the server
startServer().catch((error) => {
  console.error("Error starting the server:", error);
});
