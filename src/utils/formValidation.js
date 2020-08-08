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

export const fieldValidation = (value, field) => {
  let isValid = true;
  let errorMessages = [];

  if (field.minLength != null) {
    isValid = isValid && minLengthValidator(value, field.minLength);
    errorMessages.push("The value has to be at least " + field.minLength + " characters long.");
  }

  if (field.maxLength != null) {
    isValid = isValid && maxLengthValidator(value, field.maxLength);
    errorMessages.push("The value has to be "+ field.maxLength +" characters or fewer.");
  }

  if (field.isRequired != null) {
    isValid = isValid && requiredValidator(value);
    errorMessages.push("This field is required.");
  }

  if (field.isEmail != null) {
    isValid = isValid && validateEmail(value);
    errorMessages.push("The email address given is not valid.");
  }

  // TODO: Pass to function that deals with multiple formats
  if (field.format != null) {
    isValid = isValid && isAlphaNumeric(value);
    errorMessages.push("No special characters are allowed.");
  }
  return { fieldIsValid: isValid, errorMessages: errorMessages };
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