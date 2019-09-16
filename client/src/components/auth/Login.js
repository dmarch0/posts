import React from "react";
import { reduxForm } from "redux-form";
import { connect } from "react-redux";

import InputField from "../fields/InputField";
import Button from "../fields/Button";
import { loginFetch } from "../../actions/authActions";

const Login = ({ loginFetch, handleSubmit, history }) => {
  const onSubmit = (formValues, history) => {
    loginFetch(formValues, history);
  };
  return (
    <form onSubmit={handleSubmit(formValues => onSubmit(formValues, history))}>
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
