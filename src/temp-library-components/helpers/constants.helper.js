import { hasStringValue } from "components/common/helpers/string-helpers";
import { dataParsingHelper } from "components/common/helpers/data/dataParsing.helper";

export const constantsHelper = {};

constantsHelper.isValueValid = (
  constants,
  potentialValue,
) => {
  const parsedConstants = dataParsingHelper.parseObject(constants, undefined);

  if (!parsedConstants) {
    return false;
  }

  if (hasStringValue(potentialValue) !== true) {
    return false;
  }

  return dataParsingHelper.doesObjectContainValue(parsedConstants, potentialValue);
};