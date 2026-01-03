import React, { useState } from "react";
import "./Login.css";
import api from "../api";
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const navigate = useNavigate();

  const handleClick = async (e) => {
    e.preventDefault();

    try {
      const body = { username, password };
      const result = await api.post("/login/login", body);

      const role = result.data.user.role;

      if (role === "manager") {
        localStorage.setItem('loginId',result.data.user._id)
        navigate("/managerHome");
      } else if (role === "Admin") {
        navigate("/AdminHome");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="loginpage">
      <div className="loginCard">

        {/* LEFT IMAGE */}
        <div className="loginImage">
          <img src="/img77.png" alt="Login" />
        </div>

        {/* RIGHT FORM */}
        <form className="loginForm">
          <h2>Log in</h2>

          <input
            type="text"
            placeholder="Username"
            onChange={(e) => setusername(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setpassword(e.target.value)}
          />

          <button type="button" onClick={handleClick}>
            Log in →
          </button>
        </form>

      </div>
    </div>
  );
}

export default Login;