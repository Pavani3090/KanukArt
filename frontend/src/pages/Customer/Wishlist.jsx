import { useEffect, useState } from "react";

function Wishlist() {

  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {

    const data =
      JSON.parse(
        localStorage.getItem("wishlist")
      ) || [];

    setWishlist(data);

  }, []);

  const addToCart = (artwork) => {

    const cart =
      JSON.parse(
        localStorage.getItem("cart")
      ) || [];

    const exists = cart.find(
      item => item.id === artwork.id
    );

    if (exists) {
      alert("Artwork already in cart");
      return;
    }

    cart.push(artwork);

    localStorage.setItem(
      "cart",
      JSON.stringify(cart)
    );

    alert("Artwork added to cart 🛒");
  };

  const removeFromWishlist = (id) => {

    const updatedWishlist =
      wishlist.filter(
        item => item.id !== id
      );

    setWishlist(updatedWishlist);

    localStorage.setItem(
      "wishlist",
      JSON.stringify(updatedWishlist)
    );
  };

  return (
    <div style={{ padding: "30px" }}>

      <h1>My Wishlist ❤️</h1>

      {wishlist.length === 0 ? (
        <h3>No artworks added yet</h3>
      ) : (

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(280px,1fr))",
            gap: "20px",
          }}
        >

          {wishlist.map((artwork) => (

            <div
              key={artwork.id}
              style={{
                border: "1px solid #ddd",
                borderRadius: "12px",
                overflow: "hidden",
                background: "#fff",
                boxShadow:
                  "0 2px 10px rgba(0,0,0,0.08)",
              }}
            >

              <img
                src={artwork.imageUrl}
                alt={artwork.title}
                style={{
                  width: "100%",
                  height: "220px",
                  objectFit: "cover",
                }}
              />

              <div style={{ padding: "15px" }}>

                <h3>{artwork.title}</h3>

                <p
                  style={{
                    color: "#666",
                    marginBottom: "10px",
                  }}
                >
                  {artwork.category}
                </p>

                <h3
                  style={{
                    color: "#6a11cb",
                  }}
                >
                  ₹{artwork.price}
                </h3>

                <div
                  style={{
                    display: "flex",
                    gap: "10px",
                    marginTop: "15px",
                  }}
                >

                  <button
                    onClick={() =>
                      addToCart(artwork)
                    }
                    style={{
                      flex: 1,
                      background:
                        "#6a11cb",
                      color: "white",
                      border: "none",
                      padding: "10px",
                      borderRadius: "8px",
                      cursor: "pointer",
                    }}
                  >
                    🛒 Add To Cart
                  </button>

                  <button
                    onClick={() =>
                      removeFromWishlist(
                        artwork.id
                      )
                    }
                    style={{
                      flex: 1,
                      background:
                        "#ff4d4f",
                      color: "white",
                      border: "none",
                      padding: "10px",
                      borderRadius: "8px",
                      cursor: "pointer",
                    }}
                  >
                    ❌ Remove
                  </button>

                </div>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>
  );
}

export default Wishlist;