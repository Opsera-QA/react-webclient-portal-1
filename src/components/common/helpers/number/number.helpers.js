import {hasStringValue} from "components/common/helpers/string-helpers";

export const numberHelpers = {};

numberHelpers.hasNumberValue = (potentialNumber) => {
  return typeof potentialNumber === "number";
};

numberHelpers.parseNumber = (potentialNumber) => {
  if (numberHelpers.hasNumberValue(potentialNumber)) {
    return potentialNumber;
  }

  if (hasStringValue(potentialNumber)) {
    return Number(potentialNumber);
  }
};

numberHelpers.isNumberBetweenInclusive = (lowerEnd, upperEnd, number) => {
  if (typeof lowerEnd !== "number" || typeof upperEnd !== "number" || typeof number !== "number") {
    return false;
  }

  // TODO: implement
  // if (upperEnd < lowerEnd) {
  //   const temp = lowerEnd;
  //   lowerEnd = upperEnd;
  //   upperEnd = temp;
  // }

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

numberHelpers.doNumberRangesOverlap = (start1, end1, start2, end2) => {
  if (
    numberHelpers.hasNumberValue(start1) !== true
    || numberHelpers.hasNumberValue(end1) !== true
    || numberHelpers.hasNumberValue(start2) !== true
    || numberHelpers.hasNumberValue(end2) !== true
  ) {
    return false;
  }

  return (end1 >= start2 && end2 >= start1);
};