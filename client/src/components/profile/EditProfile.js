import React, { useEffect } from "react";
import { reduxForm } from "redux-form";
import { connect } from "react-redux";

import InputField from "../fields/InputField";
import TextAreaField from "../fields/TextAreaField";
import Button from "../fields/Button";
import { editFetch } from "../../actions/profileAction";

const EditProfile = ({
  handleSubmit,
  history,
  auth,
  initialize,
  editFetch
}) => {
  useEffect(() => {
    initialize({
      handle: auth.handle,
      bio: auth.bio,
      avatar: auth.avatar ? auth.avatar : ""
    });
  }, [auth.handle, auth.bio, auth.avatar]);
  const onSubmit = formValues => {
    editFetch(formValues, history);
  };
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

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { editFetch }
)(formConnected);
