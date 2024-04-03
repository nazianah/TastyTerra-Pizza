import React from "react";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  

  const loginUser = async (e) => {
    e.preventDefault();
    const { email, password } = data;
    try {
      const { data: response } = await axios.post("/login", {
        email,
        password,
      });
      if (response.error) {
        toast.error(response.error);
      } else {
        // Reset input fields
        setData({ email: "", password: "" });
        // Redirect to home page
        navigate("/");
        // Show success message
        toast.success("Login successful!");
      }
    } catch (error) {
      // Handle different types of errors
      if (error.response) {
        // Server responded with an error status code
        toast.error(error.response.data.message);
      } else if (error.request) {
        // Request made but no response received
        toast.error("Network error. Please try again later.");
      } else {
        // Something happened in setting up the request
        toast.error("An unexpected error occurred.");
      }
    }
  };
  

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
      <div style={{ width: "400px", padding: "20px", border: "1px solid #ccc", borderRadius: "5px" }}>
        <form onSubmit={loginUser}>
          <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Login Page</h2>

          <label style={{ display: "block", marginBottom: "10px" }}>
            Email:
            <input
              type="text"
              placeholder="Email"
              value={data.email}
              onChange={(e) => setData({ ...data, email: e.target.value })}
              style={{ width: "100%", padding: "5px", marginBottom: "10px" }}
            />
          </label>
          <label style={{ display: "block", marginBottom: "10px" }}>
            Password:
            <input
              type="password"
              placeholder="Password"
              value={data.password}
              onChange={(e) => setData({ ...data, password: e.target.value })}
              style={{ width: "100%", padding: "5px", marginBottom: "10px" }}
            />
          </label>
          <div style={{ textAlign: "center" }}>
            <button type="submit" style={{ padding: "10px 20px", backgroundColor: "#4CAF50", color: "white", border: "none", borderRadius: "5px" }}>
              Login
            </button>
          </div>
          <div style={{ marginTop: "10px", textAlign: "center" }}>
            Don't have an account?{" "}
            <Link to="/register" style={{ color: "#4CAF50", textDecoration: "none" }}>
              Sign up here
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
