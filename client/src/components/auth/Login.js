import React from "react";
import { reduxForm } from "redux-form";
import { connect } from "react-redux";

import InputField from "../fields/InputField";
import Button from "../fields/Button";
import { loginFetch } from "../../actions/authActions";

const Login = ({ loginFetch, handleSubmit }) => {
  const onSubmit = formValues => {
    loginFetch(formValues);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <InputField name="email" label="Email" placeholder="Email" />
      <InputField
        name="password"
        label="Password"
        placeholder="password"
        type="password"
      />
      <Button>Login</Button>
    </form>
  );
};

const formConnected = reduxForm({ form: "login" })(Login);

const mapStateToProps = state => ({});

export default connect(
  mapStateToProps,
  { loginFetch }
)(formConnected);
