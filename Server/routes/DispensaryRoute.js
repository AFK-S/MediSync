import express from "express";
import {
  Register as RegisterDispensary,
  UpdateDetails as UpdateDispensary,
  DeleteDispensary,
  DispensaryInfo,
  RedirectToDispensary,
  Patient,
} from "../controller/Dispensary.js";

const router = express.Router();

router.post("/dispensary/register", RegisterDispensary);
router.put("/dispensary/update/:dispensary_id", UpdateDispensary);
router.delete("/dispensary/delete/:dispensary_id", DeleteDispensary);
router.get("/dispensary/:dispensary_id", DispensaryInfo);
router.put(
  "/dispensary/redirect/:appointment_id/:dispensary_id",
  RedirectToDispensary
);
router.get("/dispensary/patient/:dispensary_id", Patient);

export default router;
