// import { Routes, Route } from "react-router-dom";
// import DashboardLayout from "./layouts/DashboardLayout";
// import Dashboard from "./pages/Dashboard";
// import Users from "./pages/Users";
// import Projects from "./pages/Projects";
// import Teams from "./pages/Teams";
// import Tasks from "./pages/Tasks";
// import AssignProject from "./pages/AssignProject";
// import Settings from "./pages/Settings";
// import TaskBoard from "./pages/TaskBoard";
// import Login from "./pages/Login";
// import Register from "./pages/Register";
// import Logout from "./pages/Logout";

// function App() {
//   return (
//     <Routes>
//       <Route path="/login" element={<Login />} />
//       <Route path="/register" element={<Register />} />
//        <Route path="/logout" element={<Logout />} />
//       <Route path="/" element={<DashboardLayout />}>
//         <Route index element={<Dashboard />} />
//         <Route path="users" element={<Users />} />
//         <Route path="projects" element={<Projects />} />
//         <Route path="teams" element={<Teams />} />
//         <Route path="tasks" element={<Tasks />} />
//         <Route path="assign-project" element={<AssignProject />} />
//         <Route path="task-board" element={<TaskBoard />} />
//         <Route path="settings" element={<Settings />} />
//       </Route>
//     </Routes>
//   );
// }

// export default App;

import { Routes, Route } from "react-router-dom";
import DashboardLayout from "./layouts/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import Projects from "./pages/Projects";
import Teams from "./pages/Teams";
import Tasks from "./pages/Tasks";
import AssignProject from "./pages/AssignProject";
import Settings from "./pages/Settings";
import TaskBoard from "./pages/TaskBoard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Logout from "./pages/Logout";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/logout" element={<Logout />} />

      {/* Protected Routes */}
      <Route
        path="/"
        element={
          <PrivateRoute>
            <DashboardLayout />
          </PrivateRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="users" element={<Users />} />
        <Route path="projects" element={<Projects />} />
        <Route path="teams" element={<Teams />} />
        <Route path="tasks" element={<Tasks />} />
        <Route path="assign-project" element={<AssignProject />} />
        <Route path="task-board" element={<TaskBoard />} />
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  );
}

export default App;
