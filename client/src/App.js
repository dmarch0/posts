import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "normalize.css";
import jwt_decode from "jwt-decode";
import setAuthHeader from "./utils/setAuthHeader";

import store from "./store";
import MainWrapper from "./components/wrappers/MainWrapper";
import Login from "./components/auth/Login";
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";
import { LOGIN_SUCCESS, LOGOUT } from "./actions/types";
import checkAvatar from "./utils/checkAvatar";

const App = () => {
  useEffect(() => {
    (async () => {
      if (localStorage["token"]) {
        const decoded = jwt_decode(localStorage["token"]);
        if (Date.now() / 1000 > decoded.exp) {
          localStorage.removeItem("token");
          setAuthHeader(false);
          store.dispatch({ type: LOGOUT });
        } else {
          setAuthHeader(localStorage["token"]);
          decoded.avatar = (await checkAvatar(decoded.avatar))
            ? decoded.avatar
            : false;
          store.dispatch({ type: LOGIN_SUCCESS, payload: decoded });
        }
      }
    })();
    return () => {};
  }, []);
  console.log("rendered");
  return (
    <Provider store={store}>
      <Navbar />
      <MainWrapper>
        <Router>
          <Route exact path="/login" component={Login} />
        </Router>
      </MainWrapper>
      <Footer />
    </Provider>
  );
};

export default App;
