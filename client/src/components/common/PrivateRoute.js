import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

const PrivateRoute = ({ component: Component, auth, ...rest }) => {
  console.log(auth);
  return (
    <Route
      {...rest}
      render={props => {
        console.log(auth.isAuth);
        return auth.isAuth ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        );
      }}
    />
  );
};

const mapStateToProps = state => {
  return { auth: state.auth };
};

export default connect(
  mapStateToProps,
  {}
)(PrivateRoute);
