import { Navigate } from "react-router-dom";

function AdminRoute({ children }) {
  const storedUser = localStorage.getItem("user");

  // Not logged in
  if (!storedUser) {
    return <Navigate to="/login" replace />;
  }

  let user;

  try {
    user = JSON.parse(storedUser);
  } catch (error) {
    console.error("Invalid user data:", error);
    localStorage.removeItem("user");

    return <Navigate to="/login" replace />;
  }

  // Logged in but not ADMIN
  if (user.role !== "ADMIN") {
    if (user.role === "ARTIST") {
      return <Navigate to="/artist-dashboard" replace />;
    }

    if (user.role === "CUSTOMER") {
      return <Navigate to="/dashboard" replace />;
    }

    return <Navigate to="/" replace />;
  }

  // ADMIN
  return children;
}

export default AdminRoute;