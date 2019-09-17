import React from "react";
import styled from "styled-components";
import { Field } from "redux-form";

const TextAreaField = ({
  className,
  name,
  label,
  placeholder,
  desc,
  defaultValue
}) => {
  return (
    <div className={className}>
      <label>{label}</label>
      <Field
        name={name}
        component="textarea"
        placeholder="Your bio"
        type="text"
        maxLength="400"
      />
      {desc ? <div className="desc">{desc}</div> : null}
    </div>
  );
};

const StyledTextAreaField = styled(TextAreaField)`
  label {
    display: ${props => (props.inline ? "inline-block" : "block")};
    padding-bottom: 10px;
    padding-top: 10px;
  }

  textarea {
    display: block;
    resize: none;
    width: 60%;
    height: 10rem;
    &:focus {
      outline: none;
    }
  }
  .desc {
    font-style: italic;
  }
`;

export default StyledTextAreaField;
