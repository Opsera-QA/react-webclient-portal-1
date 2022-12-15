import React from "react";
import SiteRoleManagementPageLinkCardBase
  from "components/settings/ldap_site_roles/cards/SiteRoleManagementPageLinkCardBase";

export default function SecurityManagersRolePageLinkCard() {
  return (
    <SiteRoleManagementPageLinkCardBase
      breadcrumbDestination={"ldapSecurityManagersSiteRoleDetailView"}
    />
  );
}