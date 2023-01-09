import {faServer} from "@fortawesome/pro-light-svg-icons";
import {accountSettingsPaths} from "components/settings/accountSettings.paths";
import {siteRoleHelper} from "components/settings/ldap_site_roles/siteRole.helper";

export const accountSettingsTrails = {};

// LDAP Site Roles Administration
accountSettingsTrails.ldapSiteRolesManagement = {
  parent: "accountSettings",
  name: "ldapSiteRolesManagement",
  path: accountSettingsPaths.ldapSiteRoleManagement,
  title: "Site Roles Management",
  linkText: "Site Roles",
  icon: faServer,
  pageDescription: "Manage Site Roles in the follow levels: Administrators, Power Users, Users, Security Managers and Auditors.",
  // pageDescription: `
  //     Site Roles determine a user’s level of accessibility.
  //     Manage Site Roles from this dashboard. By default, Opsera offers tiers for Site Roles:
  //     Administrators for full site wide access, Power Users for elevated configuration of features access and then Users for all standard users to interact with the site.
  //     If a user is not a member of any one of these roles they will be treated as a read-only user with very limited access.
  //     Some additional roles can be enabled here (by Administrators) to add more advanced security features.
  //   `,
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