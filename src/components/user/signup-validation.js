import { isAlphaNumeric, validateEmail } from "utils/helpers";

const validate = (value, field) => {
  let isValid = true;
  let errorMessage = "";
  for (let rule in field.rules) {
    switch (rule) {
    case "minLength": 
      isValid = isValid && minLengthValidator(value, field.rules[rule]); 
      errorMessage = "value has to be more than "+ field.rules[rule] +" chars";
      break;
    case "isRequired": 
      isValid = isValid && requiredValidator(value); 
      errorMessage = "this field is required";
      break;
    case "isEmail": 
      isValid = isValid && validateEmail(value); 
      errorMessage = field.label + "Email is not valid";
      break;
    case "isAlphaNumeric": 
      isValid = isValid && isAlphaNumeric(value); 
      errorMessage = "no special chars are allowed";
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

const requiredValidator = value => {
  return value.trim() !== "";	
};

export default validate;