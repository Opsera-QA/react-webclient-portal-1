export const numberHelpers = {};

numberHelpers.hasNumberValue = (potentialNumber) => {
  return !isNaN(potentialNumber);
};

numberHelpers.parseNumber = (potentialNumber) => {
  if (numberHelpers.hasNumberValue(potentialNumber) === true) {
    return Number(potentialNumber);
  }
};

numberHelpers.isNumberBetweenInclusive = (lowerEnd, upperEnd, number) => {
  const parsedLowerEnd = numberHelpers.parseNumber(lowerEnd);
  const parsedUpperEnd = numberHelpers.parseNumber(upperEnd);
  const parsedNumber = numberHelpers.parseNumber(number);

  if (parsedLowerEnd == null || parsedUpperEnd == null || parsedNumber == null) {
    return false;
  }

  // TODO: implement
  // if (upperEnd < lowerEnd) {
  //   const temp = lowerEnd;
  //   lowerEnd = upperEnd;
  //   upperEnd = temp;
  // }

  return (parsedLowerEnd <= parsedNumber && parsedUpperEnd >= parsedNumber);
};

numberHelpers.isNumberEqual = (comparisonValue, number) => {
  const parsedComparisonValue = numberHelpers.parseNumber(comparisonValue);
  const parsedNumber = numberHelpers.parseNumber(number);

  if (parsedComparisonValue == null || parsedNumber == null) {
    return false;
  }

  return (parsedComparisonValue === parsedNumber);
};

numberHelpers.isNumberGreaterThan = (comparisonValue, number) => {
  const parsedComparisonValue = numberHelpers.parseNumber(comparisonValue);
  const parsedNumber = numberHelpers.parseNumber(number);

  if (parsedComparisonValue == null || parsedNumber == null) {
    return false;
  }

  return (parsedNumber > comparisonValue);
};

numberHelpers.isNumberGreaterThanOrEqualTo = (comparisonValue, number) => {
  const parsedComparisonValue = numberHelpers.parseNumber(comparisonValue);
  const parsedNumber = numberHelpers.parseNumber(number);

  if (parsedComparisonValue == null || parsedNumber == null) {
    return false;
  }

  return (parsedNumber >= parsedComparisonValue);
};

numberHelpers.isNumberLessThan = (comparisonValue, number) => {
  const parsedComparisonValue = numberHelpers.parseNumber(comparisonValue);
  const parsedNumber = numberHelpers.parseNumber(number);

  if (parsedComparisonValue == null || parsedNumber == null) {
    return false;
  }

  return (parsedNumber < parsedComparisonValue);
};

numberHelpers.isNumberLessThanOrEqualTo = (comparisonValue, number) => {
  const parsedComparisonValue = numberHelpers.parseNumber(comparisonValue);
  const parsedNumber = numberHelpers.parseNumber(number);

  if (parsedComparisonValue == null || parsedNumber == null) {
    return false;
  }

  return (parsedNumber <= parsedComparisonValue);
};

numberHelpers.doNumberRangesOverlap = (start1, end1, start2, end2) => {
  const parsedStart1 = numberHelpers.parseNumber(start1);
  const parsedEnd1 = numberHelpers.parseNumber(end1);
  const parsedStart2 = numberHelpers.parseNumber(start2);
  const parsedEnd2 = numberHelpers.parseNumber(end2);

  if (
    numberHelpers.hasNumberValue(parsedStart2) !== true
    || numberHelpers.hasNumberValue(parsedEnd1) !== true
    || numberHelpers.hasNumberValue(parsedStart1) !== true
    || numberHelpers.hasNumberValue(parsedEnd2) !== true
  ) {
    return false;
  }

  return (parsedEnd1 >= parsedStart2 && parsedEnd2 >= parsedStart1);
};