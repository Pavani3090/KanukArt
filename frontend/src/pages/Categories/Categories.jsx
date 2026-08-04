import { useNavigate } from "react-router-dom";

function Categories() {
  const navigate = useNavigate();

  const categories = [
    {
      name: "Painting",
      value: "PAINTING",
      icon: "🎨",
    },
    {
      name: "Sketch",
      value: "SKETCH",
      icon: "✏️",
    },
    {
      name: "Pottery",
      value: "POTTERY",
      icon: "🏺",
    },
    {
      name: "Custom Gift",
      value: "CUSTOM_GIFT",
      icon: "🎁",
    },
  ];

  return (
    <div
      style={{
        padding: "50px",
        minHeight: "100vh",
        background: "#f8f9fc",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          color: "#6a11cb",
          marginBottom: "40px",
        }}
      >
        Browse By Category
      </h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(250px,1fr))",
          gap: "30px",
        }}
      >
        {categories.map((category) => (
          <div
            key={category.value}
            onClick={() =>
              navigate(
                `/shop?category=${category.value}`
              )
            }
            style={{
              background: "white",
              padding: "40px",
              borderRadius: "15px",
              textAlign: "center",
              cursor: "pointer",
              boxShadow:
                "0 3px 10px rgba(0,0,0,0.1)",
            }}
          >
            <h1>{category.icon}</h1>

            <h2>{category.name}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Categories;