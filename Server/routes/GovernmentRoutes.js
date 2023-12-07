const express = require("express");
const router = express.Router();
const { RegisterHospital } = require("../controller/GovernmentController");
const { GetAllHospitals } = require("../controller/GovernmentController");

router.post("/government/register", RegisterHospital);
router.get("/government/all", GetAllHospitals);

module.exports = router;
