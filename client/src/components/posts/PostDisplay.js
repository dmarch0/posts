import React, { useEffect } from "react";
import styled from "styled-components";
import { connect } from "react-redux";

import { postFetch } from "../../actions/postActions";
import Spinner from "../common/Spinner";
import CommentForm from "./CommentForm";
import CommentItem from "./CommentItem";

const PostDisplay = ({ className, postFetch, match, post, auth }) => {
  useEffect(() => {
    postFetch(match.params.id);
  }, []);
  const renderContent = post.loading ? (
    <Spinner />
  ) : post.error ? (
    "something went wrong"
  ) : (
    <>
      <div className="post-container">
        <h1 className="post-header">{post.post.title}</h1>
        <p className="post-content">{post.post.text}</p>
      </div>
      <div className="comments-container">
        <h1 className="comments-header">Comments: </h1>

        {post.post.comments.length > 0 ? (
          post.post.comments.map(comment => (
            <CommentItem key={comment._id} comment={comment} />
          ))
        ) : (
          <p>No comments yet</p>
        )}
        {auth.isAuth ? <CommentForm postId={post.post._id} /> : null}
      </div>
    </>
  );
  return <div className={className}>{renderContent}</div>;
};

const StyledPostDisplay = styled(PostDisplay)`
  .post-container {
  }
  .comments-container {
    .comments-header {
      margin: 0px;
    }
  }
`;

const mapStateToProps = state => ({ post: state.post, auth: state.auth });

export default connect(
  mapStateToProps,
  { postFetch }
)(StyledPostDisplay);
