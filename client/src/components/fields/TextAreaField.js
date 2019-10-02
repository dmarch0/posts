import React from "react";
import styled from "styled-components";
import { Field } from "redux-form";

const TextAreaField = ({
  className,
  name,
  label,
  placeholder,
  desc,
  defaultValue,
  maxLength
}) => {
  return (
    <div className={className}>
      {label ? <label>{label}</label> : null}
      <Field
        name={name}
        component="textarea"
        placeholder={placeholder}
        type="text"
        maxLength={maxLength ? maxLength : "400"}
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
    width: ${props => (props.width ? props.width : "60%")};
    height: ${props => (props.height ? props.height : "10rem")};
    border-radius: 5px;
    &:focus {
      outline: none;
      box-shadow: inset 0 0 5px #000000;
    }
  }
  .desc {
    font-style: italic;
  }
`;

export default StyledTextAreaField;
