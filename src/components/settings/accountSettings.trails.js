import {
  faBuilding,
  faChartNetwork,
  faCogs, faDraftingCompass,
  faHeartbeat,
  faIdBadge, faProjectDiagram,
  faServer, faShield, faSitemap, faTags, faTimes,
  faUser,
  faUserChart, faUserFriends, faUserHardHat, faUserTag
} from "@fortawesome/pro-light-svg-icons";
import {accountSettingsPaths} from "components/settings/accountSettings.paths";
import {siteRoleHelper} from "components/settings/ldap_site_roles/siteRole.helper";
import SiteRoleHelper from "@opsera/know-your-role/roles/helper/site/siteRole.helper";

export const accountSettingsTrails = {};

accountSettingsTrails.accountSettings = {
  parent: undefined,
  name: "accountSettings",
  path: accountSettingsPaths.accountSettings,
  title: "Platform Settings",
  linkText: "Platform Settings",
  icon: faCogs,
  pageDescription: "Manage account settings from this dashboard.",
  allowedRoles: [
    SiteRoleHelper.SITE_ROLES.OPSERA_ADMINISTRATOR,
    SiteRoleHelper.SITE_ROLES.ADMINISTRATOR,
    SiteRoleHelper.SITE_ROLES.POWER_USER,
    SiteRoleHelper.SITE_ROLES.SAAS_USER,
    SiteRoleHelper.SITE_ROLES.SECURITY_MANAGER,
    SiteRoleHelper.SITE_ROLES.AUDITOR,
  ],
};

accountSettingsTrails.insightsSettings = {
  parent: undefined,
  name: "insightsSettings",
  path: accountSettingsPaths.insightsSettings,
  title: "Insights Settings",
  linkText: "Insights Settings",
  icon: faChartNetwork,
  pageDescription: "Manage analytics settings from this dashboard.",
};
accountSettingsTrails.freeTrialSettings = {
  parent: undefined,
  name: "freeTrialSettings",
  path: accountSettingsPaths.accountSettings,
  title: "Free Trial Settings",
  linkText: "Free Trial Settings",
  icon: faCogs
};

// Customer System Status
accountSettingsTrails.customerSystemStatus = {
  parent: "accountSettings",
  name: "customerSystemStatus",
  path: accountSettingsPaths.customerSystemStatus,
  title: "Platform Status",
  linkText: "Platform Status",
  icon: faHeartbeat
};

// Analytics Data Entry Management>
accountSettingsTrails.analyticsDataEntryManagement = {
  parent: "accountSettings",
  name: "analyticsDataEntryManagement",
  path: accountSettingsPaths.analyticsDataEntryManagement,
  title: "Analytics Data Entry Management",
  linkText: "Analytics Data Entry",
  icon: faUserChart,
  pageDescription: "Manage analytics data manually and see it reflected in corresponding dashboard KPIs for specific charts.",
};
accountSettingsTrails.analyticsDataEntryDetailView = {
  parent: "analyticsDataEntryManagement",
  name: "analyticsDataEntryDetailView",
  path: accountSettingsPaths.analyticsDataEntryDetailView,
  title: "Analytics Data Entry Details",
  linkText: "Analytics Data Entry Details",
  icon: faUserChart
};

// LDAP Users Administration
accountSettingsTrails.ldapUserManagement = {
  parent: "accountSettings",
  name: "ldapUserManagement",
  path: accountSettingsPaths.ldapUserManagement,
  title: "User Management",
  linkText: "Users",
  icon: faUser
};
accountSettingsTrails.ldapUserDetailView = {
  parent: "ldapUserManagement",
  name: "ldapUserDetailView",
  path: accountSettingsPaths.ldapUserDetailView,
  title: "User Details",
  linkText: "User Details",
  icon: faUser
};
accountSettingsTrails.ldapUserDetailViewLimited = {
  parent: "accountSettings",
  name: "ldapUserDetailViewLimited",
  path: accountSettingsPaths.ldapUserDetailView,
  title: "My User Details",
  linkText: "My User Details",
  icon: faUser
};

// User Management
accountSettingsTrails.userManagement = {
  parent: "accountSettings",
  name: "userManagement",
  path: accountSettingsPaths.userManagement,
  title: "User Management",
  linkText: "Users",
  icon: faUser,
  pageDescription: `
      Manage existing Users and register new Users for this account. 
      The New User form allows owners to create new User accounts with targeted Group access. 
      Users will receive an invitation email upon completion of the form.
    `,
};
accountSettingsTrails.activeUserDetailView = {
  parent: "userManagement",
  name: "activeUserDetailView",
  path: accountSettingsPaths.activeUserDetailView,
  title: "User Details",
  linkText: "User Details",
  icon: faUser
};
accountSettingsTrails.pendingUserDetailView = {
  parent: "userManagement",
  name: "pendingUserDetailView",
  path: accountSettingsPaths.pendingUserDetailView,
  title: "Pending User Details",
  linkText: "Pending User Details",
  icon: faUserHardHat
};

