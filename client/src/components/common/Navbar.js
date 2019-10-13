import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";

import style from "../../config/style";
import placeholder from "../../img/placeholder.jpg";
import { logout } from "../../actions/authActions";

const Navbar = ({ className, auth, logout, history }) => {
  const loggedInContent = (
    <>
      <div className="nav-block">
        <div className="nav-item">
          <Link to="/posts">posts</Link>
        </div>
        <div className="nav-item">
          <Link to="/feed">feed</Link>
        </div>
      </div>
      <div className="nav-block">
        <div className="nav-item">
          <Link to={`/profile/${auth.userId}`}>
            <img
              src={auth.avatar ? auth.avatar : placeholder}
              alt="user avatar"
            />
          </Link>
        </div>
        <div className="nav-item">
          <a
            href="#"
            onClick={() => {
              logout();
              history.push("/");
            }}
          >
            log out
          </a>
        </div>
      </div>
    </>
  );
  const loggedOutContent = (
    <>
      <div className="nav-block">
        <div className="nav-item">
          <Link to="/posts">posts</Link>
        </div>
      </div>
      <div className="nav-block">
        <div className="nav-item">
          <Link to="/register">sign up</Link>
        </div>
        <div className="nav-item">
          <Link to="/login">log in</Link>
        </div>
      </div>
    </>
  );
  return (
    <nav className={className}>
      {auth.isAuth ? loggedInContent : loggedOutContent}
    </nav>
  );
};

const StyledNavbar = styled(Navbar)`
  height: 60px;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px;
  box-sizing: border-box;
  font-family: ${style.font};
  background-color: #2d3436;
  background-image: linear-gradient(315deg, #2d3436 0%, #000000 74%);
  color: #ffffff;
  .nav-block {
    display: flex;
    flex-direction: row;
    justify-content: center;
  }
  img {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    object-fit: cover;
  }
  .nav-item {
    display: inline-block;
    margin: 10px;
    height: 20px;
  }
  a {
    color: inherit;
  }
`;

const routerConnected = withRouter(StyledNavbar);

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logout }
)(routerConnected);
