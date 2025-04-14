// ProductCard.js
import "./productcard.css"
import React from 'react';
import { useNavigate } from 'react-router-dom';

function ProductCard({ product }) {
  const navigate = useNavigate();
  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

  const handleAddToCart = async (productId) => {
    if (!loggedInUser) {
      alert("Please log in to add products to your cart.");
      navigate("/login");
      return;
    }

    const userEmail = loggedInUser.email;
    const quantity = 1;

    try {
      const response = await fetch('http://localhost:5000/api/cart/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userEmail, productId, quantity })
      });

      const data = await response.json();
      if (data.success) {
        alert(`${product.name} added to cart!`);
      } else {
        alert('Failed to add to cart.');
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert('Error adding item to cart.');
    }
  };

  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} />
      <div>
        <h3>{product.name}</h3>
        <p>{product.description}</p>
        <span>₹{product.price}</span>
        <button onClick={() => handleAddToCart(product._id)}>Add to Cart</button>
      </div>
    </div>
  );
}

export default ProductCard;
