import constantsHelper from "@opsera/definitions/constants/constants.helper";

export const platformSystemParameterConstants = {};

platformSystemParameterConstants.PLATFORM_SYSTEM_PARAMETER_TYPES = {
  ARRAY: "array",
  BOOLEAN: "boolean",
  NUMBER: "number",
  USER_EMAIL_ADDRESSES: "user_emails",
  OBJECT: "object",
  STRING: "string",
};

platformSystemParameterConstants.PLATFORM_SYSTEM_PARAMETER_TYPE_LABELS = {
  ARRAY: "Array",
  BOOLEAN: "True/False",
  NUMBER: "Number",
  USER_EMAIL_ADDRESSES: "User Email Addresses",
  OBJECT: "JSON",
  STRING: "String",
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
    case platformSystemParameterConstants.PLATFORM_SYSTEM_PARAMETER_TYPES.USER_EMAIL_ADDRESSES:
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

platformSystemParameterConstants.getSelectOptionForSystemParameterType = (type) => {
  if (platformSystemParameterConstants.isPlatformSystemParameterTypeValid(type) !== true) {
    return null;
  }

  return ({
    text: platformSystemParameterConstants.getLabelForSystemParameterType(type),
    value: type,
  });
};

platformSystemParameterConstants.PLATFORM_SYSTEM_PARAMETER_TYPE_SELECT_OPTIONS = [
  platformSystemParameterConstants.getSelectOptionForSystemParameterType(platformSystemParameterConstants.PLATFORM_SYSTEM_PARAMETER_TYPES.ARRAY),
  platformSystemParameterConstants.getSelectOptionForSystemParameterType(platformSystemParameterConstants.PLATFORM_SYSTEM_PARAMETER_TYPES.BOOLEAN),
  platformSystemParameterConstants.getSelectOptionForSystemParameterType(platformSystemParameterConstants.PLATFORM_SYSTEM_PARAMETER_TYPES.NUMBER),
  platformSystemParameterConstants.getSelectOptionForSystemParameterType(platformSystemParameterConstants.PLATFORM_SYSTEM_PARAMETER_TYPES.OBJECT),
  platformSystemParameterConstants.getSelectOptionForSystemParameterType(platformSystemParameterConstants.PLATFORM_SYSTEM_PARAMETER_TYPES.STRING),
  platformSystemParameterConstants.getSelectOptionForSystemParameterType(platformSystemParameterConstants.PLATFORM_SYSTEM_PARAMETER_TYPES.USER_EMAIL_ADDRESSES),
];


platformSystemParameterConstants.IN_USE_SYSTEM_PARAMETERS = {
  FREE_TRIAL_WHITELISTED_EMAIL_ADDRESSES: "free-trial-whitelisted-email-addresses",
  FREE_TRIAL_DAY_LIMIT: "free-trial-day-limit",
};

platformSystemParameterConstants.IN_USE_SYSTEM_PARAMETER_LABELS = {
  FREE_TRIAL_WHITELISTED_EMAIL_ADDRESSES: "Free Trial Whitelisted Email Addresses",
  FREE_TRIAL_DAY_LIMIT: "Free Trial Day Limit",
};

platformSystemParameterConstants.isPlatformSystemParameterNameInUse = (name) => {
  return constantsHelper.isValueValid(platformSystemParameterConstants.IN_USE_SYSTEM_PARAMETERS, name);
};

platformSystemParameterConstants.getLabelForInUseSystemParameterName = (type) => {
  return constantsHelper.getLabelForValue(
    platformSystemParameterConstants.IN_USE_SYSTEM_PARAMETERS,
    platformSystemParameterConstants.IN_USE_SYSTEM_PARAMETER_LABELS,
    type,
  );
};


platformSystemParameterConstants.getSelectOptionForInUseSystemParameterName = (name) => {
  if (platformSystemParameterConstants.isPlatformSystemParameterNameInUse(name) !== true) {
    return null;
  }

  return ({
    text: platformSystemParameterConstants.getLabelForInUseSystemParameterName(name),
    value: name,
  });
};

platformSystemParameterConstants.IN_USE_PLATFORM_SYSTEM_PARAMETER_SELECT_OPTIONS = [
  platformSystemParameterConstants.getSelectOptionForInUseSystemParameterName(platformSystemParameterConstants.IN_USE_SYSTEM_PARAMETERS.FREE_TRIAL_WHITELISTED_EMAIL_ADDRESSES),
  platformSystemParameterConstants.getSelectOptionForInUseSystemParameterName(platformSystemParameterConstants.IN_USE_SYSTEM_PARAMETERS.FREE_TRIAL_DAY_LIMIT),
];