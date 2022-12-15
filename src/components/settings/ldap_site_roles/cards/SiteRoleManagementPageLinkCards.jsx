import React from "react";
import AdministratorsSiteRolePageLinkCard
  from "components/settings/ldap_site_roles/cards/AdministratorsSiteRolePageLinkCard";
import PowerUsersSiteRolePageLinkCard from "components/settings/ldap_site_roles/cards/PowerUsersSiteRolePageLinkCard";
import UsersSiteRolePageLinkCard from "components/settings/ldap_site_roles/cards/UsersSiteRolePageLinkCard";
import AuditorsRolePageLinkCard from "components/settings/ldap_site_roles/cards/AuditorsRolePageLinkCard";
import SecurityManagersRolePageLinkCard
  from "components/settings/ldap_site_roles/cards/SecurityManagersRolePageLinkCard";

export default function SiteRoleManagementPageLinkCards() {
  return (
    <div className={"mx-2"}>
      <AdministratorsSiteRolePageLinkCard />
      <PowerUsersSiteRolePageLinkCard />
      <UsersSiteRolePageLinkCard />
      <SecurityManagersRolePageLinkCard />
      <AuditorsRolePageLinkCard />
    </div>
  );
}
