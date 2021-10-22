import React from "react";
import PropTypes from "prop-types";
import LoadingDialog from "components/common/status_notifications/loading";
import SiteRolesTable from "components/settings/ldap_site_roles/SiteRolesTable";

function LdapOrganizationAccountSiteRolesPanel({ ldapOrganizationAccountData, loadData }) {
  if (ldapOrganizationAccountData == null) {
    return (<LoadingDialog size="sm"/>);
  }

  const getGroups = () => {
    const groups = ldapOrganizationAccountData?.getData("groups");

    if (Array.isArray(groups) && groups.length > 0) {
      return groups?.filter((group) => {
        return group?.groupType === "Role";
      });
    }
  };

  return (
    <div className={"mt-2"}>
      <SiteRolesTable
        orgDomain={ldapOrganizationAccountData["orgDomain"]}
        groupData={getGroups()}
        loadData={loadData}
      />
    </div>
  );
}

LdapOrganizationAccountSiteRolesPanel.propTypes = {
  ldapOrganizationAccountData: PropTypes.object,
  authorizedActions: PropTypes.array,
  loadData: PropTypes.func,
  currentUser: PropTypes.object
};

export default LdapOrganizationAccountSiteRolesPanel;
