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

//   const [form, setForm] = useState({
//     name: "",
//     startDate: "",
//     endDate: "",
//     status: "Active",
//   });

//   // Search & Filter
//   const [search, setSearch] = useState("");
//   const [filterStatus, setFilterStatus] = useState("All");

//   const API_URL = "http://localhost:5000/api/projects";

//   // ✅ Fetch Projects
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

//   // ✅ Save Project
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

//   // ✅ Delete Project
//   const deleteProject = async (id) => {
//     try {
//       await axios.delete(`${API_URL}/${id}`);
//       setProjects(projects.filter((p) => p._id !== id));
//     } catch (err) {
//       alert("Error deleting project");
//     }
//   };

//   // ✅ Open Add Modal
//   const openAddModal = () => {
//     setForm({ name: "", startDate: "", endDate: "", status: "Active" });
//     setEditMode(false);
//     setCurrentProject(null);
//     setShowModal(true);
//   };

//   // ✅ Open Edit Modal
//   const openEditModal = (project) => {
//     setForm({
//       name: project.name,
//       startDate: project.startDate?.substring(0, 10) || "",
//       endDate: project.endDate?.substring(0, 10) || "",
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

//   // ✅ Search + Filter Logic
//   const filteredProjects = projects.filter((p) => {
//     const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
//     const matchesStatus = filterStatus === "All" || p.status === filterStatus;
//     return matchesSearch && matchesStatus;
//   });

//   if (loading) return <p className="text-center text-gray-500">Loading projects...</p>;
//   if (error) return <p className="text-center text-red-500">{error}</p>;

//   return (
//     <div className="p-6 relative">
//       <h1 className="text-3xl font-bold mb-6 text-gray-800 flex items-center gap-2">
//         <FaProjectDiagram className="text-blue-600" /> Project Management
//       </h1>

//       {/* Search & Filter */}
//       <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-4 bg-gray-50 p-4 rounded-lg shadow">
//         <div className="relative w-full md:w-1/3">
//           <FaSearch className="absolute top-3 left-3 text-gray-400" />
//           <input
//             type="text"
//             placeholder="Search projects..."
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//             className="w-full pl-10 pr-3 py-2 border rounded-lg"
//           />
//         </div>

//         <select
//           value={filterStatus}
//           onChange={(e) => setFilterStatus(e.target.value)}
//           className="px-3 py-2 border rounded-lg"
//         >
//           <option value="All">All Status</option>
//           <option value="Active">Active</option>
//           <option value="Inactive">Inactive</option>
//         </select>
//       </div>

//       {/* Project Table */}
//       <div className="bg-white shadow-xl rounded-lg overflow-hidden">
//         <table className="w-full border-collapse">
//           <thead className="bg-blue-600 text-white">
//             <tr>
//               <th className="p-3 text-left">Project Name</th>
//               <th className="p-3">Start Date</th>
//               <th className="p-3">End Date</th>
//               <th className="p-3">Status</th>
//               <th className="p-3 text-center">Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredProjects.map((project, idx) => (
//               <tr key={project._id} className={idx % 2 === 0 ? "bg-gray-50" : "bg-white"}>
//                 <td className="p-3 font-medium">{project.name}</td>
//                 <td className="p-3">
//                   {project.startDate
//                     ? new Date(project.startDate).toLocaleDateString()
//                     : "-"}
//                 </td>
//                 <td className="p-3">
//                   {project.endDate
//                     ? new Date(project.endDate).toLocaleDateString()
//                     : "-"}
//                 </td>
//                 <td className="p-3">
//                   <span
//                     className={`px-3 py-1 rounded-full text-sm font-semibold ${project.status === "Inactive"
//                         ? "bg-red-100 text-red-600"
//                         : "bg-green-100 text-green-700"
//                       }`}
//                   >
//                     {project.status}
//                   </span>
//                 </td>
//                 <td className="p-3 flex justify-center gap-2">
//                   <button
//                     onClick={() => openEditModal(project)}
//                     className="bg-yellow-500 text-white px-3 py-1 rounded"
//                   >
//                     <FaEdit />
//                   </button>
//                   <button
//                     onClick={() => deleteProject(project._id)}
//                     className="bg-red-500 text-white px-3 py-1 rounded"
//                   >
//                     <FaTrash />
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Add Button */}
//       <button
//         onClick={openAddModal}
//         className="fixed bottom-8 right-8 bg-blue-600 text-white rounded-full p-4 shadow-lg"
//       >
//         <FaPlus />
//       </button>

