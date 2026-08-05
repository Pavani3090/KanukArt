import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import "./ArtistDashboard.css";

function ArtistDashboard() {
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    totalArtworks: 0,
    approvedArtworks: 0,
    pendingArtworks: 0,
    rejectedArtworks: 0,
    totalOrders: 0,
    revenue: 0,
  });

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await api.get(
        `/artworks/artist-stats/${user.id}`
      );

      setStats({
        totalArtworks: response.data.totalArtworks || 0,
        approvedArtworks: response.data.approvedArtworks || 0,
        pendingArtworks: response.data.pendingArtworks || 0,
        rejectedArtworks: response.data.rejectedArtworks || 0,
        totalOrders: response.data.totalOrders || 0,
        revenue: response.data.revenue || 0,
      });
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
          Manage your artworks, track approvals and grow your creative
          business with KanukArt.
        </p>
      </div>

      {/* Statistics */}
      <div className="stats-container">

        <div className="stat-card">
          <h2>{stats.totalArtworks}</h2>
          <p>🖼 Total Artworks</p>
        </div>

        <div className="stat-card approved">
          <h2>{stats.approvedArtworks}</h2>
          <p>✅ Approved</p>
        </div>

        <div className="stat-card pending">
          <h2>{stats.pendingArtworks}</h2>
          <p>🟡 Pending</p>
        </div>

        <div className="stat-card rejected">
          <h2>{stats.rejectedArtworks}</h2>
          <p>❌ Rejected</p>
        </div>

        <div className="stat-card">
          <h2>{stats.totalOrders}</h2>
          <p>📦 Orders</p>
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

          <p>
            Showcase your latest paintings,
            sketches, pottery and handmade creations.
          </p>
        </div>

        <div
          className="dashboard-card"
          onClick={() => navigate("/my-artworks")}
        >
          <h2>🖼 Manage Artworks</h2>

          <p>
            View, edit and manage your uploaded
            artworks in one place.
          </p>
        </div>

        <div
          className="dashboard-card"
          onClick={() => alert("Coming Soon")}
        >
          <h2>📊 Sales Analytics</h2>

          <p>
            Monitor your artwork performance,
            sales and customer engagement.
          </p>
        </div>

        <div
          className="dashboard-card"
          onClick={() => alert("Coming Soon")}
        >
          <h2>🔔 Notifications</h2>

          <p>
            Track artwork approvals,
            orders and important updates.
          </p>
        </div>

      </div>

      {/* Coming Soon */}
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
          <li>💳 Payment & Revenue Reports</li>
          <li>📈 Monthly Sales Analytics</li>
          <li>⭐ Customer Ratings & Reviews</li>
          <li>💬 Customer Messages</li>
        </ul>
      </div>

    </div>
  );
}

export default ArtistDashboard;