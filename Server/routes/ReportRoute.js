import express from "express";
import {
  Register as ReportRegister,
  UpdateDetails as UpdateReport,
  DeleteReport,
  ReportInfo,
} from "../controller/Report.js";
import multer from "multer";

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const router = express.Router();

router.post("/report/register", upload.single("file"), ReportRegister);
router.put("/report/update/:report_id", UpdateReport);
router.delete("/report/delete/:report_id", DeleteReport);
router.get("/report/:report_id", ReportInfo);

export default router;
