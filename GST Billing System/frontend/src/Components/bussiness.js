import React, { useState, useEffect } from "react";
import api from "./axiosConfig"; // ✅ Use correct relative path
import "bootstrap/dist/css/bootstrap.min.css";

const BusinessForm = () => {
  const [formData, setFormData] = useState({
    company_name: "",
    country_id: "",
    company_address: "",
    business_gstno: "",
    business_pan: "",
    user_id: ""
  });

  const [message, setMessage] = useState("");

  useEffect(() => {
    api.get("/emps/user/current")
      .then((response) => {
        setFormData((prev) => ({ ...prev, user_id: response.data.id }));
      })
      .catch((error) => {
        console.error("Error fetching current user:", error);
      });
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.user_id) {
      setMessage("Cannot submit without user ID.");
      return;
    }

    api.post("/emps/company", formData)
      .then(() => {
        setMessage("Business details submitted successfully!");
        setFormData({
          company_name: "",
          country_id: "",
          company_address: "",
          business_gstno: "",
          business_pan: "",
          user_id: formData.user_id,
        });
      })
      .catch((error) => {
        console.error(error);
        setMessage("Error submitting business details.");
      });
  };

  return (
    <div className="container mt-4">
      <h2 className="fw-bold text-center">Business Profile</h2>

      <form onSubmit={handleSubmit} className="shadow p-4 bg-light rounded">
        <div className="mb-3">
          <label className="form-label fw-bold">Company Name</label>
          <input
            type="text"
            className="form-control"
            name="company_name"
            value={formData.company_name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label fw-bold">Country ID</label>
          <input
            type="text"
            className="form-control"
            name="country_id"
            value={formData.country_id}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label fw-bold">Company Address</label>
          <textarea
            className="form-control"
            name="company_address"
            value={formData.company_address}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label fw-bold">Business GST Number</label>
          <input
            type="text"
            className="form-control"
            name="business_gstno"
            value={formData.business_gstno}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label fw-bold">Business PAN</label>
          <input
            type="text"
            className="form-control"
            name="business_pan"
            value={formData.business_pan}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-4">
          <label className="form-label fw-bold">User ID</label>
          <input
            type="text"
            className="form-control"
            name="user_id"
            value={formData.user_id}
            readOnly
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary w-100 fw-bold"
          disabled={!formData.user_id}
        >
          Submit
        </button>
      </form>

      {message && <div className="alert mt-3 text-center alert-info">{message}</div>}
    </div>
  );
};

export default BusinessForm;
