import React from "react";
import { Route, Switch } from "react-router-dom";
import Main from "../Main/Main";
import Card from "../Card/Card";

function App() {
  return (
    <div className="page">
      <Switch>
        <Route exact path="/">
          <Main />
        </Route>
        <Route path="/:id">
          <Card />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
