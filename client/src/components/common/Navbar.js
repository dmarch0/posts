import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";

import style from "../../config/style";
import placeholder from "../../img/placeholder.jpg";

const Navbar = ({ className, auth }) => {
  const loggedInContent = (
    <>
      <div className="nav-block">
        <div className="nav-item">posts</div>
        <div className="nav-item">Feed</div>
      </div>
      <div className="nav-block">
        <div className="nav-item">
          <img src={auth.avatar ? auth.avatar : placeholder} />
        </div>
        <div className="nav-item">Logoout</div>
      </div>
    </>
  );
  const loggedOutContent = "loggedout";
  return (
    <nav className={className}>{auth ? loggedInContent : loggedOutContent}</nav>
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
  img {
    width: 30px;
    height: 30px;
  }
  .nav-item {
    display: inline-block;
    margin: 10px;
  }
`;

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  {}
)(StyledNavbar);
