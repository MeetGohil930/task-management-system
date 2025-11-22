// import Team from "../models/Team.js";

// // Create team
// export const createTeam = async (req, res) => {
//   try {
//     const team = await Team.create(req.body);
//     res.status(201).json(team);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// };

// // Get all teams
// export const getTeams = async (req, res) => {
//   const teams = await Team.find({});
//   res.json(teams);
// };

// // Get team by ID
// export const getTeamById = async (req, res) => {
//   const team = await Team.findById(req.params.id);
//   if (team) res.json(team);
//   else res.status(404).json({ message: "Team not found" });
// };

// // Update team
// export const updateTeam = async (req, res) => {
//   try {
//     const team = await Team.findByIdAndUpdate(req.params.id, req.body, { new: true });
//     res.json(team);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// };

// // Delete team
// export const deleteTeam = async (req, res) => {
//   await Team.findByIdAndDelete(req.params.id);
//   res.json({ message: "Team removed" });
// };

import Team from "../models/Team.js";

// Create team
export const createTeam = async (req, res) => {
  try {
    const { name, leader, members, status } = req.body;

    if (!name || !leader) {
      return res.status(400).json({ message: "Name and Leader required" });
    }

    const team = await Team.create({
      name,
      leader,
      members: members || [],
      status
    });

    res.status(201).json(team);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};


export const getTeams = async (req, res) => {
  try {
    const teams = await Team.find()
      .populate("leader", "name email")
      .populate("members", "name email");

    res.json(teams);
  } catch (error) {
    console.error("🔥 TEAMS FETCH ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};



// Get team by ID
export const getTeamById = async (req, res) => {
  try {
    const team = await Team.findById(req.params.id)
      .populate("leader", "name email")
      .populate("members", "name email");

    if (!team) return res.status(404).json({ message: "Team not found" });
    res.json(team);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// Update team
export const updateTeam = async (req, res) => {
  try {
    const team = await Team.findByIdAndUpdate(req.params.id, req.body, { new: true })
      .populate("leader", "name email")
      .populate("members", "name email");

    res.json(team);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete team
export const deleteTeam = async (req, res) => {
  try {
    await Team.findByIdAndDelete(req.params.id);
    res.json({ message: "Team removed" });
  } catch (err) {
    res.status(500).json({ message: "Delete failed" });
  }
};
