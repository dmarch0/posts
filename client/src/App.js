import React from "react";
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
import ProfileDisplay from "./components/profile/ProfileDisplay";
import { LOGIN_SUCCESS, LOGOUT, SET_AUTH } from "./actions/types";
import checkAvatar from "./utils/checkAvatar";
import PrivateRoute from "./components/common/PrivateRoute";
import EditProfile from "./components/profile/EditProfile";

(async () => {
  if (localStorage["token"]) {
    const decoded = jwt_decode(localStorage["token"]);
    if (Date.now() / 1000 > decoded.exp) {
      localStorage.removeItem("token");
      setAuthHeader(false);
      store.dispatch({ type: LOGOUT });
    } else {
      setAuthHeader(localStorage["token"]);
      store.dispatch({ type: SET_AUTH, payload: true });
      decoded.avatar = (await checkAvatar(decoded.avatar))
        ? decoded.avatar
        : false;
      store.dispatch({ type: LOGIN_SUCCESS, payload: decoded });
    }
  }
})();

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <MainWrapper id="main-wrapper">
          <Route exact path="/login" component={Login} />
          <Route exact path="/profile/:handle" component={ProfileDisplay} />
          <PrivateRoute exact path="/edit" component={EditProfile} />
        </MainWrapper>
        <Footer />
      </Router>
    </Provider>
  );
};

export default App;
