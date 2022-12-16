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

// TODO: Replace with pull from roles library when deployed
export const SITE_ROLE_GROUP_NAMES = {
  ADMINISTRATORS: "Administrators",
  POWER_USERS: "PowerUsers",
  USERS: "Users",
  AUDITORS: "Auditors",
  SECURITY_MANAGERS: "SecurityManagers",
};

export default function SiteRoleManagementPageLinkCards({ siteRoles, }) {
  const parsedSiteRoles = DataParsingHelper.parseArray(siteRoles, []);
  const securityManagersSiteRole = parsedSiteRoles.find((siteRole) => siteRole.name === SITE_ROLE_GROUP_NAMES.SECURITY_MANAGERS);
  const auditorsSiteRole = parsedSiteRoles.find((siteRole) => siteRole.name === SITE_ROLE_GROUP_NAMES.AUDITORS);

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
