import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [mobileNo, setMobileNo] = useState("");

  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);

  const navigate = useNavigate();

  // Validation functions
  const validateEmail = (email) => {
    const re = /^\S+@\S+\.\S+$/;
    return re.test(email);
  };

  const validateMobileNo = (mobile) => {
    const re = /^\d{10}$/; // exactly 10 digits
    return re.test(mobile);
  };

  // Validate all fields and set errors
  useEffect(() => {
    const newErrors = {};

    if (!firstName.trim()) newErrors.firstName = "First name is required";
    if (!lastName.trim()) newErrors.lastName = "Last name is required";

    if (!email.trim()) newErrors.email = "Email is required";
    else if (!validateEmail(email)) newErrors.email = "Invalid email format";

    if (!password) newErrors.password = "Password is required";
    else if (password.length < 6) newErrors.password = "Password must be at least 6 characters";

    if (!mobileNo.trim()) newErrors.mobileNo = "Mobile number is required";
    else if (!validateMobileNo(mobileNo)) newErrors.mobileNo = "Mobile number must be 10 digits";

    setErrors(newErrors);
    setIsFormValid(Object.keys(newErrors).length === 0);
  }, [firstName, lastName, email, password, mobileNo]);

  const handleRegister = async () => {
    if (!isFormValid) {
      alert("Please fix the errors before submitting.");
      return;
    }

    const registerData = {
      user_email: email,
      password,
      first_name: firstName,
      last_name: lastName,
      mobile_no: mobileNo,
      last_login: "2025-05-26 11:11:00",
    };

    try {
      const response = await fetch("http://127.0.0.1:9000/emps/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registerData),
      });

      const result = await response.json();
      console.log("Server Response:", result);

      if (response.ok) {
        alert("Registration successful! Redirecting to login...");
        navigate("/login");
      } else {
        alert("Failed to register. Please try again.");
      }
    } catch (error) {
      console.error("Error registering:", error);
      alert("Something went wrong. Please try again later.");
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{
        background: "linear-gradient(135deg, #ffe4ec, #e0f0ff, #ffffff)",
      }}
    >
      <div className="card shadow-lg p-4" style={{ maxWidth: "450px", width: "100%", borderRadius: "20px" }}>
        <h2 className="text-center mb-4 text-primary fw-bold">Register</h2>

        <div className="mb-3">
          <label className="form-label fw-semibold">First Name</label>
          <input
            type="text"
            className={`form-control ${errors.firstName ? "is-invalid" : ""}`}
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          {errors.firstName && <div className="invalid-feedback">{errors.firstName}</div>}
        </div>

        <div className="mb-3">
          <label className="form-label fw-semibold">Last Name</label>
          <input
            type="text"
            className={`form-control ${errors.lastName ? "is-invalid" : ""}`}
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          {errors.lastName && <div className="invalid-feedback">{errors.lastName}</div>}
        </div>

        <div className="mb-3">
          <label className="form-label fw-semibold">Email</label>
          <input
            type="email"
            className={`form-control ${errors.email ? "is-invalid" : ""}`}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <div className="invalid-feedback">{errors.email}</div>}
        </div>

        <div className="mb-3">
          <label className="form-label fw-semibold">Password</label>
          <input
            type="password"
            className={`form-control ${errors.password ? "is-invalid" : ""}`}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && <div className="invalid-feedback">{errors.password}</div>}
        </div>

        <div className="mb-4">
          <label className="form-label fw-semibold">Mobile No</label>
          <input
            type="tel"
            className={`form-control ${errors.mobileNo ? "is-invalid" : ""}`}
            value={mobileNo}
            onChange={(e) => setMobileNo(e.target.value)}
          />
          {errors.mobileNo && <div className="invalid-feedback">{errors.mobileNo}</div>}
        </div>

        <div className="text-center">
          <button
            className="btn btn-primary w-100"
            onClick={handleRegister}
            disabled={!isFormValid}
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
