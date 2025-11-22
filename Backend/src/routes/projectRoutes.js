import express from "express";
import {
    getProjects,
    createProject,
    getProjectById,
    updateProject,
    deleteProject,
    getProjectCount
} from "../controllers/projectController.js";

const router = express.Router();

// ✅ ALWAYS place fixed routes FIRST
router.get("/count", getProjectCount);

router.get("/", getProjects);
router.post("/", createProject);

// ✅ Then dynamic ID
router.get("/:id", getProjectById);
router.put("/:id", updateProject);
router.delete("/:id", deleteProject);

export default router;
