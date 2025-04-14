import React from "react";
import { useParams } from "react-router-dom";
import products from "../data/products";
import "../pages/ProductDetails.css";

const ProductDetails = () => {
  const { id } = useParams();
  const product = products?.find((p) => p.id === parseInt(id, 10));

  if (!product) return <h2>Product Not Found</h2>;

  return (
    <div className="product-details-container">
      <div className="product-card-detail">
        <img
          src={product.image}
          alt={product.name}
          className="product-image-large"
        />
        <div className="product-info-large">
          <h1>{product.name}</h1>
          <p>{product.description}</p>
          <p className="product-price-large">₹{product.price}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
