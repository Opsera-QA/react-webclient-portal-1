import React, {useState, useEffect, useContext} from "react";
import {Button} from "react-bootstrap";
import {AuthContext} from "contexts/AuthContext";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import {useHistory, useParams} from "react-router-dom";
import LdapUsersTable from "./LdapUsersTable";
import NewLdapUserModal from "./NewLdapUserModal";
import LoadingDialog from "components/common/status_notifications/loading";
import LdapOrganizationSelectInput
  from "components/common/list_of_values_input/admin/accounts/ldap_accounts/LdapOrganizationSelectInput";
import {getOrganizationByDomain} from "components/admin/accounts/ldap/organizations/organization-functions";
import {DialogToastContext} from "contexts/DialogToastContext";
import accountsActions from "components/admin/accounts/accounts-actions";
import AccessDeniedDialog from "components/common/status_notifications/accessDeniedInfo";
import BreadcrumbTrail from "components/common/navigation/breadcrumbTrail";


function LdapUserManagement() {
  const history = useHistory();
  const {orgDomain} = useParams();
  const {getUserRecord, getAccessToken, setAccessRoles} = useContext(AuthContext);
  const [accessRoleData, setAccessRoleData] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [userList, setUserList] = useState([]);
  const [currentOrganizationDomain, setCurrentOrganizationDomain] = useState(undefined);
  const [showCreateUserModal, setShowCreateUserModal] = useState(false);
  const toastContext = useContext(DialogToastContext);
  const [authorizedActions, setAuthorizedActions] = useState([]);

  useEffect(() => {
    loadData();
  }, [orgDomain]);

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

  const getUsersByDomain = async (ldapDomain) => {
    try {
      let organization = await getOrganizationByDomain(ldapDomain, getAccessToken);
      setUserList(organization["users"]);
    } catch (error) {
      toastContext.showLoadingErrorDialog(error.message);
      console.error(error.message);
    }
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
        if (orgDomain != null) {
          setCurrentOrganizationDomain(orgDomain);
          await getUsersByDomain(orgDomain);
        }
        else {
          history.push(`/settings/${ldap.domain}/users/`);
          setCurrentOrganizationDomain(ldap.email);
          await getUsersByDomain(ldap.domain);
        }
      } else if (ldap.organization != null && authorizedActions.includes("get_users")) {
        history.push(`/settings/${ldap.domain}/users/`);
        setCurrentOrganizationDomain(ldap.domain);
        await getUsersByDomain(ldap.domain);
      }
    }
  };

  const createUser = () => {
    setShowCreateUserModal(true);
  };

  if (!accessRoleData) {
    return (<LoadingDialog size="sm"/>);
  }

  if (!authorizedActions.includes("get_users") && !isLoading) {
    return (<AccessDeniedDialog roleData={accessRoleData}/>);
  }

  return (
      <div>
        <BreadcrumbTrail destination={"ldapUserManagement"} />
        <div className="justify-content-between mb-1 d-flex">
          <h5>User Accounts Management</h5>
          <div className="d-flex">
            {/*<div className="tableDropdown mr-2">*/}
            {/*  {accessRoleData.OpseraAdministrator && <LdapOrganizationSelectInput currentOrganizationDomain={currentOrganizationDomain} location={"users"} />}*/}
            {/*</div>*/}
            {authorizedActions.includes("create_user") && <div className="mt-1">
              <Button variant="primary" size="sm"
                      onClick={() => {
                        createUser();
                      }}>
                <FontAwesomeIcon icon={faPlus} className="mr-1"/>New User
              </Button>
            </div>}
            <br/>
          </div>
        </div>

        <div className="full-height">
          <LdapUsersTable orgDomain={orgDomain} isLoading={isLoading} userData={userList}/>
        </div>
        <NewLdapUserModal authorizedActions={authorizedActions} showModal={showCreateUserModal} setShowModal={setShowCreateUserModal} loadData={loadData}/>
      </div>
    );
}


export default LdapUserManagement;