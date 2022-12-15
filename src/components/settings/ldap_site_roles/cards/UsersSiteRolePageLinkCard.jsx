import React from "react";
import SiteRoleManagementPageLinkCardBase
  from "components/settings/ldap_site_roles/cards/SiteRoleManagementPageLinkCardBase";

export default function UsersSiteRolePageLinkCard() {
  return (
    <SiteRoleManagementPageLinkCardBase
      breadcrumbDestination={"ldapUsersSiteRoleDetailView"}
    />
  );
}