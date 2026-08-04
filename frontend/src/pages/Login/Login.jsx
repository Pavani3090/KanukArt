import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import api from "../../services/api";

function Login() {

  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {

    const response = await api.post(
      "/auth/login",
      credentials
    );

    console.log(response.data); // 👈 Add here

    const user = response.data;

    localStorage.setItem(
      "user",
      JSON.stringify(user)
    );

    if (user.role === "CUSTOMER") {
      navigate("/dashboard");
    } else if (user.role === "ARTIST") {
      navigate("/artist-dashboard");
    } else if (user.role === "ADMIN") {
      navigate("/admin-dashboard");
    }

  } catch (error) {

    alert(
      error.response?.data?.message ||
      error.response?.data ||
      "Login Failed"
    );
  }
};

  return (
    <div className="login-container">

      <form
        className="login-form"
        onSubmit={handleSubmit}
      >

        <h2>Welcome Back</h2>

        <p className="subtitle">
          Login to continue your creative journey
        </p>

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={credentials.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={credentials.password}
          onChange={handleChange}
          required
        />

        <button type="submit">
          Login
        </button>

        <p className="register-link">
          Don't have an account?{" "}
          <Link to="/register">
            Register
          </Link>
        </p>

      </form>

    </div>
  );
}

export default Login;