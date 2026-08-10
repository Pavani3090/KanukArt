import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import "./ArtistDashboard.css";

function ArtistDashboard() {
    const navigate = useNavigate();

    const [user, setUser] = useState(null);

    const [stats, setStats] = useState({
        totalArtworks: 0,
        approvedArtworks: 0,
        pendingArtworks: 0,
        rejectedArtworks: 0,
        totalOrders: 0,
        revenue: 0,
    });

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // =========================
    // LOAD USER
    // =========================

    useEffect(() => {
        const storedUser = localStorage.getItem("user");

        console.log("Stored user:", storedUser);

        if (!storedUser) {
            setError("Artist information not found. Please login again.");
            setLoading(false);
            return;
        }

        try {
            const parsedUser = JSON.parse(storedUser);

            console.log("Logged in user:", parsedUser);
            console.log("Artist ID:", parsedUser.id);
            console.log("Role:", parsedUser.role);

            setUser(parsedUser);

            if (!parsedUser.id) {
                setError("Artist ID not found. Please login again.");
                setLoading(false);
                return;
            }

            fetchStats(parsedUser.id);

        } catch (err) {
            console.error("Invalid user data:", err);

            setError("Invalid login information. Please login again.");
            setLoading(false);
        }
    }, []);

    // =========================
    // FETCH ARTIST STATS
    // =========================

    const fetchStats = async (artistId) => {
        try {
            setLoading(true);
            setError("");

            console.log(
                `Fetching artist stats for ID: ${artistId}`
            );

            const response = await api.get(
                `/artists/${artistId}/stats`
            );

            console.log(
                "Artist Stats Response:",
                response.data
            );

            setStats({
                totalArtworks:
                    response.data.totalArtworks ?? 0,

                approvedArtworks:
                    response.data.approvedArtworks ?? 0,

                pendingArtworks:
                    response.data.pendingArtworks ?? 0,

                rejectedArtworks:
                    response.data.rejectedArtworks ?? 0,

                totalOrders:
                    response.data.totalOrders ?? 0,

                revenue:
                    response.data.revenue ?? 0,
            });

        } catch (err) {

            console.error(
                "Failed to load artist stats:",
                err
            );

            console.error(
                "Response:",
                err.response?.data
            );

            console.error(
                "Status:",
                err.response?.status
            );

            setError(
                err.response?.data?.message ||
                "Failed to load artist statistics."
            );

        } finally {
            setLoading(false);
        }
    };

    // =========================
    // LOGOUT
    // =========================

    const handleLogout = () => {

        localStorage.removeItem("user");

        navigate("/login");
    };

    // =========================
    // NO USER
    // =========================

    if (!user && !loading) {
        return (
            <div className="artist-dashboard">

                <div className="artist-error">
                    ⚠️ {error || "Please login again."}
                </div>

                <button
                    onClick={() => navigate("/login")}
                >
                    Go to Login
                </button>

            </div>
        );
    }

    return (
        <div className="artist-dashboard">

            {/* =========================
                HEADER
            ========================= */}

            <div className="dashboard-header">

                <div>

                    <h1>
                        🎨 Welcome back,{" "}
                        {user?.name || "Artist"}
                    </h1>

                    <p>
                        Manage your artworks, monitor approvals
                        and grow your creative business with
                        KanukArt.
                    </p>

                </div>

                

            </div>


            {/* =========================
                ERROR
            ========================= */}

            {error && (
                <div className="artist-error">
                    ⚠️ {error}
                </div>
            )}


            {/* =========================
                LOADING
            ========================= */}

            {loading ? (

                <div className="artist-loading">
                    Loading your dashboard...
                </div>

            ) : (

                <>

                    {/* =========================
                        STATISTICS
                    ========================= */}

                    <div className="stats-container">

                        {/* TOTAL ARTWORKS */}

                        <div
                            className="stat-card"
                            onClick={() =>
                                navigate("/my-artworks")
                            }
                        >

                            <h2>
                                {stats.totalArtworks}
                            </h2>

                            <p>
                                🖼 Total Artworks
                            </p>

                        </div>


                        {/* APPROVED */}

                        <div
                            className="stat-card approved"
                            onClick={() =>
                                navigate(
                                    "/my-artworks?status=APPROVED"
                                )
                            }
                        >

                            <h2>
                                {stats.approvedArtworks}
                            </h2>

                            <p>
                                ✅ Approved
                            </p>

                        </div>


                        {/* PENDING */}

                        <div
                            className="stat-card pending"
                            onClick={() =>
                                navigate(
                                    "/my-artworks?status=PENDING"
                                )
                            }
                        >

                            <h2>
                                {stats.pendingArtworks}
                            </h2>

                            <p>
                                🟡 Pending
                            </p>

                        </div>


                        {/* REJECTED */}

                        <div
                            className="stat-card rejected"
                            onClick={() =>
                                navigate(
                                    "/my-artworks?status=REJECTED"
                                )
                            }
                        >

                            <h2>
                                {stats.rejectedArtworks}
                            </h2>

                            <p>
                                ❌ Rejected
                            </p>

                        </div>


                        {/* ORDERS */}

                        <div
                            className="stat-card orders"
                            onClick={() =>
                                navigate("/artist-orders")
                            }
                        >

                            <h2>
                                {stats.totalOrders}
                            </h2>

                            <p>
                                📦 Orders
                            </p>

                        </div>


                        {/* REVENUE */}

                        <div className="stat-card revenue">

                            <h2>
                                ₹
                                {Number(
                                    stats.revenue
                                ).toLocaleString("en-IN")}
                            </h2>

                            <p>
                                💰 Revenue
                            </p>

                        </div>

                    </div>


                    {/* =========================
                        QUICK ACTIONS
                    ========================= */}

                    <div className="dashboard-cards">

                        {/* UPLOAD */}

                        <div
                            className="dashboard-card"
                            onClick={() =>
                                navigate("/add-artwork")
                            }
                        >

                            <h2>
                                🎨 Upload Artwork
                            </h2>

                            <p>
                                Upload paintings, sketches,
                                pottery and custom creations.
                            </p>

                        </div>


                        {/* MANAGE ARTWORKS */}

                        <div
                            className="dashboard-card"
                            onClick={() =>
                                navigate("/my-artworks")
                            }
                        >

                            <h2>
                                🖼 Manage Artworks
                            </h2>

                            <p>
                                View, edit and organize all your
                                uploaded artworks.
                            </p>

                        </div>


                        {/* ORDERS */}

                        <div
                            className="dashboard-card"
                            onClick={() =>
                                navigate("/artist-orders")
                            }
                        >

                            <h2>
                                📦 Manage Orders
                            </h2>

                            <p>
                                View customer orders and update
                                order status.
                            </p>

                        </div>


                        {/* ANALYTICS */}

                        <div
                            className="dashboard-card"
                            onClick={() =>
                                alert(
                                    "Sales Analytics coming soon!"
                                )
                            }
                        >

                            <h2>
                                📈 Sales Analytics
                            </h2>

                            <p>
                                Monitor performance, views and
                                future sales.
                            </p>

                        </div>

                    </div>


                    {/* =========================
                        UPCOMING FEATURES
                    ========================= */}

                    <div className="upcoming-features">

                        <h2>
                            🚀 Upcoming Features
                        </h2>

                        <ul>

                            <li>
                                📦 Advanced Order Management
                            </li>

                            <li>
                                💳 Payment Reports
                            </li>

                            <li>
                                📈 Monthly Analytics
                            </li>

                            <li>
                                ⭐ Customer Reviews
                            </li>

                            <li>
                                💬 Customer Messages
                            </li>

                        </ul>

                    </div>

                </>

            )}

        </div>
    );
}

export default ArtistDashboard;