const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  userEmail: { type: String, required: true },
  items: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
      name: String,
      price: Number,
      quantity: Number,
      image: String
    }
  ],
});

module.exports = mongoose.model('Cart', cartSchema);
