import express from "express";
import {
  RegisterHospital,
  GetAllHospitals,
} from "../controller/GovernmentController.js";

const router = express.Router();

router.post("/government/register", RegisterHospital);
router.get("/government/all", GetAllHospitals);

export default router;
