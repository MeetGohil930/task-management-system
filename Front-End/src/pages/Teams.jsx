// import { useState, useEffect } from "react";
// import axios from "axios";
// import { FaUsers, FaUserTie, FaTrash, FaEdit, FaPlus } from "react-icons/fa";

// export default function Teams() {
//   const [teams, setTeams] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   // Modal state
//   const [showModal, setShowModal] = useState(false);
//   const [editMode, setEditMode] = useState(false);
//   const [currentTeam, setCurrentTeam] = useState(null);
//   const [form, setForm] = useState({
//     name: "",
//     leader: "",
//     members: [],
//     status: "Active",
//   });

//   const API_URL = "http://localhost:5000/api/teams";

//   // Fetch all teams
//   const fetchTeams = async () => {
//     try {
//       const { data } = await axios.get(API_URL);
//       setTeams(data);
//     } catch (err) {
//       setError("Error fetching teams");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchTeams();
//   }, []);

//   // Save new or edited team
//   const saveTeam = async () => {
//     if (!form.name.trim() || !form.leader.trim()) {
//       alert("Team name and leader are required");
//       return;
//     }

//     try {
//       if (editMode && currentTeam) {
//         const { data } = await axios.put(`${API_URL}/${currentTeam._id}`, form);
//         setTeams(teams.map((t) => (t._id === data._id ? data : t)));
//       } else {
//         const { data } = await axios.post(API_URL, form);
//         setTeams([...teams, data]);
//       }
//       closeModal();
//     } catch (err) {
//       alert("Error saving team");
//     }
//   };

//   // Delete team
//   const deleteTeam = async (id) => {
//     try {
//       await axios.delete(`${API_URL}/${id}`);
//       setTeams(teams.filter((t) => t._id !== id));
//     } catch (err) {
//       alert("Error deleting team");
//     }
//   };

//   const openAddModal = () => {
//     setForm({ name: "", leader: "", members: [], status: "Active" });
//     setEditMode(false);
//     setCurrentTeam(null);
//     setShowModal(true);
//   };

//   const openEditModal = (team) => {
//     setForm({
//       name: team.name || "",
//       leader: typeof team.leader === "object" ? team.leader._id : team.leader || "",
//       members: Array.isArray(team.members)
//         ? team.members.map((m) => (typeof m === "object" ? m._id : m))
//         : [],
//       status: team.status || "Active",
//     });
//     setEditMode(true);
//     setCurrentTeam(team);
//     setShowModal(true);
//   };

//   const closeModal = () => {
//     setShowModal(false);
//     setEditMode(false);
//     setCurrentTeam(null);
//   };

//   if (loading)
//     return <p className="text-center text-gray-500">Loading teams...</p>;
//   if (error) return <p className="text-center text-red-500">{error}</p>;

//   return (
//     <div className="p-6 relative">
//       <h1 className="text-3xl font-bold mb-6 text-gray-800 flex items-center gap-2">
//         <FaUsers className="text-blue-600" /> Team Management
//       </h1>

//       {/* Teams Table */}
//       <div className="bg-white shadow-xl rounded-lg overflow-hidden">
//         <table className="w-full border-collapse">
//           <thead className="bg-gradient-to-r from-blue-500 to-blue-700 text-white">
//             <tr>
//               <th className="p-3 text-left">Team</th>
//               <th className="p-3">Leader</th>
//               <th className="p-3">Members</th>
//               <th className="p-3">Status</th>
//               <th className="p-3 text-center">Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {teams.map((team, idx) => (
//               <tr
//                 key={team._id}
//                 className={`transition duration-200 hover:bg-gray-100 ${
//                   idx % 2 === 0 ? "bg-gray-50" : "bg-white"
//                 }`}
//               >
//                 <td className="p-3 font-medium text-gray-800 flex items-center gap-2">
//                   <FaUsers className="text-blue-500" /> {team.name}
//                 </td>

//                 <td className="p-3 text-gray-600 flex items-center gap-2">
//                   <FaUserTie className="text-gray-500" />{" "}
//                   {team.leader
//                     ? typeof team.leader === "object"
//                       ? team.leader.name
//                       : team.leader
//                     : "N/A"}
//                 </td>

//                 <td className="p-3 text-gray-600">
//                   {team.members && team.members.length > 0
//                     ? team.members
//                         .map((m) =>
//                           typeof m === "object" ? m.name || m._id : m
//                         )
//                         .join(", ")
//                     : "No members"}
//                 </td>

//                 <td className="p-3">
//                   <span
//                     className={`px-3 py-1 rounded-full text-sm font-semibold ${
//                       team.status === "Inactive"
//                         ? "bg-red-100 text-red-600"
//                         : "bg-green-100 text-green-700"
//                     }`}
//                   >
//                     {team.status}
//                   </span>
//                 </td>

//                 <td className="p-3 flex justify-center gap-3">
//                   <button
//                     onClick={() => openEditModal(team)}
//                     className="flex items-center gap-1 bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded text-sm shadow"
//                   >
//                     <FaEdit /> Edit
//                   </button>
//                   <button
//                     onClick={() => deleteTeam(team._id)}
//                     className="flex items-center gap-1 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm shadow"
//                   >
//                     <FaTrash /> Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//             {teams.length === 0 && (
//               <tr>
//                 <td colSpan="5" className="p-6 text-center text-gray-500">
//                   No teams found.
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
//         <FaPlus /> Add Team
//       </button>

//       {/* Modal */}
//       {showModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
//           <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl">
//             <h2 className="text-xl font-bold mb-4">
//               {editMode ? "Edit Team" : "Add New Team"}
//             </h2>

