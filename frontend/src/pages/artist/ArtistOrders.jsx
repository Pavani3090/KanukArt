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
      console.error(error);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "PENDING":
        return "#ff9800";

      case "SHIPPED":
        return "#2196f3";

      case "DELIVERED":
        return "#4caf50";

      case "CANCELLED":
        return "#f44336";

      default:
        return "#666";
    }
  };

  return (
    <div className="artist-orders">
      <h1>📦 My Orders</h1>

      {orders.length === 0 ? (
        <div className="empty-orders">
          <h2>No Orders Yet</h2>
          <p>Customer orders for your artworks will appear here.</p>
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
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr key={`${order.orderId}-${order.artworkId}`}>
                <td className="artwork-cell">
                  <img src={order.artworkImage} alt={order.artworkTitle} />

                  <span>{order.artworkTitle}</span>
                </td>

                <td>{order.customerName}</td>

                <td>{order.quantity}</td>

                <td>₹{order.price}</td>

                <td>
                  <span
                    className="status-badge"
                    style={{
                      background: getStatusColor(order.status),
                    }}
                  >
                    {order.status}
                  </span>
                </td>

                <td>{new Date(order.orderDate).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ArtistOrders;
