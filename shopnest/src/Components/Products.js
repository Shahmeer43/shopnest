import React from "react";

import Product from "./Product";

import classes from "../Styles/Products.module.css";

export default function Products(props) {
  return (
    <div
      className={`${classes.productsContainer} d-flex flex-wrap justify-content-center`}
    >
      {props.products.map((item) => {
        return <Product key={item._id} item={item} />;
      })}
    </div>
  );
}
