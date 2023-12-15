import express from "express";
import { Doctor } from "../controller/Dashboard.js";

const router = express.Router();

router.get("/dashboard/doctor/:doctor_id", Doctor);

export default router;
