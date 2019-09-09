const isEmpty = require("./is-empty");
const validator = require("validator");

const validateLoginInput = data => {
  const email = isEmpty(data.email) ? "" : data.email;
  const password = isEmpty(data.password) ? "" : data.password;

  const errors = {};

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

  return errors;
};

module.exports = validateLoginInput;
