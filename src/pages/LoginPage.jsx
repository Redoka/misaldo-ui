import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../style/login.css";


function LoginPage() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    password: ""
  });

  const login = async () => {

    try {
      const res = await fetch("http://localhost:9100/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });

      if (!res.ok) {
        throw new Error("Login failed");
      }

      const token = await res.text();

      localStorage.setItem("token", token);

      navigate("/cards");

    } catch (err) {
      console.error(err);
      alert("Invalid credentials");
    }
  };

  return (    
	<div className="login-container">
    <div className="login-box">

      <h2 className="login-title">Login</h2>

      <input
        className="login-input"
        placeholder="username"
        onChange={e =>
          setForm({ ...form, username: e.target.value })
        }
      />

      <input
        className="login-input"
        type="password"
        placeholder="password"
        onChange={e =>
          setForm({ ...form, password: e.target.value })
        }
      />

      <button className="login-button" onClick={login}>
        Login
      </button>

      <p
        className="login-register"
        onClick={() => navigate("/register")}>
        Don't have an account? Register
      </p>

    </div>
  </div>
  );
}

export default LoginPage;