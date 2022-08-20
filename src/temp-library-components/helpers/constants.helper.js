import { hasStringValue } from "components/common/helpers/string-helpers";
import { dataParsingHelper } from "components/common/helpers/data/dataParsing.helper";

export const constantsHelper = {};

constantsHelper.isValueValid = (
  constants,
  potentialKeyValue,
) => {
  const parsedConstants = dataParsingHelper.parseObject(constants, undefined);

  if (!parsedConstants) {
    return false;
  }

  if (hasStringValue(potentialKeyValue) !== true) {
    return false;
  }

  return dataParsingHelper.doesObjectContainValue(parsedConstants, potentialKeyValue);
};

constantsHelper.getLabelForValue = (
  constantKeys,
  constantLabels,
  keyValue,
) => {
  const parsedConstantKeys = dataParsingHelper.parseObject(constantKeys, undefined);

  if (!parsedConstantKeys) {
    return "";
  }

  const parsedConstantLabels = dataParsingHelper.parseObject(constantLabels, undefined);

  if (!parsedConstantLabels) {
    return "";
  }

  if (hasStringValue(keyValue) !== true) {
    return "";
  }

  const foundKey = constantsHelper.getKeyForValue(constantKeys, keyValue);

  if (hasStringValue(foundKey) !== true) {
    return "";
  }

  return dataParsingHelper.parseString(constantLabels[foundKey], "");
};

constantsHelper.getKeyForValue = (
  constants,
  potentialKeyValue,
) => {
  return dataParsingHelper.getKeyForObjectValue(constants, potentialKeyValue);
};