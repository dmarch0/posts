import React, { useEffect } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { Link } from "react-router-dom";

import { profileFetch } from "../../actions/profileAction";
import placeholder from "../../img/placeholder.jpg";
import Spinner from "../common/Spinner";

const ProfileDisplay = ({ profileFetch, match, className, profile, auth }) => {
  const { handle } = match.params;

  useEffect(() => {
    if (handle.length > 10) {
      profileFetch(handle);
    } else {
      profileFetch(null, handle);
    }
  }, [handle, profileFetch]);
  const userMatchedRender = <Link to="/edit">edit profile</Link>;
  const userNotMatchedRender = "user not matched";
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
          <p>{profile.profile.bio}</p>
        </div>
      </div>
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
      }
    }
    .info-container {
      padding: 0px 5px;
      .info-header {
        display: flex;
        align-items: center;
        h1 {
          margin: 0px;
        }
        .info-control {
          padding: 0px 5px;
          a {
            color: inherit;
          }
        }
      }
    }
  }
`;

const mapStateToProps = state => ({ profile: state.profile, auth: state.auth });

export default connect(
  mapStateToProps,
  { profileFetch }
)(StyledProfileDisplay);
