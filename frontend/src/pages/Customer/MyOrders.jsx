import { useEffect, useState } from "react";
import api from "../../services/api";
import "./MyOrders.css";

function MyOrders() {
  const [orders, setOrders] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await api.get(`/orders/customer/${user.id}`);
      setOrders(response.data);
    } catch (err) {
      console.log(err);
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
        return "#2e7d32";

      case "CANCELLED":
        return "#f44336";

      default:
        return "#777";
    }
  };

  return (
    <div className="customer-orders-container">
      <h1>📦 My Orders</h1>

      {orders.length === 0 ? (
        <div className="empty-orders">
          <h2>No Orders Yet</h2>
          <p>Your purchased artworks will appear here.</p>
        </div>
      ) : (
        <table className="customer-orders-table">
          <thead>
            <tr>
              <th>Artwork</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Status</th>
              <th>Ordered On</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr key={order.orderItemId}>
                <td className="artwork-cell">
                  <img
                    src={order.artworkImage}
                    alt={order.artworkTitle}
                  />

                  <span>{order.artworkTitle}</span>
                </td>

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

                <td>
                  {new Date(order.orderDate).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default MyOrders;