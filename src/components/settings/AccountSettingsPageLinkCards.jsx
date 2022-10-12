import React from "react";
import DeleteToolsManagementPageLinkCard from "components/settings/delete_tools/DeleteToolsManagementPageLinkCard";
import LdapGroupManagementPageLinkCard from "components/settings/ldap_groups/LdapGroupManagementPageLinkCard";
import LdapSiteRoleManagementPageLinkCard from "components/settings/ldap_site_roles/LdapSiteRoleManagementPageLinkCard";
import UserManagementPageLinkCard from "components/settings/users/UserManagementPageLinkCard";
import LogsExportManagementPageLinkCard from "components/settings/logs_management/LogsExportManagementPageLinkCard";
import FreeTrialUserExpirationManagementPageLinkCard
  from "components/settings/trial/user_expiration/FreeTrialUserExpirationManagementPageLinkCard";
import FreeTrialUserActivityReportPageLinkCard
  from "components/settings/trial/activity_report/FreeTrialUserActivityReportPageLinkCard";

export default function AccountSettingsPageLinkCards() {
  return (
    <div>
      <DeleteToolsManagementPageLinkCard />
      <LdapGroupManagementPageLinkCard />
      <LogsExportManagementPageLinkCard />
      <LdapSiteRoleManagementPageLinkCard />
      <UserManagementPageLinkCard />
      <FreeTrialUserExpirationManagementPageLinkCard />
      <FreeTrialUserActivityReportPageLinkCard />
    </div>
  );
}
