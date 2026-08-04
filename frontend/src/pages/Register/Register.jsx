import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./Register.css";
import api from "../../services/api";

function Register() {
  const navigate = useNavigate();
  const location = useLocation();

  const roleFromUrl =
    new URLSearchParams(location.search)
      .get("role");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: roleFromUrl || "CUSTOMER",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      formData.password !==
      formData.confirmPassword
    ) {
      alert("Passwords do not match");
      return;
    }

    try {
      const payload = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.role,
      };

      await api.post(
        "/auth/register",
        payload
      );

      alert(
        "Registration Successful"
      );

      navigate("/login");

    } catch (error) {
      alert(
        error.response?.data?.message ||
        error.response?.data ||
        "Registration Failed"
      );
    }
  };

  return (
    <div className="register-container">
      <form
        className="register-form"
        onSubmit={handleSubmit}
      >
        <h2>Create Account</h2>

        <p className="subtitle">
          Join KanukArt and explore creativity
        </p>

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />

        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
        >
          <option value="CUSTOMER">
            Customer
          </option>

          <option value="ARTIST">
            Artist
          </option>
        </select>

        <button type="submit">
          Register
        </button>

        <p className="login-link">
          Already have an account?{" "}
          <Link to="/login">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Register;