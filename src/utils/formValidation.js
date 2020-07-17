import { isAlphaNumeric, validateEmail } from "utils/helpers";

const validate = (value, field) => {
  let isValid = true;
  let errorMessage = "";
  for (let rule in field.rules) {
    switch (rule) {
    case "minLength":
      isValid = isValid && minLengthValidator(value, field.rules[rule]); 
      errorMessage = "The value has to be at least "+ field.rules[rule] +" characters long.";
      break;
    case "maxLength": 
      isValid = isValid && maxLengthValidator(value, field.rules[rule]); 
      errorMessage = "The value has to be "+ field.rules[rule] +" characters or fewer.";
      break;
    case "isRequired": 
      isValid = isValid && requiredValidator(value); 
      errorMessage = "This field is required.";
      break;
    case "isEmail":
      isValid = isValid && validateEmail(value); 
      errorMessage = "The email address given is not valid.";
      break;
    case "isAlphaNumeric": 
      isValid = isValid && isAlphaNumeric(value); 
      errorMessage = "No special characters are allowed.";
      break;      
    default: 
      isValid = true;
    }
  }
  return { isValid, errorMessage };
};

const minLengthValidator = (value, minLength) => {
  if (value.length > 0) {
    return value.length >= minLength;
  } else {
    return true; //if no value is passed, then this shoudn't validate
  }
  
};

const maxLengthValidator = (value, maxLength) => {
  if (value.length > 0) {
    return value.length <= maxLength;
  } else {
    return true; //if no value is passed, then this shoudn't validate
  }
  
};

const requiredValidator = value => {
  return value.trim() !== "";	
};

export default validate;