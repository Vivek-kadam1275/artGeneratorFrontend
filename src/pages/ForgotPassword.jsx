// ForgotPassword.jsx
import { useContext, useState } from "react";
import { forgotPasswordRoute } from "../utils/ApiRoutes";
import { useNavigate } from "react-router-dom";
import { artContext } from "../context/artContext.jsx";
import toast from "react-hot-toast";

export default function ForgotPassword() {
  const {toastOptions}=useContext(artContext);
  const [email, setEmail] = useState("");
  const navigator = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch(forgotPasswordRoute, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    // alert("Check your email for reset link.");
    toast.success("Check your email for reset link.",toastOptions);
    navigator(-1);
  };

  return (
    <div className="h-screen bg-gradient-to-b from-purple-600 to-blue-900 p-6 flex justify-center items-center gap-10">
  <form
    onSubmit={handleSubmit}
    className="bg-white shadow-xl rounded-2xl p-8 flex flex-col gap-4 w-full max-w-md"
  >
    <h2 className="text-2xl font-semibold text-center text-purple-700">
      Forgot Password
    </h2>
    <input
      type="email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      placeholder="Enter your email"
      className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
      required
    />
    <button
      type="submit"
      className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200 cursor-pointer"
    >
      Send Reset Link
    </button>
  </form>
</div>

  );
}
