import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import fileupload from "express-fileupload";
import session from "express-session";

import HospitalRoute from "./routes/Hospital.js";
import DoctorRoute from "./routes/Doctor.js";
import TpLinkRoute from "./routes/TpLink.js";

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
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      //  secure: true,
    },
  })
);

app.get("/api/authentication", async (req, res) => {
  if (req.session._id === req.cookies._id) {
    return res.send(true);
  }
  res.send(false);
});
app.get("/api/logout", async (req, res) => {
  req.session.destroy();
  res.clearCookie("connect.sid").clearCookie("_id").status(200).end();
});

app.use("/api", HospitalRoute);
app.use("/api", DoctorRoute);
app.use("/api", TpLinkRoute);

app.get("/", (req, res) => {
  res.send("MediSync is up and running!!");
});

app.listen(8000, () => {
  console.log("Server listening on port 8000");
});
