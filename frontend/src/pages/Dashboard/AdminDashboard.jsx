import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import "./AdminDashboard.css";

function AdminDashboard() {

  const navigate = useNavigate();

  const [stats, setStats] = useState({
    totalUsers: 0,
    totalArtists: 0,
    totalArtworks: 0,
    totalOrders: 0,
    totalRevenue: 0,

    pendingOrders: 0,
    confirmedOrders: 0,
    shippedOrders: 0,
    deliveredOrders: 0,
    rejectedOrders: 0,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");


  // =====================================
  // LOAD ADMIN STATISTICS
  // =====================================

  useEffect(() => {
    loadStats();
  }, []);


  const loadStats = async () => {

    try {

      setLoading(true);
      setError("");

      const response = await api.get("/admin/stats");

      console.log(
        "ADMIN STATS RESPONSE:",
        response.data
      );

      setStats({

        totalUsers:
          response.data.totalUsers ?? 0,

        totalArtists:
          response.data.totalArtists ?? 0,

        totalArtworks:
          response.data.totalArtworks ?? 0,

        totalOrders:
          response.data.totalOrders ?? 0,

        totalRevenue:
          response.data.totalRevenue ?? 0,


        // Order status statistics

        pendingOrders:
          response.data.pendingOrders ?? 0,

        confirmedOrders:
          response.data.confirmedOrders ?? 0,

        shippedOrders:
          response.data.shippedOrders ?? 0,

        deliveredOrders:
          response.data.deliveredOrders ?? 0,

        rejectedOrders:
          response.data.rejectedOrders ?? 0,
      });

    }

    catch (error) {

      console.error(
        "Failed to load admin statistics:",
        error
      );

      console.error(
        "Response:",
        error.response?.data
      );

      console.error(
        "Status:",
        error.response?.status
      );

      setError(
        error.response?.data?.message ||
        `Failed to load statistics (${
          error.response?.status ||
          "Network Error"
        })`
      );

    }

    finally {

      setLoading(false);

    }
  };


  return (

    <div className="admin-dashboard">


      {/* =====================================
          HEADER
      ===================================== */}

      <div className="dashboard-header">

        <h1>
          Admin Control Panel 🛠️
        </h1>

        <p>
          Manage KanukArt marketplace,
          artists, customers and orders.
        </p>

      </div>


      {/* =====================================
          ERROR
      ===================================== */}

      {error && (

        <div className="admin-error">

          ⚠️ {error}

        </div>

      )}


      {/* =====================================
          LOADING
      ===================================== */}

      {loading ? (

        <div className="admin-loading">

          Loading admin statistics...

        </div>

      ) : (

        <>


          {/* =====================================
              MAIN STATISTICS
          ===================================== */}

          <div className="stats-container">


            {/* USERS */}

            <div className="stat-card">

              <span className="stat-icon">
                👥
              </span>

              <h2>
                {stats.totalUsers}
              </h2>

              <p>
                Total Users
              </p>

            </div>


            {/* ARTISTS */}

            <div className="stat-card">

              <span className="stat-icon">
                🎨
              </span>

              <h2>
                {stats.totalArtists}
              </h2>

              <p>
                Total Artists
              </p>

            </div>


            {/* ARTWORKS */}

            <div className="stat-card">

              <span className="stat-icon">
                🖼️
              </span>

              <h2>
                {stats.totalArtworks}
              </h2>

              <p>
                Total Artworks
              </p>

            </div>


            {/* ORDERS */}

            <div className="stat-card">

              <span className="stat-icon">
                📦
              </span>

              <h2>
                {stats.totalOrders}
              </h2>

              <p>
                Total Orders
              </p>

            </div>


            {/* REVENUE */}

            <div className="stat-card revenue-card">

              <span className="stat-icon">
                💰
              </span>

              <h2>
                ₹
                {Number(
                  stats.totalRevenue
                ).toLocaleString("en-IN")}
              </h2>

              <p>
                Total Revenue
              </p>

            </div>

          </div>


          {/* =====================================
              ORDER OVERVIEW
          ===================================== */}

          <div className="order-overview">

            <h2>
              📊 Order Overview
            </h2>


            <div className="order-status-container">


              {/* PENDING */}

              <div className="order-status pending">

                <span>
                  🟡
                </span>

                <div>

                  <h3>
                    {stats.pendingOrders}
                  </h3>

                  <p>
                    Pending
                  </p>

                </div>

              </div>


              {/* CONFIRMED */}

              <div className="order-status accepted">

                <span>
                  🟢
                </span>

                <div>

                  <h3>
                    {stats.confirmedOrders}
                  </h3>

                  <p>
                    Confirmed
                  </p>

                </div>

              </div>


              {/* SHIPPED */}

              <div className="order-status shipped">

                <span>
                  🚚
                </span>

                <div>

                  <h3>
                    {stats.shippedOrders}
                  </h3>

                  <p>
                    Shipped
                  </p>

                </div>

              </div>


              {/* DELIVERED */}

              <div className="order-status delivered">

                <span>
                  ✅
                </span>

                <div>

                  <h3>
                    {stats.deliveredOrders}
                  </h3>

                  <p>
                    Delivered
                  </p>

                </div>

              </div>


              {/* REJECTED */}

              <div className="order-status rejected">

                <span>
                  🔴
                </span>

                <div>

                  <h3>
                    {stats.rejectedOrders}
                  </h3>

                  <p>
                    Rejected
                  </p>

                </div>

              </div>


            </div>

          </div>


          {/* =====================================
              MANAGEMENT CARDS
          ===================================== */}

          <div className="dashboard-cards">


            {/* MANAGE ARTWORKS */}

            <div
              className="dashboard-card"
              onClick={() =>
                navigate("/admin/artworks")
              }
            >

              <div className="card-icon">
                🎨
              </div>

              <h2>
                Manage Artworks
              </h2>

              <p>
                View and manage all artworks
                uploaded across the platform.
              </p>

              <button>
                Manage Artworks →
              </button>

            </div>


            {/* MANAGE ORDERS */}

            <div
              className="dashboard-card orders-card"
              onClick={() =>
                navigate("/admin/orders")
              }
            >

              <div className="card-icon">
                📦
              </div>

              <h2>
                Manage Orders
              </h2>

              <p>
                Track orders, monitor shipments
                and confirm deliveries.
              </p>

              <button>
                Manage Orders →
              </button>

            </div>


            {/* MANAGE USERS */}

            <div
              className="dashboard-card"
              onClick={() =>
                navigate("/admin/users")
              }
            >

              <div className="card-icon">
                👥
              </div>

              <h2>
                Manage Users
              </h2>

              <p>
                View, search and manage customers
                and artists.
              </p>

              <button>
                Manage Users →
              </button>

            </div>


            {/* MARKETPLACE */}

            <div
              className="dashboard-card"
              onClick={() =>
                navigate("/shop")
              }
            >

              <div className="card-icon">
                🛍️
              </div>

              <h2>
                Marketplace
              </h2>

              <p>
                Browse the live marketplace exactly
                as customers see it.
              </p>

              <button>
                Open Marketplace →
              </button>

            </div>


          </div>


        </>

      )}

    </div>

  );
}

export default AdminDashboard;