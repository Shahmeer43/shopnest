import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function ProductDetailPage() {
  const [singleProduct, setSingleProduct] = useState(null);

  const productIdParameter = useParams().productId;

  const fetchSingleProduct = async () => {
    let productJSON = await fetch(
      `http://localhost:8000/single-product/${productIdParameter}`
    );

    let product = await productJSON.json();

    setFavourite(product.favourite);
    setSingleProduct(product);
  };

  useEffect(() => {
    fetchSingleProduct();
  }, []);

  const onAddToCart = async (event) => {
    if (!singleProduct) return;
    await fetch("http://localhost:8000/product-add-to-cart", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: productIdParameter,
        price: singleProduct.price,
        title: singleProduct.title,
        url: singleProduct.url,
      }),
    });
  };

  // const onOrder = async (event) => {
  //   if (!singleProduct) return;

  //   await fetch("http://localhost:8000/product-add-to-cart", {
  //     method: "POST",
  //     mode: "cors",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       id: productIdParameter,
  //       price: singleProduct.price,
  //       title: singleProduct.title,
  //     }),
  //   });
  // };

  const [favourite, setFavourite] = useState(null);

  const changeFavourite = async () => {
    await fetch("http://localhost:8000/favourites", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: productIdParameter, favourite: favourite }),
    });

    setFavourite((prevState) => !prevState);
  };

  return singleProduct ? (
    <div className="container">
      {favourite === false ? (
        <i
          className="bi bi-heart fs-4"
          onClick={changeFavourite}
          style={{ cursor: "pointer" }}
        ></i>
      ) : (
        <i
          className="bi bi-heart-fill fs-4"
          onClick={changeFavourite}
          style={{ cursor: "pointer" }}
        ></i>
      )}
      <div
        className="card mb-3"
        style={{ maxWidth: "1200px", minHeight: "350px" }}
      >
        <div className="row g-0">
          <div className="col-md-4">
            <img
              src={singleProduct.url}
              className="img-fluid rounded-start object-fit-contain"
              alt="..."
              style={{ minHeight: "350px" }}
            />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h4 className="card-title">{singleProduct.title}</h4>
              <p className="card-text fs-5">{singleProduct.detail}</p>
              <div className="card-text ">
                <p className="card-text fw-bold fs-5 border border-black rounded d-inline p-2 px-3">
                  {singleProduct.price}$
                </p>
              </div>
            </div>
            <div className="card-body d-flex flex-column gap-2">
              <button
                onClick={onAddToCart}
                type="button"
                className={`btn btn-warning rounded-5 ${
                  window.innerWidth < 1000 ? "" : "w-25"
                }`}
              >
                Add To Cart
              </button>
            </div>
          </div>
        </div>
      </div>
      <div>
        <h2>About This Item</h2>
        <div>
          {singleProduct.features.map((feature) => (
            <li>{feature}</li>
          ))}
        </div>
      </div>
    </div>
  ) : (
    <div className="container">
      <h3 className="mt-3">No Product Found</h3>
    </div>
  );
}
