import Task from "../models/Task.js";

// Create task
export const createTask = async (req, res) => {
  try {
    const task = await Task.create(req.body);
    res.status(201).json(task);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get all tasks
export const getTasks = async (req, res) => {
  const tasks = await Task.find({}).populate("projectId teamId", "name");
  res.json(tasks);
};

// Get task by ID
// export const getTaskById = async (req, res) => {
//   const task = await Task.findById(req.params.id).populate("projectId teamId", "name");
//   if (task) res.json(task);
//   else res.status(404).json({ message: "Task not found" });
// };

export const getTaskById = async (req, res) => {
  if (req.params.id === "count") {
    return res.status(400).json({ message: "Invalid ID" });
  }

  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Invalid Task ID" });
  }
};


// Update task
export const updateTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(task);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete task
export const deleteTask = async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ message: "Task removed" });
};

export const getTaskCount = async (req, res) => {
  try {
    const count = await Task.countDocuments();
    res.json({ count });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};


// ................................................ chartApi...........................Task..........................


export const getMonthlyTaskStats = async (req, res) => {
  try {
    const stats = await Task.aggregate([
      {
        $group: {
          _id: { $month: "$createdAt" },
          tasks: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    const months = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];

    const formatted = stats.map(item => ({
      name: months[item._id - 1],
      tasks: item.tasks
    }));

    res.status(200).json(formatted);
  } catch (error) {
    console.error("Chart Stats Error:", error);
    res.status(500).json({ message: "Failed to load chart data" });
  }
};