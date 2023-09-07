import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import ProductCard from "./ProductCard";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch product data from the backend
    async function fetchProducts() {
      try {
        const response = await fetch("http://localhost:5000/api/products"); // Replace with your backend API endpoint
        if (response.ok) {
          const data = await response.json();
          setProducts(data.products);
        } else {
          setError("Failed to fetch product data.");
        }
      } catch (error) {
        setError("Something went wrong. Please try again.");
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  return (
    <div className="product-list-container">
      <h2>Product List</h2>
      {/* Display loading indicator */}
      {loading && <p>Loading...</p>}
      {/* Display error message */}
      {error && <p className="error-message">{error}</p>}
      {/* Display product cards */}
      <Link to={`/upload`} className="upload-button-container">
        <button className="upload-button">Upload Products</button>
      </Link>
      <div className="product-card-container">
        {products.map((product) => {
          // Get the first image from the product's images array
          const mainImage = product.images[0];
          return (
            <div key={product._id}>
              <Link to={`/product/${product._id}`}>
                {/* Display only one image per product */}
                <ProductCard product={product} mainImage={mainImage} />
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProductList;
