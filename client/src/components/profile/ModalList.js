import React from "react";
import { Link } from "react-router-dom";

const ModalList = ({ toggleModal, content }) => {
  return (
    <div onClick={() => toggleModal(false)}>
      <ul>
        {content.map(item => (
          <li>
            <Link
              to={`/profile/${item._id}`}
              onClick={() => toggleModal(false)}
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ModalList;
