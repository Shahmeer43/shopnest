// import React from "react";
// import { Link } from "react-router-dom";

// export default function Product(props) {
//   return (
//     <div
//       className="card  m-2"
//       style={{ width: "18rem", display: "flex", flexDirection: "column" }}
//     >
//       <div style={{ flex: "0.5" }} className="border border-dark">
//         <img
//           src={props.item.url}
//           className="card-img-top"
//           alt="productImage"
//           style={{ objectFit: "cover" }}
//         />
//       </div>
//       <div
//         className="card-body border border-dark"
//         style={{ flex: "0.5", height: "30%" }}
//       >
//         <h5 className="card-title">{props.item.title}</h5>
//         <p className="card-text">{props.item.desc}</p>
//         <p className="card-text fw-bold">{props.item.price}$</p>
//         <Link to={`/products/${props.item._id}`} className="btn btn-primary">
//           Details
//         </Link>
//       </div>
//     </div>
//   );
// }

import React from "react";
import { Link } from "react-router-dom";

export default function Product(props) {
  return (
    <div
      className="card m-2"
      style={{
        width: "18rem",
      }}
    >
      <div style={{ height: "15rem" }}>
        <img
          src={props.item.url}
          className="card-img-top"
          alt="productImage"
          style={{ objectFit: "contain", height: "100%" }}
        />
      </div>
      <div
        className="card-body"
        style={{
          height: "15rem",
        }}
      >
        <h5 className="card-title">{props.item.title}</h5>
        <p className="card-text">{props.item.desc}</p>
        <p className="card-text fw-bold">{props.item.price}$</p>
        <Link to={`/products/${props.item._id}`} className="btn btn-primary">
          Details
        </Link>
      </div>
    </div>
  );
}
