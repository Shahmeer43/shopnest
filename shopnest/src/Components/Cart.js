import React, { useState } from "react";

export default function Cart(props) {
  const [qty, setQty] = useState(props.item.qty);

  let singleProductPrice = props.item.price / props.item.qty;

  const decrementQty = () => {
    if (qty > 1) {
      setQty(qty - 1);
      props.updateQuantity(props.item._id, qty - 1, singleProductPrice);
      props.setTotalPrice(singleProductPrice, "decrement");
    }
  };
  const incrementQty = () => {
    setQty(qty + 1);
    props.updateQuantity(props.item._id, qty + 1, singleProductPrice);
    props.setTotalPrice(singleProductPrice, "increment");
  };

  let deleteCartProduct = async () => {
    await fetch("http://localhost:8000/delete-cart-product", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ productId: props.item._id }),
    });

    await props.fetchCartProducts();
  };

  return (
    <>
      <div
        className="border-top border-bottom border-black mt-3 d-flex justify-content-between"
        style={{ maxHeight: "120px" }}
      >
        <div
          className="d-flex justify-content-center align-items-center"
          style={{
            width: "30%",
            overflow: "hidden",
          }}
        >
          <div style={{ width: "50%" }}>
            <img
              src={props.item.url}
              alt="cartImage"
              style={{ width: "100%", height: "100%", objectFit: "contain" }}
            />
          </div>
          <div
            style={{ width: "50%", textAlign: "center" }}
            className="d-flex justify-content-center align-items-center"
          >
            <h4>{props.item.title}</h4>
          </div>
        </div>

        <div
          className="d-flex align-items-center justify-content-center"
          style={{
            width: "30%",
          }}
        >
          <button
            className="mx-2 btn-secondary d-flex justify-content-center align-items-center"
            style={{ height: "30%", width: "10%" }}
            onClick={decrementQty}
          >
            <i className="bi bi-dash fs-2"></i>
          </button>
          <div
            className="d-flex justify-content-center align-items-center rounded"
            style={{
              width: "30%",
              height: "45%",
              border: "1px solid grey",
            }}
          >
            <h4>{qty}</h4>
          </div>
          <button
            className="mx-2 btn-secondary d-flex justify-content-center align-items-center"
            style={{ height: "30%", width: "10%" }}
            onClick={incrementQty}
          >
            <i className="bi bi-plus fs-2"></i>
          </button>
        </div>

        <div
          className="d-flex justify-content-center align-items-center"
          style={{
            width: "30%",
          }}
        >
          <p className="fs-4">{(singleProductPrice * qty).toFixed(2)} $</p>
        </div>
        <div
          className="d-flex justify-content-center align-items-center "
          style={{
            width: "10%",
          }}
        >
          <button onClick={deleteCartProduct}>
            <i className="bi bi-trash3-fill fs-4"></i>
          </button>
        </div>
      </div>
    </>
  );
}
