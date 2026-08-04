import { useEffect, useState } from "react";
import api from "../../services/api";
import "./MyArtworks.css";
import { useNavigate } from "react-router-dom";

function MyArtworks() {
  const [artworks, setArtworks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchArtworks();
  }, []);
  

  const fetchArtworks = async () => {
  try {

    const user =
      JSON.parse(localStorage.getItem("user"));

    const response = await api.get(
      `/artworks/artist/${user.id}`
    );

    setArtworks(response.data);

  } catch (error) {
    console.error("Error fetching artworks:", error);
  }
};
  const deleteArtwork = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this artwork?",
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

  return (
    <div className="my-artworks">
      <h1>My Artworks</h1>

      <div className="artwork-grid">
        {artworks.length > 0 ? (
          artworks.map((artwork) => (
            <div className="artwork-card" key={artwork.id}>
              <img
                src={artwork.imageUrl || "https://via.placeholder.com/300"}
                alt={artwork.title}
              />

              <div className="artwork-content">
                <h3>{artwork.title}</h3>

                <span className="category">{artwork.category}</span>

                <p>{artwork.description}</p>

                <h4>₹{artwork.price}</h4>

                <div className="action-buttons">
                  <button
                    className="edit-btn"
                    onClick={() => navigate(`/edit-artwork/${artwork.id}`)}
                  >
                    Edit
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() => deleteArtwork(artwork.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="empty-state">
            <h2>No Artworks Yet 🎨</h2>
            <p>
              Start showcasing your creativity by adding your first artwork.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default MyArtworks;
