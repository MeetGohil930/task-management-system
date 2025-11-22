import { useEffect, useState } from "react";
import axios from "axios";

export default function TaskBoard() {
  const [tasks, setTasks] = useState([]);

  const columns = [
    { label: "To Do", value: "todo" },
    { label: "In Progress", value: "inprogress" },
    { label: "Done", value: "done" },
  ];

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/tasks");
      setTasks(res.data);
    } catch (error) {
      console.error("Error loading tasks:", error);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await axios.put(`http://localhost:5000/api/tasks/${id}`, { status });
      loadTasks();
    } catch (error) {
      console.error("Status update failed:", error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Task Board</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {columns.map(col => (
          <div key={col.value} className="bg-gray-100 p-4 rounded-xl shadow">
            <h2 className="text-lg font-semibold mb-4">{col.label}</h2>

            {tasks
              .filter(task => task.status === col.value)
              .map(task => (
                <div key={task._id} className="bg-white p-3 rounded-lg shadow mb-3">
                  <p className="font-medium">{task.title}</p>
                  <p className="text-sm text-gray-500">
                    Project: {task.projectId?.name}
                  </p>
                  <p className="text-sm text-gray-500">
                    Team: {task.teamId?.name}
                  </p>

                  <select
                    value={task.status}
                    onChange={(e) => updateStatus(task._id, e.target.value)}
                    className="mt-2 border px-2 py-1 rounded w-full"
                  >
                    {columns.map(c => (
                      <option key={c.value} value={c.value}>
                        {c.label}
                      </option>
                    ))}
                  </select>
                </div>
              ))}
          </div>
        ))}
      </div>
    </div>
  );
}

