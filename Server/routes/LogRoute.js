import express from "express";
import {
  CCTVRegister,
  DeleteLog,
  LogInfo,
  AllDoctorsPhotoURL,
} from "../controller/Log.js";

const router = express.Router();

router.post("/log/cctv/register/:photo_url", CCTVRegister);
router.delete("/log/delete/:log_id", DeleteLog);
router.get("/log/:log_id", LogInfo);
router.get("/photos", AllDoctorsPhotoURL);

export default router;
