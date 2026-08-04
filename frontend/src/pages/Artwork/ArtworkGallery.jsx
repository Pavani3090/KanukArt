import { useEffect, useState } from "react";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";

function ArtworkGallery() {

  const [artworks, setArtworks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchArtworks();
  }, []);

  const fetchArtworks = async () => {
    try {

      const response = await api.get("/artworks");

      setArtworks(response.data);

    } catch (error) {

      console.error(error);

    }
  };

  return (
    <div style={{ padding: "30px" }}>

      <h1>Artwork Gallery</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "20px",
        }}
      >

        {artworks.map((artwork) => (

          <div
            key={artwork.id}
            onClick={() => navigate(`/artwork/${artwork.id}`)}
            style={{
              border: "1px solid #ddd",
              borderRadius: "10px",
              padding: "15px",
              boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
              cursor: "pointer",
              transition: "0.3s",
            }}
          >

            <img
              src={
                artwork.imageUrl ||
                "https://via.placeholder.com/300"
              }
              alt={artwork.title}
              style={{
                width: "100%",
                height: "200px",
                objectFit: "cover",
                borderRadius: "10px",
              }}
            />

            <h3>{artwork.title}</h3>

            <p>
              <strong>Category:</strong>{" "}
              {artwork.category}
            </p>

            <p>
              <strong>Price:</strong> ₹{artwork.price}
            </p>

            <p>{artwork.description}</p>

          </div>

        ))}

      </div>

    </div>
  );
}

export default ArtworkGallery;