// import { useEffect, useState } from "react";
// import axios from "axios";

// const AssignProject = () => {
//   const [projects, setProjects] = useState([]);
//   const [teams, setTeams] = useState([]);
//   const [users, setUsers] = useState([]);

//   const [formData, setFormData] = useState({
//     projectId: "",
//     teamId: "",
//     teamLead: "",   // ✅ userId → teamLead
//   });

//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     try {
//       const [projectRes, teamRes, userRes] = await Promise.all([
//         axios.get("http://localhost:5000/api/projects"),
//         axios.get("http://localhost:5000/api/teams"),
//         axios.get("http://localhost:5000/api/users"),
//       ]);

//       setProjects(projectRes.data);
//       setTeams(teamRes.data);
//       setUsers(userRes.data);
//     } catch (err) {
//       console.error("Fetch Error:", err.response?.data || err.message);
//       setError("Data load nahi ho paaya");
//     }
//   };

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleAssign = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError("");
//     setSuccess("");

//     try {
//       console.log("Sending Data:", formData); // ✅ debug

//       const response = await axios.post(
//         "http://localhost:5000/api/assignments",
//         formData,
//         {
//           headers: { "Content-Type": "application/json" },
//         }
//       );

//       setSuccess("Project successfully assigned ✅");
//       setFormData({ projectId: "", teamId: "", teamLead: "" });
//       console.log("Assignment Response:", response.data);
//     } catch (err) {
//       console.error("Assign Error:", err.response?.data || err.message);
//       setError(err.response?.data?.message || "Assignment failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="p-6 max-w-xl mx-auto bg-white rounded-xl shadow-md">
//       <h2 className="text-xl font-bold mb-4">Assign Project</h2>

//       {error && <p className="text-red-600 mb-2">{error}</p>}
//       {success && <p className="text-green-600 mb-2">{success}</p>}

//       <form onSubmit={handleAssign} className="space-y-4">

//         {/* Project */}
//         <select
//           name="projectId"
//           value={formData.projectId}
//           onChange={handleChange}
//           required
//           className="w-full border p-2 rounded"
//         >
//           <option value="">Select Project</option>
//           {projects.map((p) => (
//             <option key={p._id} value={p._id}>{p.name}</option>
//           ))}
//         </select>

//         {/* Team */}
//         <select
//           name="teamId"
//           value={formData.teamId}
//           onChange={handleChange}
//           required
//           className="w-full border p-2 rounded"
//         >
//           <option value="">Select Team</option>
//           {teams.map((t) => (
//             <option key={t._id} value={t._id}>{t.name}</option>
//           ))}
//         </select>

//         {/* Team Lead */}
//         <select
//           name="teamLead"   // ✅ changed
//           value={formData.teamLead}
//           onChange={handleChange}
//           required
//           className="w-full border p-2 rounded"
//         >
//           <option value="">Select Team Lead</option>
//           {users.map((u) => (
//             <option key={u._id} value={u._id}>{u.name}</option>
//           ))}
//         </select>

//         <button
//           type="submit"
//           disabled={loading}
//           className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//         >
//           {loading ? "Assigning..." : "Assign Project"}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default AssignProject;

import { useEffect, useState } from "react";
import axios from "axios";

const AssignProject = () => {
  const [projects, setProjects] = useState([]);
  const [teams, setTeams] = useState([]);
  const [users, setUsers] = useState([]);

  const [formData, setFormData] = useState({
    projectId: "",
    teamId: "",
    teamLead: "",   // ✅ userId → teamLead
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [projectRes, teamRes, userRes] = await Promise.all([
        axios.get("https://task-api.onrender.com/api/projects"),
        axios.get("https://task-api.onrender.com/api/teams"),
        axios.get("https://task-api.onrender.com/api/users"),
      ]);

      setProjects(projectRes.data);
      setTeams(teamRes.data);
      setUsers(userRes.data);
    } catch (err) {
      console.error("Fetch Error:", err.response?.data || err.message);
      setError("Data load nahi ho paaya");
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAssign = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await axios.post(
        "https://task-api.onrender.com/api/assignments",
        formData,
        { headers: { "Content-Type": "application/json" } }
      );

      setSuccess("Project successfully assigned ✅");
      setFormData({ projectId: "", teamId: "", teamLead: "" });
      console.log("Assignment Response:", response.data);
    } catch (err) {
      console.error("Assign Error:", err.response?.data || err.message);
      setError(err.response?.data?.message || "Assignment failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto bg-white rounded-xl shadow-md">
      <h2 className="text-xl font-bold mb-4">Assign Project</h2>

      {error && <p className="text-red-600 mb-2">{error}</p>}
      {success && <p className="text-green-600 mb-2">{success}</p>}

      <form onSubmit={handleAssign} className="space-y-4">
        <select
          name="projectId"
          value={formData.projectId}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        >
          <option value="">Select Project</option>
          {projects.map((p) => (
            <option key={p._id} value={p._id}>{p.name}</option>
          ))}
        </select>

        <select
          name="teamId"
          value={formData.teamId}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        >
          <option value="">Select Team</option>
          {teams.map((t) => (
            <option key={t._id} value={t._id}>{t.name}</option>
          ))}
        </select>

        <select
          name="teamLead"
          value={formData.teamLead}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        >
          <option value="">Select Team Lead</option>
          {users.map((u) => (
            <option key={u._id} value={u._id}>{u.name}</option>
          ))}
        </select>

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {loading ? "Assigning..." : "Assign Project"}
        </button>
      </form>
    </div>
  );
};

export default AssignProject;
