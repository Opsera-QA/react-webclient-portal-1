import { hasStringValue } from "components/common/helpers/string-helpers";

export const filterModelHelper = {};

filterModelHelper.calculateQueryParameterString = (filterModel) => {
  if (filterModel == null || filterModel?.calculateQueryParameterString == null) {
    return "";
  }

  const queryParameterString = filterModel?.calculateQueryParameterString();

  return hasStringValue(queryParameterString) === true ? queryParameterString : "";
};