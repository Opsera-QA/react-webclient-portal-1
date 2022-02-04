export const objectHelpers = {};

objectHelpers.isObject = (potentialObject) => {
  return potentialObject != null && typeof potentialObject === "object";
};

objectHelpers.parseJson = (json, defaultValue = {}) => {
  try {
    return JSON.parse(json);
  } catch (error) {
    return defaultValue;
  }
};
