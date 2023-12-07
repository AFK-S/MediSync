import express from "express";
import { login, register, verifyAdmin } from "../controllers/auth.js";

const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.get("/verify", verifyAdmin);

export default router;
