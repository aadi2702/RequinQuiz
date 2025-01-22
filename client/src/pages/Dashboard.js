import React, { useEffect } from "react";
import Sidebar from "../components/Sidebar.js";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get("token"); // Get token from cookies
    if (!token) {
      navigate("/login"); // Redirect to login if no token
    }
  }, [navigate]);
  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="dashboard-content">
        <h1>Welcome to the Admin Dashboard</h1>
      </div>
    </div>
  );
};

export default Dashboard;
