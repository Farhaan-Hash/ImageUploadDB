import React from "react";
import {Link} from "react-router-dom";

const ProductCard = ({product, mainImage}) => {
  return (
    <div className="product-card mt-5">
      <Link to={`/product/${product._id}`}>
        <div className="product-image">
          {/* Display the main image on top */}
          <img
            src={mainImage || product.images[0]}
            alt={product.name}
            className="main-image"
          />
        </div>
      </Link>
      <div className="product-content">
        <Link to={`/product/${product._id}`}>
          <div className="product-title">
            <strong>{product.name}</strong>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
