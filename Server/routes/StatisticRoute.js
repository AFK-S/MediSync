import express from "express";
import { GovernmentStats } from "../controller/Statistic.js";

const router = express.Router();

router.get("/statistic/government", GovernmentStats);

export default router;
