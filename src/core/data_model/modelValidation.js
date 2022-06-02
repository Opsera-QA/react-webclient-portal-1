import {isAlphaNumeric, isDomain, isOpseraPassword, isWebsite, matchesRegex, validateEmail, hasSpaces} from "utils/helpers";
import regexDefinitions from "utils/regexDefinitions";
import {hasStringValue} from "components/common/helpers/string-helpers";

// TODO: We need to rework this
export const validateData = (data) => {
  const errors = [];

  for (const field of data.getFields()) {
    let fieldErrors = validateField(data, field);

    if (Array.isArray(fieldErrors) && fieldErrors.length > 0) {
      errors.push(...fieldErrors);
    }
  }

  if (errors.length === 0) {
    return true;
  }

  return errors;
};

export const validatePotentialValue = (potentialValue, data, field) => {
  if (typeof field !== "object") {
    return "Invalid Field Given";
  }

  return fieldValidation(potentialValue, data, field);
};

export const validateField = (data, field) => {
  return fieldValidation(data.getData(field.id), data, field);
};

export const fieldValidation = (value, model, field) => {
  const errorMessages = [];

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

  // TODO: Still working on this so it may change
  if (field.isRequiredFunction && field.isRequiredFunction(model) === true) {
    if (
           value == null
        || (typeof value === "string" && value.length === 0)
        || (Array.isArray(value) && value.length === 0)
        || value === {}
      ) {
      errorMessages.push(field.label + " is required.");
    }
  }

  if (field.getFieldErrorsFunction) {
    const fieldErrors = field?.getFieldErrorsFunction(model);
    if (Array.isArray(fieldErrors) && fieldErrors?.length > 0) {
      const firstError = fieldErrors[0];

      if (hasStringValue(firstError) === true) {
        errorMessages.push(`${field.label} is invalid: ${firstError}`);
      }
    }
  }

  if (field.isEmail === true) {
    if (!validateEmail(value))
    {
      errorMessages.push(`The email address ${value} is not valid.`);
    }
  }

  if (field.isEmailArray === true) {
    if (Array.isArray(value) && value?.length > 0) {
      value?.forEach((potentialEmail) => {
        if (validateEmail(potentialEmail) !== true) {
          errorMessages.push(`The email address ${potentialEmail} is not valid.`);
        }
      });
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

  if (
    field.matchField != null &&
    value !== "" &&
    hasStringValue(model?.getData(field.matchField)) === true &&
    value !== model?.getData(field.matchField)
  ) {
    errorMessages.push(
      `${model.getLabel(field.id)} and ${model.getLabel(field.matchField)} must match.`,
    );
  }

  if (field.regexValidator != null && value !== "" && !matchesRegex(field.regexValidator, value))
  {
    errorMessages.push("Does not meet field requirements.");
  }

  if ((field?.isVaultField !== true || hasStringValue(value) === true) && field.regexDefinitionName != null && hasStringValue(value)) {
    // TODO: Make regex definition helpers
    const definitionName = field.regexDefinitionName;
    const regexDefinition = regexDefinitions[definitionName];
    const regex = regexDefinition?.regex;
    const errorFormText = regexDefinition?.errorFormText;
    const isRequiredFunction = regexDefinition?.isRequiredFunction;

    if (regexDefinition == null) {
      console.error(`Regex Definition [${field.regexDefinitionName}] not found!`);
    }

    if (isRequiredFunction == null || isRequiredFunction(model) === true) {
      if (regex == null) {
        console.error(`No Regex Assigned To Definition [${field.regexDefinitionName}]!`);
      }
      else if (!matchesRegex(regex, value)) {
        if (errorFormText == null) {
          console.error(`No Regex Error Form Text Assigned To Definition [${field.regexDefinitionName}]! Returning default error.`);
          errorMessages.push("Does not meet field requirements.");
        }
        else {
          errorMessages.push(`${field.label} validation error! ${errorFormText}`);
        }
      }
    }
  }

  if (Array.isArray(value) && field?.minItems != null && value?.length < field?.minItems)
  {
    errorMessages.push(`You have selected ${value?.length} values, but the minimum allowed is ${field?.minItems}`);
  }

  if (Array.isArray(value) && field.maxItems != null && value?.length > field.maxItems)
  {
    errorMessages.push(`You have tried to select ${value?.length} values for the ${field?.label} field, but the maximum allowed is ${field?.maxItems}.`);
  }

  const dateValidationErrors = getDateValidationErrors(model, value, field);

  if (Array.isArray(dateValidationErrors) && dateValidationErrors.length > 0) {
    errorMessages.push(...dateValidationErrors);
  }

  if (errorMessages.length === 0) {
    return undefined;
  }

  return errorMessages;
};

const getDateValidationErrors = (model, value, field) => {
  const errorMessages = [];

  if (value == null) {
    return errorMessages;
  }

  const parsedDate = new Date(value);
  
  if (hasStringValue(field.mustBeAfter) === true) {
    const afterFieldValue = model?.getData(field.mustBeAfter);

    if (afterFieldValue != null) {
      const pastDate = new Date(afterFieldValue);

      if (parsedDate <= pastDate) {
        errorMessages.push(`${model.getLabel(field.id)} must be set to a date after ${model.getLabel(field.mustBeAfter)}.`);
      }
    }
  }

  if (hasStringValue(field.mustBeBefore) === true) {
    const futureFieldValue = model?.getData(field.mustBeBefore);

    if (futureFieldValue != null) {
      const futureDate = new Date(futureFieldValue);

      if (parsedDate >= futureDate) {
        errorMessages.push(`${model.getLabel(field.id)} must be set to a date before ${model.getLabel(field.mustBeBefore)}.`);
      }
    }
  }

  if (field.mustBeInThePast === true && parsedDate > new Date()) {
    errorMessages.push(`${model.getLabel(field.id)} must be set to a date before now.`);
  }

  if (field.mustBeInTheFuture === true && parsedDate <= new Date()) {
    errorMessages.push(`${model.getLabel(field.id)} must be set to a date after now.`);
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
const requiredValidator = (value) => {
  return value != null && !!value;
};
