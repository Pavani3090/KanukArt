import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../services/api";

function ArtworkDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [artwork, setArtwork] = useState(null);

  useEffect(() => {
    fetchArtwork();
  }, []);

  const fetchArtwork = async () => {
    try {
      const response = await api.get(`/artworks/${id}`);
      setArtwork(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const addToWishlist = () => {
    const user =
      JSON.parse(localStorage.getItem("user"));

    if (!user) {
      alert("Please login first");
      navigate("/login");
      return;
    }

    const wishlist =
      JSON.parse(localStorage.getItem("wishlist")) || [];

    const exists = wishlist.find(
      (item) => item.id === artwork.id
    );

    if (exists) {
      alert("Already in Wishlist ❤️");
      return;
    }

    wishlist.push(artwork);

    localStorage.setItem(
      "wishlist",
      JSON.stringify(wishlist)
    );

    alert("Added to Wishlist ❤️");
  };

  const addToCart = () => {
    const user =
      JSON.parse(localStorage.getItem("user"));

    if (!user) {
      alert("Please login first");
      navigate("/login");
      return;
    }

    const cart =
      JSON.parse(localStorage.getItem("cart")) || [];

    const existingItem = cart.find(
      (item) => item.id === artwork.id
    );

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({
        ...artwork,
        quantity: 1,
      });
    }

    localStorage.setItem(
      "cart",
      JSON.stringify(cart)
    );

    alert("Added to Cart 🛒");
  };

  if (!artwork) {
    return <h2>Loading...</h2>;
  }

  return (
    <div style={{ padding: "40px" }}>
      <img
        src={artwork.imageUrl}
        alt={artwork.title}
        width="500"
        style={{
          borderRadius: "12px",
          maxWidth: "100%",
        }}
      />

      <h1>{artwork.title}</h1>

      <h3>{artwork.category}</h3>

      <p>{artwork.description}</p>

      <h2>₹{artwork.price}</h2>

      <div
        style={{
          display: "flex",
          gap: "15px",
          marginTop: "20px",
        }}
      >
        <button onClick={addToWishlist}>
          ❤️ Add To Wishlist
        </button>

        <button onClick={addToCart}>
          🛒 Add To Cart
        </button>
      </div>
    </div>
  );
}

export default ArtworkDetails;