import express from "express";
import { createTeam, getTeams, getTeamById, updateTeam, deleteTeam } from "../controllers/teamController.js";

const router = express.Router();

router.route("/").get(getTeams).post(createTeam);
router.route("/:id").get(getTeamById).put(updateTeam).delete(deleteTeam);


export default router;
