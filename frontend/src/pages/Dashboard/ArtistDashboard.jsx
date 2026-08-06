import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import "./ArtistDashboard.css";

function ArtistDashboard() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const [stats, setStats] = useState({
    totalArtworks: 0,
    approvedArtworks: 0,
    pendingArtworks: 0,
    rejectedArtworks: 0,
    totalOrders: 0,
    revenue: 0,
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await api.get(`/artworks/artist-stats/${user.id}`);

      setStats(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="artist-dashboard">
      {/* Header */}

      <div className="dashboard-header">
        <h1>🎨 Welcome back, {user?.name}</h1>

        <p>
          Manage your artworks, monitor approvals and grow your creative
          business with KanukArt.
        </p>
      </div>

      {/* Statistics */}

      <div className="stats-container">
        <div className="stat-card" onClick={() => navigate("/my-artworks")}>
          <h2>{stats.totalArtworks}</h2>
          <p>🖼 Total Artworks</p>
        </div>

        <div
          className="stat-card approved"
          onClick={() => navigate("/my-artworks?status=APPROVED")}
        >
          <h2>{stats.approvedArtworks}</h2>
          <p>✅ Approved</p>
        </div>

        <div
          className="stat-card pending"
          onClick={() => navigate("/my-artworks?status=PENDING")}
        >
          <h2>{stats.pendingArtworks}</h2>
          <p>🟡 Pending</p>
        </div>

        <div
          className="stat-card rejected"
          onClick={() => navigate("/my-artworks?status=REJECTED")}
        >
          <h2>{stats.rejectedArtworks}</h2>
          <p>❌ Rejected</p>
        </div>

        <div
          className="dashboard-card"
          onClick={() => navigate("/artist-orders")}
        >
          <h2>📦 Orders</h2>

          <p>View customer orders, order status and sales history.</p>
        </div>

        <div className="stat-card revenue">
          <h2>₹{stats.revenue}</h2>
          <p>💰 Revenue</p>
        </div>
      </div>

      {/* Quick Actions */}

      <div className="dashboard-cards">
        <div
          className="dashboard-card"
          onClick={() => navigate("/add-artwork")}
        >
          <h2>🎨 Upload Artwork</h2>

          <p>Upload paintings, sketches, pottery and custom creations.</p>
        </div>

        <div
          className="dashboard-card"
          onClick={() => navigate("/my-artworks")}
        >
          <h2>🖼 Manage Artworks</h2>

          <p>View, edit and organize all your uploaded artworks.</p>
        </div>

        <div className="dashboard-card" onClick={() => alert("Coming Soon")}>
          <h2>📈 Sales Analytics</h2>

          <p>Monitor performance, views and future sales.</p>
        </div>

        <div className="dashboard-card" onClick={() => alert("Coming Soon")}>
          <h2>🔔 Notifications</h2>

          <p>Artwork approvals, customer updates and alerts.</p>
        </div>
      </div>

      {/* Upcoming */}

      <div
        style={{
          marginTop: "40px",
          background: "#fff",
          padding: "25px",
          borderRadius: "15px",
          boxShadow: "0 5px 15px rgba(0,0,0,.08)",
        }}
      >
        <h2>🚀 Upcoming Features</h2>

        <ul
          style={{
            marginTop: "15px",
            lineHeight: "2",
          }}
        >
          <li>📦 Order Management</li>
          <li>💳 Payment Reports</li>
          <li>📈 Monthly Analytics</li>
          <li>⭐ Customer Reviews</li>
          <li>💬 Customer Messages</li>
        </ul>
      </div>
    </div>
  );
}

export default ArtistDashboard;