//             <div className="space-y-3">
//               <input
//                 type="text"
//                 placeholder="Team Name"
//                 value={form.name}
//                 onChange={(e) => setForm({ ...form, name: e.target.value })}
//                 className="w-full border p-2 rounded"
//               />
//               <input
//                 type="text"
//                 placeholder="Team Leader (ID or name)"
//                 value={form.leader}
//                 onChange={(e) => setForm({ ...form, leader: e.target.value })}
//                 className="w-full border p-2 rounded"
//               />
//               <input
//                 type="text"
//                 placeholder="Members (comma separated IDs or names)"
//                 value={form.members.join(", ")}
//                 onChange={(e) =>
//                   setForm({
//                     ...form,
//                     members: e.target.value
//                       .split(",")
//                       .map((m) => m.trim())
//                       .filter(Boolean),
//                   })
//                 }
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
//                 onClick={saveTeam}
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
import { FaUsers, FaUserTie, FaTrash, FaEdit, FaPlus } from "react-icons/fa";

export default function Teams() {
  const [teams, setTeams] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentTeam, setCurrentTeam] = useState(null);
  const [form, setForm] = useState({
    name: "",
    leader: "",
    members: [],
    status: "Active",
  });

  const API_URL = "http://localhost:5000/api/teams";
  const USERS_URL = "http://localhost:5000/api/users";

  const fetchTeams = async () => {
    try {
      const { data } = await axios.get(API_URL);
      setTeams(data);
    } catch (err) {
      setError("Error fetching teams");
    } finally {
      setLoading(false);
    }
  };

  const fetchUsers = async () => {
    try {
      const { data } = await axios.get(USERS_URL);
      setUsers(data);
    } catch (err) {
      console.error("Error fetching users", err);
    }
  };

  useEffect(() => {
    fetchTeams();
    fetchUsers();
  }, []);

  const saveTeam = async () => {
    if (!form.name || !form.leader) {
      alert("Team name and leader are required");
      return;
    }

    try {
      if (editMode && currentTeam) {
        const { data } = await axios.put(`${API_URL}/${currentTeam._id}`, form, {
          headers: { "Content-Type": "application/json" },
        });
        setTeams(teams.map((t) => (t._id === data._id ? data : t)));
      } else {
        const { data } = await axios.post(API_URL, form, {
          headers: { "Content-Type": "application/json" },
        });
        setTeams([...teams, data]);
      }
      closeModal();
    } catch (err) {
      console.error("Save Team Error:", err.response?.data || err.message);
      alert(err.response?.data?.message || "Error saving team");
    }
  };

  const deleteTeam = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setTeams(teams.filter((t) => t._id !== id));
    } catch (err) {
      alert("Error deleting team");
    }
  };

  const openAddModal = () => {
    setForm({ name: "", leader: "", members: [], status: "Active" });
    setEditMode(false);
    setCurrentTeam(null);
    setShowModal(true);
  };

  const openEditModal = (team) => {
    setForm({
      name: team.name,
      leader: team.leader?._id || team.leader || "",
      members: team.members?.map((m) => m._id || m) || [],
      status: team.status,
    });
    setEditMode(true);
    setCurrentTeam(team);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditMode(false);
    setCurrentTeam(null);
  };

  if (loading) return <p className="text-center">Loading teams...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
        <FaUsers /> Team Management
      </h1>

      <table className="w-full bg-white shadow rounded">
        <thead className="bg-blue-600 text-white">
          <tr>
            <th className="p-3">Team</th>
            <th className="p-3">Leader</th>
            <th className="p-3">Members</th>
            <th className="p-3">Status</th>
            <th className="p-3">Action</th>
          </tr>
        </thead>
        <tbody>
          {teams.map((team) => (
            <tr key={team._id} className="border-t">
              <td className="p-3">{team.name}</td>
              <td className="p-3">
                {team.leader?.name || "N/A"}
              </td>
              <td className="p-3">
                {team.members?.length
                  ? team.members.map((m) => m.name || m).join(", ")
                  : "No members"}
              </td>
              <td className="p-3">{team.status}</td>
              <td className="p-3 flex gap-2">
                <button onClick={() => openEditModal(team)} className="bg-yellow-500 text-white px-2 py-1 rounded">
                  <FaEdit />
                </button>
                <button onClick={() => deleteTeam(team._id)} className="bg-red-600 text-white px-2 py-1 rounded">
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button onClick={openAddModal} className="fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full">
        <FaPlus />
      </button>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded w-96">
            <h2 className="text-xl mb-4">{editMode ? "Edit Team" : "Add Team"}</h2>

            <input
              className="w-full border p-2 mb-2"
              placeholder="Team Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />

            <select
              className="w-full border p-2 mb-2"
              value={form.leader}
              onChange={(e) => setForm({ ...form, leader: e.target.value })}
            >
              <option value="">Select Leader</option>
              {users.map((u) => (
                <option key={u._id} value={u._id}>{u.name}</option>
              ))}
            </select>

            <select
              multiple
              className="w-full border p-2 mb-2 h-24"
              value={form.members}
              onChange={(e) =>
                setForm({
                  ...form,
                  members: Array.from(e.target.selectedOptions).map((o) => o.value),
                })
              }
            >
              {users.map((u) => (
                <option key={u._id} value={u._id}>{u.name}</option>
              ))}
            </select>

            <select
              className="w-full border p-2"
              value={form.status}
              onChange={(e) => setForm({ ...form, status: e.target.value })}
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>

            <div className="mt-4 flex justify-end gap-2">
              <button onClick={closeModal} className="px-3 py-1 bg-gray-300 rounded">Cancel</button>
              <button onClick={saveTeam} className="px-3 py-1 bg-blue-600 text-white rounded">Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}