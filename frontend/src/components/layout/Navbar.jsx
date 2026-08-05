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

  const getHomeRoute = () => {
    if (!user) return "/";

    switch (user.role) {
      case "CUSTOMER":
        return "/dashboard";

      case "ARTIST":
        return "/artist-dashboard";

      case "ADMIN":
        return "/admin-dashboard";

      default:
        return "/";
    }
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
        position: "sticky",
        top: 0,
        zIndex: 1000,
      }}
    >
      {/* Logo */}

      <div
        onClick={() => navigate(getHomeRoute())}
        style={{
          fontSize: "32px",
          fontWeight: "bold",
          cursor: "pointer",
        }}
      >
        Kanuk
        <span
          style={{
            color: "#FFD700",
          }}
        >
          Art
        </span>
      </div>

      {/* Navigation */}

      <ul
        style={{
          display: "flex",
          gap: "30px",
          listStyle: "none",
          margin: 0,
          padding: 0,
        }}
      >
        <li>
          <Link
            to={getHomeRoute()}
            style={linkStyle}
          >
            Home
          </Link>
        </li>

        <li>
          <Link
            to="/categories"
            style={linkStyle}
          >
            Categories
          </Link>
        </li>

        <li>
          <Link
            to="/shop"
            style={linkStyle}
          >
            Shop
          </Link>
        </li>

        <li>
          <Link
            to="/about"
            style={linkStyle}
          >
            About
          </Link>
        </li>

        <li>
          <Link
            to="/contact"
            style={linkStyle}
          >
            Contact
          </Link>
        </li>
      </ul>

      {/* Right Side */}

      {user ? (
        <div
          style={{
            position: "relative",
          }}
        >
          {/* Profile Button */}

          <div
            onClick={() => setShowMenu(!showMenu)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              background: "white",
              color: "#6a11cb",
              padding: "8px 15px",
              borderRadius: "12px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            {user.profileImage ? (
              <img
                src={user.profileImage}
                alt="Profile"
                style={{
                  width: "42px",
                  height: "42px",
                  borderRadius: "50%",
                  objectFit: "cover",
                  border: "2px solid #6a11cb",
                }}
              />
            ) : (
              <div
                style={{
                  width: "42px",
                  height: "42px",
                  borderRadius: "50%",
                  background: "#6a11cb",
                  color: "white",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontWeight: "bold",
                  fontSize: "18px",
                }}
              >
                {user.name.charAt(0).toUpperCase()}
              </div>
            )}

            <span>{user.name}</span>

            <span>▼</span>
          </div>

          {/* Dropdown */}

          {showMenu && (
            <div
              style={{
                position: "absolute",
                right: 0,
                top: "65px",
                width: "280px",
                background: "white",
                color: "#333",
                borderRadius: "15px",
                boxShadow: "0 10px 30px rgba(0,0,0,.2)",
                overflow: "hidden",
              }}
            >
              {/* Profile Header */}

              <div
                style={{
                  textAlign: "center",
                  padding: "25px",
                  borderBottom: "1px solid #eee",
                }}
              >
                {user.profileImage ? (
                  <img
                    src={user.profileImage}
                    alt=""
                    style={{
                      width: "90px",
                      height: "90px",
                      borderRadius: "50%",
                      objectFit: "cover",
                      border: "3px solid #6a11cb",
                    }}
                  />
                ) : (
                  <div
                    style={{
                      width: "90px",
                      height: "90px",
                      borderRadius: "50%",
                      background: "#6a11cb",
                      color: "white",
                      fontSize: "38px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      margin: "auto",
                    }}
                  >
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                )}

                <h3
                  style={{
                    marginTop: "15px",
                    marginBottom: "5px",
                  }}
                >
                  {user.name}
                </h3>

                <p
                  style={{
                    color: "#888",
                    margin: 0,
                  }}
                >
                  {user.email}
                </p>

                <div
                  style={{
                    marginTop: "12px",
                    display: "inline-block",
                    padding: "6px 18px",
                    background: "#6a11cb",
                    color: "white",
                    borderRadius: "20px",
                    fontSize: "14px",
                  }}
                >
                  {user.role}
                </div>
              </div>

              <MenuItem
                text="👤 My Profile"
                onClick={() => {
                  navigate("/profile");
                  setShowMenu(false);
                }}
              />

              <MenuItem
                text="📦 My Orders"
                onClick={() => {
                  navigate("/orders");
                  setShowMenu(false);
                }}
              />

              <MenuItem
                text="❤️ Wishlist"
                onClick={() => {
                  navigate("/wishlist");
                  setShowMenu(false);
                }}
              />

              <MenuItem
                text="🛒 Cart"
                onClick={() => {
                  navigate("/cart");
                  setShowMenu(false);
                }}
              />

              <MenuItem
                text="🚪 Logout"
                color="red"
                onClick={logout}
              />
            </div>
          )}
        </div>
      ) : (
        <Link to="/login">
          <button
            style={{
              padding: "10px 20px",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              background: "white",
              color: "#6a11cb",
              fontWeight: "bold",
            }}
          >
            Login
          </button>
        </Link>
      )}
    </nav>
  );
}

function MenuItem({ text, onClick, color = "#333" }) {
  return (
    <div
      onClick={onClick}
      style={{
        padding: "16px 22px",
        cursor: "pointer",
        borderBottom: "1px solid #eee",
        color,
        transition: ".3s",
      }}
      onMouseEnter={(e) => {
        e.target.style.background = "#f7f3ff";
      }}
      onMouseLeave={(e) => {
        e.target.style.background = "white";
      }}
    >
      {text}
    </div>
  );
}

const linkStyle = {
  color: "white",
  textDecoration: "none",
  fontWeight: "600",
};

export default Navbar;