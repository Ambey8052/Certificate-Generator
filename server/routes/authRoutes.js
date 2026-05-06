import express from "express";
import { getProfile, loginAdmin, registerAdmin } from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", registerAdmin);
router.post("/login", loginAdmin);
router.get("/me", protect, getProfile);

export default router;
