import express from "express";
import {
  CheckMacAddress,
  VerifyConnectedDevices,
} from "../controller/TpLink.js";

const router = express.Router();

router.get("/tplink/doctor/:doctor_id", CheckMacAddress);
router.get("/tplink/verify/doctor/:doctor_id", VerifyConnectedDevices);

export default router;
