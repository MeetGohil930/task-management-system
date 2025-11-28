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

// // Connect to MongoDB
// connectDB();

// const app = express();

// // app.use(cors({
// //   origin: [
// //     "http://localhost:3000",
// //     "https://task-management-system-azure-seven.vercel.app"
// //   ],
// //   methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
// //   credentials: true
// // }));

// app.use(cors({
//   origin: [
//     "http://localhost:5173",
//     "http://localhost:3000",
//     "https://task-management-system-azure-seven.vercel.app",
//     "https://task-management-system-wpik.onrender.com"
//   ],
//   methods: ["GET", "POST", "PUT", "DELETE"],
//   credentials: true
// }));

// app.use((req, res, next) => {
//   if (req.method === "OPTIONS") {
//     res.header("Access-Control-Allow-Origin", "https://task-management-system-azure-seven.vercel.app");
//     res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
//     res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
//     return res.status(200).end();
//   }
//   next();
// });

// app.use(express.json());

// app.get("/", (req, res) => {
//   res.send("API is running...");
// });

// app.get("/api", (req, res) => {
//   res.json({ message: "API working successfully" });
// });

// app.use("/api/users", userRoutes);
// app.use("/api/projects", projectRoutes);
// app.use("/api/teams", teamRoutes);
// app.use("/api/tasks", taskRoutes);
// app.use("/api/assignments", assignmentRoutes);

// export default app;

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

// // ✅ MongoDB Connect
// connectDB();

// const app = express();

// // ✅ SIMPLE & SAFE CORS (No Errors)
// app.use(cors({
//   origin: true,          // allow all origins (localhost + live)
//   credentials: true
// }));

// // ✅ Body parser
// app.use(express.json());

// // ✅ Test Routes
// app.get("/", (req, res) => {
//   res.send("API is running successfully 🚀");
// });

// app.get("/api", (req, res) => {
//   res.json({ message: "API working successfully ✅" });
// });

// // ✅ Main API Routes
// app.use("/api/users", userRoutes);
// app.use("/api/projects", projectRoutes);
// app.use("/api/teams", teamRoutes);
// app.use("/api/tasks", taskRoutes);
// app.use("/api/assignments", assignmentRoutes);

// // ✅ Export app
// export default app;

// import express from "express";
// import dotenv from "dotenv";
// import connectDB from "./config/db.js";

// import userRoutes from "./routes/userRoutes.js";
// import projectRoutes from "./routes/projectRoutes.js";
// import teamRoutes from "./routes/teamRoutes.js";
// import taskRoutes from "./routes/taskRoutes.js";
// import assignmentRoutes from "./routes/assignmentRoutes.js";

// dotenv.config();
// connectDB();

// const app = express();

// // ✅ CORS setup for localhost + production
// const allowedOrigins = [
//   "http://localhost:5173",  // React frontend dev
//   "http://localhost:3000",  // optional
//   "https://task-management-system-wpik.onrender.com" // live frontend
// ];

// app.use((req, res, next) => {
//   const origin = req.headers.origin;
//   if (allowedOrigins.includes(origin)) {
//     res.setHeader("Access-Control-Allow-Origin", origin);
//   }

//   res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, OPTIONS");
//   res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
//   res.setHeader("Access-Control-Allow-Credentials", "true");

//   // Handle preflight requests
//   if (req.method === "OPTIONS") {
//     return res.sendStatus(200);
//   }

//   next();
// });

// // Parse JSON requests
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // ✅ Test route
// app.get("/", (req, res) => {
//   res.json({ message: "API working successfully 🚀" });
// });

// // Routes
// app.use("/api/users", userRoutes);
// app.use("/api/projects", projectRoutes);
// app.use("/api/teams", teamRoutes);
// app.use("/api/tasks", taskRoutes);
// app.use("/api/assignments", assignmentRoutes);

// export default app;


import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import cors from "cors";

import userRoutes from "./routes/userRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import teamRoutes from "./routes/teamRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import assignmentRoutes from "./routes/assignmentRoutes.js";

dotenv.config();
connectDB();

const app = express();

// ✅ CORS CONFIG (Proper for Local + Live)
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  "https://task-management-system-wpik.onrender.com",
  "https://task-management-system-wpik.onrender.com" // 👈 yahan apna Vercel URL daalna
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Test Route
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "API working successfully 🚀"
  });
});

// Routes
app.use("/api/users", userRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/teams", teamRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/assignments", assignmentRoutes);

export default app;
