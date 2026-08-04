import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import "./AdminDashboard.css";

function AdminDashboard() {
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    totalUsers: 0,
    totalArtists: 0,
    totalArtworks: 0,
    totalOrders: 0,
    totalRevenue: 0,
  });

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const response = await api.get("/admin/stats");
      setStats(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="admin-dashboard">
      <div className="dashboard-header">
        <h1>Admin Control Panel 🛠️</h1>

        <p>Manage KanukArt marketplace, artists, customers and orders.</p>
      </div>

      <div className="stats-container">
        <div className="stat-card">
          <h2>{stats.totalUsers}</h2>
          <p>Total Users</p>
        </div>

        <div className="stat-card">
          <h2>{stats.totalArtists}</h2>
          <p>Total Artists</p>
        </div>

        <div className="stat-card">
          <h2>{stats.totalArtworks}</h2>
          <p>Total Artworks</p>
        </div>

        <div className="stat-card">
          <h2>{stats.totalOrders}</h2>
          <p>Total Orders</p>
        </div>
        <div className="stat-card">
          <h2>₹{stats.totalRevenue}</h2>
          <p>Total Revenue</p>
        </div>
      </div>

      <div className="dashboard-cards">
        <div
          className="dashboard-card"
          onClick={() => navigate("/admin/artworks")}
        >
          <h2>🎨 Manage Artworks</h2>

          <p>View all artworks uploaded across the platform.</p>
        </div>

        <div
          className="dashboard-card"
          onClick={() => navigate("/admin/orders")}
        >
          <h2>📦 Manage Orders</h2>

          <p>Update order status and track customer purchases.</p>
        </div>
        <div
          className="dashboard-card"
          onClick={() => navigate("/admin/users")}
        >
          <h2>👥 Manage Users</h2>

          <p>View, search and remove customers or artists.</p>
        </div>
        

        <div className="dashboard-card" onClick={() => navigate("/shop")}>
          <h2>🛍 Marketplace</h2>

          <p>Browse the live marketplace exactly as customers see it.</p>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