// LDAP Groups Administration
accountSettingsTrails.ldapGroupManagement = {
  parent: "accountSettings",
  name: "ldapGroupManagement",
  path: accountSettingsPaths.ldapGroupManagement,
  title: "Group Management",
  linkText: "Groups",
  icon: faUserFriends,
  pageDescription: "Manage Groups and their Membership"
};
accountSettingsTrails.ldapGroupDetailView = {
  parent: "ldapGroupManagement",
  name: "ldapGroupDetailView",
  path: accountSettingsPaths.ldapGroupDetailView,
  title: "Group Details",
  linkText: "Group Details",
  icon: faUserFriends
};

// LDAP Departments Administration
accountSettingsTrails.ldapDepartmentManagement = {
  parent: "accountSettings",
  name: "ldapDepartmentManagement",
  path: accountSettingsPaths.ldapDepartmentManagement,
  title: "Departments",
  linkText: "Departments",
  icon: faBuilding,
  pageDescription: "Manage Departments and their Membership."
};
accountSettingsTrails.ldapDepartmentDetailView = {
  parent: "ldapDepartmentManagement",
  name: "ldapDepartmentDetailView",
  path: accountSettingsPaths.ldapDepartmentDetailView,
  title: "Department Details",
  linkText: "Department Details",
  icon: faBuilding
};

// Tag Management
accountSettingsTrails.tagManagement = {
  parent: "accountSettings",
  name: "tagManagement",
  path: accountSettingsPaths.tagManagement,
  title: "Tag Management",
  linkText: "Tags",
  icon: faTags,
  pageDescription: "Manage Tags and view their usage in Tools, Pipelines, and Dashboards.",
};
accountSettingsTrails.tagDetailView = {
  parent: "tagManagement",
  name: "tagDetailView",
  path: accountSettingsPaths.tagDetailView,
  title: "Tag Details",
  linkText: "Tag Details",
  icon: faTags
};

// Audit Logging
accountSettingsTrails.logsExportManagement = {
  parent: "accountSettings",
  name: "logsExportManagement",
  path: accountSettingsPaths.logsExportManagement,
  title: "Logs Export Options",
  linkText: "Logs Export Options",
  icon: faTags,
  pageDescription: "Manage export of pipeline activity audit logs."
};

// Unassigned Rules Items Report
accountSettingsTrails.unsecuredItemReport = {
  parent: "accountSettings",
  name: "unsecuredItemReport",
  path: accountSettingsPaths.unsecuredItemReport,
  title: "Unsecured Items",
  linkText: "Unsecured Items",
  icon: faShield,
  pageDescription: "View items that haven't been assigned access rules",
};

// Organization Management
accountSettingsTrails.organizationManagement = {
  parent: "accountSettings",
  name: "organizationManagement",
  path: accountSettingsPaths.organizationManagement,
  title: "Analytics Data Mapping: Organization Management",
  linkText: "Analytics Data Mapping: Organizations",
  icon: faSitemap,
  pageDescription: "Manage Organization Analytics Data Mappings"
};
accountSettingsTrails.organizationDetailView = {
  parent: "organizationManagement",
  name: "organizationDetailView",
  path: accountSettingsPaths.organizationDetailView,
  title: "Analytics Data Mapping: Organization Details",
  linkText: "Analytics Data Mapping: Organization Details",
  icon: faSitemap
};

// LDAP Site Roles Administration
accountSettingsTrails.ldapSiteRolesManagement = {
  parent: "accountSettings",
  name: "ldapSiteRolesManagement",
  path: accountSettingsPaths.ldapSiteRoleManagement,
  title: "Site Roles Management",
  linkText: "Site Roles",
  icon: faServer,
  pageDescription: `
      Site Roles determine a user’s level of accessibility.
      Manage Site Roles from this dashboard. By default, Opsera offers tiers for Site Roles:
      Administrators for full site wide access, Power Users for elevated configuration of features access and then Users for all standard users to interact with the site.
      If a user is not a member of any one of these roles they will be treated as a read-only user with very limited access.
      Some additional roles can be enabled here (by Administrators) to add more advanced security features.
    `,
};

accountSettingsTrails.ldapSiteRoleDetailView = {
  parent: "ldapSiteRolesManagement",
  name: "ldapSiteRoleDetailView",
  path: accountSettingsPaths.ldapSiteRoleDetailView,
  title: "Site Role Details",
  linkText: "Site Role Details",
  icon: faServer,
};

accountSettingsTrails.ldapAdministratorsSiteRoleDetailView = {
  parent: "ldapSiteRolesManagement",
  name: "ldapAdministratorsSiteRoleDetailView",
  path: accountSettingsPaths.ldapSiteRoleDetailView,
  pathFunction: (userData) => siteRoleHelper.getAdministrationSiteRoleDetailViewLink(userData),
  title: "Administrators",
  linkText: "Administrators",
  pageDescription: siteRoleHelper.getSiteRolePermissionText("Administrators"),
};

