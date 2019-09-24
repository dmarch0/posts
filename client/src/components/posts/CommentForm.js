import React from "react";
import { reduxForm } from "redux-form";
import { connect } from "react-redux";

import TextAreaField from "../fields/TextAreaField";
import Button from "../fields/Button";

const CommentForm = ({ handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit(() => {})}>
      <TextAreaField
        name="commentText"
        placeholder="Add a comment"
        label="Comment post"
      />
      <Button>Submit</Button>
    </form>
  );
};

const formConnected = reduxForm({ form: "comment" })(CommentForm);

const mapStateToProps = state => ({});

export default connect(
  mapStateToProps,
  {}
)(formConnected);
