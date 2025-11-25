// import { useEffect, useState } from "react";
// import API from "../api";
// import { FaTrash, FaEdit, FaUser, FaPlus, FaSearch } from "react-icons/fa";

// export default function Users() {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [actionError, setActionError] = useState("");

//   const [showModal, setShowModal] = useState(false);
//   const [editMode, setEditMode] = useState(false);
//   const [currentUser, setCurrentUser] = useState(null);
//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     role: "User",
//     status: "Active",
//   });

//   // Search & Filter state
//   const [search, setSearch] = useState("");
//   const [filterRole, setFilterRole] = useState("All");
//   const [filterStatus, setFilterStatus] = useState("All");

//   const fetchUsers = async () => {
//     try {
//       const { data } = await API.get("http://localhost:5000/api/users");
//       setUsers(data);
//     } catch (err) {
//       setError(err.response?.data?.message || "Error fetching users");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   const saveUser = async () => {
//     setActionError("");
//     try {
//       if (editMode && currentUser) {
//         const { data } = await API.put(
//           `http://localhost:5000/api/users/${currentUser._id}`,
//           form
//         );
//         setUsers(users.map((u) => (u._id === data._id ? data : u)));
//       } else {
//         const { data } = await API.post("http://localhost:5000/api/users", form);
//         setUsers([...users, data]);
//       }
//       closeModal();
//     } catch (err) {
//       setActionError(err.response?.data?.message || "Error saving user");
//     }
//   };

//   const deleteUser = async (id) => {
//     setActionError("");
//     const confirmDelete = window.confirm("Are you sure you want to delete this user?");
//     if (!confirmDelete) return;
//     try {
//       await API.delete(`http://localhost:5000/api/users/${id}`);
//       setUsers(users.filter((user) => user._id !== id));
//     } catch (err) {
//       setActionError(err.response?.data?.message || "Error deleting user");
//     }
//   };

//   const openAddModal = () => {
//     setForm({ name: "", email: "", role: "User", status: "Active" });
//     setEditMode(false);
//     setCurrentUser(null);
//     setShowModal(true);
//   };

//   const openEditModal = (user) => {
//     setForm({
//       name: user.name,
//       email: user.email,
//       role: user.role,
//       status: user.status,
//     });
//     setEditMode(true);
//     setCurrentUser(user);
//     setShowModal(true);
//   };

//   const closeModal = () => {
//     setShowModal(false);
//     setEditMode(false);
//     setCurrentUser(null);
//   };

//   // Apply search & filter
//   const filteredUsers = users.filter((u) => {
//     const matchesSearch =
//       u.name.toLowerCase().includes(search.toLowerCase()) ||
//       u.email.toLowerCase().includes(search.toLowerCase());
//     const matchesRole =
//       filterRole === "All" ? true : u.role === filterRole;
//     const matchesStatus =
//       filterStatus === "All" ? true : u.status === filterStatus;

//     return matchesSearch && matchesRole && matchesStatus;
//   });

//   if (loading) return <p className="text-center text-gray-500">Loading users...</p>;
//   if (error) return <p className="text-center text-red-500">{error}</p>;

//   return (
//     <div className="p-6 relative">
//       {/* Page Title */}
//       <h1 className="text-3xl font-bold mb-6 text-gray-800 flex items-center gap-2">
//         <FaUser className="text-blue-600" /> User Management
//       </h1>

//       {/* 🔍 Search & Filter Bar */}
//       <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-4 bg-gray-50 p-4 rounded-lg shadow">
//         {/* Search Box */}
//         <div className="relative w-full md:w-1/3">
//           <FaSearch className="absolute top-3 left-3 text-gray-400" />
//           <input
//             type="text"
//             placeholder="Search by name or email..."
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//             className="w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
//           />
//         </div>

//         {/* Role Filter */}
//         <select
//           value={filterRole}
//           onChange={(e) => setFilterRole(e.target.value)}
//           className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
//         >
//           <option value="All">All Roles</option>
//           <option value="Admin">Admin</option>
//           <option value="User">User</option>
//         </select>

//         {/* Status Filter */}
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

//       {/* User Table */}
//       <div className="bg-white shadow-xl rounded-lg overflow-hidden">
//         <table className="w-full border-collapse">
//           <thead className="bg-gradient-to-r from-blue-500 to-blue-700 text-white">
//             <tr>
//               <th className="p-3 text-left">Name</th>
//               <th className="p-3">Email</th>
//               <th className="p-3">Role</th>
//               <th className="p-3">Status</th>
//               <th className="p-3 text-center">Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredUsers.map((user, idx) => (
//               <tr
//                 key={user._id}
//                 className={`transition duration-200 hover:bg-gray-100 ${idx % 2 === 0 ? "bg-gray-50" : "bg-white"
//                   }`}
//               >
//                 <td className="p-3 font-medium text-gray-800">{user.name}</td>
//                 <td className="p-3 text-gray-600">{user.email}</td>
//                 <td className="p-3">
//                   <span
//                     className={`px-3 py-1 rounded-full text-sm font-semibold ${user.role === "Admin"
//                         ? "bg-purple-100 text-purple-700"
//                         : "bg-green-100 text-green-700"
//                       }`}
//                   >
//                     {user.role}
//                   </span>
//                 </td>
//                 <td className="p-3">
//                   <span
//                     className={`px-3 py-1 rounded-full text-sm font-semibold ${user.status === "Inactive"
//                         ? "bg-red-100 text-red-600"
//                         : "bg-green-100 text-green-700"
//                       }`}
//                   >
//                     {user.status || "Active"}
//                   </span>
//                 </td>
//                 <td className="p-3 flex justify-center gap-3">
//                   <button
//                     onClick={() => openEditModal(user)}
//                     className="flex items-center gap-1 bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm shadow"
//                   >
//                     <FaEdit /> Edit
//                   </button>
//                   <button
//                     onClick={() => deleteUser(user._id)}
//                     className="flex items-center gap-1 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm shadow"
//                   >
//                     <FaTrash /> Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//             {filteredUsers.length === 0 && (
//               <tr>
//                 <td colSpan="5" className="p-6 text-center text-gray-500">
//                   No users found.
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
//         <FaPlus /> Add User
//       </button>

