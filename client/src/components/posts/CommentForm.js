import React from "react";
import { reduxForm } from "redux-form";
import { connect } from "react-redux";

import TextAreaField from "../fields/TextAreaField";
import Button from "../fields/Button";
import { commentFetch } from "../../actions/postActions";

const CommentForm = ({ handleSubmit, postId, commentFetch }) => {
  return (
    <form
      onSubmit={handleSubmit(formValues => {
        const text = formValues.commentText ? formValues.commentText : "";
        commentFetch(text, postId);
      })}
    >
      <TextAreaField name="commentText" placeholder="Add a comment" />
      <Button>Submit</Button>
    </form>
  );
};

const formConnected = reduxForm({ form: "comment" })(CommentForm);

const mapStateToProps = state => ({});

export default connect(
  mapStateToProps,
  { commentFetch }
)(formConnected);
