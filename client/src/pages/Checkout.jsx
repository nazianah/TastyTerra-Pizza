import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Container, Row, Col } from "reactstrap";
import { GoogleMap, LoadScript, Marker, DirectionsService, DirectionsRenderer } from "@react-google-maps/api";
import CommonSection from "../components/UI/common-section/CommonSection";
import Helmet from "../components/Helmet/Helmet";

import "../styles/checkout.css";

const Checkout = () => {
  const [enterName, setEnterName] = useState("");
  const [enterEmail, setEnterEmail] = useState("");
  const [enterNumber, setEnterNumber] = useState("");
  const [enterCountry, setEnterCountry] = useState("");
  const [enterCity, setEnterCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [directions, setDirections] = useState(null);
  const [location, setLocation] = useState({ lat: -20.158889, lng: 57.48083 });

  const cartTotalAmount = useSelector((state) => state.cart.totalAmount);
  const DeliveryCost = 30;
  const totalAmount = cartTotalAmount + Number(DeliveryCost);
  const submitHandler = async (e) => {
    e.preventDefault();

    // Your existing code to collect user information
    const userDeliveryAddress = {
      name: enterName,
      email: enterEmail,
      phone: enterNumber,
      country: enterCountry,
      city: enterCity,
      postalCode: postalCode,
    };

    // Fetch coordinates using Geocoding API
    const address = `${enterCity}, ${enterCountry}, ${postalCode}`;
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
        address
      )}&key=AIzaSyAzgNyVeIW1BAVRmpAKUsiDjDuLt9grg4A`
    );
    const data = await response.json();

    // Update location state with coordinates
    if (data.results.length > 0) {
      setLocation({
        lat: data.results[0].geometry.location.lat,
        lng: data.results[0].geometry.location.lng,
      });

      // Fetch directions using DirectionsService
      const directionsService = new window.google.maps.DirectionsService();

      const directionsRequest = {
        origin: { lat: -20.158889, lng: 57.48083 }, // Initial location
        destination: { lat: data.results[0].geometry.location.lat, lng: data.results[0].geometry.location.lng }, // User's address
        travelMode: window.google.maps.TravelMode.DRIVING, // You can change the travel mode as needed
      };

      directionsService.route(directionsRequest, (result, status) => {
        if (status === window.google.maps.DirectionsStatus.OK) {
          setDirections(result);
        } else {
          console.error(`Error fetching directions: ${status}`);
        }
      });
    }

    // Your existing code to handle user information
    console.log(userDeliveryAddress);
  };

  return (
    <Helmet title="Checkout">
      <CommonSection title="Checkout" />
      <section>
        <Container>
          <Row>
            <Col lg="8" md="6">
              <h6 className="mb-4">Delivery Address</h6>
              <form className="checkout__form" onSubmit={submitHandler}>
                <div className="form__group">
                  <input
                    type="text"
                    placeholder="Enter your name"
                    required
                    onChange={(e) => setEnterName(e.target.value)}
                  />
                </div>

                <div className="form__group">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    required
                    onChange={(e) => setEnterEmail(e.target.value)}
                  />
                </div>
                <div className="form__group">
                  <input
                    type="number"
                    placeholder="Phone number"
                    required
                    onChange={(e) => setEnterNumber(e.target.value)}
                  />
                </div>
                <div className="form__group">
                  <input
                    type="text"
                    placeholder="Country"
                    required
                    onChange={(e) => setEnterCountry(e.target.value)}
                  />
                </div>
                <div className="form__group">
                  <input
                    type="text"
                    placeholder="City"
                    required
                    onChange={(e) => setEnterCity(e.target.value)}
                  />
                </div>
                <div className="form__group">
                  <input
                    type="number"
                    placeholder="Postal code"
                    required
                    onChange={(e) => setPostalCode(e.target.value)}
                  />
                </div>
                <button type="submit" className="addTOCart__btn">
                  Payment on Delivery
                </button>
              </form>

              <LoadScript
      googleMapsApiKey="AIzaSyAzgNyVeIW1BAVRmpAKUsiDjDuLt9grg4A"
    >
      <GoogleMap
        mapContainerStyle={{ width: "100%", height: "400px" }}
        center={location}
        zoom={12}
      >
        <Marker position={location} />

        {/* Display Directions on the map */}
        {directions && <DirectionsRenderer directions={directions} />}
      </GoogleMap>
    </LoadScript>
            </Col>

            <Col lg="4" md="6">
              <div className="checkout__bill">
                <h6 className="d-flex align-items-center justify-content-between mb-3">
                  Subtotal: <span>Rs{cartTotalAmount}</span>
                </h6>
                <h6 className="d-flex align-items-center justify-content-between mb-3">
                  Delivery: <span>Rs{DeliveryCost}</span>
                </h6>
                <div className="checkout__total">
                  <h5 className="d-flex align-items-center justify-content-between">
                    Total: <span>Rs{totalAmount}</span>
                  </h5>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Checkout;
