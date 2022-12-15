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
    pageDescription: "Manage Site Roles in the follow levels: Administrators, Power Users, and Users.",
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
  title: "Administrators Site Role Details",
  linkText: "Administrators",
  pageDescription: siteRoleHelper.getSiteRolePermissionText("Administrators"),
};

accountSettingsTrails.ldapPowerUsersSiteRoleDetailView = {
  parent: "ldapSiteRolesManagement",
  name: "ldapPowerUsersSiteRoleDetailView",
  path: accountSettingsPaths.ldapSiteRoleDetailView,
  pathFunction: (userData) => siteRoleHelper.getPowerUsersSiteRoleDetailViewLink(userData),
  title: "Power Users Site Role Details",
  linkText: "Power Users",
  pageDescription: siteRoleHelper.getSiteRolePermissionText("PowerUsers"),
};

accountSettingsTrails.ldapUsersSiteRoleDetailView = {
  parent: "ldapSiteRolesManagement",
  name: "ldapUsersSiteRoleDetailView",
  path: accountSettingsPaths.ldapSiteRoleDetailView,
  pathFunction: (userData) => siteRoleHelper.getUsersSiteRoleDetailViewLink(userData),
  title: "Users Site Role Details",
  linkText: "Users",
  pageDescription: siteRoleHelper.getSiteRolePermissionText("Users"),
};