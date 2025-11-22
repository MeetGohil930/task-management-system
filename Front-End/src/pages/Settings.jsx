// export default function Settings() {
//   return (
//     <div>
//       <h1 className="text-2xl font-bold mb-6">Settings</h1>
//       <div className="bg-white shadow rounded-lg p-6 max-w-md">
//         <div className="mb-4">
//           <label className="block text-gray-600">Change Password</label>
//           <input type="password" className="w-full border rounded p-2 mt-1" placeholder="New Password" />
//         </div>
//         <button className="bg-blue-500 text-white px-4 py-2 rounded">Update Password</button>
//       </div>
//     </div>
//   );
// }

import { useState } from "react";
import axios from "axios";

export default function Settings({ user }) {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [email, setEmail] = useState(user?.email || "");
  const [code, setCode] = useState("");
  const [resetPassword, setResetPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const [activeAccordion, setActiveAccordion] = useState(null);

  // Logged-in password update
  const handleUpdatePassword = async () => {
    if (!currentPassword || !newPassword) return alert("Fill all fields");

    try {
      setLoading(true);
      await axios.put(
        `http://localhost:5000/api/users/update-password/${user._id}`,
        { currentPassword, newPassword }
      );
      alert("Password updated successfully ✅");
      setCurrentPassword("");
      setNewPassword("");
    } catch (error) {
      alert(error.response?.data?.message || "Update failed ❌");
    } finally {
      setLoading(false);
    }
  };

  // Forgot password flow
  const requestResetCode = async () => {
    if (!email) return alert("Enter your email");

    try {
      await axios.post("http://localhost:5000/api/users/request-reset", { email });
      alert("Verification code sent to email ✅");
    } catch (error) {
      alert(error.response?.data?.message || "Request failed ❌");
    }
  };

  const handleResetPassword = async () => {
    if (!email || !code || !resetPassword) return alert("Fill all fields");

    try {
      await axios.post("http://localhost:5000/api/users/reset-password", {
        email,
        code,
        newPassword: resetPassword,
      });
      alert("Password reset successfully ✅");
      setCode("");
      setResetPassword("");
    } catch (error) {
      alert(error.response?.data?.message || "Reset failed ❌");
    }
  };

  return (
    <div className="max-w-md p-6 bg-white shadow rounded-lg space-y-4">
      <h1 className="text-2xl font-bold mb-6">Settings</h1>

      {/* Accordion: Update Password */}
      <div className="border rounded">
        <button
          className="w-full text-left px-4 py-2 font-semibold bg-gray-100"
          onClick={() => setActiveAccordion(activeAccordion === 1 ? null : 1)}
        >
          Change Password
        </button>
        {activeAccordion === 1 && (
          <div className="p-4 space-y-3">
            <input
              type="password"
              placeholder="Current Password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full border rounded p-2"
            />
            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full border rounded p-2"
            />
            <button
              onClick={handleUpdatePassword}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Update Password
            </button>
          </div>
        )}
      </div>

      {/* Accordion: Reset Password */}
      <div className="border rounded">
        <button
          className="w-full text-left px-4 py-2 font-semibold bg-gray-100"
          onClick={() => setActiveAccordion(activeAccordion === 2 ? null : 2)}
        >
          Reset Password (Forgot)
        </button>
        {activeAccordion === 2 && (
          <div className="p-4 space-y-3">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border rounded p-2"
            />
            <button
              onClick={requestResetCode}
              className="bg-green-500 text-white px-4 py-2 rounded"
            >
              Request Code
            </button>
            <input
              type="text"
              placeholder="Verification Code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full border rounded p-2"
            />
            <input
              type="password"
              placeholder="New Password"
              value={resetPassword}
              onChange={(e) => setResetPassword(e.target.value)}
              className="w-full border rounded p-2"
            />
            <button
              onClick={handleResetPassword}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Reset Password
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
