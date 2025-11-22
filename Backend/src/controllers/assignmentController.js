import Assignment from "../models/Assignment.js";

export const createAssignment = async (req, res) => {
  try {
    const { projectId, teamId, teamLead } = req.body;

    if (!projectId || !teamId || !teamLead) {
      return res.status(400).json({ message: "All fields required" });
    }

    const assignment = await Assignment.create({ projectId, teamId, teamLead });

    const populated = await Assignment.findById(assignment._id)
      .populate("projectId", "name")
      .populate("teamId", "name")
      .populate("teamLead", "name");

    res.status(201).json(populated);
  } catch (error) {
    console.error("Assignment Error:", error);
    res.status(500).json({ message: error.message });
  }
};

export const getAssignments = async (req, res) => {
  try {
    const assignments = await Assignment.find()
      .populate("projectId", "name")
      .populate("teamId", "name")
      .populate("teamLead", "name");

    res.json(assignments);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteAssignment = async (req, res) => {
  try {
    await Assignment.findByIdAndDelete(req.params.id);
    res.json({ message: "Assignment deleted" });
  } catch (error) {
    res.status(500).json({ message: "Delete failed" });
  }
};
