import React, {useState, useEffect, useContext} from "react";
import {AuthContext} from "contexts/AuthContext";
import {useHistory} from "react-router-dom";
import LoadingDialog from "components/common/status_notifications/loading";
import {DialogToastContext} from "../../../../../contexts/DialogToastContext";
import accountsActions from "../../accounts-actions";
import BreadcrumbTrail from "../../../../common/navigation/breadcrumbTrail";
import LdapDepartmentsTable from "./LdapDepartmentsTable";
import AccessDeniedDialog from "../../../../common/status_notifications/accessDeniedInfo";
import departmentActions from "./department-functions";


function LdapDepartmentManagement() {
  const history = useHistory();
  const toastContext = useContext(DialogToastContext);
  const {getUserRecord, getAccessToken, setAccessRoles} = useContext(AuthContext);
  const [accessRoleData, setAccessRoleData] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [departments, setDepartments] = useState([]);
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
      setDepartments(response.data);
  };

  const getRoles = async () => {
    const user = await getUserRecord();
    const {ldap, groups} = user;
    const userRoleAccess = await setAccessRoles(user);

    if (userRoleAccess) {
      setAccessRoleData(userRoleAccess);

      let authorizedActions = await accountsActions.getAllowedDepartmentActions(userRoleAccess, ldap.organization, getUserRecord, getAccessToken);
      setAuthorizedActions(authorizedActions);

      if (userRoleAccess.OpseraAdministrator) {
        setDomain(ldap.domain)
        await getDepartments(ldap.domain);
      }
    }
  };

  // const handleOrganizationChange = async (selectedOption) => {
  //   setIsLoading(true);
  //   console.log("Setting organization to: " + JSON.stringify(selectedOption));
  //   history.push(`/settings/${selectedOption.id}/users`);
  //   setCurrentOrganizationDomain(selectedOption.id);
  //   await getUsersByDomain(selectedOption.id);
  //   setIsLoading(false);
  // };

  if (!accessRoleData) {
    return (<LoadingDialog size="sm"/>);
  }

  if (!authorizedActions.includes("get_departments") && !isLoading) {
    return (<AccessDeniedDialog roleData={accessRoleData}/>);
  }

  return (
      <div>
        <BreadcrumbTrail destination={"ldapDepartmentManagement"} />
        <div className="justify-content-between mb-1 d-flex">
          <h5>Department Management</h5>
        </div>

        <div className="full-height">
          {departments && <LdapDepartmentsTable loadData={loadData} domain={domain} isLoading={isLoading} departmentData={departments}/>}
        </div>
      </div>
    );
}


export default LdapDepartmentManagement;