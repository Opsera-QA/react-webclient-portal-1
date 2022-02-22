// Keep aligned with the Node version until the constants can get moved to an external library
export const accessRuleTypeConstants = {};

accessRuleTypeConstants.ACCESS_RULE_TYPES = {
  ALLOWED_SSO_USER_ORGANIZATIONS: "allowed_sso_user_organization",
};

accessRuleTypeConstants.ACCESS_RULE_TYPE_LABELS = {
  ALLOWED_SSO_USER_ORGANIZATIONS: "Allowed SSO User Organizations",
};

accessRuleTypeConstants.ACCESS_RULE_TYPE_SELECT_OPTIONS = [
  {
    text: accessRuleTypeConstants.ACCESS_RULE_TYPE_LABELS.ALLOWED_SSO_USER_ORGANIZATIONS,
    value: accessRuleTypeConstants.ACCESS_RULE_TYPES.ALLOWED_SSO_USER_ORGANIZATIONS,
  },
];


