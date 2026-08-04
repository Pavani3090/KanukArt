import { useEffect, useState } from "react";
import api from "../../services/api";

function ManageArtworks() {
  const [artworks, setArtworks] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadArtworks();
  }, []);

  const loadArtworks = async () => {
    try {
      const response = await api.get("/artworks");
      setArtworks(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteArtwork = async (id) => {
    if (!window.confirm("Delete artwork?")) return;

    try {
      await api.delete(`/artworks/${id}`);
      loadArtworks();
    } catch (error) {
      console.error(error);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await api.put(
        `/artworks/${id}/status?status=${status}`
      );

      loadArtworks();
    } catch (error) {
      console.error(error);
    }
  };

  const filteredArtworks = artworks.filter((art) =>
    art.title?.toLowerCase().includes(search.toLowerCase()) ||
    art.category?.toLowerCase().includes(search.toLowerCase()) ||
    art.artist?.name?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ padding: "30px" }}>
      <h1 style={{ marginBottom: "20px" }}>
        🎨 Manage Artworks
      </h1>

      <input
        type="text"
        placeholder="Search artwork, category or artist..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          width: "350px",
          padding: "10px",
          marginBottom: "20px",
          borderRadius: "8px",
          border: "1px solid #ccc"
        }}
      />

      <table
        width="100%"
        style={{
          borderCollapse: "collapse",
          background: "white",
          borderRadius: "10px",
          overflow: "hidden",
          boxShadow: "0 2px 10px rgba(0,0,0,0.1)"
        }}
      >
        <thead>
          <tr
            style={{
              background:
                "linear-gradient(90deg,#6a11cb,#8e2de2)",
              color: "white"
            }}
          >
            <th>ID</th>
            <th>Image</th>
            <th>Artwork</th>
            <th>Category</th>
            <th>Price</th>
            <th>Artist</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {filteredArtworks.map((art) => (
            <tr
              key={art.id}
              style={{
                textAlign: "center",
                borderBottom:
                  "1px solid #e0e0e0"
              }}
            >
              <td>{art.id}</td>

              <td>
                <img
                  src={art.imageUrl}
                  alt={art.title}
                  width="70"
                  height="70"
                  style={{
                    objectFit: "cover",
                    borderRadius: "8px"
                  }}
                />
              </td>

              <td>{art.title}</td>

              <td>{art.category}</td>

              <td>₹{art.price}</td>

              <td>
                {art.artist?.name ||
                  "Unknown Artist"}
              </td>

              <td>
                {art.status === "APPROVED" && (
                  <span
                    style={{
                      color: "green",
                      fontWeight: "bold"
                    }}
                  >
                    ✅ Approved
                  </span>
                )}

                {art.status === "PENDING" && (
                  <span
                    style={{
                      color: "orange",
                      fontWeight: "bold"
                    }}
                  >
                    ⏳ Pending
                  </span>
                )}

                {art.status === "REJECTED" && (
                  <span
                    style={{
                      color: "red",
                      fontWeight: "bold"
                    }}
                  >
                    ❌ Rejected
                  </span>
                )}
              </td>

              <td>
                {art.status === "PENDING" && (
                  <>
                    <button
                      style={{
                        background: "green",
                        color: "white",
                        border: "none",
                        padding:
                          "8px 12px",
                        marginRight: "5px",
                        borderRadius: "5px",
                        cursor: "pointer"
                      }}
                      onClick={() =>
                        updateStatus(
                          art.id,
                          "APPROVED"
                        )
                      }
                    >
                      Approve
                    </button>

                    <button
                      style={{
                        background: "orange",
                        color: "white",
                        border: "none",
                        padding:
                          "8px 12px",
                        marginRight: "5px",
                        borderRadius: "5px",
                        cursor: "pointer"
                      }}
                      onClick={() =>
                        updateStatus(
                          art.id,
                          "REJECTED"
                        )
                      }
                    >
                      Reject
                    </button>
                  </>
                )}

                <button
                  style={{
                    background: "#ff4444",
                    color: "white",
                    border: "none",
                    padding:
                      "8px 12px",
                    borderRadius: "5px",
                    cursor: "pointer"
                  }}
                  onClick={() =>
                    deleteArtwork(art.id)
                  }
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ManageArtworks;