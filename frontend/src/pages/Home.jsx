import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import { useNavigate } from "react-router-dom";
import "./Home.css";

function Home() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));  // Fetch logged-in user from localStorage

  // Fetch products from the backend
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  // Handle adding product to cart
  const handleAddToCart = async (product) => {
    // Check if the user is logged in
    if (!loggedInUser) {
      alert("Please log in to add products to your cart.");
      navigate("/login");
      return;
    }

    const cart = JSON.parse(localStorage.getItem("cart")) || []; // Fetch cart from localStorage

    // Check if product is already in cart
    const existingProductIndex = cart.findIndex(item => item._id === product._id);

    if (existingProductIndex >= 0) {
      // If the product is already in the cart, increment the quantity
      cart[existingProductIndex].quantity += 1;
    } else {
      // Otherwise, add the product with quantity 1
      cart.push({ ...product, quantity: 1 });
    }

    // Save updated cart to localStorage
    localStorage.setItem("cart", JSON.stringify(cart));

    // Save cart to the backend (using logged-in user's email)
    try {
      await axios.post('http://localhost:5000/api/cart/add', {
        userEmail: loggedInUser.email,
        productId: product._id,
        name: product.name,
        price: product.price,
        quantity: 1,
        image: product.image,
      });
      alert(`${product.name} added to cart!`);

      // Update cart count in Navbar (use localStorage directly here)
      const updatedCart = JSON.parse(localStorage.getItem("cart"));
      const itemCount = updatedCart.reduce((acc, item) => acc + item.quantity, 0);
      // Use localStorage to store the cart count globally (if needed for Navbar)
      localStorage.setItem("cartCount", itemCount);
    } catch (err) {
      console.error("Error adding to cart:", err);
      alert("Failed to add product to cart.");
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
