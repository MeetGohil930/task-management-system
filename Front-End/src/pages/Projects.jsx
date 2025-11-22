// import { useState, useEffect } from "react";
// import axios from "axios";
// import { FaTrash, FaEdit, FaPlus, FaProjectDiagram, FaSearch } from "react-icons/fa";

// export default function Projects() {
//   const [projects, setProjects] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   // Modal state
//   const [showModal, setShowModal] = useState(false);
//   const [editMode, setEditMode] = useState(false);
//   const [currentProject, setCurrentProject] = useState(null);
//   const [form, setForm] = useState({ name: "", date: "", status: "Active" });

//   // Search & Filter
//   const [search, setSearch] = useState("");
//   const [filterStatus, setFilterStatus] = useState("All");

//   const API_URL = "http://localhost:5000/api/projects";

//   const fetchProjects = async () => {
//     try {
//       const res = await axios.get(API_URL);
//       setProjects(res.data);
//     } catch (err) {
//       setError("Error fetching projects");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchProjects();
//   }, []);

//   const saveProject = async () => {
//     try {
//       if (editMode && currentProject) {
//         const { data } = await axios.put(`${API_URL}/${currentProject._id}`, form);
//         setProjects(projects.map((p) => (p._id === data._id ? data : p)));
//       } else {
//         const { data } = await axios.post(API_URL, form);
//         setProjects([...projects, data]);
//       }
//       closeModal();
//     } catch (err) {
//       alert("Error saving project");
//     }
//   };

//   const deleteProject = async (id) => {
//     try {
//       await axios.delete(`${API_URL}/${id}`);
//       setProjects(projects.filter((p) => p._id !== id));
//     } catch (err) {
//       alert("Error deleting project");
//     }
//   };

//   const openAddModal = () => {
//     setForm({ name: "", date: "", status: "Active" });
//     setEditMode(false);
//     setCurrentProject(null);
//     setShowModal(true);
//   };

//   const openEditModal = (project) => {
//     setForm({
//       name: project.name,
//       date: project.date,
//       status: project.status,
//     });
//     setEditMode(true);
//     setCurrentProject(project);
//     setShowModal(true);
//   };

//   const closeModal = () => {
//     setShowModal(false);
//     setEditMode(false);
//     setCurrentProject(null);
//   };

//   // Search & Filter
//   const filteredProjects = projects.filter((p) => {
//     const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
//     const matchesStatus = filterStatus === "All" || p.status === filterStatus;
//     return matchesSearch && matchesStatus;
//   });

//   if (loading) return <p className="text-center text-gray-500">Loading projects...</p>;
//   if (error) return <p className="text-center text-red-500">{error}</p>;

//   return (
//     <div className="p-6 relative">
//       {/* Page Title */}
//       <h1 className="text-3xl font-bold mb-6 text-gray-800 flex items-center gap-2">
//         <FaProjectDiagram className="text-blue-600" /> Project Management
//       </h1>

//       {/* 🔍 Search & Filter */}
//       <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-4 bg-gray-50 p-4 rounded-lg shadow">
//         <div className="relative w-full md:w-1/3">
//           <FaSearch className="absolute top-3 left-3 text-gray-400" />
//           <input
//             type="text"
//             placeholder="Search projects..."
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//             className="w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
//           />
//         </div>

//         <select
//           value={filterStatus}
//           onChange={(e) => setFilterStatus(e.target.value)}
//           className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
//         >
//           <option value="All">All Status</option>
//           <option value="Active">Active</option>
//           <option value="Inactive">Inactive</option>
//         </select>
//       </div>

//       {/* Table */}
//       <div className="bg-white shadow-xl rounded-lg overflow-hidden">
//         <table className="w-full border-collapse">
//           <thead className="bg-gradient-to-r from-blue-500 to-blue-700 text-white">
//             <tr>
//               <th className="p-3 text-left">Project Name</th>
//               <th className="p-3">Date</th>
//               <th className="p-3">Status</th>
//               <th className="p-3 text-center">Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredProjects.map((project, idx) => (
//               <tr
//                 key={project._id}
//                 className={`transition duration-200 hover:bg-gray-100 ${
//                   idx % 2 === 0 ? "bg-gray-50" : "bg-white"
//                 }`}
//               >
//                 <td className="p-3 font-medium text-gray-800">{project.name}</td>
//                 <td className="p-3 text-gray-600">{project.date}</td>
//                 <td className="p-3">
//                   <span
//                     className={`px-3 py-1 rounded-full text-sm font-semibold ${
//                       project.status === "Inactive"
//                         ? "bg-red-100 text-red-600"
//                         : "bg-green-100 text-green-700"
//                     }`}
//                   >
//                     {project.status}
//                   </span>
//                 </td>
//                 <td className="p-3 flex justify-center gap-3">
//                   <button
//                     onClick={() => openEditModal(project)}
//                     className="flex items-center gap-1 bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded text-sm shadow"
//                   >
//                     <FaEdit /> Edit
//                   </button>
//                   <button
//                     onClick={() => deleteProject(project._id)}
//                     className="flex items-center gap-1 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm shadow"
//                   >
//                     <FaTrash /> Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//             {filteredProjects.length === 0 && (
//               <tr>
//                 <td colSpan="4" className="p-6 text-center text-gray-500">
//                   No projects found.
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>

//       {/* Floating Add Button */}
//       <button
//         onClick={openAddModal}
//         className="fixed bottom-8 right-8 bg-blue-600 hover:bg-blue-700 text-white rounded-full p-4 shadow-lg flex items-center gap-2"
//       >
//         <FaPlus /> Add Project
//       </button>

//       {/* Modal */}
//       {showModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
//           <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl">
//             <h2 className="text-xl font-bold mb-4">
//               {editMode ? "Edit Project" : "Add New Project"}
//             </h2>

