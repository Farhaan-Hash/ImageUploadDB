import React, {useState} from "react";
import {useNavigate, Link} from "react-router-dom";

const ProductUpload = () => {
  const [images, setImages] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const inputStyle = {
    marginBottom: "10px",
    padding: "10px",
    width: "100%",
    border: "1px solid #ccc",
    borderRadius: "5px",
  };

  const buttonStyle = {
    backgroundColor: "#007bff",
    color: "#fff",
    padding: "10px 20px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  };

  const formStyle = {
    maxWidth: "400px",
    margin: "0 auto",
  };

  const errorStyle = {
    color: "red",
    margin: "10px 0",
  };

  const loadingStyle = {
    color: "#007bff",
    margin: "10px 0",
  };

  const handleImageUpload = async (e) => {
    e.preventDefault();

    if (!name || !description || !price || images.length === 0) {
      setError("Please fill in all fields and select at least one image.");
      return;
    }

    const formData = new FormData();

    // Append name, description, and price to the formData object
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);

    for (let i = 0; i < images.length; i++) {
      formData.append("images", images[i]);
    }

    try {
      setLoading(true);

      const response = await fetch("http://localhost:5000/api/products", {
        method: "POST",
        body: formData,
      });
      if (response.ok) {
        const data = await response.json();
        alert("Product created successfully:", data.product);
        // console.log(data);
        // Optionally, you can reset the form fields after successful submission
        setName("");
        setDescription("");
        setPrice("");
        setImages([]);
        setError(null);
        navigate("/");
      } else {
        setError("Product creation failed.");
      }
    } catch (error) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{marginBottom: "20px"}}>
      <div>
        <Link to="/">← Go Back</Link>
      </div>

      <h1>Product Image Upload</h1>
      <form encType="multipart/form-data" style={formStyle}>
        <input
          type="text"
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={inputStyle}
        />
        <input
          type="text"
          placeholder="Product Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={inputStyle}
        />
        <input
          type="text"
          placeholder="Product Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          style={inputStyle}
        />
        <input
          type="file"
          multiple
          onChange={(e) => setImages(e.target.files)}
          style={inputStyle}
        />
        {error && <p style={errorStyle}>{error}</p>}
        {loading && <p style={loadingStyle}>Uploading...</p>}
        <button type="submit" onClick={handleImageUpload} style={buttonStyle}>
          Upload
        </button>
      </form>
    </div>
  );
};

export default ProductUpload;
