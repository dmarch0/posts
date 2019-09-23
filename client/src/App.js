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
import axios from "./config/axios";
import CreatePost from "./components/posts/CreatePost";
import PostDisplay from "./components/posts/PostDisplay";

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

      //update user info
      try {
        const response = await axios.post("/", {
          query: `
          query {
            user(userId:"${decoded.userId}") {
              avatar
              bio
              handle
            }
          }
        `
        });
        const { avatar, bio, handle } = response.data.data.user;
        decoded.avatar = avatar;
        decoded.avatar = (await checkAvatar(decoded.avatar))
          ? decoded.avatar
          : false;
        decoded.bio = bio;
        decoded.handle = handle;
      } catch (error) {
        console.log(error.response);
      }
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
          <Route exact path="/post/:id" component={PostDisplay} />
          <PrivateRoute exact path="/edit" component={EditProfile} />
          <PrivateRoute exact path="/create-post" component={CreatePost} />
        </MainWrapper>
        <Footer />
      </Router>
    </Provider>
  );
};

export default App;
