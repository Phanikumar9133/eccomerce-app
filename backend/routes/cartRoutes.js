const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');

// Add to Cart
router.post('/add', async (req, res) => {
  const { userEmail, product } = req.body;
  try {
    const existingCart = await Cart.findOne({ userEmail });
    if (existingCart) {
      existingCart.items.push(product);
      await existingCart.save();
    } else {
      const newCart = new Cart({ userEmail, items: [product] });
      await newCart.save();
    }
    res.status(200).json({ success: true });
  } catch (err) {
    res.status(500).json({ message: 'Error adding to cart', error: err.message });
  }
});

// Get Cart
router.get('/:userEmail', async (req, res) => {
  try {
    const cart = await Cart.findOne({ userEmail: req.params.userEmail });
    if (!cart) return res.status(404).json({ message: 'Cart not found' });

    res.json({ success: true, cart: cart.items });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching cart', error: err.message });
  }
});

// Remove from Cart
router.post('/remove', async (req, res) => {
  const { userEmail, productId } = req.body;
  try {
    const cart = await Cart.findOne({ userEmail });
    if (!cart) return res.status(404).json({ message: 'Cart not found' });

    cart.items = cart.items.filter((item) => item._id.toString() !== productId);
    await cart.save();

    res.status(200).json({ success: true });
  } catch (err) {
    res.status(500).json({ message: 'Error removing from cart', error: err.message });
  }
});

module.exports = router;
