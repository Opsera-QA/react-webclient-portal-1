import {faFolderGear} from "@fortawesome/pro-light-svg-icons";
import {organizationSettingsHelper} from "components/admin/organization_settings/organizationSettings.helper";

export const adminToolsTrails = {};

adminToolsTrails.ldapOrganizationSettingsManagement = {
  parent: "adminTools",
  name: "ldapOrganizationSettingsManagement",
  path: organizationSettingsHelper.getManagementScreenLink(),
  title: "Organization Settings Management",
  linkText: "Customer Settings, Policies, and Entitlements",
  icon: faFolderGear,
  pageDescription: `
      Manage Customer Settings, Policies, and Entitlements
    `,
};
adminToolsTrails.ldapOrganizationSettingsDetailView = {
  parent: "ldapOrganizationSettingsManagement",
  name: "ldapOrganizationSettingsDetailView",
  pathFunction: (organizationAccountId) => organizationSettingsHelper.getDetailViewLink(organizationAccountId),
  title: "Organization Settings Details",
  linkText: "Organization Settings Details",
  icon: faFolderGear,
};
