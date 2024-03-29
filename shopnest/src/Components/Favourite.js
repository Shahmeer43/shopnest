import React from "react";
import { Link } from "react-router-dom";

export default function Favourite(props) {
  return (
    <>
      <Link
        to={`/products/${props.item._id}`}
        style={{ textDecoration: "none" }}
      >
        <div className="col">
          <div className="card h-100">
            <div style={{ height: "12rem" }}>
              <img
                src={props.item.url}
                className="card-img-top"
                alt="fav-image"
                style={{ height: "100%", objectFit: "contain" }}
              />
            </div>
            <div className="card-body" style={{ minHeight: "10rem" }}>
              <h5 className="card-title">{props.item.title}</h5>
              <p className="card-text">{props.item.desc}</p>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
}
