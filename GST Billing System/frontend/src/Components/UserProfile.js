import React, { useEffect, useState } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import api from "./axiosConfig";

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    api.get("/emps/user/current", { withCredentials: true })
      .then(response => {
        setUser(response.data);
        setLoading(false);
      })
      .catch(err => {
        setError("Error fetching user data.");
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="alert alert-info text-center mt-4">Loading...</div>;
  if (error) return <div className="alert alert-danger text-center mt-4">{error}</div>;
  if (!user) return <div className="alert alert-warning text-center mt-4">No user data available.</div>;

  const formattedLastLogin = user.last_login 
    ? new Date(user.last_login).toLocaleString() 
    : "N/A";

  return (
    <div className="container mt-4">
      <h2 className="fw-bold text-center mb-4">User Profile</h2>
      <div className="card mx-auto shadow p-4" style={{ maxWidth: "500px" }}>
        <div className="mb-3">
          <h4 className="fw-bold mb-1">{user.first_name} {user.last_name}</h4>
          <p className="text-muted mb-0">{user.user_email}</p>
        </div>
        <hr />
        <div>
          <p><strong>Phone:</strong> {user.mobile_no || "N/A"}</p>
          <p><strong>Last Login:</strong> {formattedLastLogin}</p>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