//   {/* Modal (same as before, omitted for brevity) */}
//       {showModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
//           <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl">
//             <h2 className="text-xl font-bold mb-4">
//               {editMode ? "Edit User" : "Add New User"}
//             </h2>

//             {actionError && (
//               <div className="mb-3 text-red-600 bg-red-100 rounded p-2 text-sm">{actionError}</div>
//             )}

//             <div className="space-y-3">
//               <input
//                 type="text"
//                 placeholder="Name"
//                 value={form.name}
//                 onChange={(e) => setForm({ ...form, name: e.target.value })}
//                 className="w-full border p-2 rounded"
//               />
//               <input
//                 type="email"
//                 placeholder="Email"
//                 value={form.email}
//                 onChange={(e) => setForm({ ...form, email: e.target.value })}
//                 className="w-full border p-2 rounded"
//               />
//               <select
//                 value={form.role}
//                 onChange={(e) => setForm({ ...form, role: e.target.value })}
//                 className="w-full border p-2 rounded"
//               >
//                 <option value="User">User</option>
//                 <option value="Admin">Admin</option>
//               </select>
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
//                 onClick={saveUser}
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

import { useEffect, useState } from "react";
import API from "../api";
import { FaTrash, FaEdit, FaUser, FaPlus, FaSearch } from "react-icons/fa";

const BASE_URL = "https://task-management-system-wpik.onrender.com/api/users";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [actionError, setActionError] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "User",
    status: "Active",
  });

  const [search, setSearch] = useState("");
  const [filterRole, setFilterRole] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");

  const fetchUsers = async () => {
    try {
      const { data } = await API.get(BASE_URL);
      setUsers(data);
    } catch (err) {
      setError(err.response?.data?.message || "Error fetching users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const saveUser = async () => {
    setActionError("");
    try {
      if (editMode && currentUser) {
        const { data } = await API.put(`${BASE_URL}/${currentUser._id}`, form);
        setUsers(users.map((u) => (u._id === data._id ? data : u)));
      } else {
        const { data } = await API.post(BASE_URL, form);
        setUsers([...users, data]);
      }
      closeModal();
    } catch (err) {
      setActionError(err.response?.data?.message || "Error saving user");
    }
  };

  const deleteUser = async (id) => {
    setActionError("");
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      await API.delete(`${BASE_URL}/${id}`);
      setUsers(users.filter((user) => user._id !== id));
    } catch (err) {
      setActionError(err.response?.data?.message || "Error deleting user");
    }
  };

  const openAddModal = () => {
    setForm({ name: "", email: "", role: "User", status: "Active" });
    setEditMode(false);
    setCurrentUser(null);
    setShowModal(true);
  };

  const openEditModal = (user) => {
    setForm({
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status,
    });
    setEditMode(true);
    setCurrentUser(user);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditMode(false);
    setCurrentUser(null);
  };

  const filteredUsers = users.filter((u) => {
    const matchesSearch =
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase());

    const matchesRole = filterRole === "All" || u.role === filterRole;
    const matchesStatus = filterStatus === "All" || u.status === filterStatus;

    return matchesSearch && matchesRole && matchesStatus;
  });

  if (loading) return <p className="text-center text-gray-500">Loading users...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="p-6 relative">
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
        <FaUser className="text-blue-600" /> User Management
      </h1>

      <div className="flex gap-3 mb-4">
        <input
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 rounded w-1/3"
        />

        <select value={filterRole} onChange={(e) => setFilterRole(e.target.value)} className="border p-2 rounded">
          <option value="All">All Roles</option>
          <option value="Admin">Admin</option>
          <option value="User">User</option>
        </select>

        <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="border p-2 rounded">
          <option value="All">All Status</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
      </div>

      <table className="w-full bg-white shadow rounded">
        <thead className="bg-blue-600 text-white">
          <tr>
            <th className="p-3">Name</th>
            <th className="p-3">Email</th>
            <th className="p-3">Role</th>
            <th className="p-3">Status</th>
            <th className="p-3">Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user._id} className="border-t">
              <td className="p-3">{user.name}</td>
              <td className="p-3">{user.email}</td>
              <td className="p-3">{user.role}</td>
              <td className="p-3">{user.status}</td>
              <td className="p-3 flex gap-2">
                <button onClick={() => openEditModal(user)} className="bg-yellow-500 text-white px-2 py-1 rounded">
                  <FaEdit />
                </button>
                <button onClick={() => deleteUser(user._id)} className="bg-red-600 text-white px-2 py-1 rounded">
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
    </div>
  );
}
