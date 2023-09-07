import React, {useState, useEffect} from "react";
import {Link, useParams} from "react-router-dom";

const ProductScreen = () => {
  const {productId} = useParams();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    async function fetchProduct() {
      try {
        // Make a GET request to the backend route with the product ID
        const response = await fetch(
          `http://localhost:5000/api/products/${productId}`
        );

        if (response.ok) {
          const data = await response.json();
          setProduct(data.product);
        } else {
          // Handle error
          console.error("Failed to fetch product");
        }
      } catch (error) {
        // Handle error
        console.error("Failed to fetch product", error);
      }
    }

    fetchProduct();
  }, [productId]);

  // Initialize selectedImage when product data is available
  useEffect(() => {
    if (product && product.images && product.images.length > 0) {
      setSelectedImage(product.images[0]);
    }
  }, [product]);

  // handle image selection
  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  return (
    <div className="product-container">
      <Link className="my-3 mt-5" to="/">
        ← Go Back
      </Link>
      {product && (
        <div className="product-details">
          <div className="product-images">
            <img
              src={selectedImage}
              alt={product.name}
              className="main-image"
            />
            <div className="thumbnail-images">
              {product.images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`Product ${index + 1}`}
                  className={`thumbnail ${
                    selectedImage === img ? "selected" : ""
                  }`}
                  onClick={() => handleImageClick(img)}
                />
              ))}
            </div>
          </div>
          <div className="product-info">
            <h3>{product.name}</h3>

            <p>
              <strong>Price:</strong> ${product.price}
            </p>
            <p>
              <strong>Description:</strong> {product.description}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductScreen;
