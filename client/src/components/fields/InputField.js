import React from "react";
import { Field } from "redux-form";
import styled from "styled-components";

const InputField = ({ className, name, type, label, placeholder }) => {
  return (
    <div className={className}>
      <label>{label}</label>
      <Field
        name={name}
        component="input"
        type={type ? type : "text"}
        placeholder={placeholder}
      />
    </div>
  );
};

const StyledFieldInput = styled(InputField)`
  label {
  }

  input {
  }
`;

export default StyledFieldInput;
