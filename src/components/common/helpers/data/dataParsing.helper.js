import _ from "lodash";
import { hasStringValue } from "components/common/helpers/string-helpers";

// TODO: Clean up and figure out how we want to use this on React end
export const dataParsingHelper = {};

dataParsingHelper.parseArray = (array, defaultValue = false) => {
  return Array.isArray(array) ? [...array] : defaultValue;
};

dataParsingHelper.parseString = (string, defaultValue = false) => {
  return typeof string === "string" ? string.trim() : defaultValue;
};

dataParsingHelper.parseAndLowercaseString = (string, defaultValue) => {
  return typeof string === "string" ? string.trim().toLowerCase() : defaultValue;
};

dataParsingHelper.parseBoolean = (string, defaultValue = false) => {
  return string === true ? true : dataParsingHelper.parseAndLowercaseString(string) === "true" ? true : defaultValue;
};

dataParsingHelper.parseObject = (object, defaultValue = {}) => {
  return object != null && typeof object === "object" && Object.keys(object).length > 0 ? object : defaultValue;
};

dataParsingHelper.parseDate = (date, defaultValue) => {
  if (!date) {
    return defaultValue;
  }

  try {
    return new Date(date);
  } catch (error) {
    return defaultValue;
  }
};

dataParsingHelper.parseInteger = (integer, defaultValue) => {
  if (!integer && integer !== 0) {
    return defaultValue;
  }

  try {
    return parseInt(integer);
  } catch (error) {
    return defaultValue;
  }
};

dataParsingHelper.parseJson = (json) => {
  try {
    return JSON.parse(json);
  } catch (error) {
    return json;
  }
};

// TODO: Wire up constants
dataParsingHelper.parseObjectValue = (type, value) => {
  switch (type) {
    case "string":
      return dataParsingHelper.parseString(value, "");
    case "array":
      return dataParsingHelper.parseArray(value, []);
    case "date":
      return dataParsingHelper.parseDate(value, undefined);
    case "boolean":
      return dataParsingHelper.parseBoolean(value, false);
  }
};

// TODO: Should we move these to a lodash helper?
dataParsingHelper.cloneDeep = (objectToClone) => {
  return _.cloneDeep(objectToClone);
};

dataParsingHelper.isEmpty = (objectToClone) => {
  return _.isEmpty(objectToClone);
};

dataParsingHelper.safeObjectPropertyParser = (object, propertyName, defaultValue = undefined) => {
  return _.get(object, propertyName, defaultValue);
};

dataParsingHelper.parseArrayIntoString = (array, defaultValue = "") => {
  if (!Array.isArray(array) || array.length === 0) {
    return defaultValue;
  }

  let unpackedString = "";

  array.forEach((line) => {
    if (hasStringValue(line, false) === true) {
      unpackedString += `${line}\n`;
    }
  });

  return unpackedString;
};
