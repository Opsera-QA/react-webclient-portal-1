import React from "react";
import PropTypes from "prop-types";
import LoadingDialog from "components/common/status_notifications/loading";
import LdapUsersTable from "components/settings/ldap_users/LdapUsersTable";

function LdapOrganizationAccountUsersPanel({ ldapOrganizationAccountData, loadData }) {
  if (ldapOrganizationAccountData == null) {
    return (<LoadingDialog size="sm"/>);
  }

  return (
    <div className={"mt-2"}>
      <LdapUsersTable
        orgDomain={ldapOrganizationAccountData?.getData("orgDomain")}
        userData={ldapOrganizationAccountData?.getData("users")}
        authorizedActions={["create_user", "update_user"]}
        loadData={loadData}
      />
    </div>
  );
}

LdapOrganizationAccountUsersPanel.propTypes = {
  ldapOrganizationAccountData: PropTypes.object,
  loadData: PropTypes.func
};

export default LdapOrganizationAccountUsersPanel;