//       {/* Modal */}
//       {showModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
//           <div className="bg-white rounded-lg p-6 w-full max-w-md">
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
//                 value={form.startDate}
//                 onChange={(e) => setForm({ ...form, startDate: e.target.value })}
//                 className="w-full border p-2 rounded"
//               />

//               <input
//                 type="date"
//                 value={form.endDate}
//                 onChange={(e) => setForm({ ...form, endDate: e.target.value })}
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
//               <button onClick={closeModal} className="bg-gray-200 px-4 py-2 rounded">
//                 Cancel
//               </button>
//               <button onClick={saveProject} className="bg-blue-600 text-white px-4 py-2 rounded">
//                 {editMode ? "Update" : "Save"}
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import API from "../api";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentProject, setCurrentProject] = useState(null);

  const [form, setForm] = useState({
    name: "",
    description: "",
    status: "Active"
  });

  // ✅ Fetch Projects
  const fetchProjects = async () => {
    try {
      const res = await API.get("/projects");
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

  // ✅ Open Add Modal
  const openAddModal = () => {
    setForm({ name: "", description: "", status: "Active" });
    setEditMode(false);
    setCurrentProject(null);
    setShowModal(true);
  };

  // ✅ Open Edit Modal
  const openEditModal = (project) => {
    setForm({
      name: project.name,
      description: project.description,
      status: project.status
    });
    setCurrentProject(project);
    setEditMode(true);
    setShowModal(true);
  };

  // ✅ Close Modal
  const closeModal = () => {
    setShowModal(false);
  };

  // ✅ Handle Input Change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ Save Project (Add / Update)
  const saveProject = async () => {
    try {
      if (editMode && currentProject) {
        const { data } = await API.put(
          `/projects/${currentProject._id}`,
          form
        );

        setProjects(projects.map(p => p._id === data._id ? data : p));
      } else {
        const { data } = await API.post("/projects", form);
        setProjects([...projects, data]);
      }

      closeModal();
    } catch {
      alert("Error saving project");
    }
  };

  // ✅ Delete Project
  const deleteProject = async (id) => {
    if (!window.confirm("Delete this project?")) return;

    try {
      await API.delete(`/projects/${id}`);
      setProjects(projects.filter(p => p._id !== id));
    } catch {
      alert("Error deleting project");
    }
  };

  if (loading) return <p>Loading projects...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div>
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">Projects</h1>
        <button
          onClick={openAddModal}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          + Add Project
        </button>
      </div>

      {/* Projects Table */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-3 text-left">Name</th>
              <th className="p-3">Description</th>
              <th className="p-3">Status</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>

          <tbody>
            {projects.map(project => (
              <tr key={project._id} className="border-t">
                <td className="p-3">{project.name}</td>
                <td className="p-3">{project.description}</td>
                <td className="p-3">{project.status}</td>
                <td className="p-3 flex gap-2">
                  <button
                    onClick={() => openEditModal(project)}
                    className="bg-yellow-500 text-white px-2 py-1 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteProject(project._id)}
                    className="bg-red-600 text-white px-2 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="bg-white p-6 rounded w-96">
            <h2 className="text-xl mb-4">
              {editMode ? "Edit Project" : "Add Project"}
            </h2>

            <input
              type="text"
              name="name"
              placeholder="Project Name"
              value={form.name}
              onChange={handleChange}
              className="w-full border p-2 mb-3"
            />

            <textarea
              name="description"
              placeholder="Description"
              value={form.description}
              onChange={handleChange}
              className="w-full border p-2 mb-3"
            />

            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="w-full border p-2 mb-3"
            >
              <option value="Active">Active</option>
              <option value="Completed">Completed</option>
            </select>

            <div className="flex justify-end gap-2">
              <button
                onClick={closeModal}
                className="bg-gray-400 text-white px-3 py-1 rounded"
              >
                Cancel
              </button>
              <button
                onClick={saveProject}
                className="bg-green-600 text-white px-3 py-1 rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
