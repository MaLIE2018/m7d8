import React from "react";
import { Route } from "react-router-dom";
import { Home } from "./components/home/Home";
import { Details } from "./components/details/Details";

function App() {
  return (
    <>
      <Route
        path='/'
        exact
        render={(routerProps) => <Home {...routerProps} title='home to be' />}
      />
      <Route
        path='/details/:id'
        exact
        render={(routerProps) => <Details {...routerProps} />}
      />
    </>
  );
}

export default App;
