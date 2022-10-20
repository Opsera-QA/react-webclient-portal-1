import React from "react";
import DeleteToolsManagementPageLinkCard from "components/settings/delete_tools/DeleteToolsManagementPageLinkCard";
import LdapGroupManagementPageLinkCard from "components/settings/ldap_groups/LdapGroupManagementPageLinkCard";
import LdapSiteRoleManagementPageLinkCard from "components/settings/ldap_site_roles/LdapSiteRoleManagementPageLinkCard";
import UserManagementPageLinkCard from "components/settings/users/UserManagementPageLinkCard";
import LogsExportManagementPageLinkCard from "components/settings/logs_management/LogsExportManagementPageLinkCard";
import UnsecuredItemReportPageLinkCard from "components/settings/unsecured_items/UnsecuredItemReportPageLinkCard";

export default function AccountSettingsPageLinkCards() {
  return (
    <div>
      <DeleteToolsManagementPageLinkCard />
      <LdapGroupManagementPageLinkCard />
      <LogsExportManagementPageLinkCard />
      <UnsecuredItemReportPageLinkCard />
      <LdapSiteRoleManagementPageLinkCard />
      <UserManagementPageLinkCard />
    </div>
  );
}
