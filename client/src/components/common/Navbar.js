import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import style from "../../config/style";
import placeholder from "../../img/placeholder.jpg";
import { logout } from "../../actions/authActions";

const Navbar = ({ className, auth, logout }) => {
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
          <Link to={`/profile/${auth.handle ? auth.handle : auth.userId}`}>
            <img src={auth.avatar ? auth.avatar : placeholder} />
          </Link>
        </div>
        <div className="nav-item">
          <a href="#" onClick={logout}>
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
          <Link to="/login">login</Link>
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

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logout }
)(StyledNavbar);
