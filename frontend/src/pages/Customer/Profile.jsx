import { useState } from "react";

function Profile() {
  const storedUser =
    JSON.parse(localStorage.getItem("user"));

  const [user, setUser] = useState(storedUser);

  const [formData, setFormData] = useState({
    name: storedUser?.name || "",
    email: storedUser?.email || "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    const updatedUser = {
      ...user,
      name: formData.name,
      email: formData.email,
    };

    localStorage.setItem(
      "user",
      JSON.stringify(updatedUser)
    );

    setUser(updatedUser);

    alert("Profile Updated Successfully ✅");
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
          maxWidth: "800px",
          margin: "auto",
          background: "white",
          borderRadius: "15px",
          padding: "30px",
          boxShadow:
            "0 3px 10px rgba(0,0,0,0.1)",
        }}
      >
        <h1>👤 My Profile</h1>

        <hr />

        <div
          style={{
            textAlign: "center",
            marginBottom: "30px",
          }}
        >
          <div
            style={{
              width: "120px",
              height: "120px",
              borderRadius: "50%",
              background: "#6a11cb",
              color: "white",
              fontSize: "40px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "auto",
            }}
          >
            {user?.name?.charAt(0)}
          </div>

          <h2>{user?.name}</h2>

          <p>{user?.role}</p>
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
          value={user?.role}
          disabled
          style={{
            ...inputStyle,
            background: "#eee",
          }}
        />

        <button
          onClick={handleSave}
          style={{
            marginTop: "20px",
            background: "#6a11cb",
            color: "white",
            border: "none",
            padding: "12px 20px",
            borderRadius: "8px",
            cursor: "pointer",
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
  padding: "12px",
  marginTop: "8px",
  marginBottom: "20px",
  border: "1px solid #ddd",
  borderRadius: "8px",
};

export default Profile;