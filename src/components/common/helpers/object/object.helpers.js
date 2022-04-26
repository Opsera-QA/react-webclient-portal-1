import {hasStringValue} from "components/common/helpers/string-helpers";

export const objectHelpers = {};

objectHelpers.isObject = (potentialObject) => {
  return potentialObject != null && typeof potentialObject === "object";
};

objectHelpers.parseJson = (json, defaultValue = {}) => {
  try {
    if (typeof json === "object") {
      return json;
    }

    return JSON.parse(json);
  } catch (error) {
    return defaultValue;
  }
};

// TODO: Is there a better name for this? Or should this be elsewhere?
objectHelpers.parseObjectIntoFieldNameValueArray = (object, keyFieldName = "fieldName", valueFieldName = "value", defaultValue = []) => {
  const array = [];

  if (object == null || typeof object !== "object" || Object.keys(object).length === 0) {
    return defaultValue;
  }

  const keys = Object.keys(object);

  keys.forEach((key) => {
    const fieldName = key;
    const value = object[key];

    array.push({
      [keyFieldName]: fieldName,
      [valueFieldName]: value,
    });
  });

  return array;
};

objectHelpers.parseFieldNameValueArrayIntoObject = (array, keyFieldName = "fieldName", valueFieldName = "value", defaultValue = {}) => {
  const object = {};

  if (array == null || !Array.isArray(array) || array.length === 0) {
    return defaultValue;
  }

  array.forEach((entry) => {
    const fieldName = entry[keyFieldName];
    const value = entry[valueFieldName];

    if (hasStringValue(fieldName) !== true) {
      return;
    }

    object[fieldName] = value;
  });

  return object;
};