import React from "react";
import Moment from "react-moment";
import styled from "styled-components";

const CommentItem = props => {
  const { name, text, date } = props.comment;
  const { className } = props;
  const dateParsed = new Date(parseInt(date));

  return (
    <div className={className}>
      <h1>{name}</h1>
      <span>
        <Moment format="dd/mm/YYYY hh:mm">{dateParsed}</Moment>
      </span>
      <p>{text}</p>
    </div>
  );
};

const StyledCommentItem = styled(CommentItem)`
  box-shadow: -5px 5px 5px 0px rgba(179, 179, 179, 1);
  width: 40%;
  margin: 10px 0;
  padding: 5px;

  h1 {
    margin: 5px;
    display: inline-block;
  }
  span {
    font-style: italic;
    color: #cccccc;
  }
  p {
    margin: 0;
  }
`;

export default StyledCommentItem;
