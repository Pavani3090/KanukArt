import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function Navbar() {
  const navigate = useNavigate();

  const [showMenu, setShowMenu] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("cart");
    localStorage.removeItem("wishlist");

    alert("Logged Out Successfully");

    navigate("/");
  };

  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "15px 40px",
        background: "#6a11cb",
        color: "white",
      }}
    >
      {/* Logo */}
      <div
        className="logo"
        style={{
          fontSize: "28px",
          fontWeight: "bold",
          cursor: "pointer",
        }}
        onClick={() =>
          navigate(
            user?.role === "CUSTOMER"
              ? "/dashboard"
              : user?.role === "ARTIST"
                ? "/artist-dashboard"
                : user?.role === "ADMIN"
                  ? "/admin-dashboard"
                  : "/",
          )
        }
      >
        Kanuk<span style={{ color: "#ffd700" }}>Art</span>
      </div>

      {/* Navigation */}
      <ul
        style={{
          display: "flex",
          gap: "25px",
          listStyle: "none",
        }}
      >
        <li>
          <Link
            to={
              user?.role === "CUSTOMER"
                ? "/dashboard"
                : user?.role === "ARTIST"
                  ? "/artist-dashboard"
                  : user?.role === "ADMIN"
                    ? "/admin-dashboard"
                    : "/"
            }
          >
            Home
          </Link>
        </li>

        <li>
          <Link to="/categories" style={{ color: "white" }}>
            Categories
          </Link>
        </li>

        <li>
          <Link to="/shop" style={{ color: "white" }}>
            Shop
          </Link>
        </li>

        <li>
          <Link to="/about" style={{ color: "white" }}>
            About
          </Link>
        </li>

        <li>
          <Link to="/contact" style={{ color: "white" }}>
            Contact
          </Link>
        </li>
      </ul>

      {/* User Menu */}
      <div
        style={{
          position: "relative",
        }}
      >
        {user ? (
          <>
            <button
              onClick={() => setShowMenu(!showMenu)}
              style={{
                background: "white",
                color: "#6a11cb",
                border: "none",
                padding: "10px 15px",
                borderRadius: "8px",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              👤 {user.name} ▼
            </button>

            {showMenu && (
              <div
                style={{
                  position: "absolute",
                  right: 0,
                  top: "50px",
                  background: "white",
                  color: "black",
                  width: "220px",
                  borderRadius: "10px",
                  boxShadow: "0 4px 15px rgba(0,0,0,0.15)",
                  overflow: "hidden",
                  zIndex: 1000,
                }}
              >
                <div style={menuItemStyle} onClick={() => navigate("/profile")}>
                  👤 My Profile
                </div>

                <div style={menuItemStyle} onClick={() => navigate("/orders")}>
                  📦 My Orders
                </div>

                <div
                  style={menuItemStyle}
                  onClick={() => navigate("/wishlist")}
                >
                  ❤️ Wishlist
                </div>

                <div style={menuItemStyle} onClick={() => navigate("/cart")}>
                  🛒 Cart
                </div>

                <div
                  style={{
                    ...menuItemStyle,
                    color: "red",
                  }}
                  onClick={logout}
                >
                  🚪 Logout
                </div>
              </div>
            )}
          </>
        ) : (
          <Link to="/login">
            <button
              style={{
                padding: "10px 20px",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
              }}
            >
              Login
            </button>
          </Link>
        )}
      </div>
    </nav>
  );
}

const menuItemStyle = {
  padding: "12px 15px",
  cursor: "pointer",
  borderBottom: "1px solid #eee",
};

export default Navbar;
