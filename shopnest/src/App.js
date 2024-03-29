import Navbar from "./Components/Navbar";
import { Route, Routes } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import ProductsPage from "./Pages/ProductsPage";
import ProductDetailPage from "./Pages/ProductDetailPage";
import { useDispatch } from "react-redux";
import { productAction } from "./Store";
import { useEffect } from "react";
import CartPage from "./Pages/CartPage";
import FavouritesPage from "./Pages/FavouritesPage";

function App() {
  const dispatch = useDispatch();
  const fetchProducts = async () => {
    let productsJSON = await fetch("http://localhost:8000/products");
    let products = await productsJSON.json();
    if (products) {
      dispatch(productAction.save(products));
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);
  return (
    <>
      <Navbar />
      <div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route
            path="/products/:productId"
            element={<ProductDetailPage />}
          ></Route>

          <Route path="/cart" element={<CartPage />} />

          <Route path="/favourites" element={<FavouritesPage />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
