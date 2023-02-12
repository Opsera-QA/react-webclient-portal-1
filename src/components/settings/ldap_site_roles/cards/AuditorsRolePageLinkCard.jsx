import React from "react";
import SiteRoleManagementPageLinkCardBase
  from "components/settings/ldap_site_roles/cards/SiteRoleManagementPageLinkCardBase";
import PropType from "prop-types";
import InactiveAuditorsRolePageLinkCard
  from "components/settings/ldap_site_roles/cards/inactive/InactiveAuditorsRolePageLinkCard";

export default function AuditorsRolePageLinkCard({ auditorsSiteRole }) {
  if (auditorsSiteRole == null) {
    return (
      <InactiveAuditorsRolePageLinkCard />
    );
  }

  return (
    <SiteRoleManagementPageLinkCardBase
      breadcrumbDestination={"ldapAuditorsSiteRoleDetailView"}
      siteRole={auditorsSiteRole}
    />
  );
}

AuditorsRolePageLinkCard.propTypes = {
  auditorsSiteRole: PropType.object,
};
