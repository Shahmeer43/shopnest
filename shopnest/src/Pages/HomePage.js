import React from "react";
import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div
      className="d-flex justify-content-start"
      style={{
        backgroundImage: "url(https://i.ibb.co/JQhzJXR/makeup.jpg)",
        backgroundPosition: "center center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        minHeight: "95vh",
      }}
    >
      <div
        className="d-flex  align-items-center"
        style={{
          width: "50vw",
          fontFamily: "Nunito",
          fontWeight: "700",
          fontSize: "2.8rem",
        }}
      >
        <div className="mx-3">
          <p>Experience the ultimate </p>
          <p>shopping destination</p>
          <p> at Shopnest.</p>
          <p>Join the millions who </p>
          <p>trust us.</p>
          <Link to="/products" className="btn btn-warning fw-semibold">
            Start Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
