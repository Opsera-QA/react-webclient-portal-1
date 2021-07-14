import {isAlphaNumeric, isDomain, isOpseraPassword, isWebsite, matchesRegex, validateEmail, hasSpaces} from "utils/helpers";

// TODO: We need to rework this
export const validateData = (data) => {
  let errors = [];

  for (const field of data.getFields()) {
    let fieldErrors = validateField(data, field);

    if (Array.isArray(fieldErrors) && fieldErrors.length > 0) {
      errors.push(...fieldErrors);
    }
  }
  if (errors.length < 1) {
    return true;
  }
  return errors;
};

export const validateField = (data, field) => {
  return fieldValidation(data.getData(field.id), data, field);
};

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
    if (!requiredValidator(value) && value !== 0)
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

  if (field.spacesAllowed === false) {
    if (hasSpaces(value)) {
      errorMessages.push(field.label + " is not allowed to contain spaces.");
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
    // TODO: Wire up all errors this way to prevent empty, non-required fields from throwing errors on commit
    // Only show error if it's filled out. If it's required the is required check will throw that error, so this is unnecessary for now.
    if (value !== "") {
      errorMessages.push("This must be a full website path.");
    }
  }

  if (field.isOpseraPassword === true && !isOpseraPassword(value))
  {
    errorMessages.push("Password Requirements: At Least 8 Characters, 1 Lowercase Letter, 1 Uppercase Letter, 1 Number (0-9), and 1 Symbol (!@#$%^&*)");
  }

  if (field.matchField != null && value !== "" && data[field.matchField] !== "" && value !== data[field.matchField]) {
    errorMessages.push(`${data.getLabel(field.id)} and ${data.getLabel(field.matchField)} must match.`);
  }

  if (field.regexValidator != null && value !== "" && !matchesRegex(field.regexValidator, value))
  {
    errorMessages.push("Does not meet field requirements.");
  }

  if (field.regexValidatorV2 != null && value !== "" && !matchesRegex(field.regexValidatorV2, value))
  {
    errorMessages.push(field.regexErrorText);
  }

  if (field.maxItems != null && value.length > field.maxItems)
  {
    errorMessages.push(`You have selected ${value.length} values, but the maximum allowed is ${field.maxItems}`);
  }

  if (field.mustBeAfter != null && value <= data.getData(field.mustBeAfter))
  {
    errorMessages.push(`${data.getLabel(field.id)} must be set to a date after ${data.getLabel(field.mustBeAfter)}.`);
  }

  if (field.mustBeBefore != null && value >= data.getData(field.mustBeBefore))
  {
    errorMessages.push(`${data.getLabel(field.id)} must be set to a date before ${data.getLabel(field.mustBeBefore)}.`);
  }

  if (errorMessages.length === 0) {
    return undefined;
  }

  return errorMessages;
};


const minLengthValidator = (value, minLength) => {
  if (value && value.length > 0) {
    return value.length >= minLength;
  } else {
    return false;
  }

};

const maxLengthValidator = (value, maxLength) => {
  if (value && value.length > 0) {
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
