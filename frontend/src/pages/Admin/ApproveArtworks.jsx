import { useEffect, useState } from "react";
import api from "../../services/api";
import "./ApproveArtworks.css";

function ApproveArtworks() {
  const [artworks, setArtworks] = useState([]);

  useEffect(() => {
    loadPendingArtworks();
  }, []);

  const loadPendingArtworks = async () => {
    try {
      const response = await api.get(
        "/artworks/pending"
      );

      setArtworks(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const updateStatus = async (
    id,
    status
  ) => {
    try {
      await api.put(
        `/artworks/${id}/status?status=${status}`
      );

      loadPendingArtworks();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="approval-page">
      <h1>🎨 Artwork Approval Center</h1>

      {artworks.length === 0 ? (
        <h3>No Pending Artworks</h3>
      ) : (
        <div className="approval-grid">
          {artworks.map((artwork) => (
            <div
              key={artwork.id}
              className="approval-card"
            >
              <img
                src={artwork.imageUrl}
                alt={artwork.title}
              />

              <h3>{artwork.title}</h3>

              <p>
                <b>Category:</b>{" "}
                {artwork.category}
              </p>

              <p>
                <b>Price:</b> ₹
                {artwork.price}
              </p>

              <p>
                {artwork.description}
              </p>

              <div className="approval-actions">
                <button
                  className="approve-btn"
                  onClick={() =>
                    updateStatus(
                      artwork.id,
                      "APPROVED"
                    )
                  }
                >
                  Approve
                </button>

                <button
                  className="reject-btn"
                  onClick={() =>
                    updateStatus(
                      artwork.id,
                      "REJECTED"
                    )
                  }
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ApproveArtworks;