import {faServer} from "@fortawesome/pro-light-svg-icons";
import {accountSettingsPaths} from "components/settings/accountSettings.paths";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";

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
  pathFunction: (userData) => {
    const ldapDomain = DataParsingHelper.parseNestedString(userData, "ldap.domain");

    if (ldapDomain) {
      return `settings/${ldapDomain}/site-roles/details/Administrators`;
    }
  },
  title: "Administrators Site Role Details",
  linkText: "Administrators",
  pageDescription: `
    Administrators have full system access, allowing them to perform all actions on Toolchain, Pipelines, and Tool Registry. 
    In Pipelines, an Administrator can perform all actions on the pipeline just as if they were the Owner of the Pipeline. 
    Owner of a Pipeline equally is the same as an Administrator of that Pipeline.
  `
};