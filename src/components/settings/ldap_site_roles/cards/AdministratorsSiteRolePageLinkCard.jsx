import React from "react";
import PropType from "prop-types";
import SiteRoleManagementPageLinkCardBase
  from "components/settings/ldap_site_roles/cards/SiteRoleManagementPageLinkCardBase";

export default function AdministratorsSiteRolePageLinkCard({administratorsSiteRole}) {
  return (
    <SiteRoleManagementPageLinkCardBase
      siteRole={administratorsSiteRole}
      breadcrumbDestination={"ldapAdministratorsSiteRoleDetailView"}
    />
  );
}

AdministratorsSiteRolePageLinkCard.propTypes = {
  administratorsSiteRole: PropType.object,
};
