import React from "react";
import SiteRoleManagementPageLinkCardBase
  from "components/settings/ldap_site_roles/cards/SiteRoleManagementPageLinkCardBase";
import PropType from "prop-types";
import InactiveSecurityManagersRolePageLinkCard
  from "components/settings/ldap_site_roles/cards/inactive/InactiveSecurityManagersRolePageLinkCard";

export default function SecurityManagersRolePageLinkCard({ securityManagersSiteRole, }) {
  if (securityManagersSiteRole == null) {
    return (
      <InactiveSecurityManagersRolePageLinkCard />
    );
  }

  return (
    <SiteRoleManagementPageLinkCardBase
      breadcrumbDestination={"ldapSecurityManagersSiteRoleDetailView"}
      siteRole={securityManagersSiteRole}
    />
  );
}

SecurityManagersRolePageLinkCard.propTypes = {
  securityManagersSiteRole: PropType.object,
};
