import { useEffect, useState } from "react";
import API from "../api";
import Card from "../components/Card";
import ChartBar from "../components/ChartBar";
import ChartPie from "../components/ChartPie";
import TaskTable from "../components/TaskTable";

export default function Dashboard() {
  const [stats, setStats] = useState({
    users: 0,
    projects: 0,
    tasks: 0,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchStats = async () => {
    try {
      const [usersRes, projectsRes, tasksRes] = await Promise.all([
        API.get("http://localhost:5000/api/users/count"),
        API.get("http://localhost:5000/api/projects/count"),
        API.get("http://localhost:5000/api/tasks/count"),
      ]);

      setStats({
        users: usersRes.data.count,
        projects: projectsRes.data.count,
        tasks: tasksRes.data.count,
      });
    } catch (err) {
      setError(err.response?.data?.message || "Error loading dashboard data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  if (loading) return <p>Loading dashboard...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      {/* Top Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card title="Total Users" value={stats.users} />
        <Card title="Total Projects" value={stats.projects} />
        <Card title="Total Tasks" value={stats.tasks} />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <ChartBar />
        <ChartPie />
      </div>

      {/* Task Table */}
      <TaskTable />
    </div>
  );
}
