const isEmpty = require("./is-empty");
const validator = require("validator");

const validateRegisterInput = data => {
  const name = isEmpty(data.name) ? "" : data.name;
  const email = isEmpty(data.email) ? "" : data.email;
  const password = isEmpty(data.password) ? "" : data.password;
  const password2 = isEmpty(data.password2) ? "" : data.password2;

  const errors = {};

  if (!validator.isLength(name, { min: 2, max: 20 })) {
    errors.name = "Name must be between 2 and 20 characters";
  }
  if (isEmpty(name)) {
    errors.name = "Name is required";
  }
  if (!validator.isEmail(email)) {
    errors.email = "Email incorrect";
  }
  if (isEmpty(email)) {
    errors.email = "Email is required";
  }
  if (!validator.isLength(password, { min: 6, max: 16 })) {
    errors.password = "Password must be between 6 and 16 characters";
  }
  if (isEmpty(password)) {
    errors.password = "Password is required";
  }
  if (!validator.equals(password, password2)) {
    errors.password2 = "Passwords must match";
  }
  if (isEmpty(password2)) {
    errors.password2 = "Confirmation is required";
  }
  return errors;
};

module.exports = validateRegisterInput;
