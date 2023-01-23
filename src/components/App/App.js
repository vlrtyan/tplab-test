import React from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import Main from "../Main/Main";
import Card from "../Card/Card";
import productsData from "../../utils/products.json";

function App() {
  const history = useHistory();

  const handleProductClick = (product) => {
    history.push(product.getAttribute("value"));
  };

  const handleGoBack = () => {
    history.goBack();
  };

  return (
    <div className="page">
      <Switch>
        <Route exact path="/">
          <Main productsData={productsData} onProductClick={handleProductClick} />
        </Route>
        <Route path="/:id">
          <Card productsData={productsData} onBack={handleGoBack} />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
