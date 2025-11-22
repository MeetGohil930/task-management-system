import express from "express";
import { getAssignments, createAssignment, deleteAssignment } from "../controllers/assignmentController.js";

const router = express.Router();

router.get("/", getAssignments);
router.post("/", createAssignment);
router.delete("/:id", deleteAssignment);

export default router;
