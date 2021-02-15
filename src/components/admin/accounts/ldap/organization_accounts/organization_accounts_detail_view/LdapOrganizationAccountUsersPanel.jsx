import React from "react";
import PropTypes from "prop-types";
import SummaryPanelContainer from "components/common/panels/detail_view/SummaryPanelContainer";
import LoadingDialog from "components/common/status_notifications/loading";
import LdapUsersTable from "components/settings/ldap_users/LdapUsersTable";

function LdapOrganizationAccountUsersPanel({ ldapOrganizationAccountData, authorizedActions, loadData }) {
  if (ldapOrganizationAccountData == null) {
    return (<LoadingDialog size="sm"/>);
  }

  return (
    <SummaryPanelContainer>
      <LdapUsersTable
        orgDomain={ldapOrganizationAccountData["orgDomain"]}
        userData={ldapOrganizationAccountData.getData("users")}
        authorizedActions={authorizedActions?.includes("update_organization_account") ? ["create_user", "update_user"] : []}
        loadData={loadData}
      />
    </SummaryPanelContainer>
  );
}

LdapOrganizationAccountUsersPanel.propTypes = {
  ldapOrganizationAccountData: PropTypes.object,
  authorizedActions: PropTypes.array,
  loadData: PropTypes.func
};

export default LdapOrganizationAccountUsersPanel;
