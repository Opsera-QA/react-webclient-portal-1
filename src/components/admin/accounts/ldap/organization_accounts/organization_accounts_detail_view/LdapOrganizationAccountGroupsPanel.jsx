import React from "react";
import PropTypes from "prop-types";
import SummaryPanelContainer from "components/common/panels/detail_view/SummaryPanelContainer";
import LoadingDialog from "components/common/status_notifications/loading";
import LdapGroupsTable from "components/settings/ldap_groups/LdapGroupsTable";

function LdapOrganizationAccountGroupsPanel({ ldapOrganizationAccountData, authorizedActions, loadData, currentUser }) {
  if (ldapOrganizationAccountData == null) {
    return (<LoadingDialog size="sm"/>);
  }

  return (
    <SummaryPanelContainer>
      <LdapGroupsTable
        orgDomain={ldapOrganizationAccountData["orgDomain"]}
        groupData={ldapOrganizationAccountData.getData("groups")}
        currentUserEmail={currentUser?.email}
        loadData={loadData}
        authorizedActions={authorizedActions?.includes("update_organization_account") ? ["create_group", "update_group"] : []}
      />
    </SummaryPanelContainer>
  );
}

LdapOrganizationAccountGroupsPanel.propTypes = {
  ldapOrganizationAccountData: PropTypes.object,
  authorizedActions: PropTypes.array,
  loadData: PropTypes.func,
  currentUser: PropTypes.object
};

export default LdapOrganizationAccountGroupsPanel;
