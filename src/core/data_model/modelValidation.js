import {isAlphaNumeric, validateEmail} from "../../utils/helpers";

export const validateData = (data, fields) => {
  let errors = [];

  for (const field of fields) {
    let fieldErrors = validateField(data, field);

    if (fieldErrors) {
      errors.push(fieldErrors);
    }
  }
  if (errors.length < 1) {
    return true;
  }
  return errors;
}

export const validateField = (data, field) => {
  return fieldValidation(data[field.id], field);
}

export const fieldValidation = (value, field) => {
  let errorMessages = [];

  if (field.minLength != null) {
    if (!minLengthValidator(value, field.minLength))
    {
      errorMessages.push("The value has to be at least " + field.minLength + " characters long.");
    }
  }

  if (field.maxLength != null) {
    if (!maxLengthValidator(value, field.maxLength))
    {
      errorMessages.push("The value has to be "+ field.maxLength +" characters or fewer.");
    }
  }

  if (field.isRequired != null) {
    if (!requiredValidator(value))
    {
      errorMessages.push("This field is required.");
    }
  }

  if (field.isEmail != null) {
    if (!validateEmail(value))
    {
      errorMessages.push("The email address given is not valid.");
    }
  }

  // TODO: Pass to function that deals with multiple formats
  if (field.format != null) {

    if (!isAlphaNumeric(value))
    {
      errorMessages.push("No special characters are allowed.");
    }
  }

  if (errorMessages.length === 0) {
    return undefined;
  }

  return errorMessages;
};


const minLengthValidator = (value, minLength) => {
  if (value.length > 0) {
    return value.length >= minLength;
  } else {
    return false;
  }

};

const maxLengthValidator = (value, maxLength) => {
  if (value.length > 0) {
    return value.length <= maxLength;
  } else {
    return true;
  }

};

// TODO: THis probably doesn't work with boolean values,
//  however boolean values by design should always have a value
const requiredValidator = value => {
  return value != null && !!value;
};
