import express from "express";
import {
  loginUser,
  registerUser,
  updateProfile,
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.put("/update", protect, updateProfile);

export default router;
