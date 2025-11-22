import Project from "../models/Project.js";

// Create project
export const createProject = async (req, res) => {
  try {
    const project = await Project.create(req.body);
    res.status(201).json(project);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get all projects
export const getProjects = async (req, res) => {
  const projects = await Project.find({});
  res.json(projects);
};

export const getProjectCount = async (req, res) => {
  try {
    const count = await Project.countDocuments();
    res.json({ count });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch project count" });
  }
};

// Get project by ID
export const getProjectById = async (req, res) => {
  const project = await Project.findById(req.params.id);
  if (project) res.json(project);
  else res.status(404).json({ message: "Project not found" });
};

// Update project
export const updateProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(project);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete project
export const deleteProject = async (req, res) => {
  await Project.findByIdAndDelete(req.params.id);
  res.json({ message: "Project removed" });
};
