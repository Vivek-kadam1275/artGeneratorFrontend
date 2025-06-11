// ResetPassword.jsx
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { resetPasswordRoute } from "../utils/ApiRoutes";

export default function ResetPassword() {
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const navigator=useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('printing token & password--->',token,password);
    console.log(`${resetPasswordRoute}/${token}`);
    await fetch(`${resetPasswordRoute}/${token}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    
    alert("Password updated. You can now log in.");
    navigator("/login");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="New Password" />
      <button type="submit">Reset Password</button>
    </form>
  );
}
