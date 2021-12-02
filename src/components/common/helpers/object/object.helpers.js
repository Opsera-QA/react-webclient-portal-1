export const objectHelpers = {};

objectHelpers.isObject = (potentialObject) => {
  return potentialObject != null && typeof potentialObject === "object";
};