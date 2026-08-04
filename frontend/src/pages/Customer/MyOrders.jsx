import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import "./MyOrders.css";

function MyOrders() {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));

      const response = await api.get(
        `/orders/user/${user.id}`
      );

      setOrders(response.data);
    } catch (error) {
      console.error("Failed to load orders:", error);
    }
  };

  return (
    <div style={{ padding: "30px" }}>
      <h1>My Orders 📦</h1>

      {orders.length === 0 ? (
        <h2>No Orders Yet</h2>
      ) : (
        orders.map((order) => (
          <div
            key={order.id}
            style={{
              border: "1px solid #ddd",
              padding: "20px",
              marginBottom: "20px",
              borderRadius: "10px",
              backgroundColor: "#fff",
            }}
          >
            <h3>Order #{order.id}</h3>

            <p>
              <strong>Status:</strong> {order.status}
            </p>

            <p>
              <strong>Amount:</strong> ₹{order.totalAmount}
            </p>

            <p>
              <strong>Date:</strong>{" "}
              {new Date(order.orderDate).toLocaleString()}
            </p>

            <button
              onClick={() =>
                navigate(`/order/${order.id}`)
              }
              style={{
                marginTop: "10px",
                padding: "10px 16px",
                backgroundColor: "#6a0dad",
                color: "white",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              View Details
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default MyOrders;