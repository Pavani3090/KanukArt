import { useEffect, useState } from "react";
import api from "../../services/api";
import "./Shop.css";
import { useNavigate, useLocation } from "react-router-dom";

function Shop() {
  const [artworks, setArtworks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortBy, setSortBy] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    fetchArtworks();

    const category =
      new URLSearchParams(location.search).get("category");

    if (category) {
      setSelectedCategory(category);
    }
  }, [location.search]);

  const fetchArtworks = async () => {
    try {
      const response = await api.get("/artworks/approved");

      setArtworks(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  let filteredArtworks = artworks.filter((artwork) => {
    const matchesSearch =
      artwork.title
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      artwork.category
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      artwork.description
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === ""
        ? true
        : artwork.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  if (sortBy === "LOW_HIGH") {
    filteredArtworks.sort(
      (a, b) => a.price - b.price
    );
  }

  if (sortBy === "HIGH_LOW") {
    filteredArtworks.sort(
      (a, b) => b.price - a.price
    );
  }

  return (
    <div className="shop-container">
      <h1>Explore Creative Artworks</h1>

      <p>
        Discover paintings, sketches, pottery and
        customized gifts crafted by talented artists.
      </p>

      {/* Filters */}
      <div className="shop-filters">
        <input
          type="text"
          placeholder="🔍 Search by title, category..."
          value={searchTerm}
          onChange={(e) =>
            setSearchTerm(e.target.value)
          }
        />

        <select
          value={selectedCategory}
          onChange={(e) =>
            setSelectedCategory(e.target.value)
          }
        >
          <option value="">
            All Categories
          </option>

          <option value="PAINTING">
            Painting
          </option>

          <option value="SKETCH">
            Sketch
          </option>

          <option value="POTTERY">
            Pottery
          </option>

          <option value="CUSTOM_GIFT">
            Custom Gift
          </option>
        </select>

        <select
          value={sortBy}
          onChange={(e) =>
            setSortBy(e.target.value)
          }
        >
          <option value="">
            Sort By
          </option>

          <option value="LOW_HIGH">
            Price Low → High
          </option>

          <option value="HIGH_LOW">
            Price High → Low
          </option>
        </select>
      </div>

      {/* Results Count */}
      <div
        style={{
          marginBottom: "20px",
          fontWeight: "bold",
          color: "#666",
        }}
      >
        {filteredArtworks.length} artworks found
      </div>

      {/* Artwork Grid */}
      <div className="artwork-grid">
        {filteredArtworks.map((artwork) => (
          <div
            className="artwork-card"
            key={artwork.id}
          >
            <img
              src={
                artwork.imageUrl ||
                "https://via.placeholder.com/300"
              }
              alt={artwork.title}
            />

            <div className="card-content">
              <h3>{artwork.title}</h3>

              <span className="category">
                {artwork.category}
              </span>

              <p>
                {artwork.description?.length > 80
                  ? artwork.description.substring(
                      0,
                      80
                    ) + "..."
                  : artwork.description}
              </p>

              <h4>₹ {artwork.price}</h4>

              <button
                onClick={() =>
                  navigate(
                    `/artwork/${artwork.id}`
                  )
                }
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredArtworks.length === 0 && (
        <div
          style={{
            textAlign: "center",
            marginTop: "50px",
          }}
        >
          <h2>
            No artworks found 😔
          </h2>

          <p>
            Try another category or search term.
          </p>
        </div>
      )}
    </div>
  );
}

export default Shop;