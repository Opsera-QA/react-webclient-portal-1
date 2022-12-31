import React from "react";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";

export const siteRoleHelper = {};

siteRoleHelper.getManagementScreenLink = () => {
  return `/settings/site-roles`;
};

siteRoleHelper.getAdministrationSiteRoleDetailViewLink = (userData) => {
  const ldapDomain = DataParsingHelper.parseNestedString(userData, "ldap.domain");

  if (ldapDomain) {
    return `/settings/${ldapDomain}/site-roles/details/Administrators`;
  }
};

siteRoleHelper.getPowerUsersSiteRoleDetailViewLink = (userData) => {
  const ldapDomain = DataParsingHelper.parseNestedString(userData, "ldap.domain");

  if (ldapDomain) {
    return `/settings/${ldapDomain}/site-roles/details/PowerUsers`;
  }
};

siteRoleHelper.getUsersSiteRoleDetailViewLink = (userData) => {
  const ldapDomain = DataParsingHelper.parseNestedString(userData, "ldap.domain");

  if (ldapDomain) {
    return `/settings/${ldapDomain}/site-roles/details/Users`;
  }
};

siteRoleHelper.getSecurityManagersSiteRoleDetailViewLink = (userData) => {
  const ldapDomain = DataParsingHelper.parseNestedString(userData, "ldap.domain");

  if (ldapDomain) {
    return `/settings/${ldapDomain}/site-roles/details/SecurityManagers`;
  }
};

siteRoleHelper.getAuditorsSiteRoleDetailViewLink = (userData) => {
  const ldapDomain = DataParsingHelper.parseNestedString(userData, "ldap.domain");

  if (ldapDomain) {
    return `/settings/${ldapDomain}/site-roles/details/Auditors`;
  }
};

siteRoleHelper.getSiteRolePermissionText = (siteRole) => {
  const parsedSiteRole = DataParsingHelper.parseString(siteRole);

  switch (parsedSiteRole) {
    case "Administrators":
      return (`
        Administrators have full system access, allowing them to perform all actions on Toolchain, Pipelines, and Tool Registry. 
        In Pipelines, an Administrator can perform all actions on the pipeline just as if they were the Owner of the Pipeline. 
        Owner of a Pipeline equally is the same as an Administrator of that Pipeline.
        `);
    case "PowerUsers":
      return (`
          Power Users have limited access in the Pipelines. 
          These users can view all Pipelines, they can change settings on a Pipeline step and run the Pipeline. 
          They cannot change the flow or design of pipeline. 
          They can duplicate a Pipeline and view the Templates as well.
        `);
    case "Users":
      return (`
        Users have limited access in the Pipelines. 
        They can only run the Pipeline and view the log activity. 
        They cannot make any changes. 
        `);
    case "SecurityManagers":
      return (`
        Security Managers have read access to all Tasks, Pipelines, Tools, and Dashboards. 
        They also have write and execute access for Security-owned items where applicable and full access to Git Custodian.
      `);
    case "Auditors":
      return (`
        Auditors have read access to all Tasks, Pipelines, Tools, and Dashboards. 
      `);
  }
};