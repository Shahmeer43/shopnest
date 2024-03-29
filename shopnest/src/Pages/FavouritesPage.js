// import React, { useEffect, useState } from "react";
// import Favourite from "../Components/Favourite";

// export default function FavouritesPage() {
//   let favouriteProducts;

//   const [products, setProducts] = useState(null);

//   const fetchProducts = async () => {
//     let dataJSON = await fetch("http://localhost:8000/products");
//     let data = await dataJSON.json();
//     setProducts(data.products);
//   };

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   if (products) {
//     favouriteProducts = products.filter(
//       (product) => product.favourite === true
//     );
//   }

//   return favouriteProducts.length === 0 ? (
//     <div className="d-flex justify-content-center">
//       <h2>No Favourites </h2>
//     </div>
//   ) : (
//     <div className="container">
//       <div className="row row-cols-1 row-cols-md-5 g-4 m-1 ">
//         {favouriteProducts.map((product) => {
//           return <Favourite key={product._id} item={product} />;
//         })}
//       </div>
//     </div>
//   );
// }

import React, { useEffect, useState } from "react";
import Favourite from "../Components/Favourite";

export default function FavouritesPage() {
  const [products, setProducts] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      let dataJSON = await fetch("http://localhost:8000/products");
      let data = await dataJSON.json();
      setProducts(data.products);
    };

    fetchProducts();
  }, []);

  const favouriteProducts = products
    ? products.filter((product) => product.favourite === true)
    : [];

  return (
    products &&
    (favouriteProducts.length === 0 ? (
      <div className="d-flex justify-content-center mt-3">
        <h2>No Favourites</h2>
      </div>
    ) : (
      <div className="container">
        <div className="row row-cols-1 row-cols-md-5 g-4 m-1 ">
          {favouriteProducts.map((product) => {
            return <Favourite key={product._id} item={product} />;
          })}
        </div>
      </div>
    ))
  );
}
