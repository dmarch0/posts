import Modal from "react-modal";
import styled from "styled-components";
import React from "react";
import { FaTimes } from "react-icons/fa";

import style from "../../config/style";

const StyledModal = ({ children, isOpen, className, toggleOpen }) => {
  return (
    <Modal isOpen={isOpen} className={className}>
      <div className="close-icon">
        <FaTimes onClick={() => toggleOpen(false)} />
      </div>
      {children}
    </Modal>
  );
};

const Styled = styled(StyledModal)`
  margin: 10px auto;
  width: 400px;
  height: 400px;
  background-color: #ffffff;
  outline: none;
  border: 1px solid #ccc;
  font-family: ${style.font};
  padding: 5px;
  position: relative;
  overflow-y: scroll;
  .close-icon {
    position: absolute;
    top: 10px;
    right: 10px;
  }
  a {
    color: inherit;
  }
`;

export default Styled;
