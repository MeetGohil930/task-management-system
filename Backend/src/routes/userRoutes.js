import express from "express";
import {
  getUsers,
  loginUser,
  registerUser,
  deleteUser,
  updateUser,
  getUserCount,
  updatePassword,
  requestPasswordReset,
  resetPassword,
} from "../controllers/userController.js";

const router = express.Router();

// Routes
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/", getUsers);
router.put("/:id", updateUser);   // For editing a user
router.delete("/:id", deleteUser); // ✅ Add this line
router.get("/count", getUserCount);
router.put("/update-password/:userId", updatePassword);
router.post("/request-reset", requestPasswordReset);
router.post("/reset-password", resetPassword);

export default router;