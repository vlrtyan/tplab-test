import React from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Main from "../Main/Main";
import Card from "../Card/Card";
import productsData from "../../utils/products.json";

function App() {
  const navigate = useNavigate();

  const handleProductClick = (product) => {
    navigate(product.getAttribute("value"));
  };

  const handleGoBack = () => {
    navigate(-1);
  }

  return (
    <div className="page">
      <Routes>
        <Route
          exact
          path="/"
          element={<Main onProductClick={handleProductClick}/>}
        />
        <Route path="/:name" element={<Card products={productsData} onBack={handleGoBack}  />} />
      </Routes>
    </div>
  );
}

export default App;
