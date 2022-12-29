import React from "react";
import SiteRoleManagementPageLinkCardBase
  from "components/settings/ldap_site_roles/cards/SiteRoleManagementPageLinkCardBase";
import PropType from "prop-types";

export default function SecurityManagersRolePageLinkCard({ securityManagersSiteRole, }) {
  if (securityManagersSiteRole == null) {
    return "Security Managers must be activated before you can use it.";
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
