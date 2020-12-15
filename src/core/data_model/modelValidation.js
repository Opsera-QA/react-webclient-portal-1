import {isAlphaNumeric, isDomain, isOpseraPassword, isWebsite, matchesRegex, validateEmail} from "../../utils/helpers";

export const validateData = (data) => {
  let errors = [];

  for (const field of data.getFields()) {
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
  return fieldValidation(data.getData(field.id), data, field);
}

export const fieldValidation = (value, data, field) => {
  let errorMessages = [];

  if (field.minLength != null) {
    if (!minLengthValidator(value, field.minLength))
    {
      errorMessages.push(field.label + "'s value has to be at least " + field.minLength + " characters long.");
    }
  }

  if (field.maxLength != null) {
    if (!maxLengthValidator(value, field.maxLength))
    {
      errorMessages.push(field.label + "'s value has to be "+ field.maxLength +" characters or fewer.");
    }
  }

  if (field.isRequired === true) {
    if (!requiredValidator(value))
    {
      errorMessages.push(field.label + " is required.");
    }
  }

  if (field.isEmail === true) {
    if (!validateEmail(value))
    {
      errorMessages.push("The email address given is not valid.");
    }
  }

  if (field.isAlphaNumeric === true && !isAlphaNumeric(value))
  {
    errorMessages.push("No special characters are allowed.");
  }

  if (field.isDomain === true && !isDomain(value))
  {
    errorMessages.push("Domains must begin and end with an alphanumeric character.");
  }

  if (field.isWebsite === true && !isWebsite(value))
  {
    errorMessages.push("This must be a full website path.");
  }

  if (field.isOpseraPassword === true && !isOpseraPassword(value))
  {
    errorMessages.push("Password requirements: at least 8 characters, a lowercase letter, an uppercase letter, a number, a symbol");
  }

  if (field.matchField != null && value !== "" && data[field.matchField] !== "" && value !== data[field.matchField]) {
    errorMessages.push(`${data.getLabel(field.id)} and ${data.getLabel(field.matchField)} must match.`);
  }

  if (field.regexValidator != null && !matchesRegex(field.regexValidator, value))
  {
    errorMessages.push("Does not meet field requirements.");
  }

  if (field.maxItems != null && value.length > field.maxItems)
  {
    errorMessages.push(`You have selected ${value.length} values, but the maximum allowed is ${field.maxItems}`);
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
