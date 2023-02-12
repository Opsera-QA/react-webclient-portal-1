import React from "react";
import PropType from "prop-types";
import SiteRoleManagementPageLinkCardBase
  from "components/settings/ldap_site_roles/cards/SiteRoleManagementPageLinkCardBase";

export default function UsersSiteRolePageLinkCard({usersSiteRole}) {
  return (
    <SiteRoleManagementPageLinkCardBase
      siteRole={usersSiteRole}
      breadcrumbDestination={"ldapUsersSiteRoleDetailView"}
    />
  );
}

UsersSiteRolePageLinkCard.propTypes = {
  usersSiteRole: PropType.object,
};
