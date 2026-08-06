import { useEffect, useState } from "react";
import api from "../../services/api";
import "./MyArtworks.css";
import {
  useNavigate,
  useLocation,
} from "react-router-dom";

function MyArtworks() {
  const navigate = useNavigate();
  const location = useLocation();

  const [artworks, setArtworks] = useState([]);

  const initialStatus =
    new URLSearchParams(location.search).get("status") || "ALL";

  const [selectedStatus, setSelectedStatus] =
    useState(initialStatus);

  useEffect(() => {
    fetchArtworks();
  }, []);

  useEffect(() => {
    const status =
      new URLSearchParams(location.search).get("status") || "ALL";

    setSelectedStatus(status);
  }, [location.search]);

  const fetchArtworks = async () => {
    try {
      const user =
        JSON.parse(localStorage.getItem("user"));

      const response = await api.get(
        `/artworks/artist/${user.id}`
      );

      setArtworks(response.data);

    } catch (error) {
      console.error(error);
    }
  };

  const deleteArtwork = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this artwork?"
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`/artworks/${id}`);

      alert("Artwork Deleted Successfully");

      fetchArtworks();

    } catch (error) {

      console.error(error);

      alert("Delete Failed");
    }
  };

  const filteredArtworks =
    selectedStatus === "ALL"
      ? artworks
      : artworks.filter(
          (artwork) =>
            artwork.status === selectedStatus
        );

  return (
    <div className="my-artworks">

      <h1>🎨 My Artworks</h1>

      <div className="status-tabs">

        <button
          className={
            selectedStatus === "ALL"
              ? "active"
              : ""
          }
          onClick={() => setSelectedStatus("ALL")}
        >
          All
        </button>

        <button
          className={
            selectedStatus === "APPROVED"
              ? "active"
              : ""
          }
          onClick={() => setSelectedStatus("APPROVED")}
        >
          Approved
        </button>

        <button
          className={
            selectedStatus === "PENDING"
              ? "active"
              : ""
          }
          onClick={() => setSelectedStatus("PENDING")}
        >
          Pending
        </button>

        <button
          className={
            selectedStatus === "REJECTED"
              ? "active"
              : ""
          }
          onClick={() => setSelectedStatus("REJECTED")}
        >
          Rejected
        </button>

      </div>

      <div className="artwork-grid">

        {filteredArtworks.length > 0 ? (

          filteredArtworks.map((artwork) => (

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

              <div className="artwork-content">

                <h3>{artwork.title}</h3>

                <div className="artwork-meta">

                  <span className="category">
                    {artwork.category}
                  </span>

                  <span
                    className={`status-badge ${artwork.status.toLowerCase()}`}
                  >
                    {artwork.status}
                  </span>

                </div>

                <p>{artwork.description}</p>

                <h4>₹{artwork.price}</h4>

                <div className="action-buttons">

                  <button
                    className="edit-btn"
                    onClick={() =>
                      navigate(
                        `/edit-artwork/${artwork.id}`
                      )
                    }
                  >
                    Edit
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() =>
                      deleteArtwork(artwork.id)
                    }
                  >
                    Delete
                  </button>

                </div>

              </div>

            </div>

          ))

        ) : (

          <div className="empty-state">

            <h2>No Artworks Found 🎨</h2>

            <p>
              There are no artworks in this section.
            </p>

          </div>

        )}

      </div>

    </div>
  );
}

export default MyArtworks;