accountSettingsTrails.ldapPowerUsersSiteRoleDetailView = {
  parent: "ldapSiteRolesManagement",
  name: "ldapPowerUsersSiteRoleDetailView",
  path: accountSettingsPaths.ldapSiteRoleDetailView,
  pathFunction: (userData) => siteRoleHelper.getPowerUsersSiteRoleDetailViewLink(userData),
  title: "Power Users",
  linkText: "Power Users",
  pageDescription: siteRoleHelper.getSiteRolePermissionText("PowerUsers"),
};

accountSettingsTrails.ldapUsersSiteRoleDetailView = {
  parent: "ldapSiteRolesManagement",
  name: "ldapUsersSiteRoleDetailView",
  path: accountSettingsPaths.ldapSiteRoleDetailView,
  pathFunction: (userData) => siteRoleHelper.getUsersSiteRoleDetailViewLink(userData),
  title: "Users",
  linkText: "Users",
  pageDescription: siteRoleHelper.getSiteRolePermissionText("Users"),
};

accountSettingsTrails.ldapSecurityManagersSiteRoleDetailView = {
  parent: "ldapSiteRolesManagement",
  name: "ldapSecurityManagersSiteRoleDetailView",
  path: accountSettingsPaths.ldapSiteRoleDetailView,
  pathFunction: (userData) => siteRoleHelper.getSecurityManagersSiteRoleDetailViewLink(userData),
  title: "Security Managers",
  linkText: "Security Managers",
  pageDescription: siteRoleHelper.getSiteRolePermissionText("SecurityManagers"),
};

accountSettingsTrails.ldapAuditorsSiteRoleDetailView = {
  parent: "ldapSiteRolesManagement",
  name: "ldapAuditorsSiteRoleDetailView",
  path: accountSettingsPaths.ldapSiteRoleDetailView,
  pathFunction: (userData) => siteRoleHelper.getAuditorsSiteRoleDetailViewLink(userData),
  title: "Auditors",
  linkText: "Auditors",
  pageDescription: siteRoleHelper.getSiteRolePermissionText("Auditors"),
};

accountSettingsTrails.policyManagement = {
  parent: "accountSettings",
  name: "policyManagement",
  path: accountSettingsPaths.policyManagement,
  title: "Policy Management",
  linkText: "Policies",
  icon: faIdBadge,
  pageDescription: "Manage Organization Policies to tailor Opsera to your needs.",
};

accountSettingsTrails.policyDetailView = {
  parent: "policyManagement",
  name: "policyDetailView",
  path: accountSettingsPaths.policyDetailView,
  title: "Policy Details",
  linkText: "Policy Details",
  icon: faIdBadge,
};

accountSettingsTrails.deleteTools = {
  parent: "accountSettings",
  name: "deleteTools",
  path: accountSettingsPaths.deleteTools,
  title: "Delete Tool Chains",
  linkText: "Delete Tool Chains",
  icon: faTimes,
  pageDescription: `
      Choose a registered application, view the active tools, and then delete them from the application.
      This will perform a complete end to end removal of all instances related to an application.
    `,
};

//Analytics
accountSettingsTrails.analyticsProfile = {
  parent: "accountSettings",
  name: "analyticsProfile",
  path: accountSettingsPaths.analyticsProfile,
  title: "Analytics Profile",
  linkText: "Analytics Profile",
  icon: faChartNetwork,
  pageDescription: "Manage Opsera Analytics Engine settings.",
};
accountSettingsTrails.dataMappingManagement = {
  parent: "accountSettings",
  name: "dataMappingManagement",
  path: accountSettingsPaths.dataMappingManagement,
  title: "Analytics Data Mappings",
  linkText: "Analytics Data Mappings",
  icon: faProjectDiagram,
  pageDescription: "Apply and connect Tags to incoming external data with Opsera.",
};
accountSettingsTrails.projectTaggingDetailView = {
  parent: "dataMappingManagement",
  name: "projectTaggingDetailView",
  path: accountSettingsPaths.projectTaggingDetailView,
  title: "Analytics Project Mapping Details",
  linkText: "Analytics Project Mapping Details",
  icon: faProjectDiagram
};
accountSettingsTrails.pipelineDataMappingDetailView = {
  parent: "dataMappingManagement",
  name: "pipelineDataMappingDetailView",
  path: accountSettingsPaths.pipelineDataMappingDetailView,
  title: "Analytics Pipeline Data Mapping Details",
  linkText: "Analytics Pipeline Data Mapping Details",
  icon: faDraftingCompass
};
accountSettingsTrails.userTaggingDetailView = {
  parent: "dataMappingManagement",
  name: "userTaggingDetailView",
  path: accountSettingsPaths.userTaggingDetailView,
  title: "Analytics User Mapping Details",
  linkText: "Analytics User Mapping Details",
  icon: faUserTag
};