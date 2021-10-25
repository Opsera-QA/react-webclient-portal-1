import React from "react";
import PropTypes from "prop-types";
import LoadingDialog from "components/common/status_notifications/loading";
import LdapGroupsTable from "components/settings/ldap_groups/LdapGroupsTable";

function LdapOrganizationAccountGroupsPanel({ ldapOrganizationAccountData, authorizedActions, loadData, currentUser }) {
  if (ldapOrganizationAccountData == null) {
    return (<LoadingDialog size="sm"/>);
  }

  const getGroups = () => {
    const groups = ldapOrganizationAccountData?.getData("groups");

    if (Array.isArray(groups) && groups.length > 0) {
      return groups?.filter((group) => {
        return group?.groupType === "user";
      });
    }
  };

  return (
    <div className={"mt-2"}>
      <LdapGroupsTable
        orgDomain={ldapOrganizationAccountData["orgDomain"]}
        groupData={getGroups()}
        currentUserEmail={currentUser?.email}
        loadData={loadData}
        authorizedActions={authorizedActions?.includes("update_organization_account") ? ["create_group", "update_group"] : []}
      />
    </div>
  );
}

LdapOrganizationAccountGroupsPanel.propTypes = {
  ldapOrganizationAccountData: PropTypes.object,
  authorizedActions: PropTypes.array,
  loadData: PropTypes.func,
  currentUser: PropTypes.object
};

export default LdapOrganizationAccountGroupsPanel;
