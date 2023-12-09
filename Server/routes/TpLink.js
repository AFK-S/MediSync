import express from "express";

import { DeviceDetails, CheckIP } from "../controller/TpLink.js";

const router = express.Router();

router.get("/tplink", DeviceDetails);
router.get("/tplink/doctor/:doctor_id", CheckIP);

export default router;
