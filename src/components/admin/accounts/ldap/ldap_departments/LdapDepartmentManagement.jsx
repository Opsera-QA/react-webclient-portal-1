import React, {useState, useEffect, useContext} from "react";
import {AuthContext} from "contexts/AuthContext";
import LoadingDialog from "components/common/status_notifications/loading";
import Model from "core/data_model/model";
import ScreenContainer from "components/common/panels/general/ScreenContainer";
import departmentFilterMetadata from "components/admin/accounts/ldap/ldap_departments/department-filter-metadata";
import departmentActions from "components/admin/accounts/ldap/ldap_departments/department-functions";
import accountsActions from "components/admin/accounts/accounts-actions";
import {DialogToastContext} from "contexts/DialogToastContext";
import LdapDepartmentsTable from "components/admin/accounts/ldap/ldap_departments/LdapDepartmentsTable";

function LdapDepartmentManagement() {
  const toastContext = useContext(DialogToastContext);
  const {getUserRecord, getAccessToken, setAccessRoles} = useContext(AuthContext);
  const [accessRoleData, setAccessRoleData] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [departments, setDepartments] = useState([]);
  const [departmentFilterDto, setDepartmentFilterDto] = useState(new Model({...departmentFilterMetadata.newObjectFields}, departmentFilterMetadata, false));
  const [domain, setDomain] = useState(undefined);
  const [authorizedActions, setAuthorizedActions] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setIsLoading(true);
      await getRoles();
    }
    catch (error) {
      toastContext.showLoadingErrorDialog(error);
    }
    finally {
      setIsLoading(false);
    }
  }

  const getDepartments = async (ldapDomain) => {
      let response = await departmentActions.getDepartmentsByDomain(ldapDomain, getAccessToken);
      setDepartments(response?.data);
  };

  const getRoles = async () => {
    const user = await getUserRecord();
    const {ldap, groups} = user;
    const userRoleAccess = await setAccessRoles(user);

    if (userRoleAccess) {
      setAccessRoleData(userRoleAccess);

      if (userRoleAccess?.OpseraAdministrator && ldap) {
        let authorizedActions = await accountsActions.getAllowedDepartmentActions(userRoleAccess, ldap.organization, getUserRecord, getAccessToken);
        setAuthorizedActions(authorizedActions);
        setDomain(ldap.domain)
        await getDepartments(ldap.domain);
      }
    }
  };

  if (!accessRoleData) {
    return (<LoadingDialog size="sm"/>);
  }

  return (
    <ScreenContainer
      breadcrumbDestination={"ldapDepartmentManagement"}
      isLoading={isLoading} accessDenied={!isLoading && !authorizedActions.includes("get_departments")}
      >
        <LdapDepartmentsTable
          authorizedActions={authorizedActions}
          loadData={loadData}
          domain={domain}
          isLoading={isLoading}
          departmentData={departments}
          departmentFilterDto={departmentFilterDto}
          setDepartmentFilterDto={setDepartmentFilterDto}
        />
    </ScreenContainer>
  );
}

export default LdapDepartmentManagement;