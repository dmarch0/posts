import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "normalize.css";

import store from "./store";
import MainWrapper from "./components/wrappers/MainWrapper";
import Login from "./components/auth/Login";

const App = () => {
  return (
    <Provider store={store}>
      <MainWrapper>
        <Router>
          <Route exact path="/login" component={Login} />
        </Router>
      </MainWrapper>
    </Provider>
  );
};

export default App;
