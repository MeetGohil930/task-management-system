// import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// export default function Logout() {
//   const navigate = useNavigate();

//   useEffect(() => {
//     localStorage.removeItem("token"); 
//     localStorage.removeItem("user");

//     navigate("/login");
//   }, [navigate]);

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100">
//       <div className="text-center">
//         <h1 className="text-xl font-semibold text-gray-700">Logging out...</h1>
//         <p className="text-gray-500">Please wait a moment.</p>
//       </div>
//     </div>
//   );
// }

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.clear(); // clears everything in localStorage
    navigate("/login", { replace: true });
  }, [navigate]);

  return null; // nothing to show
}
