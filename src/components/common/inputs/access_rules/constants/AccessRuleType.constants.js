export const accessRuleTypeConstants = {};
// TODO: Extract into separate constants file if reused
accessRuleTypeConstants.ACCESS_RULE_TYPES = {
  SSO_USER_ORGANIZATION: "sso_user_organization",
};

accessRuleTypeConstants.ACCESS_RULE_TYPE_LABELS = {
  SSO_USER_ORGANIZATION: "SSO User Organization",
};

accessRuleTypeConstants.ACCESS_RULE_TYPE_SELECT_OPTIONS = [
  {
    text: accessRuleTypeConstants.ACCESS_RULE_TYPE_LABELS.SSO_USER_ORGANIZATION,
    value: accessRuleTypeConstants.ACCESS_RULE_TYPES.SSO_USER_ORGANIZATION,
  },
];


