import mongoose from "mongoose";

const assignmentSchema = new mongoose.Schema({
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
    required: true,
  },
  teamId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Team",
    required: true,
  },
  teamLead: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",   // ✅ EXACT name must match User model
    required: true,
  },
});

export default mongoose.model("Assignment", assignmentSchema);