//             <div className="space-y-3">
//               <input
//                 type="text"
//                 placeholder="Project Name"
//                 value={form.name}
//                 onChange={(e) => setForm({ ...form, name: e.target.value })}
//                 className="w-full border p-2 rounded"
//               />
//               <input
//                 type="date"
//                 value={form.date}
//                 onChange={(e) => setForm({ ...form, date: e.target.value })}
//                 className="w-full border p-2 rounded"
//               />
//               <select
//                 value={form.status}
//                 onChange={(e) => setForm({ ...form, status: e.target.value })}
//                 className="w-full border p-2 rounded"
//               >
//                 <option value="Active">Active</option>
//                 <option value="Inactive">Inactive</option>
//               </select>
//             </div>

//             <div className="mt-6 flex justify-end gap-2">
//               <button
//                 onClick={closeModal}
//                 className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={saveProject}
//                 className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 text-white"
//               >
//                 {editMode ? "Update" : "Save"}
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

import { useState, useEffect } from "react";
import axios from "axios";
import { FaTrash, FaEdit, FaPlus, FaProjectDiagram, FaSearch } from "react-icons/fa";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentProject, setCurrentProject] = useState(null);

  const [form, setForm] = useState({
    name: "",
    startDate: "",
    endDate: "",
    status: "Active",
  });

  // Search & Filter
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");

  const API_URL = "http://localhost:5000/api/projects";

  // ✅ Fetch Projects
  const fetchProjects = async () => {
    try {
      const res = await axios.get(API_URL);
      setProjects(res.data);
    } catch (err) {
      setError("Error fetching projects");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  // ✅ Save Project
  const saveProject = async () => {
    try {
      if (editMode && currentProject) {
        const { data } = await axios.put(`${API_URL}/${currentProject._id}`, form);
        setProjects(projects.map((p) => (p._id === data._id ? data : p)));
      } else {
        const { data } = await axios.post(API_URL, form);
        setProjects([...projects, data]);
      }
      closeModal();
    } catch (err) {
      alert("Error saving project");
    }
  };

  // ✅ Delete Project
  const deleteProject = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setProjects(projects.filter((p) => p._id !== id));
    } catch (err) {
      alert("Error deleting project");
    }
  };

  // ✅ Open Add Modal
  const openAddModal = () => {
    setForm({ name: "", startDate: "", endDate: "", status: "Active" });
    setEditMode(false);
    setCurrentProject(null);
    setShowModal(true);
  };

  // ✅ Open Edit Modal
  const openEditModal = (project) => {
    setForm({
      name: project.name,
      startDate: project.startDate?.substring(0, 10) || "",
      endDate: project.endDate?.substring(0, 10) || "",
      status: project.status,
    });
    setEditMode(true);
    setCurrentProject(project);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditMode(false);
    setCurrentProject(null);
  };

  // ✅ Search + Filter Logic
  const filteredProjects = projects.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = filterStatus === "All" || p.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  if (loading) return <p className="text-center text-gray-500">Loading projects...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="p-6 relative">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 flex items-center gap-2">
        <FaProjectDiagram className="text-blue-600" /> Project Management
      </h1>

      {/* Search & Filter */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-4 bg-gray-50 p-4 rounded-lg shadow">
        <div className="relative w-full md:w-1/3">
          <FaSearch className="absolute top-3 left-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search projects..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-3 py-2 border rounded-lg"
          />
        </div>

        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-3 py-2 border rounded-lg"
        >
          <option value="All">All Status</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
      </div>

      {/* Project Table */}
      <div className="bg-white shadow-xl rounded-lg overflow-hidden">
        <table className="w-full border-collapse">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="p-3 text-left">Project Name</th>
              <th className="p-3">Start Date</th>
              <th className="p-3">End Date</th>
              <th className="p-3">Status</th>
              <th className="p-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredProjects.map((project, idx) => (
              <tr key={project._id} className={idx % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                <td className="p-3 font-medium">{project.name}</td>
                <td className="p-3">
                  {project.startDate
                    ? new Date(project.startDate).toLocaleDateString()
                    : "-"}
                </td>
                <td className="p-3">
                  {project.endDate
                    ? new Date(project.endDate).toLocaleDateString()
                    : "-"}
                </td>
                <td className="p-3">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${project.status === "Inactive"
                        ? "bg-red-100 text-red-600"
                        : "bg-green-100 text-green-700"
                      }`}
                  >
                    {project.status}
                  </span>
                </td>
                <td className="p-3 flex justify-center gap-2">
                  <button
                    onClick={() => openEditModal(project)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => deleteProject(project._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Button */}
      <button
        onClick={openAddModal}
        className="fixed bottom-8 right-8 bg-blue-600 text-white rounded-full p-4 shadow-lg"
      >
        <FaPlus />
      </button>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">
              {editMode ? "Edit Project" : "Add New Project"}
            </h2>

            <div className="space-y-3">
              <input
                type="text"
                placeholder="Project Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full border p-2 rounded"
              />

              <input
                type="date"
                value={form.startDate}
                onChange={(e) => setForm({ ...form, startDate: e.target.value })}
                className="w-full border p-2 rounded"
              />

              <input
                type="date"
                value={form.endDate}
                onChange={(e) => setForm({ ...form, endDate: e.target.value })}
                className="w-full border p-2 rounded"
              />

              <select
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value })}
                className="w-full border p-2 rounded"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>

            <div className="mt-6 flex justify-end gap-2">
              <button onClick={closeModal} className="bg-gray-200 px-4 py-2 rounded">
                Cancel
              </button>
              <button onClick={saveProject} className="bg-blue-600 text-white px-4 py-2 rounded">
                {editMode ? "Update" : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}