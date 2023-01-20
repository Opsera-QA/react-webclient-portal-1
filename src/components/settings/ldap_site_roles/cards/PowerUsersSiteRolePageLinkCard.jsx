import React from "react";
import PropType from "prop-types";
import SiteRoleManagementPageLinkCardBase
  from "components/settings/ldap_site_roles/cards/SiteRoleManagementPageLinkCardBase";

export default function PowerUsersSiteRolePageLinkCard({ powerUsersSiteRole }) {
  return (
    <SiteRoleManagementPageLinkCardBase
      siteRole={powerUsersSiteRole}
      breadcrumbDestination={"ldapPowerUsersSiteRoleDetailView"}
    />
  );
}

PowerUsersSiteRolePageLinkCard.propTypes = {
  powerUsersSiteRole: PropType.object,
};
