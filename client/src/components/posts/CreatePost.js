import React from "react";
import { reduxForm } from "redux-form";
import styled from "styled-components";
import { connect } from "react-redux";

import InputField from "../fields/InputField";
import TextAreaField from "../fields/TextAreaField";
import Button from "../fields/Button";
import { addPost } from "../../actions/postActions";

const CreatePost = ({ className, history, handleSubmit, addPost }) => {
  const onSubmit = (formValues, history) => {
    addPost(formValues, history);
  };

  return (
    <form
      className={className}
      onSubmit={handleSubmit(formValues => onSubmit(formValues, history))}
    >
      <InputField label="Title" placeholder="title" name="title" />
      <TextAreaField
        label="Post content"
        name="text"
        placeholder="tell what's on your mind"
      />
      <Button>Submit</Button>
    </form>
  );
};

const formConnected = reduxForm({ form: "post" })(CreatePost);

const StyledCreatePost = styled(formConnected)``;

const mapStateToProps = state => ({});

export default connect(
  mapStateToProps,
  { addPost }
)(StyledCreatePost);
