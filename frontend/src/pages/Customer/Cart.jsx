import { useEffect, useState } from "react";
import api from "../../services/api";

function Cart() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = () => {
    const data =
      JSON.parse(localStorage.getItem("cart")) || [];

    // Ensure every item has quantity
    const updatedData = data.map((item) => ({
      ...item,
      quantity: item.quantity || 1,
    }));

    localStorage.setItem(
      "cart",
      JSON.stringify(updatedData)
    );

    setCart(updatedData);
  };

  const removeItem = (id) => {
    const updatedCart = cart.filter(
      (item) => item.id !== id
    );

    localStorage.setItem(
      "cart",
      JSON.stringify(updatedCart)
    );

    setCart(updatedCart);
  };

  const increaseQty = (id) => {
    const updatedCart = cart.map((item) =>
      item.id === id
        ? {
            ...item,
            quantity: (item.quantity || 1) + 1,
          }
        : item
    );

    localStorage.setItem(
      "cart",
      JSON.stringify(updatedCart)
    );

    setCart(updatedCart);
  };

  const decreaseQty = (id) => {
    const updatedCart = cart.map((item) =>
      item.id === id
        ? {
            ...item,
            quantity:
              (item.quantity || 1) > 1
                ? item.quantity - 1
                : 1,
          }
        : item
    );

    localStorage.setItem(
      "cart",
      JSON.stringify(updatedCart)
    );

    setCart(updatedCart);
  };

  const total = cart.reduce(
    (sum, item) =>
      sum +
      item.price * (item.quantity || 1),
    0
  );

  const totalItems = cart.reduce(
    (sum, item) =>
      sum + (item.quantity || 1),
    0
  );

  const checkout = async () => {
    try {
      const user =
        JSON.parse(localStorage.getItem("user"));

      if (!user) {
        alert("Please login first");
        return;
      }

      const payload = {
        userId: user.id,
        totalAmount: total,

        items: cart.map((item) => ({
          artworkId: item.id,
          quantity: item.quantity || 1,
          price: item.price,
        })),
      };

      await api.post("/orders", payload);

      alert("Order Placed Successfully 🎉");

      localStorage.removeItem("cart");

      setCart([]);
    } catch (error) {
      console.error(error);
      alert("Order Failed");
    }
  };

  return (
    <div
      style={{
        padding: "40px",
        background: "#f8f8f8",
        minHeight: "100vh",
      }}
    >
      <h1 style={{ marginBottom: "30px" }}>
        🛒 My Cart
      </h1>

      {cart.length === 0 ? (
        <div
          style={{
            textAlign: "center",
            marginTop: "100px",
          }}
        >
          <h2>Your Cart is Empty 🛍️</h2>
          <p>Add beautiful artworks to your cart.</p>
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr",
            gap: "30px",
          }}
        >
          <div>
            {cart.map((item) => (
              <div
                key={item.id}
                style={{
                  display: "flex",
                  gap: "20px",
                  background: "white",
                  padding: "20px",
                  borderRadius: "15px",
                  marginBottom: "20px",
                  boxShadow:
                    "0 3px 10px rgba(0,0,0,0.08)",
                }}
              >
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  style={{
                    width: "180px",
                    height: "180px",
                    objectFit: "cover",
                    borderRadius: "10px",
                  }}
                />

                <div style={{ flex: 1 }}>
                  <h2>{item.title}</h2>

                  <p>
                    Category: {item.category}
                  </p>

                  <h3
                    style={{
                      color: "#6a11cb",
                    }}
                  >
                    ₹{item.price}
                  </h3>

                  <div
                    style={{
                      marginTop: "15px",
                    }}
                  >
                    <button
                      onClick={() =>
                        decreaseQty(item.id)
                      }
                    >
                      -
                    </button>

                    <span
                      style={{
                        margin: "0 15px",
                        fontWeight: "bold",
                      }}
                    >
                      {item.quantity || 1}
                    </span>

                    <button
                      onClick={() =>
                        increaseQty(item.id)
                      }
                    >
                      +
                    </button>
                  </div>

                  <p
                    style={{
                      marginTop: "15px",
                      fontWeight: "bold",
                    }}
                  >
                    Subtotal: ₹
                    {item.price *
                      (item.quantity || 1)}
                  </p>

                  <button
                    style={{
                      marginTop: "10px",
                      background: "#ff4d4f",
                      color: "white",
                      border: "none",
                      padding: "8px 15px",
                      borderRadius: "5px",
                      cursor: "pointer",
                    }}
                    onClick={() =>
                      removeItem(item.id)
                    }
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div>
            <div
              style={{
                background: "white",
                padding: "25px",
                borderRadius: "15px",
                boxShadow:
                  "0 3px 10px rgba(0,0,0,0.08)",
              }}
            >
              <h2>📦 Order Summary</h2>

              <hr />

              <p>Total Items: {totalItems}</p>

              <p>Subtotal: ₹{total}</p>

              <p>Shipping: Free</p>

              <hr />

              <h2
                style={{
                  color: "#6a11cb",
                }}
              >
                Total: ₹{total}
              </h2>

              <button
                onClick={checkout}
                style={{
                  width: "100%",
                  marginTop: "20px",
                  background: "#6a11cb",
                  color: "white",
                  border: "none",
                  padding: "15px",
                  borderRadius: "10px",
                  fontSize: "16px",
                  cursor: "pointer",
                }}
              >
                Proceed To Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;