import React, {useContext, useEffect, useState} from "react";
import PropTypes from "prop-types";
import SummaryPanelContainer from "components/common/panels/detail_view/SummaryPanelContainer";
import LoadingDialog from "components/common/status_notifications/loading";
import LdapDepartmentsTable from "components/settings/ldap_departments/LdapDepartmentsTable";
import departmentActions from "components/settings/ldap_departments/department-functions";
import {AuthContext} from "contexts/AuthContext";
import accountsActions from "components/admin/accounts/accounts-actions";

function LdapOrganizationAccountDepartmentsPanel({ ldapOrganizationAccountData, loadData, organizationDomain, cancelTokenSource, isMounted }) {
  const {getAccessToken, getUserRecord, setAccessRoles} = useContext(AuthContext);
  const [ldapDepartmentData, setLdapDepartmentData] = useState(undefined);
  const [authorizedDepartmentActions, setAuthorizedDepartmentActions] = useState([]);

  useEffect(() => {
    loadDepartments();
  }, []);

  const loadDepartments = async () => {
    const user = await getUserRecord();
    const {ldap} = user;
    const userRoleAccess = await setAccessRoles(user);

    const response = await departmentActions.getDepartmentsByDomainV2(getAccessToken, cancelTokenSource, organizationDomain);

    if (isMounted?.current === true && response?.data != null) {
      setLdapDepartmentData(response.data);
    }

    let authorizedDepartmentActions = await accountsActions.getAllowedDepartmentActions(userRoleAccess, ldap.organization, getUserRecord, getAccessToken);
    setAuthorizedDepartmentActions(authorizedDepartmentActions);
  };

  if (ldapOrganizationAccountData == null) {
    return (<LoadingDialog size="sm"/>);
  }

  return (
    <div className={"mt-2"}>
      <LdapDepartmentsTable
        loadData={loadData}
        departmentData={ldapDepartmentData}
        authorizedActions={authorizedDepartmentActions}
        domain={organizationDomain}
      />
    </div>
  );
}

LdapOrganizationAccountDepartmentsPanel.propTypes = {
  ldapOrganizationAccountData: PropTypes.object,
  authorizedActions: PropTypes.array,
  loadData: PropTypes.func,
  cancelTokenSource: PropTypes.object,
  isMounted: PropTypes.object,
  organizationDomain: PropTypes.string
};

export default LdapOrganizationAccountDepartmentsPanel;
