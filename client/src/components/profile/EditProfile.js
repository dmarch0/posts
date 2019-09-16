import React from "react";
import { reduxForm } from "redux-form";

import InputField from "../fields/InputField";
import TextAreaField from "../fields/TextAreaField";
import Button from "../fields/Button";

const EditProfile = ({ handleSubmit, history }) => {
  const onSubmit = formValues => {};
  return (
    <form onSubmit={handleSubmit(onSubmit, history)}>
      <InputField
        name="handle"
        placeholder="Handle"
        type="text"
        desc="Short link for your profile"
        label="Handle"
      />
      <InputField
        name="avatar"
        placeholder="Avatar URL"
        type="text"
        desc="Paste here an URL to your avatar picture"
        label="Avatar"
      />
      <TextAreaField
        name="bio"
        placeholder="Your bio"
        desc="Tell us about yourself"
        label="Bio"
      />
      <Button>Submit</Button>
    </form>
  );
};

const formConnected = reduxForm({ form: "edit" })(EditProfile);

export default formConnected;
