import { dataParsingHelper } from "components/common/helpers/data/dataParsing.helper";

export const stringHelper = {};

stringHelper.replaceValueInString = (string, valueToReplace, newValue) => {
  const parsedString = dataParsingHelper.parseString(string, "");
  return parsedString.replaceAll(valueToReplace, newValue);
};

stringHelper.replaceSpacesWithUnderscores = (string) => {
  return stringHelper.replaceValueInString(string, " ", "_");
};