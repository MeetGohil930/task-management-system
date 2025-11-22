// import { Link, useLocation } from "react-router-dom";
// import { useState } from "react";
// import { 
//   HiOutlineX, 
//   HiOutlineMenu, 
//   HiOutlineHome, 
//   HiOutlineUser, 
//   HiOutlineFolder, 
//   HiOutlineUsers, 
//   HiOutlineClipboardList, 
//   HiOutlineDocumentAdd, 
//   HiOutlineViewBoards, 
//   HiOutlineCog, 
//   HiOutlineLogout 
// } from "react-icons/hi";

// export default function Sidebar() {
//   const location = useLocation();
//   const [isOpen, setIsOpen] = useState(true); // Desktop collapse
//   const [mobileOpen, setMobileOpen] = useState(false); // Mobile overlay

//   const links = [
//     { to: "/", label: "Dashboard", icon: <HiOutlineHome size={20} /> },
//     { to: "/users", label: "Users", icon: <HiOutlineUser size={20} /> },
//     { to: "/projects", label: "Projects", icon: <HiOutlineFolder size={20} /> },
//     { to: "/teams", label: "Teams", icon: <HiOutlineUsers size={20} /> },
//     { to: "/tasks", label: "Tasks", icon: <HiOutlineClipboardList size={20} /> },
//     { to: "/assign-project", label: "Assign Project", icon: <HiOutlineDocumentAdd size={20} /> },
//     { to: "/task-board", label: "Task Board", icon: <HiOutlineViewBoards size={20} /> },
//     { to: "/settings", label: "Settings", icon: <HiOutlineCog size={20} /> },
//     { to: "/logout", label: "Logout", icon: <HiOutlineLogout size={20} /> },
//   ];

//   return (
//     <div className="flex">
//       {/* Mobile overlay */}
//       {mobileOpen && (
//         <div 
//           className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
//           onClick={() => setMobileOpen(false)}
//         ></div>
//       )}

//       {/* Sidebar */}
//       <aside
//         className={`
//           fixed md:relative z-50 flex flex-col bg-gradient-to-b from-blue-800 to-blue-600 text-white shadow-lg transition-all duration-300
//           ${isOpen ? "w-64" : "w-16"} 
//           ${mobileOpen ? "left-0" : "-left-full"} md:left-0 min-h-screen overflow-y-auto
//         `}
//       >
//         {/* Header with toggle button */}
//         <div className="flex items-center justify-between p-5 border-b border-blue-500 sticky top-0 bg-blue-800 z-10">
//           {isOpen && <h1 className="text-2xl font-extrabold tracking-wide">Admin Panel</h1>}
//           <div className="flex gap-2">
//             {/* Desktop toggle */}
//             <button
//               onClick={() => setIsOpen(!isOpen)}
//               className="text-white focus:outline-none hidden md:block"
//             >
//               {isOpen ? <HiOutlineX size={24} /> : <HiOutlineMenu size={24} />}
//             </button>

//             {/* Mobile toggle */}
//             <button
//               onClick={() => setMobileOpen(!mobileOpen)}
//               className="text-white focus:outline-none md:hidden"
//             >
//               <HiOutlineMenu size={24} />
//             </button>
//           </div>
//         </div>

//         {/* Navigation */}
//         <nav className="flex flex-col gap-1 p-4 flex-1">
//           {links.map(({ to, label, icon }) => (
//             <Link
//               key={to}
//               to={to}
//               onClick={() => setMobileOpen(false)} // Close mobile sidebar on click
//               className={`relative flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
//                 location.pathname === to
//                   ? "bg-white text-blue-700 font-semibold shadow-sm"
//                   : "hover:bg-blue-500"
//               } group`}
//             >
//               {/* Icon */}
//               <span className="flex-shrink-0">{icon}</span>

//               {/* Label */}
//               {isOpen && <span>{label}</span>}

//               {/* Tooltip for collapsed sidebar */}
//               {!isOpen && (
//                 <span className="absolute left-full ml-2 whitespace-nowrap bg-black text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
//                   {label}
//                 </span>
//               )}
//             </Link>
//           ))}
//         </nav>

