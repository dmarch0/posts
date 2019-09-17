import React from "react";
import { Field } from "redux-form";
import styled from "styled-components";

const InputField = ({ className, name, type, label, placeholder, desc }) => {
  return (
    <div className={className}>
      <label>{label}</label>
      <Field
        name={name}
        component="input"
        type={type ? type : "text"}
        placeholder={placeholder}
      />
      {desc ? <div className="desc">{desc}</div> : null}
    </div>
  );
};

const StyledFieldInput = styled(InputField)`
  label {
    display: ${props => (props.inline ? "inline-block" : "block")};
    padding-bottom: 10px;
    padding-top: 10px;
  }

  input {
    height: 2rem;
    border-radius: 5px;
    border: 1px solid #ccc;
    padding: 5px;
    box-sizing: border-box;
    display: ${props => (props.inline ? "inline-block" : "block")};
    &:focus {
      outline: none;
    }
  }
  .desc {
    font-style: italic;
  }
`;

export default StyledFieldInput;
