import React from "react";
import PropTypes from "prop-types";
import LoadingDialog from "components/common/status_notifications/loading";
import SiteRolesTable from "components/settings/ldap_site_roles/SiteRolesTable";
import useGetLdapSiteRolesForDomain from "hooks/ldap/site_roles/useGetLdapSiteRolesForDomain";

export default function LdapOrganizationAccountSiteRolesPanel({ ldapOrganizationAccountData, organizationDomain }) {
  const {
    isLoading,
    siteRoles,
    loadData,
    error,
  } = useGetLdapSiteRolesForDomain(organizationDomain);

  if (ldapOrganizationAccountData == null) {
    return (<LoadingDialog size="sm"/>);
  }

  return (
    <SiteRolesTable
      orgDomain={organizationDomain}
      siteRoles={siteRoles}
      isLoading={isLoading}
      loadData={loadData}
      className={"mt-2"}
    />
  );
}

LdapOrganizationAccountSiteRolesPanel.propTypes = {
  ldapOrganizationAccountData: PropTypes.object,
  organizationDomain: PropTypes.string,
};
