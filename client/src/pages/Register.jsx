import React from "react";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const registerUser = async (e) => {
    e.preventDefault();
    const { name, email, password } = data;
    try {
      const { data } = await axios.post("/register", { name, email, password });
      if (data.error) {
        toast.error(data.error);
      } else {
        setData({});
        toast.success("Login successful");
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
      <form style={{ width: "300px", padding: "20px", border: "1px solid #ccc", borderRadius: "5px" }} onSubmit={registerUser}>
        <label style={{ marginBottom: "10px" }}>
          Name:
          <input
            type="text"
            placeholder="username"
            value={data.name}
            onChange={(e) => setData({ ...data, name: e.target.value })}
            style={{ width: "100%", padding: "5px", marginBottom: "10px" }}
          />
        </label>
        <label style={{ marginBottom: "10px" }}>
          Email:
          <input
            type="text"
            placeholder="email"
            value={data.email}
            onChange={(e) => setData({ ...data, email: e.target.value })}
            style={{ width: "100%", padding: "5px", marginBottom: "10px" }}
          />
        </label>
        <label style={{ marginBottom: "10px" }}>
          Password:
          <input
            type="password"
            placeholder="password"
            value={data.password}
            onChange={(e) => setData({ ...data, password: e.target.value })}
            style={{ width: "100%", padding: "5px", marginBottom: "10px" }}
          />
        </label>
        <div>
          <button type="submit" style={{ width: "100%", padding: "10px", backgroundColor: "#4CAF50", color: "white", border: "none", borderRadius: "5px" }}>Register</button>
        </div>

        <div style={{ marginTop: "10px" }}>
          Already have an account?{" "}
          <Link to="/login">Login here</Link>
        </div>
      </form>
    </div>
  );
}
