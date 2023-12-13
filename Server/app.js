import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import fileupload from "express-fileupload";
import HospitalRoute from "./routes/HospitalRoute.js";
import DoctorRoute from "./routes/DoctorRoute.js";
import TpLinkRoute from "./routes/TpLinkRoute.js";
import AttendanceRoute from "./routes/AttendanceRoute.js";
import PatientRoute from "./routes/PatientRoute.js";
import AppointmentRoute from "./routes/AppointmentRoute.js";

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
app.use(fileupload());
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

app.get("/api/logout", async (req, res) => {
  res.clearCookie("_id").status(200).end();
});

app.get("/", (req, res) => {
  res.send("MediSync is up and running!!");
});

// app.get("/api/test", (req, res) => {
//   const clientIp = req.socket.remoteAddress.split(":")[3];
//   console.log(clientIp);
//   res.send(clientIp);
// });

app.listen(8000, () => {
  console.log("Server listening on port 8000");
});
