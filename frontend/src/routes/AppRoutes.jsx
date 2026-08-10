import { Routes, Route } from "react-router-dom";

import Navbar from "../components/layout/Navbar";

// Public pages
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import Shop from "../pages/Shop/Shop";
import Categories from "../pages/Categories/Categories";
import About from "../pages/About/About";
import Contact from "../pages/Contact/Contact";

// Dashboards
import CustomerDashboard from "../pages/Dashboard/CustomerDashboard";
import ArtistDashboard from "../pages/Dashboard/ArtistDashboard";
import AdminDashboard from "../pages/Dashboard/AdminDashboard";

// Artwork
import AddArtwork from "../pages/Artwork/AddArtwork";
import ArtworkGallery from "../pages/Artwork/ArtworkGallery";
import MyArtworks from "../pages/Artwork/MyArtworks";
import EditArtwork from "../pages/Artwork/EditArtwork";
import ArtworkDetails from "../pages/Artwork/ArtworkDetails";

// Customer
import Wishlist from "../pages/Customer/Wishlist";
import Cart from "../pages/Customer/Cart";
import MyOrders from "../pages/Customer/MyOrders";
import OrderDetails from "../pages/Customer/OrderDetails";
import Profile from "../pages/Customer/Profile";

// Artist
import ArtistOrders from "../pages/artist/ArtistOrders";

// Admin
import ManageOrders from "../pages/Admin/ManageOrders";
import ManageArtworks from "../pages/Admin/ManageArtworks";
import ManageUsers from "../pages/Admin/ManageUsers";

// Route protection
import AdminRoute from "../components/AdminRoute";

function AppRoutes() {
  return (
    <>
      {/* Navigation bar */}
      <Navbar />

      <Routes>

        {/* ================= PUBLIC PAGES ================= */}

        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route path="/shop" element={<Shop />} />

        <Route path="/categories" element={<Categories />} />

        <Route path="/about" element={<About />} />

        <Route path="/contact" element={<Contact />} />


        {/* ================= CUSTOMER DASHBOARD ================= */}

        <Route
          path="/dashboard"
          element={<CustomerDashboard />}
        />


        {/* ================= ARTIST DASHBOARD ================= */}

        <Route
          path="/artist-dashboard"
          element={<ArtistDashboard />}
        />


        {/* ================= ARTWORK ================= */}

        <Route
          path="/artworks"
          element={<ArtworkGallery />}
        />

        <Route
          path="/artwork/:id"
          element={<ArtworkDetails />}
        />

        <Route
          path="/add-artwork"
          element={<AddArtwork />}
        />

        <Route
          path="/my-artworks"
          element={<MyArtworks />}
        />

        <Route
          path="/edit-artwork/:id"
          element={<EditArtwork />}
        />


        {/* ================= CUSTOMER ================= */}

        <Route
          path="/wishlist"
          element={<Wishlist />}
        />

        <Route
          path="/cart"
          element={<Cart />}
        />

        <Route
          path="/orders"
          element={<MyOrders />}
        />

        <Route
          path="/order/:id"
          element={<OrderDetails />}
        />

        <Route
          path="/profile"
          element={<Profile />}
        />


        {/* ================= ARTIST ================= */}

        <Route
          path="/artist-orders"
          element={<ArtistOrders />}
        />


        {/* ================= ADMIN ONLY ================= */}

        <Route
          path="/admin-dashboard"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/orders"
          element={
            <AdminRoute>
              <ManageOrders />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/artworks"
          element={
            <AdminRoute>
              <ManageArtworks />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/users"
          element={
            <AdminRoute>
              <ManageUsers />
            </AdminRoute>
          }
        />

      </Routes>
    </>
  );
}

export default AppRoutes;