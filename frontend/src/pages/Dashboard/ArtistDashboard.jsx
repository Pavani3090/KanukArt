import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import "./ArtistDashboard.css";

function ArtistDashboard() {

  const navigate = useNavigate();

  const [stats, setStats] = useState({
  totalArtworks: 0,
  totalOrders: 0,
  revenue: 0,
});

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {

      const user =
        JSON.parse(localStorage.getItem("user"));

      const response = await api.get(
        `/artworks/artist-stats/${user.id}`
      );

      setStats(response.data);

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="artist-dashboard">

      <div className="dashboard-header">
        <h1>Artist Studio 🎨</h1>
        <p>
          Manage your creative portfolio on KanukArt
        </p>
      </div>

      <div className="stats-container">

        <div className="stat-card">
          <h2>{stats.totalArtworks}</h2>
          <p>Total Artworks</p>
        </div>

        <div className="stat-card">
          <h2>{stats.totalOrders}</h2>
          <p>Total Orders</p>
        </div>

        <div className="stat-card">
          <h2>₹{stats.revenue}</h2>
          <p>Revenue</p>
        </div>

      </div>

      <div className="dashboard-cards">

        <div
          className="dashboard-card"
          onClick={() => navigate("/add-artwork")}
        >
          <h2>🎨 Add Artwork</h2>

          <p>
            Upload new paintings, sketches,
            pottery and custom creations.
          </p>
        </div>

        <div
          className="dashboard-card"
          onClick={() => navigate("/my-artworks")}
        >
          <h2>🖼 My Artworks</h2>

          <p>
            View and manage all your
            uploaded artworks.
          </p>
        </div>

      </div>

    </div>
  );
}

export default ArtistDashboard;