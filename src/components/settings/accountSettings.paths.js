export const accountSettingsPaths = {};

accountSettingsPaths.freeTrialSettings = "/trial/settings";
accountSettingsPaths.accountSettings = "settings";
accountSettingsPaths.insightsSettings = "/settings/insights";
accountSettingsPaths.ldapUserManagement = accountSettingsPaths.accountSettings + "/users";
accountSettingsPaths.ldapUserDetailView = accountSettingsPaths.ldapUserManagement;
accountSettingsPaths.userManagement = accountSettingsPaths.accountSettings + "/user-management";
accountSettingsPaths.logsExportManagement = accountSettingsPaths.accountSettings + "/logs-export-management";
accountSettingsPaths.unsecuredItemReport = accountSettingsPaths.accountSettings + "/unsecured-items";
accountSettingsPaths.activeUserDetailView = accountSettingsPaths.userManagement;
accountSettingsPaths.pendingUserDetailView = accountSettingsPaths.userManagement;
accountSettingsPaths.ldapGroupManagement = accountSettingsPaths.accountSettings + "/groups";
accountSettingsPaths.ldapGroupDetailView = accountSettingsPaths.ldapGroupManagement;
accountSettingsPaths.ldapSiteRoleManagement = accountSettingsPaths.accountSettings + "/site-roles";
accountSettingsPaths.ldapSiteRoleDetailView = accountSettingsPaths.ldapSiteRoleManagement;
accountSettingsPaths.ldapDepartmentManagement = accountSettingsPaths.accountSettings + "/departments";
accountSettingsPaths.ldapDepartmentDetailView = accountSettingsPaths.ldapDepartmentManagement;
accountSettingsPaths.tagManagement = accountSettingsPaths.accountSettings + "/tags";
accountSettingsPaths.deleteTools = accountSettingsPaths.accountSettings + "/delete/";
accountSettingsPaths.tagDetailView = accountSettingsPaths.tagManagement + "/details/";
accountSettingsPaths.organizationManagement = accountSettingsPaths.accountSettings + "/organizations";
accountSettingsPaths.organizationDetailView = accountSettingsPaths.organizationManagement + "/details/";
accountSettingsPaths.customerSystemStatus = accountSettingsPaths.accountSettings + "/customer-system-status";
accountSettingsPaths.analyticsProfile = accountSettingsPaths.accountSettings + "/analytics-profile";
accountSettingsPaths.analyticsDataEntryManagement = accountSettingsPaths.accountSettings + "/analytics-data-entries";
accountSettingsPaths.analyticsDataEntryDetailView = accountSettingsPaths.analyticsDataEntryManagement + "/analytics-data-entries/details/";
accountSettingsPaths.dataMappingManagement = accountSettingsPaths.accountSettings + "/data_mapping";
accountSettingsPaths.projectTaggingDetailView = accountSettingsPaths.dataMappingManagement + "/projects/details/";
accountSettingsPaths.pipelineDataMappingDetailView = accountSettingsPaths.dataMappingManagement + "/pipeline/details/";
accountSettingsPaths.userTaggingDetailView = accountSettingsPaths.dataMappingManagement + "/users/details/";

accountSettingsPaths.freeTrialUserExpirationManagement = accountSettingsPaths.accountSettings + "/trial/user-expiration-management";
accountSettingsPaths.freeTrialUserExtensionScreen = `${accountSettingsPaths.freeTrialUserExpirationManagement}/extension`;
accountSettingsPaths.freeTrialUserRevocationScreen = `${accountSettingsPaths.freeTrialUserExpirationManagement}/revocation`;
accountSettingsPaths.freeTrialUserReinstatementScreen = `${accountSettingsPaths.freeTrialUserExpirationManagement}/reinstatement`;

accountSettingsPaths.freeTrialUserActivityReport = `${accountSettingsPaths.accountSettings}/trial/user/activity-report`;
accountSettingsPaths.freeTrialUserExpirationManagement = accountSettingsPaths.accountSettings + "/trial/user-expiration-management";
accountSettingsPaths.ldapSiteRoleManagement = accountSettingsPaths.accountSettings + "/site-roles";
accountSettingsPaths.ldapSiteRoleDetailView = accountSettingsPaths.ldapSiteRoleManagement;

accountSettingsPaths.policyManagement = `${accountSettingsPaths.accountSettings}/organization-settings/policies`;
accountSettingsPaths.policyDetailView = accountSettingsPaths.policyManagement;