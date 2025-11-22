import { useNavigate } from "react-router-dom";
import { FaBell, FaUserCircle, FaMoon, FaSun } from "react-icons/fa";
import { useEffect, useState } from "react";

export default function Navbar() {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    }

    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const toggleTheme = () => {
    if (darkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setDarkMode(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setDarkMode(true);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <header className="h-16 bg-white dark:bg-gray-900 shadow flex items-center justify-between px-6 sticky top-0 z-20">
      <h2 className="text-xl font-bold text-gray-700 dark:text-gray-200">
        Dashboard
      </h2>
      <div className="flex items-center gap-6">
        <button onClick={toggleTheme} className="text-gray-600 dark:text-gray-300">
          {darkMode ? <FaSun size={20} /> : <FaMoon size={20} />}
        </button>
        <button className="relative text-gray-600 dark:text-gray-300">
          <FaBell size={20} />
          <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full px-1">3</span>
        </button>
        <button className="flex items-center gap-2 text-gray-700 dark:text-gray-200">
          <FaUserCircle size={26} />
          <span>{user ? user.name : "Guest"}</span>
        </button>
        <button onClick={handleLogout} className="px-4 py-2 bg-red-600 text-white rounded-lg">
          Logout
        </button>
      </div>
    </header>
  );
}

// Navbar.jsx
// import { useNavigate } from "react-router-dom";
// import { FaBell, FaUserCircle, FaMoon, FaSun, FaCamera } from "react-icons/fa";
// import { useEffect, useRef, useState } from "react";
// import axios from "axios";

// export default function Navbar({ avatarUploadUrl = "/api/users/avatar" }) {
//   const navigate = useNavigate();
//   const [darkMode, setDarkMode] = useState(false);
//   const [user, setUser] = useState(null);
//   const [avatarSrc, setAvatarSrc] = useState(null);
//   const fileInputRef = useRef(null);

//   useEffect(() => {
//     const savedTheme = localStorage.getItem("theme");
//     if (savedTheme === "dark") {
//       setDarkMode(true);
//       document.documentElement.classList.add("dark");
//     }

//     const savedUser = localStorage.getItem("user");
//     if (savedUser) {
//       const parsed = JSON.parse(savedUser);
//       setUser(parsed);

//       // prefer explicit avatar field, else fallback to saved base64
//       if (parsed.avatar) {
//         setAvatarSrc(parsed.avatar);
//       } else {
//         const localAvatar = localStorage.getItem("avatar_base64");
//         if (localAvatar) setAvatarSrc(localAvatar);
//       }
//     } else {
//       const localAvatar = localStorage.getItem("avatar_base64");
//       if (localAvatar) setAvatarSrc(localAvatar);
//     }
//   }, []);

//   const toggleTheme = () => {
//     if (darkMode) {
//       document.documentElement.classList.remove("dark");
//       localStorage.setItem("theme", "light");
//       setDarkMode(false);
//     } else {
//       document.documentElement.classList.add("dark");
//       localStorage.setItem("theme", "dark");
//       setDarkMode(true);
//     }
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     navigate("/login");
//   };

//   // Open file input
//   const openFileDialog = () => {
//     fileInputRef.current?.click();
//   };

//   // When user picks a file: preview & save (base64) and optionally upload to server
//   const handleFileChange = async (e) => {
//     const file = e.target.files?.[0];
//     if (!file) return;

//     // basic size check (2MB)
//     if (file.size > 2 * 1024 * 1024) {
//       alert("Please choose an image smaller than 2MB");
//       return;
//     }

//     // preview as base64
//     const reader = new FileReader();
//     reader.onload = async (ev) => {
//       const base64 = ev.target.result;
//       setAvatarSrc(base64);
//       // Save locally so user sees it even after refresh
//       localStorage.setItem("avatar_base64", base64);

//       // Optionally upload to backend if you have an endpoint and a token
//       // If you don't want server upload, remove this block
//       try {
//         const token = localStorage.getItem("token");
//         if (avatarUploadUrl && token) {
//           const form = new FormData();
//           form.append("avatar", file);

//           await axios.post(avatarUploadUrl, form, {
//             headers: {
//               "Content-Type": "multipart/form-data",
//               Authorization: `Bearer ${token}`,
//             },
//           }).then(res => {
//             // if backend returns saved avatar URL, update user object and localStorage
//             const returnedAvatarUrl = res?.data?.avatar;
//             if (returnedAvatarUrl) {
//               setAvatarSrc(returnedAvatarUrl);
//               const updatedUser = { ...user, avatar: returnedAvatarUrl };
//               localStorage.setItem("user", JSON.stringify(updatedUser));
//               setUser(updatedUser);
//             }
//           });
//         }
//       } catch (err) {
//         console.error("Avatar upload failed:", err);
//         // non-fatal — user still has local preview
//       }
//     };
//     reader.readAsDataURL(file);
//   };

//   const handleProfileClick = () => {
//     navigate("/profile");
//   };

//   return (
//     <header className="h-16 bg-white dark:bg-gray-900 shadow flex items-center justify-between px-6 sticky top-0 z-20">
//       <h2 className="text-xl font-bold text-gray-700 dark:text-gray-200">
//         Dashboard
//       </h2>

//       <div className="flex items-center gap-6">
//         <button onClick={toggleTheme} className="text-gray-600 dark:text-gray-300">
//           {darkMode ? <FaSun size={20} /> : <FaMoon size={20} />}
//         </button>

//         <button className="relative text-gray-600 dark:text-gray-300">
//           <FaBell size={20} />
//           <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full px-1">3</span>
//         </button>

//         {/* Avatar / Upload */}
//         <div className="flex items-center gap-3">
//           <input
//             ref={fileInputRef}
//             type="file"
//             accept="image/*"
//             className="hidden"
//             onChange={handleFileChange}
//           />

//           <button
//             onClick={handleProfileClick}
//             className="flex items-center gap-2 text-gray-700 dark:text-gray-200"
//             title="Open profile"
//           >
//             {avatarSrc ? (
//               <img
//                 src={avatarSrc}
//                 alt="avatar"
//                 className="w-9 h-9 rounded-full object-cover border border-gray-200 dark:border-gray-700"
//               />
//             ) : (
//               <FaUserCircle size={34} />
//             )}
//             <span>{user ? user.name : "Guest"}</span>
//           </button>

//           {/* small camera icon to change avatar */}
//           <button
//             onClick={openFileDialog}
//             title="Change avatar"
//             className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
//           >
//             <FaCamera />
//           </button>
//         </div>

//         <button onClick={handleLogout} className="px-4 py-2 bg-red-600 text-white rounded-lg">
//           Logout
//         </button>
//       </div>
//     </header>
//   );
// }
