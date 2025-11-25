import { useState, useEffect } from "react";
import axios from "axios";
import { FaTrash, FaEdit, FaPlus } from "react-icons/fa";
import API from "../api"; // instead of hardcoded axios URLs

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  const [form, setForm] = useState({
    title: "",
    description: "",
    projectId: "",
    teamId: "",
    status: "todo",
    priority: "Low",
    dueDate: "",
  });

  const [projects, setProjects] = useState([]);
  const [teams, setTeams] = useState([]);

  // const API_URL = "http://localhost:5000/api/tasks";
  // const PROJECTS_API = "http://localhost:5000/api/projects";
  // const TEAMS_API = "http://localhost:5000/api/teams";

  // LIVE API URLs
  const API_URL = "https://task-management-system-wpik.onrender.com/api/tasks";
  const PROJECTS_API = "https://task-management-system-wpik.onrender.com/api/projects";
  const TEAMS_API = "https://task-management-system-wpik.onrender.com/api/teams";



  // Fetch tasks, projects, and teams
  const fetchData = async () => {
    try {
      const [tasksRes, projectsRes, teamsRes] = await Promise.all([
        axios.get(API_URL),
        axios.get(PROJECTS_API),
        axios.get(TEAMS_API),
      ]);
      setTasks(tasksRes.data);
      setProjects(projectsRes.data);
      setTeams(teamsRes.data);
    } catch (err) {
      setError("Error fetching data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const saveTask = async () => {
    if (!form.title || !form.projectId || !form.teamId) {
      alert("Title, Project, and Team are required");
      return;
    }

    try {
      if (editMode && currentTask) {
        const { data } = await axios.put(`${API_URL}/${currentTask._id}`, form);
        setTasks(tasks.map((t) => (t._id === data._id ? data : t)));
      } else {
        const { data } = await axios.post(API_URL, form);
        setTasks([...tasks, data]);
      }
      closeModal();
    } catch (err) {
      alert("Error saving task");
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setTasks(tasks.filter((t) => t._id !== id));
    } catch (err) {
      alert("Error deleting task");
    }
  };

  const openAddModal = () => {
    setForm({
      title: "",
      description: "",
      projectId: "",
      teamId: "",
      status: "todo",
      priority: "Low",
      dueDate: "",
    });
    setEditMode(false);
    setCurrentTask(null);
    setShowModal(true);
  };

  const openEditModal = (task) => {
    setForm({
      title: task.title,
      description: task.description,
      projectId: task.projectId?._id || "",
      teamId: task.teamId?._id || "",
      status: task.status,
      priority: task.priority,
      dueDate: task.dueDate ? task.dueDate.split("T")[0] : "",
    });
    setEditMode(true);
    setCurrentTask(task);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditMode(false);
    setCurrentTask(null);
  };

  if (loading) return <p className="text-center text-gray-500">Loading tasks...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="p-6 relative">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 flex items-center gap-2">
        <FaPlus className="text-blue-600" /> Task Management
      </h1>

      {/* Tasks Table */}
      <div className="bg-white shadow-xl rounded-lg overflow-hidden">
        <table className="w-full border-collapse">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-3 text-left">Title</th>
              <th className="p-3">Project</th>
              <th className="p-3">Team</th>
              <th className="p-3">Status</th>
              <th className="p-3">Priority</th>
              <th className="p-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task, idx) => (
              <tr
                key={task._id}
                className={`transition duration-200 hover:bg-gray-100 ${idx % 2 === 0 ? "bg-gray-50" : "bg-white"
                  }`}
              >
                <td className="p-3 font-medium text-gray-800">{task.title}</td>
                <td className="p-3 text-gray-600">{task.projectId?.name}</td>
                <td className="p-3 text-gray-600">{task.teamId?.name}</td>
                <td className="p-3 capitalize">{task.status}</td>
                <td className="p-3">{task.priority}</td>
                <td className="p-3 flex justify-center gap-2">
                  <button
                    onClick={() => openEditModal(task)}
                    className="flex items-center gap-1 bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded text-sm shadow"
                  >
                    <FaEdit /> Edit
                  </button>
                  <button
                    onClick={() => deleteTask(task._id)}
                    className="flex items-center gap-1 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm shadow"
                  >
                    <FaTrash /> Delete
                  </button>
                </td>
              </tr>
            ))}
            {tasks.length === 0 && (
              <tr>
                <td colSpan="6" className="p-6 text-center text-gray-500">
                  No tasks found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Floating Add Button */}
      <button
        onClick={openAddModal}
        className="fixed bottom-8 right-8 bg-blue-600 hover:bg-blue-700 text-white rounded-full p-4 shadow-lg flex items-center gap-2"
      >
        <FaPlus /> Add Task
      </button>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl">
            <h2 className="text-xl font-bold mb-4">{editMode ? "Edit Task" : "Add Task"}</h2>
            <div className="space-y-3">
              <input
                type="text"
                placeholder="Title"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="w-full border p-2 rounded"
              />
              <textarea
                placeholder="Description"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                className="w-full border p-2 rounded"
              />
              <select
                value={form.projectId}
                onChange={(e) => setForm({ ...form, projectId: e.target.value })}
                className="w-full border p-2 rounded"
              >
                <option value="">Select Project</option>
                {projects.map((p) => (
                  <option key={p._id} value={p._id}>
                    {p.name}
                  </option>
                ))}
              </select>
              <select
                value={form.teamId}
                onChange={(e) => setForm({ ...form, teamId: e.target.value })}
                className="w-full border p-2 rounded"
              >
                <option value="">Select Team</option>
                {teams.map((t) => (
                  <option key={t._id} value={t._id}>
                    {t.name}
                  </option>
                ))}
              </select>
              <select
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value })}
                className="w-full border p-2 rounded"
              >
                <option value="todo">To Do</option>
                <option value="inprogress">In Progress</option>
                <option value="done">Done</option>
              </select>
              <select
                value={form.priority}
                onChange={(e) => setForm({ ...form, priority: e.target.value })}
                className="w-full border p-2 rounded"
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
              <input
                type="date"
                value={form.dueDate}
                onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
                className="w-full border p-2 rounded"
              />
            </div>

            <div className="mt-6 flex justify-end gap-2">
              <button
                onClick={closeModal}
                className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={saveTask}
                className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 text-white"
              >
                {editMode ? "Update" : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
