import React, { useState, useEffect } from "react";
import "./cart.css";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser")) || null;

  useEffect(() => {
    const fetchCartItems = async () => {
      if (!loggedInUser) return;
      const userEmail = loggedInUser.email;

      try {
        const response = await fetch(`http://localhost:5000/api/cart/${userEmail}`);
        const data = await response.json();

        if (data.success) {
          setCartItems(data.cart);
          calculateTotal(data.cart);
          updateCartCount(data.cart);
        }
      } catch (err) {
        console.error("Error fetching cart items:", err);
      }
    };

    fetchCartItems();
  }, [loggedInUser]);

  const calculateTotal = (cart) => {
    const totalAmount = cart.reduce((sum, item) => sum + (item.productId?.price || 0) * item.quantity, 0);
    setTotal(totalAmount);
  };

  const updateCartCount = (cart) => {
    const count = cart.reduce((acc, item) => acc + item.quantity, 0);
    localStorage.setItem("cartCount", count);
  };

  const handleRemoveFromCart = async (productId) => {
    const updatedCart = cartItems.filter((item) => item.productId._id !== productId);
    setCartItems(updatedCart);
    calculateTotal(updatedCart);
    updateCartCount(updatedCart);

    const userEmail = loggedInUser.email;

    try {
      await fetch("http://localhost:5000/api/cart/remove", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userEmail, productId }),
      });
    } catch (err) {
      console.error("Error removing item:", err);
    }
  };

  return (
    <div className="cart-container">
      <h1>Your Cart</h1>
      {cartItems.length === 0 ? (
        <p>No items in your cart.</p>
      ) : (
        <div className="cart-items">
          {cartItems.map((item) => (
            <div key={item._id} className="cart-item">
              <img src={item.productId?.image} alt={item.productId?.name} />
              <div>
                <h3>{item.productId?.name}</h3>
                <p>{item.productId?.description}</p>
                <span>₹{item.productId?.price}</span>
                <span> x {item.quantity}</span>
                <button onClick={() => handleRemoveFromCart(item.productId._id)}>Remove</button>
              </div>
            </div>
          ))}
        </div>
      )}
      <div className="cart-total">
        <h2>Total: ₹{total}</h2>
      </div>
    </div>
  );
};

export default Cart;
