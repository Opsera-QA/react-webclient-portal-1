export const numberHelpers = {};

numberHelpers.hasNumberValue = (potentialNumber) => {
  return typeof potentialNumber === "number";
};

numberHelpers.isNumberBetweenInclusive = (lowerEnd, upperEnd, number) => {
  if (typeof lowerEnd !== "number" || typeof upperEnd !== "number" || typeof number !== "number") {
    return false;
  }

  return (lowerEnd <= number && upperEnd >= number);
};

numberHelpers.isNumberEqual = (comparisonValue, number) => {
  if (typeof comparisonValue !== "number" || typeof number !== "number") {
    return false;
  }

  return (comparisonValue === number);
};

numberHelpers.isNumberGreaterThan = (comparisonValue, number) => {
  if (typeof comparisonValue !== "number" || typeof number !== "number") {
    return false;
  }

  return (number > comparisonValue);
};

numberHelpers.isNumberGreaterThanOrEqualTo = (comparisonValue, number) => {
  if (typeof comparisonValue !== "number" || typeof number !== "number") {
    return false;
  }

  return (number >= comparisonValue);
};

numberHelpers.isNumberLessThan = (comparisonValue, number) => {
  if (typeof comparisonValue !== "number" || typeof number !== "number") {
    return false;
  }

  return (number < comparisonValue);
};

numberHelpers.isNumberLessThanOrEqualTo = (comparisonValue, number) => {
  if (typeof comparisonValue !== "number" || typeof number !== "number") {
    return false;
  }

  return (number <= comparisonValue);
};