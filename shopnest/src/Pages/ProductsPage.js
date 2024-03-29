import React, { useState, useEffect } from "react";
import Products from "../Components/Products";

export default function ProductsPage() {
  const [products, setProducts] = useState(null);
  const fetchProducts = async () => {
    let dataJSON = await fetch("http://localhost:8000/products");
    let data = await dataJSON.json();
    setProducts(data.products);
  };

  useEffect(() => {
    fetchProducts();
  }, []);
  return (
    products && (
      <div className="container">
        <Products products={products}></Products>
      </div>
    )
  );
}
