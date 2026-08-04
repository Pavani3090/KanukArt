import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../services/api";

function EditArtwork() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [artwork, setArtwork] = useState({
    title: "",
    description: "",
    category: "",
    price: "",
    imageUrl: ""
  });

  useEffect(() => {
    fetchArtwork();
  }, []);

  const fetchArtwork = async () => {
    try {

      const response = await api.get("/artworks");

      const selectedArtwork =
        response.data.find(
          item => item.id === Number(id)
        );

      if (selectedArtwork) {
        setArtwork(selectedArtwork);
      }

    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    setArtwork({
      ...artwork,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      await api.put(
        `/artworks/${id}`,
        artwork
      );

      alert("Artwork Updated");

      navigate("/my-artworks");

    } catch (error) {

      console.error(error);

      alert("Update Failed");
    }
  };

  return (
    <div style={{ padding: "30px" }}>
      <h1>Edit Artwork</h1>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          name="title"
          value={artwork.title}
          onChange={handleChange}
        />

        <br /><br />

        <textarea
          name="description"
          value={artwork.description}
          onChange={handleChange}
        />

        <br /><br />

        <input
          type="text"
          name="category"
          value={artwork.category}
          onChange={handleChange}
        />

        <br /><br />

        <input
          type="number"
          name="price"
          value={artwork.price}
          onChange={handleChange}
        />

        <br /><br />

        <input
          type="text"
          name="imageUrl"
          value={artwork.imageUrl}
          onChange={handleChange}
        />

        <br /><br />

        <button type="submit">
          Update Artwork
        </button>

      </form>
    </div>
  );
}

export default EditArtwork;