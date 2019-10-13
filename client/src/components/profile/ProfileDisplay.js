import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import { FaComment, FaTrash } from "react-icons/fa";

import {
  profileFetch,
  followUser,
  unfollowUser,
  profileClear
} from "../../actions/profileAction";
import placeholder from "../../img/placeholder.jpg";
import Spinner from "../common/Spinner";
import Button from "../fields/Button";
import ModalList from "./ModalList";
import StyledModal from "../common/StyledModal";

const ProfileDisplay = ({
  profileFetch,
  match,
  className,
  profile,
  auth,
  followUser,
  unfollowUser,
  profileClear
}) => {
  const { handle } = match.params;

  useEffect(() => {
    if (handle.length > 10) {
      profileFetch(handle);
    } else {
      profileFetch(null, handle);
    }
    return () => {
      profileClear();
    };
  }, [handle, profileFetch]);

  const [isModalOpen, toggleModal] = useState(false);
  const [modalListContent, changeModalListContent] = useState([]);

  const userMatchedRender = <Link to="/edit">edit profile</Link>;

  const userNotMatchedRender = profile.loading ? null : profile.profile.followers.filter(
      follower => follower._id === auth.userId
    ).length > 0 ? (
    <Button onClick={() => unfollowUser(profile.profile._id)}>unfollow</Button>
  ) : (
    <Button onClick={() => followUser(profile.profile._id)}>follow</Button>
  );

  const renderedContent = profile.loading ? (
    <Spinner />
  ) : profile.error ? (
    profile.error
  ) : (
    <>
      <div className="profile-container">
        <div className="avatar-container">
          <img
            src={profile.profile.avatar ? profile.profile.avatar : placeholder}
            alt="user avatar"
          />
        </div>
        <div className="info-container">
          <div className="info-header">
            <h1>{profile.profile.name}</h1>
            {auth.isAuth ? (
              <div className="info-control">
                {profile.profile._id === auth.userId
                  ? userMatchedRender
                  : userNotMatchedRender}
              </div>
            ) : null}
          </div>
          <div className="followers-info">
            <a
              onClick={() => {
                if (profile.profile.followers.length > 0) {
                  changeModalListContent(profile.profile.followers);
                  toggleModal(true);
                }
              }}
            >
              followers: {profile.profile.followers.length},
            </a>{" "}
            <a
              onClick={() => {
                if (profile.profile.follows.length > 0) {
                  changeModalListContent(profile.profile.follows);
                  toggleModal(true);
                }
              }}
            >
              following: {profile.profile.follows.length}
            </a>
          </div>
          <p>{profile.profile.bio}</p>
        </div>
      </div>
      <div className="posts-container">
        <h1>Posts: </h1>
        {profile.profile.posts.length > 0 ? (
          profile.profile.posts.map(post => {
            const parsedDate = new Date(parseInt(post.date));
            return (
              <div className="post-item" key={post._id}>
                <h1>
                  <Link to={`/post/${post._id}`}>{post.title}</Link>
                </h1>
                <Moment format="DD/MM/YYYY hh:mm">{parsedDate}</Moment>
                {profile.profile._id === auth.userId ? (
                  <span className="delete-container">
                    <FaTrash />
                  </span>
                ) : null}
                <div className="comments-display">
                  <FaComment /> {post.comments.length}
                </div>
              </div>
            );
          })
        ) : (
          <>
            <p>User have not created any posts yet</p>
          </>
        )}
        {profile.profile._id === auth.userId ? (
          <Link to="/create-post">create a post</Link>
        ) : null}
      </div>
      <StyledModal isOpen={isModalOpen} toggleOpen={toggleModal}>
        <ModalList content={modalListContent} toggleModal={toggleModal} />
      </StyledModal>
    </>
  );
  return <div className={className}>{renderedContent}</div>;
};

const StyledProfileDisplay = styled(ProfileDisplay)`
  width: 100%;
  .profile-container {
    display: flex;
    .avatar-container {
      img {
        width: 200px;
        height: 200px;
        border-radius: 50%;
        object-fit: cover;
      }
    }
    .info-container {
      padding: 0px 5px;
      margin: 0 20px;
      .info-header {
        display: flex;
        align-items: center;
        h1 {
          margin: 0px;
        }
        .info-control {
          padding: 0px 5px;
        }
      }
      .followers-info {
        a {
          text-decoration: underline;
          display: inline-block;
        }
      }
    }
  }
  .posts-container {
    h1 {
      margin: 5px 0px;
    }
    .post-item {
      margin-bottom: 10px;

      h1 {
        margin: 0px;
        display: inline-block;
      }
      time {
        display: inline-block;
        margin: 0 5px;
        font-style: italic;
        color: #ccc;
      }

      .comments-display {
        display: flex;
      }

      .delete-container {
        cursor: pointer;
      }
    }
  }
  a {
    color: inherit;
  }
`;

const mapStateToProps = state => ({ profile: state.profile, auth: state.auth });

export default connect(
  mapStateToProps,
  { profileFetch, followUser, unfollowUser, profileClear }
)(StyledProfileDisplay);
