import React from "react";
import { reduxForm } from "redux-form";

import InputField from "../fields/InputField";

const Login = () => {
  return (
    <div>
      <InputField name="email" label="Email" placeholder="Email" />
    </div>
  );
};

const formConnected = reduxForm({ form: "login" })(Login);

export default formConnected;
