// ResetPassword.jsx
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { resetPasswordRoute } from "../utils/ApiRoutes";
import { artContext } from "../context/artContext.jsx";
import toast from "react-hot-toast";

export default function ResetPassword() {
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const navigator = useNavigate();
  const {toastOptions}=useContext(artContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('printing token & password--->', token, password);
    console.log(`${resetPasswordRoute}/${token}`);
    await fetch(`${resetPasswordRoute}/${token}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    // alert("Password updated. You can now log in.");
    toast.success("Password updated. You can now log in.",toastOptions);
    navigator("/login");
  };

  return (
    <div className="h-screen bg-gradient-to-b from-purple-600 to-blue-900 p-6 flex justify-center items-center">
  <form
    onSubmit={handleSubmit}
    className="bg-white shadow-xl rounded-2xl p-8 flex flex-col gap-4 w-full max-w-md"
  >
    <h2 className="text-2xl font-semibold text-center text-purple-700">
      Reset Password
    </h2>
    <input
      type="password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      placeholder="New Password"
      className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
      required
    />
    <button
      type="submit"
      className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
    >
      Reset Password
    </button>
  </form>
</div>

  );
}