//         {/* Footer */}
//         {isOpen && (
//           <div className="p-4 text-xs text-blue-200 border-t border-blue-500">
//             © {new Date().getFullYear()} Task Manager
//           </div>
//         )}
//       </aside>

//       {/* Main content */}
//       <main className="flex-1">
//         {/* p-5 md:ml-0` */}
//         {/* Mobile menu button for small screens */}
//         <div className="md:hidden mb-4">
//           <button
//             onClick={() => setMobileOpen(true)}
//             className="text-blue-800 bg-white p-2 rounded shadow"
//           >
//             <HiOutlineMenu size={24} />
//           </button>
//         </div>

//         {/* Your main content goes here */}
//       </main>
//     </div>
//   );
// }

import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import {
  HiOutlineX,
  HiOutlineMenu,
  HiOutlineHome,
  HiOutlineUser,
  HiOutlineFolder,
  HiOutlineUsers,
  HiOutlineClipboardList,
  HiOutlineDocumentAdd,
  HiOutlineViewBoards,
  HiOutlineCog,
  HiOutlineLogout
} from "react-icons/hi";

export default function Sidebar() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);

  const links = [
    { to: "/", label: "Dashboard", icon: <HiOutlineHome size={20} /> },
    { to: "/users", label: "Users", icon: <HiOutlineUser size={20} /> },
    { to: "/projects", label: "Projects", icon: <HiOutlineFolder size={20} /> },
    { to: "/teams", label: "Teams", icon: <HiOutlineUsers size={20} /> },
    { to: "/tasks", label: "Tasks", icon: <HiOutlineClipboardList size={20} /> },
    { to: "/assign-project", label: "Assign Project", icon: <HiOutlineDocumentAdd size={20} /> },
    { to: "/task-board", label: "Task Board", icon: <HiOutlineViewBoards size={20} /> },
    { to: "/settings", label: "Settings", icon: <HiOutlineCog size={20} /> },
    { to: "/logout", label: "Logout", icon: <HiOutlineLogout size={20} /> },
  ];

  return (
    <div className="flex">
      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setMobileOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed md:relative z-50 flex flex-col bg-gradient-to-b from-blue-800 to-blue-600 text-white shadow-lg transition-all duration-300
          ${isOpen ? "w-64" : "w-16"} 
          ${mobileOpen ? "left-0" : "-left-full"} md:left-0 min-h-screen overflow-y-auto
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-blue-500 sticky top-0 bg-blue-800 z-10">
          {isOpen && <h1 className="text-2xl font-extrabold tracking-wide">Admin Panel</h1>}
          <div className="flex gap-2">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white focus:outline-none hidden md:block"
            >
              {isOpen ? <HiOutlineX size={24} /> : <HiOutlineMenu size={24} />}
            </button>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="text-white focus:outline-none md:hidden"
            >
              <HiOutlineMenu size={24} />
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-1 p-4 flex-1">
          {links.map(({ to, label, icon }) => (
            <Link
              key={to}
              to={to}
              onClick={() => setMobileOpen(false)}
              className={`relative flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${location.pathname === to
                  ? "bg-white text-blue-700 font-semibold shadow-sm"
                  : "hover:bg-blue-500"
                } group`}
            >
              <span className="flex-shrink-0">{icon}</span>
              {isOpen && <span>{label}</span>}
              {!isOpen && (
                <span className="absolute left-full ml-2 whitespace-nowrap bg-black text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  {label}
                </span>
              )}
            </Link>
          ))}
        </nav>

        {/* Footer */}
        {isOpen && (
          <div className="p-4 text-xs text-blue-200 border-t border-blue-500">
            © {new Date().getFullYear()} Task Manager
          </div>
        )}
      </aside>

      {/* Main content */}
      <main className="flex-1">
        <div className="md:hidden mb-4">
          <button
            onClick={() => setMobileOpen(true)}
            className="text-blue-800 bg-white p-2 rounded shadow"
          >
            <HiOutlineMenu size={24} />
          </button>
        </div>
      </main>
    </div>
  );
}
