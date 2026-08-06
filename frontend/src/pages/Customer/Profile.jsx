import { useState } from "react";
import api from "../../services/api";
function Profile() {
  const storedUser = JSON.parse(localStorage.getItem("user"));

  const [user, setUser] = useState(storedUser);

  const [formData, setFormData] = useState({
    name: storedUser?.name || "",
    email: storedUser?.email || "",
    profileImage: storedUser?.profileImage || "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = () => {
      const image = reader.result;

      const updatedUser = {
        ...user,
        profileImage: image,
      };

      setUser(updatedUser);

      setFormData((prev) => ({
        ...prev,
        profileImage: image,
      }));

      localStorage.setItem(
        "user",
        JSON.stringify(updatedUser)
      );
    };

    reader.readAsDataURL(file);
  };

  const handleSave = async () => {
  try {

    await api.put(`/users/${user.id}/profile`, {
      name: formData.name,
      email: formData.email,
      profileImage: formData.profileImage,
    });

    const updatedUser = {
      ...user,
      name: formData.name,
      email: formData.email,
      profileImage: formData.profileImage,
    };

    setUser(updatedUser);

    localStorage.setItem(
      "user",
      JSON.stringify(updatedUser)
    );

    alert("Profile Updated Successfully ✅");

  } catch (error) {

    console.error(error);

    alert("Failed to update profile");
  }
};

  return (
    <div
      style={{
        padding: "40px",
        background: "#f5f5f5",
        minHeight: "100vh",
      }}
    >
      <div
        style={{
          maxWidth: "850px",
          margin: "auto",
          background: "#fff",
          borderRadius: "18px",
          padding: "35px",
          boxShadow: "0 5px 20px rgba(0,0,0,.1)",
        }}
      >
        <h1>👤 My Profile</h1>

        <hr style={{ marginBottom: "30px" }} />

        <div
          style={{
            textAlign: "center",
            marginBottom: "40px",
          }}
        >
          {formData.profileImage ? (
            <img
              src={formData.profileImage}
              alt="Profile"
              style={{
                width: "150px",
                height: "150px",
                borderRadius: "50%",
                objectFit: "cover",
                border: "5px solid #6a11cb",
              }}
            />
          ) : (
            <div
              style={{
                width: "150px",
                height: "150px",
                borderRadius: "50%",
                background: "#6a11cb",
                color: "white",
                fontSize: "55px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "auto",
              }}
            >
              {formData.name.charAt(0).toUpperCase()}
            </div>
          )}

          <br />
          <br />

          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />

          <h2
            style={{
              marginTop: "20px",
            }}
          >
            {formData.name}
          </h2>

          <span
            style={{
              background: "#6a11cb",
              color: "white",
              padding: "6px 18px",
              borderRadius: "25px",
            }}
          >
            {user.role}
          </span>
        </div>

        <label>Full Name</label>

        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          style={inputStyle}
        />

        <label>Email</label>

        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          style={inputStyle}
        />

        <label>Role</label>

        <input
          type="text"
          value={user.role}
          disabled
          style={{
            ...inputStyle,
            background: "#f1f1f1",
          }}
        />

        <button
          onClick={handleSave}
          style={{
            marginTop: "25px",
            background: "#6a11cb",
            color: "white",
            border: "none",
            padding: "14px 30px",
            borderRadius: "10px",
            cursor: "pointer",
            fontSize: "16px",
            fontWeight: "bold",
          }}
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "13px",
  marginTop: "8px",
  marginBottom: "20px",
  border: "1px solid #ddd",
  borderRadius: "8px",
  fontSize: "15px",
};

export default Profile;