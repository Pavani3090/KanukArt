import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import "./AddArtwork.css";

function AddArtwork() {
    const navigate = useNavigate();

    const [artwork, setArtwork] = useState({
        title: "",
        description: "",
        category: "",
        price: "",
    });

    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);

    // =========================
    // HANDLE INPUT CHANGE
    // =========================

    const handleChange = (e) => {
        setArtwork({
            ...artwork,
            [e.target.name]: e.target.value,
        });
    };

    // =========================
    // HANDLE IMAGE CHANGE
    // =========================

    const handleImageChange = (e) => {
        const selectedImage = e.target.files[0];

        if (!selectedImage) {
            return;
        }

        setImage(selectedImage);
    };

    // =========================
    // CLOUDINARY UPLOAD
    // =========================

    const uploadImageToCloudinary = async () => {
        if (!image) {
            throw new Error("Please select an image.");
        }

        const data = new FormData();

        data.append("file", image);
        data.append("upload_preset", "kanukart");

        const response = await fetch(
            "https://api.cloudinary.com/v1_1/msgrq8pq/image/upload",
            {
                method: "POST",
                body: data,
            }
        );

        if (!response.ok) {
            throw new Error(
                "Cloudinary image upload failed."
            );
        }

        const result = await response.json();

        if (!result.secure_url) {
            throw new Error(
                "Cloudinary did not return an image URL."
            );
        }

        return result.secure_url;
    };

    // =========================
    // SUBMIT ARTWORK
    // =========================

    const handleSubmit = async (e) => {
        e.preventDefault();

        const storedUser =
            localStorage.getItem("user");

        if (!storedUser) {
            alert("Please login first.");
            navigate("/login");
            return;
        }

        const user = JSON.parse(storedUser);

        // Only artists can upload
        if (user.role !== "ARTIST") {
            alert(
                "Only Artists can upload artworks."
            );
            return;
        }

        if (!image) {
            alert(
                "Please select an artwork image."
            );
            return;
        }

        try {
            setLoading(true);

            // =========================
            // UPLOAD IMAGE
            // =========================

            const imageUrl =
                await uploadImageToCloudinary();

            console.log(
                "Cloudinary Image URL:",
                imageUrl
            );

            // =========================
            // ARTWORK PAYLOAD
            // =========================

            const payload = {
                title: artwork.title.trim(),

                description:
                    artwork.description.trim(),

                category: artwork.category,

                price: Number(artwork.price),

                imageUrl: imageUrl,

                artist: {
                    id: user.id,
                },

                // Admin approval required
                status: "PENDING",
            };

            console.log(
                "Artwork Payload:",
                payload
            );

            // =========================
            // SAVE ARTWORK
            // =========================

            const response = await api.post(
                "/artworks",
                payload
            );

            console.log(
                "Artwork Saved:",
                response.data
            );

            // =========================
            // SUCCESS
            // =========================

            alert(
                "Artwork Submitted Successfully 🎨\n\n" +
                "Your artwork is now waiting for Admin Approval."
            );

            // =========================
            // RESET FORM
            // =========================

            setArtwork({
                title: "",
                description: "",
                category: "",
                price: "",
            });

            setImage(null);

            // =========================
            // REDIRECT
            // =========================

            navigate("/my-artworks");

        } catch (error) {

            console.error(
                "Failed to add artwork:",
                error
            );

            console.error(
                "Backend response:",
                error.response?.data
            );

            alert(
                error.response?.data?.message ||
                error.message ||
                "Failed to add artwork."
            );

        } finally {
            setLoading(false);
        }
    };

    // =========================
    // IMAGE PREVIEW
    // =========================

    const imagePreview = image
        ? URL.createObjectURL(image)
        : null;

    // =========================
    // PAGE
    // =========================

    return (
        <div className="add-artwork-page">

            <div className="add-artwork-container">

                {/* =========================
                    HEADER
                ========================= */}

                <div className="add-artwork-header">

                    <div>
                        <span className="artwork-eyebrow">
                            ARTIST STUDIO
                        </span>

                        <h1>
                            🎨 Add New Artwork
                        </h1>

                        <p>
                            Share your creativity with
                            the KanukArt community and
                            submit your artwork for approval.
                        </p>
                    </div>

                    <button
                        className="back-button"
                        type="button"
                        onClick={() =>
                            navigate(
                                "/artist-dashboard"
                            )
                        }
                    >
                        ← Dashboard
                    </button>

                </div>


                {/* =========================
                    FORM CARD
                ========================= */}

                <div className="artwork-form-card">

                    <form
                        onSubmit={handleSubmit}
                    >

                        {/* =========================
                            TITLE
                        ========================= */}

                        <div className="form-group">

                            <label>
                                Artwork Title
                            </label>

                            <input
                                type="text"
                                name="title"
                                placeholder="Enter artwork title"
                                value={artwork.title}
                                onChange={handleChange}
                                required
                            />

                        </div>


                        {/* =========================
                            DESCRIPTION
                        ========================= */}

                        <div className="form-group">

                            <label>
                                Description
                            </label>

                            <textarea
                                name="description"
                                placeholder="Tell customers about your artwork..."
                                value={artwork.description}
                                onChange={handleChange}
                                rows="6"
                                required
                            />

                        </div>


                        {/* =========================
                            CATEGORY + PRICE
                        ========================= */}

                        <div className="form-row">

                            <div className="form-group">

                                <label>
                                    Category
                                </label>

                                <select
                                    name="category"
                                    value={artwork.category}
                                    onChange={handleChange}
                                    required
                                >

                                    <option value="">
                                        Select Category
                                    </option>

                                    <option value="PAINTING">
                                        Painting
                                    </option>

                                    <option value="SKETCH">
                                        Sketch
                                    </option>

                                    <option value="POTTERY">
                                        Pottery
                                    </option>

                                    <option value="CUSTOM_GIFT">
                                        Custom Gift
                                    </option>

                                </select>

                            </div>


                            <div className="form-group">

                                <label>
                                    Price
                                </label>

                                <div className="price-input">

                                    <span>
                                        ₹
                                    </span>

                                    <input
                                        type="number"
                                        name="price"
                                        placeholder="Enter price"
                                        value={artwork.price}
                                        onChange={handleChange}
                                        min="1"
                                        step="0.01"
                                        required
                                    />

                                </div>

                            </div>

                        </div>


                        {/* =========================
                            IMAGE UPLOAD
                        ========================= */}

                        <div className="form-group">

                            <label>
                                Artwork Image
                            </label>

                            <div className="upload-area">

                                <div className="upload-icon">
                                    🖼️
                                </div>

                                <h3>
                                    Upload your artwork
                                </h3>

                                <p>
                                    Choose a high-quality
                                    image of your artwork
                                </p>

                                <label
                                    htmlFor="artwork-image"
                                    className="choose-image-button"
                                >
                                    Choose Image
                                </label>

                                <input
                                    id="artwork-image"
                                    type="file"
                                    accept="image/*"
                                    onChange={
                                        handleImageChange
                                    }
                                    required
                                />

                                {image && (
                                    <div className="selected-file">

                                        <span>
                                            ✓ {image.name}
                                        </span>

                                    </div>
                                )}

                            </div>

                        </div>


                        {/* =========================
                            IMAGE PREVIEW
                        ========================= */}

                        {imagePreview && (

                            <div className="preview-section">

                                <h3>
                                    Image Preview
                                </h3>

                                <div className="preview-wrapper">

                                    <img
                                        src={imagePreview}
                                        alt="Artwork Preview"
                                    />

                                </div>

                            </div>

                        )}


                        {/* =========================
                            APPROVAL NOTICE
                        ========================= */}

                        <div className="approval-notice">

                            <div className="notice-icon">
                                💡
                            </div>

                            <div>

                                <strong>
                                    Admin Approval Required
                                </strong>

                                <p>
                                    After submission, your artwork
                                    will be reviewed by the KanukArt
                                    admin team before it becomes
                                    available in the shop.
                                </p>

                            </div>

                        </div>


                        {/* =========================
                            ACTION BUTTONS
                        ========================= */}

                        <div className="form-actions">

                            <button
                                type="button"
                                className="cancel-button"
                                onClick={() =>
                                    navigate(
                                        "/artist-dashboard"
                                    )
                                }
                                disabled={loading}
                            >
                                Cancel
                            </button>

                            <button
                                type="submit"
                                className="submit-button"
                                disabled={loading}
                            >

                                {loading ? (
                                    <>
                                        <span className="spinner"></span>
                                        Uploading...
                                    </>
                                ) : (
                                    <>
                                        🎨 Submit Artwork
                                    </>
                                )}

                            </button>

                        </div>

                    </form>

                </div>

            </div>

        </div>
    );
}

export default AddArtwork;