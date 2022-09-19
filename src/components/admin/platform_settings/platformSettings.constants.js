import constantsHelper from "@opsera/definitions/constants/constants.helper";

export const platformSettingsConstants = {};

platformSettingsConstants.PLATFORM_SYSTEM_PARAMETER_TYPES = {
  ARRAY: "array",
  BOOLEAN: "boolean",
  NUMBER: "number",
  USER_EMAIL_ADDRESSES: "user_emails",
  OBJECT: "object",
  STRING: "string",
};

platformSettingsConstants.PLATFORM_SYSTEM_PARAMETER_TYPE_LABELS = {
  ARRAY: "Array",
  BOOLEAN: "True/False",
  NUMBER: "Number",
  USER_EMAIL_ADDRESSES: "User Email Addresses",
  OBJECT: "JSON",
  STRING: "String",
};

platformSettingsConstants.isPlatformSystemParameterTypeValid = (type) => {
  return constantsHelper.isValueValid(platformSettingsConstants.PLATFORM_SYSTEM_PARAMETER_TYPES, type);
};

platformSettingsConstants.getLabelForSystemParameterType = (type) => {
  return constantsHelper.getLabelForValue(
    platformSettingsConstants.PLATFORM_SYSTEM_PARAMETER_TYPES,
    platformSettingsConstants.PLATFORM_SYSTEM_PARAMETER_TYPE_LABELS,
    type,
  );
};

// TODO: This should be probably be standardized in a helper
platformSettingsConstants.getInitialValueForParameterType = (type) => {
  switch (type) {
    case platformSettingsConstants.PLATFORM_SYSTEM_PARAMETER_TYPES.USER_EMAIL_ADDRESSES:
    case platformSettingsConstants.PLATFORM_SYSTEM_PARAMETER_TYPES.ARRAY:
      return [];
    case platformSettingsConstants.PLATFORM_SYSTEM_PARAMETER_TYPES.BOOLEAN:
      return false;
    case platformSettingsConstants.PLATFORM_SYSTEM_PARAMETER_TYPES.NUMBER:
      return 0;
    case platformSettingsConstants.PLATFORM_SYSTEM_PARAMETER_TYPES.OBJECT:
      return {};
    case platformSettingsConstants.PLATFORM_SYSTEM_PARAMETER_TYPES.STRING:
      return "";
  }
};

platformSettingsConstants.getSelectOptionForSystemParameterType = (type) => {
  if (platformSettingsConstants.isPlatformSystemParameterTypeValid(type) !== true) {
    return null;
  }

  return ({
    text: platformSettingsConstants.getLabelForSystemParameterType(type),
    value: type,
  });
};

platformSettingsConstants.PLATFORM_SYSTEM_PARAMETER_TYPE_SELECT_OPTIONS = [
  platformSettingsConstants.getSelectOptionForSystemParameterType(platformSettingsConstants.PLATFORM_SYSTEM_PARAMETER_TYPES.ARRAY),
  platformSettingsConstants.getSelectOptionForSystemParameterType(platformSettingsConstants.PLATFORM_SYSTEM_PARAMETER_TYPES.BOOLEAN),
  platformSettingsConstants.getSelectOptionForSystemParameterType(platformSettingsConstants.PLATFORM_SYSTEM_PARAMETER_TYPES.NUMBER),
  platformSettingsConstants.getSelectOptionForSystemParameterType(platformSettingsConstants.PLATFORM_SYSTEM_PARAMETER_TYPES.OBJECT),
  platformSettingsConstants.getSelectOptionForSystemParameterType(platformSettingsConstants.PLATFORM_SYSTEM_PARAMETER_TYPES.STRING),
  platformSettingsConstants.getSelectOptionForSystemParameterType(platformSettingsConstants.PLATFORM_SYSTEM_PARAMETER_TYPES.USER_EMAIL_ADDRESSES),
];


platformSettingsConstants.IN_USE_SYSTEM_PARAMETERS = {
  FREE_TRIAL_WHITELISTED_EMAIL_ADDRESSES: "free-trial-whitelisted-email-addresses",
  FREE_TRIAL_DAY_LIMIT: "free-trial-day-limit",
};

platformSettingsConstants.IN_USE_SYSTEM_PARAMETER_LABELS = {
  FREE_TRIAL_WHITELISTED_EMAIL_ADDRESSES: "Free Trial Whitelisted Email Addresses",
  FREE_TRIAL_DAY_LIMIT: "Free Trial Day Limit",
};

platformSettingsConstants.isPlatformSystemParameterNameInUse = (name) => {
  return constantsHelper.isValueValid(platformSettingsConstants.IN_USE_SYSTEM_PARAMETERS, name);
};

platformSettingsConstants.getLabelForInUseSystemParameterName = (type) => {
  return constantsHelper.getLabelForValue(
    platformSettingsConstants.IN_USE_SYSTEM_PARAMETERS,
    platformSettingsConstants.IN_USE_SYSTEM_PARAMETER_LABELS,
    type,
  );
};


platformSettingsConstants.getSelectOptionForInUseSystemParameterName = (name) => {
  if (platformSettingsConstants.isPlatformSystemParameterNameInUse(name) !== true) {
    return null;
  }

  return ({
    text: platformSettingsConstants.getLabelForInUseSystemParameterName(name),
    value: name,
  });
};

platformSettingsConstants.IN_USE_PLATFORM_SYSTEM_PARAMETER_SELECT_OPTIONS = [
  platformSettingsConstants.getSelectOptionForInUseSystemParameterName(platformSettingsConstants.IN_USE_SYSTEM_PARAMETERS.FREE_TRIAL_WHITELISTED_EMAIL_ADDRESSES),
  platformSettingsConstants.getSelectOptionForInUseSystemParameterName(platformSettingsConstants.IN_USE_SYSTEM_PARAMETERS.FREE_TRIAL_DAY_LIMIT),
];