// import express from "express";
// import dotenv from "dotenv";
// import cors from "cors";
// import connectDB from "./config/db.js";

// import userRoutes from "./routes/userRoutes.js";
// import projectRoutes from "./routes/projectRoutes.js";
// import teamRoutes from "./routes/teamRoutes.js";
// import taskRoutes from "./routes/taskRoutes.js";
// import assignmentRoutes from "./routes/assignmentRoutes.js";

// dotenv.config();
// connectDB();

// const app = express();
// app.use(cors());
// app.use(express.json());

// app.get("/", (req, res) => res.send("API is running..."));

// app.use("/api/users", userRoutes);
// app.use("/api/projects", projectRoutes);
// app.use("/api/teams", teamRoutes);
// app.use("/api/tasks", taskRoutes);
// app.use("/api/assignments", assignmentRoutes);

// export default app;

import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";

import userRoutes from "./routes/userRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import teamRoutes from "./routes/teamRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import assignmentRoutes from "./routes/assignmentRoutes.js";

dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// ✅ CORS Configuration
app.use(cors({
  origin: [
    "http://localhost:3000",
    "https://task-management-system-azure-seven.vercel.app"
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true
}));

// ✅ PREFLIGHT FIX (IMPORTANT)
app.use((req, res, next) => {
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Origin", "https://task-management-system-azure-seven.vercel.app");
    res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    return res.status(200).end();
  }
  next();
});

// Parse JSON requests
app.use(express.json());

// ✅ Health check root
app.get("/", (req, res) => {
  res.send("API is running...");
});

// ✅ IMPORTANT: /api FIX (Cannot GET /api solution)
app.get("/api", (req, res) => {
  res.json({ message: "API working successfully 🚀" });
});

// API Routes
app.use("/api/users", userRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/teams", teamRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/assignments", assignmentRoutes);

export default app;
