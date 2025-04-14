import React from 'react';
import './ProductType.css';

const ProductType = () => {
  return (
    <div className="product-type">
      <h2>Our Product Types</h2>
      <div className="product-categories">
        <div className="category">
          <h3>Electronics</h3>
          <p>Browse through our wide range of the latest gadgets, including smartphones, laptops, and accessories!</p>
        </div>
        <div className="category">
          <h3>Clothing</h3>
          <p>Shop the latest fashion trends for men and women. From casual wear to formal attire, we have it all.</p>
        </div>
        <div className="category">
          <h3>Home Appliances</h3>
          <p>Upgrade your home with high-quality appliances. Find everything from kitchen gadgets to home entertainment systems.</p>
        </div>
      </div>
    </div>
  );
};

export default ProductType;
