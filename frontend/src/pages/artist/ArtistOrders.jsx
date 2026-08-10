import { useEffect, useState } from "react";
import api from "../../services/api";
import "./ArtistOrders.css";

function ArtistOrders() {
  const [orders, setOrders] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await api.get(`/orders/artist/${user.id}`);
      setOrders(response.data);
    } catch (error) {
      console.error("Failed to fetch artist orders:", error);
    }
  };

  const updateStatus = async (orderItemId, status) => {
    try {
      await api.put(
        `/orders/item/${orderItemId}/status?status=${status}`
      );

      // Refresh orders after status update
      fetchOrders();
    } catch (error) {
      console.error("Failed to update order status:", error);
      alert("Failed to update order status.");
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "PENDING":
        return "#ff9800";

      case "ACCEPTED":
        return "#4caf50";

      case "SHIPPED":
        return "#2196f3";

      case "DELIVERED":
        return "#9c27b0";

      case "REJECTED":
        return "#f44336";

      default:
        return "#666";
    }
  };

  return (
    <div className="artist-orders-page">

      <h1>📦 My Orders</h1>

      {orders.length === 0 ? (
        <div className="empty-orders">
          <h2>No Orders Yet</h2>
          <p>
            Customer orders for your artworks will appear here.
          </p>
        </div>
      ) : (
        <table className="orders-table">

          <thead>
            <tr>
              <th>Artwork</th>
              <th>Customer</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Status</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr key={order.orderItemId}>

                {/* Artwork */}
                <td className="artwork-cell">
                  <img
                    src={order.artworkImage}
                    alt={order.artworkTitle}
                  />

                  <span>{order.artworkTitle}</span>
                </td>

                {/* Customer */}
                <td>
                  {order.customerName}
                </td>

                {/* Quantity */}
                <td>
                  {order.quantity}
                </td>

                {/* Price */}
                <td>
                  ₹{order.price}
                </td>

                {/* Status */}
                <td>
                  <span
                    className="status-badge"
                    style={{
                      backgroundColor: getStatusColor(
                        order.status
                      ),
                    }}
                  >
                    {order.status}
                  </span>
                </td>

                {/* Date */}
                <td>
                  {new Date(
                    order.orderDate
                  ).toLocaleDateString()}
                </td>

                {/* Action */}
                <td className="order-actions">

                  {/* PENDING */}
                  {order.status === "PENDING" && (
                    <div className="action-buttons">

                      <button
                        className="accept-btn"
                        onClick={() =>
                          updateStatus(
                            order.orderItemId,
                            "ACCEPTED"
                          )
                        }
                      >
                        ✅ Accept
                      </button>

                      <button
                        className="reject-btn"
                        onClick={() =>
                          updateStatus(
                            order.orderItemId,
                            "REJECTED"
                          )
                        }
                      >
                        ❌ Reject
                      </button>

                    </div>
                  )}

                  {/* ACCEPTED */}
                  {order.status === "ACCEPTED" && (
                    <button
                      className="ship-btn"
                      onClick={() =>
                        updateStatus(
                          order.orderItemId,
                          "SHIPPED"
                        )
                      }
                    >
                      🚚 Ship Order
                    </button>
                  )}

                  {/* SHIPPED */}
                  {order.status === "SHIPPED" && (
                    <span className="waiting-text">
                      🚚 Waiting for Delivery Confirmation
                    </span>
                  )}

                  {/* DELIVERED */}
                  {order.status === "DELIVERED" && (
                    <span className="completed-label">
                      ✔ Completed
                    </span>
                  )}

                  {/* REJECTED */}
                  {order.status === "REJECTED" && (
                    <span className="rejected-text">
                      ❌ Rejected
                    </span>
                  )}

                </td>

              </tr>
            ))}
          </tbody>

        </table>
      )}

    </div>
  );
}

export default ArtistOrders;