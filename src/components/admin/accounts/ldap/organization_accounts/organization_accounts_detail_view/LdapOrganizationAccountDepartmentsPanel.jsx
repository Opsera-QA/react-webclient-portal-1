import React, {useContext, useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import LoadingDialog from "components/common/status_notifications/loading";
import LdapDepartmentsTable from "components/settings/ldap_departments/LdapDepartmentsTable";
import departmentActions from "components/settings/ldap_departments/department-functions";
import {AuthContext} from "contexts/AuthContext";
import {DialogToastContext} from "contexts/DialogToastContext";
import axios from "axios";
import {hasStringValue} from "components/common/helpers/string-helpers";

function LdapOrganizationAccountDepartmentsPanel({ ldapOrganizationAccountData, organizationDomain }) {
  const toastContext = useContext(DialogToastContext);
  const {getAccessRoleData, getAccessToken} = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [departmentMetadata, setDepartmentMetadata] = useState(undefined);
  const [accessRoleData, setAccessRoleData] = useState(undefined);
  const [departments, setDepartments] = useState([]);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;

    loadData(source).catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, [organizationDomain]);

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);

      if (hasStringValue(organizationDomain)) {
        await getRoles(cancelSource);
      }
    }
    catch (error) {
      if (isMounted?.current === true) {
        toastContext.showLoadingErrorDialog(error);
        console.error(error);
      }
    }
    finally {
      if (isMounted?.current === true) {
        setIsLoading(false);
      }
    }
  };

  const getRoles = async (cancelSource = cancelTokenSource) => {
    const userRoleAccess = await getAccessRoleData();

    if (isMounted?.current === true && userRoleAccess) {
      setAccessRoleData(userRoleAccess);
      await getDepartments(cancelSource);
    }
  };

  const getDepartments = async (cancelSource = cancelTokenSource) => {
    const response = await departmentActions.getDepartmentGroupsV2(getAccessToken, cancelSource, organizationDomain);
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
