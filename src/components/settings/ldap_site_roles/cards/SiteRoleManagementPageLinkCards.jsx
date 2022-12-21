import React from "react";
import PropType from "prop-types";
import AdministratorsSiteRolePageLinkCard
  from "components/settings/ldap_site_roles/cards/AdministratorsSiteRolePageLinkCard";
import PowerUsersSiteRolePageLinkCard from "components/settings/ldap_site_roles/cards/PowerUsersSiteRolePageLinkCard";
import UsersSiteRolePageLinkCard from "components/settings/ldap_site_roles/cards/UsersSiteRolePageLinkCard";
import AuditorsRolePageLinkCard from "components/settings/ldap_site_roles/cards/AuditorsRolePageLinkCard";
import SecurityManagersRolePageLinkCard
  from "components/settings/ldap_site_roles/cards/SecurityManagersRolePageLinkCard";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import SiteRoleHelper from "@opsera/know-your-role/roles/helper/site/siteRole.helper";

export default function SiteRoleManagementPageLinkCards({ siteRoles, }) {
  const parsedSiteRoles = DataParsingHelper.parseArray(siteRoles, []);
  const securityManagersSiteRole = parsedSiteRoles.find((siteRole) => siteRole.name === SiteRoleHelper.SITE_ROLE_GROUP_NAMES.SECURITY_MANAGERS);
  const auditorsSiteRole = parsedSiteRoles.find((siteRole) => siteRole.name === SiteRoleHelper.SITE_ROLE_GROUP_NAMES.AUDITORS);

    if (!parsedSiteRoles) {
      return null;
    }

  return (
    <div className={"mx-2"}>
      <AdministratorsSiteRolePageLinkCard />
      <PowerUsersSiteRolePageLinkCard />
      <UsersSiteRolePageLinkCard />
      <SecurityManagersRolePageLinkCard
        securityManagersSiteRole={securityManagersSiteRole}
      />
      <AuditorsRolePageLinkCard
        auditorsSiteRole={auditorsSiteRole}
      />
    </div>
  );
}

SiteRoleManagementPageLinkCards.propTypes = {
  siteRoles: PropType.array,
};
