import { Routes, Route } from "react-router-dom";

import Navbar from "../components/layout/Navbar";

import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import Shop from "../pages/Shop/Shop";
import Categories from "../pages/Categories/Categories";
import About from "../pages/About/About";
import Contact from "../pages/Contact/Contact";

import CustomerDashboard from "../pages/Dashboard/CustomerDashboard";
import ArtistDashboard from "../pages/Dashboard/ArtistDashboard";
import AdminDashboard from "../pages/Dashboard/AdminDashboard";

import AddArtwork from "../pages/Artwork/AddArtwork";
import ArtworkGallery from "../pages/Artwork/ArtworkGallery";
import MyArtworks from "../pages/Artwork/MyArtworks";
import EditArtwork from "../pages/Artwork/EditArtwork";
import ArtworkDetails from "../pages/Artwork/ArtworkDetails";

import Wishlist from "../pages/Customer/Wishlist";
import Cart from "../pages/Customer/Cart";
import MyOrders from "../pages/Customer/MyOrders";
import OrderDetails from "../pages/Customer/OrderDetails";

import ManageOrders from "../pages/Admin/ManageOrders";
import ManageArtworks from "../pages/Admin/ManageArtworks";
import ManageUsers from "../pages/Admin/ManageUsers";
import Profile from "../pages/Customer/Profile";

function AppRoutes() {
  return (
    <>
      <Navbar />

      <Routes>
        {/* Public Pages */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />

        {/* Dashboards */}
        <Route path="/dashboard" element={<CustomerDashboard />} />

        <Route path="/artist-dashboard" element={<ArtistDashboard />} />

        <Route path="/admin-dashboard" element={<AdminDashboard />} />

        {/* Artwork */}
        <Route path="/artworks" element={<ArtworkGallery />} />

        <Route path="/artwork/:id" element={<ArtworkDetails />} />

        <Route path="/add-artwork" element={<AddArtwork />} />

        <Route path="/my-artworks" element={<MyArtworks />} />

        <Route path="/edit-artwork/:id" element={<EditArtwork />} />

        {/* Customer */}
        <Route path="/wishlist" element={<Wishlist />} />

        <Route path="/cart" element={<Cart />} />

        <Route path="/orders" element={<MyOrders />} />

        <Route path="/order/:id" element={<OrderDetails />} />

        {/* Admin */}
        <Route path="/admin/orders" element={<ManageOrders />} />

        <Route path="/admin/artworks" element={<ManageArtworks />} />

        <Route path="/admin/users" element={<ManageUsers />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </>
  );
}

export default AppRoutes;
