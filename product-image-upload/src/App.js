import React from "react";
import "./App.css";
import ProductUpload from "./components/ProductUpload";
import ProductList from "./components/ProductList";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import ProductScreen from "./screens/ProductScreen";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/upload" element={<ProductUpload />} />
          <Route path="/product/:productId" element={<ProductScreen />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
