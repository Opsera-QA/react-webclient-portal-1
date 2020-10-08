import React, {useState, useEffect, useContext} from "react";
import {AuthContext} from "contexts/AuthContext";
import {useHistory, useParams} from "react-router-dom";
import NewLdapDepartmentModal from "./NewLdapDepartmentModal";
import LoadingDialog from "components/common/status_notifications/loading";
import {DialogToastContext} from "../../../../../contexts/DialogToastContext";
import accountsActions from "../../accounts-actions";
import BreadcrumbTrail from "../../../../common/navigation/breadcrumbTrail";
import LdapDepartmentsTable from "./LdapDepartmentsTable";


function LdapDepartmentManagement() {
  const history = useHistory();
  const toastContext = useContext(DialogToastContext);
  const {getUserRecord, getAccessToken, setAccessRoles} = useContext(AuthContext);
  const [accessRoleData, setAccessRoleData] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [departmentList, setDepartmentList] = useState([]);
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

  const getDepartmentsByDomain = async (ldapDomain) => {
      // let organization = await getOrganizationByDomain(ldapDomain, getAccessToken);
      // setOrganization(organization);
      // setUserList(organization["users"]);
  };

  const getRoles = async () => {
    const user = await getUserRecord();
    const {ldap, groups} = user;
    const userRoleAccess = await setAccessRoles(user);

    if (userRoleAccess) {
      setAccessRoleData(userRoleAccess);

      let authorizedActions = await accountsActions.getAllowedUserActions(userRoleAccess, ldap.organization, undefined, getUserRecord, getAccessToken);
      setAuthorizedActions(authorizedActions);

      if (userRoleAccess.OpseraAdministrator) {
        let departmentList = await getDepartmentsByDomain(getAccessToken);
        setDepartmentList(departmentList.data);
      }
    }
  };

  const createUser = () => {
    setShowCreateUserModal(true);
  };

  const handleOrganizationChange = async (selectedOption) => {
    setIsLoading(true);
    console.log("Setting organization to: " + JSON.stringify(selectedOption));
    history.push(`/settings/${selectedOption.id}/users`);
    setCurrentOrganizationDomain(selectedOption.id);
    await getUsersByDomain(selectedOption.id);
    setIsLoading(false);
  };

  if (!accessRoleData) {
    return (<LoadingDialog size="sm"/>);
  }

  if (!authorizedActions.includes("get_users") && !isLoading) {
    return (<AccessDeniedDialog roleData={accessRoleData}/>);
  }

  return (
      <div>
        <BreadcrumbTrail destination={"ldapDepartmentManagement"} />
        <div className="justify-content-between mb-1 d-flex">
          <h5>Users Management</h5>
          <div className="d-flex">
            <br/>
          </div>
        </div>

        <div className="full-height">
          {departmentList && <LdapDepartmentsTable isLoading={isLoading} departmentData={departmentList}/>}
        </div>
      </div>
    );
}


export default LdapDepartmentManagement;