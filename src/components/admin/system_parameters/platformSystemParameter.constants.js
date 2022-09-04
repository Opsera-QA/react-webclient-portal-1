import { constantsHelper } from "temp-library-components/helpers/constants/constants.helper";

export const platformSystemParameterConstants = {};

platformSystemParameterConstants.PLATFORM_SYSTEM_PARAMETER_TYPES = {
  ARRAY: "array",
  BOOLEAN: "boolean",
  NUMBER: "number",
  OBJECT: "object",
  STRING: "string",
};

platformSystemParameterConstants.PLATFORM_SYSTEM_PARAMETER_TYPE_LABELS = {
  ARRAY: "Array",
  BOOLEAN: "True/False",
  NUMBER: "Number",
  OBJECT: "JSON",
  STRING: "String",
};

platformSystemParameterConstants.IN_USE_SYSTEM_PARAMETERS = {
  FREE_TRIAL_WHITELISTED_EMAIL_ADDRESSES: "free-trial-whitelisted-email-addresses",
  FREE_TRIAL_DAY_LIMIT: "free-trial-day-limit",
};

platformSystemParameterConstants.isPlatformSystemParameterTypeValid = (type) => {
  return constantsHelper.isValueValid(platformSystemParameterConstants.PLATFORM_SYSTEM_PARAMETER_TYPES, type);
};

platformSystemParameterConstants.getLabelForSystemParameterType = (type) => {
  return constantsHelper.getLabelForValue(
    platformSystemParameterConstants.PLATFORM_SYSTEM_PARAMETER_TYPES,
    platformSystemParameterConstants.PLATFORM_SYSTEM_PARAMETER_TYPE_LABELS,
    type,
  );
};

// TODO: This should be probably be standardized in a helper
platformSystemParameterConstants.getInitialValueForParameterType = (type) => {
  switch (type) {
    case platformSystemParameterConstants.PLATFORM_SYSTEM_PARAMETER_TYPES.ARRAY:
      return [];
    case platformSystemParameterConstants.PLATFORM_SYSTEM_PARAMETER_TYPES.BOOLEAN:
      return false;
    case platformSystemParameterConstants.PLATFORM_SYSTEM_PARAMETER_TYPES.NUMBER:
      return 0;
    case platformSystemParameterConstants.PLATFORM_SYSTEM_PARAMETER_TYPES.OBJECT:
      return {};
    case platformSystemParameterConstants.PLATFORM_SYSTEM_PARAMETER_TYPES.STRING:
      return "";
  }
};

platformSystemParameterConstants.getSelectOptionForSalesforceJenkinsJobType = (type) => {
  if (platformSystemParameterConstants.isPlatformSystemParameterTypeValid(type) !== true) {
    return null;
  }

  return ({
    text: platformSystemParameterConstants.getLabelForSystemParameterType(type),
    value: type,
  });
};

platformSystemParameterConstants.PLATFORM_SYSTEM_PARAMETER_TYPE_SELECT_OPTIONS = [
  platformSystemParameterConstants.getSelectOptionForSalesforceJenkinsJobType(platformSystemParameterConstants.PLATFORM_SYSTEM_PARAMETER_TYPES.ARRAY),
  platformSystemParameterConstants.getSelectOptionForSalesforceJenkinsJobType(platformSystemParameterConstants.PLATFORM_SYSTEM_PARAMETER_TYPES.BOOLEAN),
  platformSystemParameterConstants.getSelectOptionForSalesforceJenkinsJobType(platformSystemParameterConstants.PLATFORM_SYSTEM_PARAMETER_TYPES.NUMBER),
  platformSystemParameterConstants.getSelectOptionForSalesforceJenkinsJobType(platformSystemParameterConstants.PLATFORM_SYSTEM_PARAMETER_TYPES.OBJECT),
  platformSystemParameterConstants.getSelectOptionForSalesforceJenkinsJobType(platformSystemParameterConstants.PLATFORM_SYSTEM_PARAMETER_TYPES.STRING),
];