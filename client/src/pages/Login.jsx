import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const loginUser = async (e) => {
    e.preventDefault();

    try {
      const { data: response } = await axios.post("https://tasty-terra-pizza-server.vercel.app/login", data);

      if (response.error) {
        toast.error(response.error);
      } else {
        // Assuming the server returns the token in the response
        const { token } = response;

        // Store the token on the client side
        localStorage.setItem("token", token);

        setData({ ...data, password: "" });
        navigate("/");
        toast.success("Login successful!");
      }
    } catch (error) {
      toast.error("Error logging in. Please try again.");
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
};

export default Login;
