import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import LoadingDialog from "components/common/status_notifications/loading";
import LdapDepartmentsTable from "components/settings/ldap_departments/LdapDepartmentsTable";
import departmentActions from "components/settings/ldap_departments/department-functions";
import {hasStringValue} from "components/common/helpers/string-helpers";
import useComponentStateReference from "hooks/useComponentStateReference";

function LdapOrganizationAccountDepartmentsPanel({ ldapOrganizationAccountData, organizationDomain }) {
  const [isLoading, setIsLoading] = useState(false);
  const [departmentMetadata, setDepartmentMetadata] = useState(undefined);
  const [departments, setDepartments] = useState([]);
  const {
    accessRoleData,
    getAccessToken,
    toastContext,
    isMounted,
    cancelTokenSource,
  } = useComponentStateReference();

  useEffect(() => {
    loadData().catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });
  }, [organizationDomain]);

  const loadData = async () => {
    try {
      setIsLoading(true);

      if (hasStringValue(organizationDomain)) {
        await getDepartments();
      }
    }
    catch (error) {
      if (isMounted?.current === true) {
        toastContext.showLoadingErrorDialog(error);
      }
    }
    finally {
      if (isMounted?.current === true) {
        setIsLoading(false);
      }
    }
  };

  const getDepartments = async () => {
    const response = await departmentActions.getDepartmentGroupsV2(getAccessToken, cancelTokenSource, organizationDomain);
    const departments = response?.data?.data;

    if (isMounted?.current === true && Array.isArray(departments)) {
      const metadata = response?.data?.metadata;
      setDepartmentMetadata({...metadata});
      setDepartments([...departments]);
    }
  };

  if (ldapOrganizationAccountData == null) {
    return (<LoadingDialog size="sm"/>);
  }

  return (
    <LdapDepartmentsTable
      className={"mt-2"}
      loadData={loadData}
      accessRoleData={accessRoleData}
      departments={departments}
      departmentMetadata={departmentMetadata}
      isLoading={isLoading}
      domain={organizationDomain}
      isMounted={isMounted}
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
