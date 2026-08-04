import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import "./CustomerDashboard.css";

function CustomerDashboard() {
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [artworks, setArtworks] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));

  const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  const categories = [
    {
      name: "Painting",
      value: "PAINTING",
      icon: "🎨",
    },
    {
      name: "Sketch",
      value: "SKETCH",
      icon: "✏️",
    },
    {
      name: "Pottery",
      value: "POTTERY",
      icon: "🏺",
    },
    {
      name: "Custom Gift",
      value: "CUSTOM_GIFT",
      icon: "🎁",
    },
  ];
  useEffect(() => {
    fetchFeaturedArtworks();
  }, []);

  const fetchFeaturedArtworks = async () => {
    try {
      const response = await api.get("/artworks/approved");

      setArtworks(response.data.slice(0, 8));
    } catch (error) {
      console.error(error);
    }
  };

  const filteredArtworks = artworks.filter(
    (artwork) =>
      artwork.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      artwork.category.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="customer-dashboard">
      {/* HERO */}
      <div className="dashboard-header">
        <h1>Welcome, {user?.name} 👋</h1>

        <p>Discover unique handmade artworks crafted by talented artists.</p>

        <div
          style={{
            marginTop: "30px",
          }}
        >
          <input
            type="text"
            placeholder="🔍 Search artworks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: "450px",
              padding: "15px 20px",
              borderRadius: "30px",
              border: "1px solid #ddd",
              fontSize: "16px",
            }}
          />
        </div>
      </div>

      {/* STATS */}
      <div className="stats-grid">
        <div className="stat-card" onClick={() => navigate("/wishlist")}>
          <h2>❤️ Wishlist</h2>

          <h1>{wishlist.length}</h1>
        </div>

        <div className="stat-card" onClick={() => navigate("/cart")}>
          <h2>🛒 Cart</h2>

          <h1>{cart.length}</h1>
        </div>

        <div className="stat-card" onClick={() => navigate("/orders")}>
          <h2>📦 Orders</h2>

          <h1>View</h1>
        </div>
      </div>

      {/* CATEGORIES */}
      <div className="section">
        <h2>Browse Categories</h2>

        <div className="category-grid">
          {categories
            .filter((category) =>
              category.name.toLowerCase().includes(searchTerm.toLowerCase()),
            )
            .map((category, index) => (
              <div
                key={index}
                className="category-card"
                onClick={() => navigate(`/shop?category=${category.value}`)}
              >
                {category.icon} {category.name}
              </div>
            ))}
        </div>
      </div>

      {/* FEATURED ARTWORKS */}
      <div className="section">
        <div className="section-header">
          <h2>Featured Artworks</h2>

          <button onClick={() => navigate("/shop")}>View All →</button>
        </div>

        <div className="artwork-grid">
          {filteredArtworks.map((artwork) => (
            <div
              key={artwork.id}
              className="artwork-card"
              onClick={() => navigate(`/artwork/${artwork.id}`)}
            >
              <img src={artwork.imageUrl} alt={artwork.title} />

              <div className="artwork-info">
                <h3>{artwork.title}</h3>

                <p>{artwork.category}</p>

                <h4>₹{artwork.price}</h4>
              </div>
            </div>
          ))}
        </div>

        {filteredArtworks.length === 0 && (
          <h3
            style={{
              textAlign: "center",
              marginTop: "30px",
              color: "#777",
            }}
          >
            No artworks found 😔
          </h3>
        )}
      </div>
    </div>
  );
}

export default CustomerDashboard;
