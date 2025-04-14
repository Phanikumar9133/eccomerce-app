const mongoose = require("mongoose");
const Product = require("./models/product");
require("dotenv").config();

mongoose.connect(process.env.MONGO_URI);

const products = [
  {
    name: "Realme Smartphone",
    price: 13999,
    description: "Powerful performance, crisp display and large battery.",
    image: "https://m.media-amazon.com/images/I/619f09kK7tL._SL1500_.jpg",
    category: "Mobiles"
  },
  {
    name: "BoAt Rockerz Headphones",
    price: 1999,
    description: "Immersive audio experience with Bluetooth connectivity.",
    image: "/.1jpg",
    category: "Audio"
  },
  {
    name: "Nike Running Shoes",
    price: 4599,
    description: "Comfortable and stylish running shoes for all terrains.",
    image: "https://m.media-amazon.com/images/I/81xMef7qQeL._SL1500_.jpg",
    category: "Footwear"
  }
];
Product.insertMany(products).then(() => {
  console.log("Products Seeded");
  mongoose.disconnect();
});
