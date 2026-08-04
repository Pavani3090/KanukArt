import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../services/api";

function OrderDetails() {
  const { id } = useParams();

  const [items, setItems] = useState([]);

  useEffect(() => {
    loadItems();
  }, []);

  const loadItems = async () => {
    try {
      const response = await api.get(
        `/orders/${id}/items`
      );

      setItems(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={{ padding: "30px" }}>
      <h1>Order #{id}</h1>

      {items.length === 0 ? (
        <h3>No items found for this order.</h3>
      ) : (
        items.map((item) => (
          <div
            key={item.artworkId}
            style={{
              border: "1px solid #ddd",
              padding: "15px",
              marginBottom: "15px",
              borderRadius: "10px",
              display: "flex",
              gap: "20px",
              alignItems: "center",
            }}
          >
            <img
              src={item.imageUrl}
              alt={item.artworkTitle}
              width="150"
              style={{
                borderRadius: "10px",
                objectFit: "cover",
              }}
            />

            <div>
              <h3>{item.artworkTitle}</h3>

              <p>
                <strong>Quantity:</strong>{" "}
                {item.quantity}
              </p>

              <p>
                <strong>Price:</strong> ₹
                {item.price}
              </p>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default OrderDetails;