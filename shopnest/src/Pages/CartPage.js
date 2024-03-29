import React, { useEffect, useState } from "react";

import Cart from "../Components/Cart";

export default function CartPage() {
  const [total, setTotal] = useState(0);
  const [cart, setCart] = useState(null);
  const [cartItemQuantities, setCartItemQuantities] = useState([]);

  const updateQuantity = (itemId, newQuantity, singleProductPrice) => {
    let index = cartItemQuantities.findIndex(
      (cartItem) => cartItem.itemId === itemId
    );

    if (index !== -1) {
      setCartItemQuantities((prevState) => {
        const updatedQuantities = [...prevState];
        updatedQuantities[index].quantity = newQuantity;
        updatedQuantities[index].price = singleProductPrice * newQuantity;
        return updatedQuantities;
      });
    } else {
      setCartItemQuantities((prevState) => [
        ...prevState,
        {
          itemId: itemId,
          quantity: newQuantity,

          price: singleProductPrice * newQuantity,
        },
      ]);
    }
  };

  const saveNewQuantities = async () => {
    // if (cartItemQuantities.length === 0) return;
    await fetch("http://localhost:8000/updateCartQuantities", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cartItemQuantities),
    });
  };

  const fetchCartProducts = async () => {
    let cartProductsJSON = await fetch("http://localhost:8000/cart-products");
    let cartProducts = await cartProductsJSON.json();

    if (!cartProducts) {
      return;
    }

    setCart(cartProducts);

    let totalPrice = cartProducts.reduce((acc, item) => acc + item.price, 0);

    setTotal(totalPrice);
  };

  useEffect(() => {
    fetchCartProducts();
  }, []);

  const totalPriceSetting = (productPrice, action) => {
    if (total > 0) {
      if (action === "decrement") {
        setTotal((previousVal) => {
          return previousVal - productPrice;
        });
      }
    }
    if (action === "increment") {
      setTotal((previousVal) => {
        return previousVal + productPrice;
      });
    }
  };

  const onOrder = async (event) => {
    await fetch("http://localhost:8000/product-order", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cartItemQuantities),
    });
  };

  return (
    <div className="container">
      <div className="d-flex justify-content-center align-items-center mt-2 fw-bold">
        <p style={{ fontFamily: "Nunito", fontSize: "2.3rem" }}>Your Cart</p>
      </div>
      {cart &&
        cart.map((cartProduct) => {
          return (
            <Cart
              key={cartProduct._id}
              item={cartProduct}
              setTotalPrice={totalPriceSetting}
              fetchCartProducts={fetchCartProducts}
              updateQuantity={updateQuantity}
            />
          );
        })}
      <div
        className=" border-primary mt-3 d-flex flex-column justify-content-center align-items-center"
        style={{ minHeight: "60px" }}
      >
        <div className="border-top border-bottom border-2 border-primary p-2">
          <h4>Total Price: {Math.abs(total).toFixed(2)} $</h4>
        </div>

        <button
          type="button"
          className="btn btn-outline-dark mt-3 fw-semibold px-4 rounded-5"
          onClick={onOrder}
        >
          Place Your Order
        </button>

        <button
          className="btn btn-primary mt-3 fw-semibold px-4 rounded-5"
          onClick={saveNewQuantities}
        >
          Save
        </button>
      </div>
    </div>
  );
}
