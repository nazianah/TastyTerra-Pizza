// import React from "react";
// import { Routes, Route, Navigate } from "react-router-dom";

// import Home from "../pages/Home";
// import AllFoods from "../pages/AllFoods";
// import FoodDetails from "../pages/FoodDetails";
// import Cart from "../pages/Cart";
// import Checkout from "../pages/Checkout";
// import Contact from "../pages/Contact";
// import Login from "../pages/Login";
// import Register from "../pages/Register";
// // import Profile from "../pages/Dashboard";
// import Dashboard from "../pages/Dashboard";

// const Routers = () => {
//   return (
//     <Routes>
//       <Route path="/" element={<Navigate to="/home" />} />
//       <Route path="/home" element={<Home />} />
//       <Route path="/foods" element={<AllFoods />} />
//       <Route path="/foods/:id" element={<FoodDetails />} />
//       <Route path="/cart" element={<Cart />} />
//       <Route path="/checkout" element={<Checkout />} />
//       <Route path="/login" element={<Login />} />
//       <Route path="/profile" element={<Dashboard />} />
//       <Route path="/register" element={<Register />} />
//       <Route path="/contact" element={<Contact />} />
//     </Routes>
//   );
// };

// export default Routers;

import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Home from "../pages/Home";
import AllFoods from "../pages/AllFoods";
import FoodDetails from "../pages/FoodDetails";
import Cart from "../pages/Cart";
import Checkout from "../pages/Checkout";
import Contact from "../pages/Contact";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";

// Define a function to check if the user is logged in
const isAuthenticated = () => {
  // Implement your logic here to check if the user is logged in
  // For example, you can check if there's a token in localStorage or sessionStorage
  return localStorage.getItem("token") !== null;
};

// Create a higher-order component to restrict routes
const PrivateRoute = ({ element, path }) => {
  return isAuthenticated() ? (
    <Route path={path} element={element} />
  ) : (
    <Navigate to="/login" replace />
  );
};

const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="/home" element={<Home />} />
      <Route path="/foods" element={<AllFoods />} />
      <Route path="/foods/:id" element={<FoodDetails />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/contact" element={<Contact />} />
      {/* Use the PrivateRoute component for restricted routes */}
      <PrivateRoute path="/profile" element={<Dashboard />} />
    </Routes>
  );
};

export default Routers;
