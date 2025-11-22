// import express from "express";
// import { createTask, getTasks, getTaskById, updateTask, deleteTask, getTaskCount } from "../controllers/taskController.js";

// const router = express.Router();

// router.route("/").get(getTasks).post(createTask);
// router.route("/:id").get(getTaskById).put(updateTask).delete(deleteTask);
// router.get("/count", getTaskCount);


// export default router;

import express from "express";
import {
    getTasks,
    createTask,
    getTaskById,
    updateTask,
    deleteTask,
    getTaskCount,
} from "../controllers/taskController.js";

const router = express.Router();

// ✅ Exact match first
router.get("/count", (req, res, next) => {
    console.log("COUNT ROUTE HIT ✅");
    next();
}, getTaskCount);

router.get("/", getTasks);
router.post("/", createTask);

// ✅ Protect :id from catching "count"
router.get("/:id", async (req, res, next) => {
    if (req.params.id === "count") return next("route");
    return getTaskById(req, res);
});

router.put("/:id", updateTask);
router.delete("/:id", deleteTask);

export default router;
