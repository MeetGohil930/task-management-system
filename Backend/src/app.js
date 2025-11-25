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

// CORS Configuration
app.use(cors({
  origin: [
    "http://localhost:3000", // local frontend
    "https://task-management-system-azure-seven.vercel.app" // deployed Vercel frontend
  ],
  methods: ["GET","POST","PUT","DELETE","OPTIONS"], // OPTIONS include
  credentials: true
}));

// Parse JSON requests
app.use(express.json());

// Health check route
app.get("/", (req, res) => res.send("API is running..."));

// API Routes
app.use("/api/users", userRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/teams", teamRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/assignments", assignmentRoutes);

export default app;
