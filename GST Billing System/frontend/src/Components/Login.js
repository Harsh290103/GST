import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "./axiosConfig"; // ✅ Axios instance with `withCredentials: true`
import "bootstrap/dist/css/bootstrap.min.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const re = /^\S+@\S+\.\S+$/;
    return re.test(email);
  };

  useEffect(() => {
    const newErrors = {};

    if (!email.trim()) newErrors.email = "Email is required";
    else if (!validateEmail(email)) newErrors.email = "Invalid email format";

    if (!password) newErrors.password = "Password is required";
    else if (password.length < 6)
      newErrors.password = "Password must be at least 6 characters";

    setErrors(newErrors);
    setIsFormValid(Object.keys(newErrors).length === 0);
  }, [email, password]);

  const handleLogin = async () => {
    if (!isFormValid) {
      alert("Please fix the errors before submitting.");
      return;
    }

    const loginData = { user_email: email, password: password };

    try {
      const response = await api.post("/emps/login", loginData);

      if (response.status === 200) {
        alert("Login successful!");
        navigate("/home");
      } else {
        alert("Login failed. Please try again.");
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        alert("Invalid credentials! Please register.");
        navigate("/register");
      } else {
        console.error("Login error:", error);
        alert("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{
        background: "linear-gradient(135deg, rgb(255, 240, 245), rgb(230, 245, 255), rgb(255, 255, 255))",
        backgroundSize: "400% 400%",
        animation: "gradientBG 20s ease infinite",
      }}
    >
      <style>
        {`
          @keyframes gradientBG {
            0% {background-position: 0% 50%;}
            50% {background-position: 100% 50%;}
            100% {background-position: 0% 50%;}
          }
        `}
      </style>

      <div
        className="card p-4 shadow"
        style={{ width: "100%", maxWidth: "400px", background: "rgba(255, 255, 255, 0.95)", borderRadius: "1rem" }}
      >
        <h2 className="text-center fw-bold mb-4">Login</h2>

        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className={`form-control ${errors.email ? "is-invalid" : ""}`}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {errors.email && <div className="invalid-feedback">{errors.email}</div>}
        </div>

        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            className={`form-control ${errors.password ? "is-invalid" : ""}`}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {errors.password && <div className="invalid-feedback">{errors.password}</div>}
        </div>

        <div className="d-grid gap-2">
          <button className="btn btn-primary" onClick={handleLogin} disabled={!isFormValid}>
            Login
          </button>
        </div>

        <div className="text-center mt-3">
          <small>
            Don't have an account?{" "}
            <button className="btn btn-link p-0" onClick={() => navigate("/register")}>
              Register here
            </button>
          </small>
        </div>
      </div>
    </div>
  );
};

export default Login;
