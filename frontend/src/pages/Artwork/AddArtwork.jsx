import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

function AddArtwork() {
  const navigate = useNavigate();

  const [artwork, setArtwork] = useState({
    title: "",
    description: "",
    category: "",
    price: "",
    imageUrl: "",
  });

  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setArtwork({
      ...artwork,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const uploadImageToCloudinary = async () => {
    const data = new FormData();

    data.append("file", image);
    data.append("upload_preset", "kanukart");

    const response = await fetch(
      "https://api.cloudinary.com/v1_1/msgrq8pq/image/upload",
      {
        method: "POST",
        body: data,
      }
    );

    const result = await response.json();

    return result.secure_url;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user =
      JSON.parse(localStorage.getItem("user"));

    if (!user) {
      alert("Please login first");
      navigate("/login");
      return;
    }

    if (user.role !== "ARTIST") {
      alert("Only Artists can upload artworks");
      return;
    }

    try {
      setLoading(true);

      let imageUrl = "";

      if (image) {
        imageUrl = await uploadImageToCloudinary();
      }

      const payload = {
        ...artwork,
        imageUrl,
        artist: {
          id: user.id,
        },
      };

      await api.post("/artworks", payload);

      alert(
        "Artwork Submitted Successfully 🎨\nWaiting for Admin Approval."
      );

      setArtwork({
        title: "",
        description: "",
        category: "",
        price: "",
        imageUrl: "",
      });

      setImage(null);

    } catch (error) {
      console.error(error);
      alert("Failed to Add Artwork");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "30px" }}>
      <h1>Add Artwork</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Artwork Title"
          value={artwork.title}
          onChange={handleChange}
          required
        />

        <br /><br />

        <textarea
          name="description"
          placeholder="Description"
          value={artwork.description}
          onChange={handleChange}
          required
        />

        <br /><br />

        <select
          name="category"
          value={artwork.category}
          onChange={handleChange}
          required
        >
          <option value="">Select Category</option>
          <option value="PAINTING">Painting</option>
          <option value="SKETCH">Sketch</option>
          <option value="POTTERY">Pottery</option>
          <option value="CUSTOM_GIFT">Custom Gift</option>
        </select>

        <br /><br />

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={artwork.price}
          onChange={handleChange}
          required
        />

        <br /><br />

        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          required
        />

        <br /><br />

        {image && (
          <img
            src={URL.createObjectURL(image)}
            alt="Preview"
            width="250"
            style={{
              borderRadius: "10px",
              marginBottom: "20px",
            }}
          />
        )}

        <br />

        <button
          type="submit"
          disabled={loading}
        >
          {loading
            ? "Uploading..."
            : "Save Artwork"}
        </button>
      </form>
    </div>
  );
}

export default AddArtwork;