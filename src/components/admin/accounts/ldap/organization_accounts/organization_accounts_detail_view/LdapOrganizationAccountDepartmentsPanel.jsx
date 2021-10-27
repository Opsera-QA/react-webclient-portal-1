import React, {useContext, useEffect, useState} from "react";
import PropTypes from "prop-types";
import LoadingDialog from "components/common/status_notifications/loading";
import LdapDepartmentsTable from "components/settings/ldap_departments/LdapDepartmentsTable";
import departmentActions from "components/settings/ldap_departments/department-functions";
import {AuthContext} from "contexts/AuthContext";

function LdapOrganizationAccountDepartmentsPanel({ ldapOrganizationAccountData, loadData, organizationDomain, cancelTokenSource, isMounted }) {
  const {getAccessToken} = useContext(AuthContext);
  const [ldapDepartmentData, setLdapDepartmentData] = useState(undefined);

  useEffect(() => {
    loadDepartments();
  }, []);

  const loadDepartments = async () => {
    const response = await departmentActions.getDepartmentsByDomainV2(getAccessToken, cancelTokenSource, organizationDomain);

    if (isMounted?.current === true && response?.data != null) {
      setLdapDepartmentData(response.data);
    }
  };

  if (ldapOrganizationAccountData == null) {
    return (<LoadingDialog size="sm"/>);
  }

  return (
    <LdapDepartmentsTable
      className={"mt-2"}
      loadData={loadData}
      departmentData={ldapDepartmentData}
      authorizedActions={["get_departments", "get_department_details", "create_department", "update_department", "update_group_membership"]}
      domain={organizationDomain}
    />
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
