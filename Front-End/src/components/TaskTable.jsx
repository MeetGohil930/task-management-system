// import { useEffect, useState } from "react";

// export default function TaskTable() {
//   const [tasks, setTasks] = useState([]);

//   useEffect(() => {
//     fetch("http://localhost:5000/api/tasks")
//       .then(response => response.json())
//       .then(data => setTasks(data))
//       .catch(error => console.error("Error fetching tasks:", error));
//   }, []);

//   const deleteTask = async (id) => {
//     if (!window.confirm("Are you sure?")) return;

//     await fetch(`http://localhost:5000/api/tasks/${id}`, {
//       method: "DELETE"
//     });

//     setTasks(tasks.filter(task => task._id !== id));
//   };

//   return (
//     <div className="bg-white shadow rounded-lg overflow-hidden">
//       <table className="w-full">
//         <thead className="bg-gray-200">
//           <tr>
//             <th className="p-3 text-left">Title</th>
//             <th className="p-3">Team</th>
//             <th className="p-3">Project</th>
//             <th className="p-3">Status</th>
//             <th className="p-3">Priority</th>
//             <th className="p-3">Action</th>
//           </tr>
//         </thead>

//         <tbody>
//           {tasks.map(task => (
//             <tr key={task._id} className="border-t">
//               <td className="p-3">{task.title}</td>
//               <td className="p-3">{task.teamId?.name || "N/A"}</td>
//               <td className="p-3">{task.projectId?.name || "N/A"}</td>
//               <td className="p-3">{task.status}</td>
//               <td className="p-3">{task.priority}</td>
//               <td className="p-3">
//                 <button
//                   onClick={() => deleteTask(task._id)}
//                   className="bg-red-500 text-white px-2 py-1 rounded text-sm"
//                 >
//                   Delete
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>

//       </table>
//     </div>
//   );
// }

import { useEffect, useState } from "react";

export default function TaskTable() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetch("https://task-api.onrender.com/api/tasks") // ✅ public backend URL
      .then(response => response.json())
      .then(data => setTasks(data))
      .catch(error => console.error("Error fetching tasks:", error));
  }, []);

  const deleteTask = async (id) => {
    if (!window.confirm("Are you sure?")) return;

    try {
      await fetch(`https://task-api.onrender.com/api/tasks/${id}`, { // ✅ public backend URL
        method: "DELETE",
      });

      setTasks(tasks.filter(task => task._id !== id));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <table className="w-full">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-3 text-left">Title</th>
            <th className="p-3">Team</th>
            <th className="p-3">Project</th>
            <th className="p-3">Status</th>
            <th className="p-3">Priority</th>
            <th className="p-3">Action</th>
          </tr>
        </thead>

        <tbody>
          {tasks.map(task => (
            <tr key={task._id} className="border-t">
              <td className="p-3">{task.title}</td>
              <td className="p-3">{task.teamId?.name || "N/A"}</td>
              <td className="p-3">{task.projectId?.name || "N/A"}</td>
              <td className="p-3">{task.status}</td>
              <td className="p-3">{task.priority}</td>
              <td className="p-3">
                <button
                  onClick={() => deleteTask(task._id)}
                  className="bg-red-500 text-white px-2 py-1 rounded text-sm"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>

      </table>
    </div>
  );
}
