// ForgotPassword.jsx
import { useState } from "react";
import { forgotPasswordRoute } from "../utils/ApiRoutes";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch(forgotPasswordRoute, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    alert("Check your email for reset link.");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter email" />
      <button type="submit">Send Reset Link</button>
    </form>
  );
}
