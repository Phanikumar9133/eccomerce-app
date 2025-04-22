import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import { useNavigate } from "react-router-dom";
import "./Help.css";

function Home() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  const handleAddToCart = async (product) => {
    if (!loggedInUser) {
      alert("Please login first.");
      navigate("/login");
      return;
    }

    // Get the current cart items from localStorage
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Check if the product is already in the cart
    const index = cart.findIndex((item) => item._id === product._id);

    // Update the quantity if product already exists in the cart
    if (index >= 0) {
      cart[index].quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    // Update the cart in localStorage
    localStorage.setItem("cart", JSON.stringify(cart));

    // Update the cart item count
    const totalCount = cart.reduce((acc, item) => acc + item.quantity, 0);
    localStorage.setItem("cartCount", totalCount);

    // Optional: Post to backend cart API
    try {
      await axios.post("http://localhost:5000/api/cart/add", {
        userEmail: loggedInUser.email,
        productId: product._id,
        name: product.name,
        price: product.price,
        quantity: 1,
        image: product.image,
      });
      alert(`${product.name} added to cart!`);
    } catch (err) {
      console.error("Failed to add to cart:", err);
    }
  };

  return (
    <div className="home-container">
      <h1 className="home-heading">Explore Our Products</h1>
      <div className="product-list">
        {products.map((product) => (
          <ProductCard key={product._id} product={product}>
            <button
              onClick={() => handleAddToCart(product)}
              className="add-to-cart-btn"
            >
              Add to Cart
            </button>
          </ProductCard>
        ))}
      </div>
    </div>
  );
}

export default Home;
