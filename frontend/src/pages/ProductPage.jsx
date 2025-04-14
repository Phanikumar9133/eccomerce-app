import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./productpage.css";

function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:5000/api/products")
      .then(res => {
        const found = res.data.find(item => item._id === id);
        setProduct(found);
      })
      .catch(err => console.error(err));
  }, [id]);

  if (!product) return <div className="loading">Loading product details...</div>;

  return (
    <div className="product-detail">
      <div className="product-detail-card">
        <div className="product-image-section">
          <img src={product.image} alt={product.name} />
        </div>
        <div className="product-info-section">
          <h1>{product.name}</h1>
          <p className="product-desc">{product.description}</p>
          <h2 className="product-price">₹{product.price}</h2>
          <button className="buy-button">Buy Now</button>
          <button className="cart-button">Add to Cart</button>
        </div>
      </div>
    </div>
  );
}

export default ProductPage;
