import React, {useState, useEffect, useContext} from "react";
import {Button} from "react-bootstrap";
import {AuthContext} from "contexts/AuthContext";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import {useHistory, useParams} from "react-router-dom";
import LdapUsersTable from "./LdapUsersTable";
import NewLdapUserModal from "./NewLdapUserModal";
import DropdownList from "react-widgets/lib/DropdownList";
import BreadcrumbTrail from "../../common/navigation/breadcrumbTrail";
import LoadingDialog from "components/common/status_notifications/loading";
import AccessDeniedDialog from "../../common/status_notifications/accessDeniedInfo";
import {
  getOrganizationByDomain,
  getOrganizationByEmail,
  getOrganizationList
} from "../../admin/accounts/ldap/organizations/organization-functions";
import {DialogToastContext} from "../../../contexts/DialogToastContext";
import accountsActions from "../../admin/accounts/accounts-actions";


function LdapUserManagement() {
  const history = useHistory();
  const {orgDomain} = useParams();
  const {getUserRecord, getAccessToken, setAccessRoles} = useContext(AuthContext);
  const [accessRoleData, setAccessRoleData] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [userList, setUserList] = useState([]);
  const [currentOrganizationDomain, setCurrentOrganizationDomain] = useState(undefined);
  const [organizationList, setOrganizationList] = useState(undefined);
  const [organization, setOrganization] = useState(undefined);
  const [showCreateUserModal, setShowCreateUserModal] = useState(false);
  const toastContext = useContext(DialogToastContext);
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

  const getUsersByEmail = async (email) => {
    let organization = await getOrganizationByEmail(email, getAccessToken);
    setOrganization(organization);
    setUserList(organization["users"]);
  };

  const getUsersByDomain = async (ldapDomain) => {
    try {
      let organization = await getOrganizationByDomain(ldapDomain, getAccessToken);
      setOrganization(organization);
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
      console.log("Authorized Actions: " + JSON.stringify(authorizedActions));
      setAuthorizedActions(authorizedActions);

      if (userRoleAccess.OpseraAdministrator) {
        try {
          let organizationList = await getOrganizationList(getAccessToken);
          setOrganizationList(organizationList);
        } catch (error) {
          toastContext.showLoadingErrorDialog(error.message);
          console.error(error.message);
        }

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
        setCurrentOrganizationDomain(ldap.email);
        await getUsersByDomain(ldap.domain);
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
        <BreadcrumbTrail destination={"ldapUserManagement"} />
        <div className="justify-content-between mb-1 d-flex">
          <h5>Users Management</h5>
          <div className="d-flex">
            <div className="tableDropdown mr-2">
              {accessRoleData.OpseraAdministrator && organizationList && <DropdownList
                data={organizationList}
                value={currentOrganizationDomain}
                filter="contains"
                valueField='id'
                textField='text'
                placeholder="Select an Organization Account"
                groupBy={org => org["groupId"]}
                onChange={handleOrganizationChange}
              />}
            </div>
            {organization != null && authorizedActions.includes("create_user") && <div className="mt-1">
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
          {userList && <LdapUsersTable orgDomain={orgDomain} isLoading={isLoading} userData={userList}/>}
        </div>
        <NewLdapUserModal organizationName={organization && organization.name} showModal={showCreateUserModal} setShowModal={setShowCreateUserModal} loadData={loadData}/>
      </div>
    );
}


export default LdapUserManagement;