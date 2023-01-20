export const accountSettingsPaths = {};

accountSettingsPaths.accountSettings = "settings";
accountSettingsPaths.ldapSiteRoleManagement = accountSettingsPaths.accountSettings + "/site-roles";
accountSettingsPaths.ldapSiteRoleDetailView = accountSettingsPaths.ldapSiteRoleManagement;

accountSettingsPaths.policyManagement = `${accountSettingsPaths.accountSettings}/organization-settings/policies`;
accountSettingsPaths.policyDetailView = accountSettingsPaths.policyManagement;