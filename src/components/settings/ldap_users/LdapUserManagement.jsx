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


function LdapUserManagement() {
  const history = useHistory();
  const {orgDomain} = useParams();
  const {getUserRecord, getAccessToken, setAccessRoles} = useContext(AuthContext);
  const [accessRoleData, setAccessRoleData] = useState({});
  const [pageLoading, setPageLoading] = useState(true);
  const [userList, setUserList] = useState([]);
  const [currentOrganizationDomain, setCurrentOrganizationDomain] = useState(undefined);
  const [organizationList, setOrganizationList] = useState(undefined);
  const [organization, setOrganization] = useState();
  const [showCreateUserModal, setShowCreateUserModal] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setPageLoading(true);
    await getRoles();
    setPageLoading(false);
  }

  const getUsersByEmail = async (email) => {
    let organization = await getOrganizationByEmail(email, getAccessToken);
    setOrganization(organization);
    setUserList(organization["users"]);
  };

  const getUsersByDomain = async (ldapDomain) => {
    let organization = await getOrganizationByDomain(ldapDomain, getAccessToken);
    setOrganization(organization);
    setUserList(organization["users"]);
  };

  const getRoles = async () => {
    const user = await getUserRecord();
    const {ldap, groups} = user;
    const userRoleAccess = await setAccessRoles(user);

    if (userRoleAccess) {
      setAccessRoleData(userRoleAccess);

      if (orgDomain != null && userRoleAccess.OpseraAdministrator) {
        setCurrentOrganizationDomain(orgDomain);
        await getUsersByDomain(orgDomain);
      } else if ((userRoleAccess.Administrator || userRoleAccess.PowerUser) && ldap.domain != null) {
        history.push(`/settings/${ldap.domain}/users/`);
        setCurrentOrganizationDomain(ldap.email);
        await getUsersByDomain(ldap.domain);
      }

      if (userRoleAccess.OpseraAdministrator) {
        let organizationList = await getOrganizationList(getAccessToken);
        setOrganizationList(organizationList);
      }
    }
  };

  const createUser = () => {
    setShowCreateUserModal(true);
  };

  const handleOrganizationChange = async (selectedOption) => {
    setPageLoading(true);
    console.log("Setting organization to: " + JSON.stringify(selectedOption));
    history.push(`/settings/${selectedOption.id}/users`);
    setCurrentOrganizationDomain(selectedOption.id);
    await getUsersByDomain(selectedOption.id);
    setPageLoading(false);
  };

  if (!accessRoleData || pageLoading) {
    return (<LoadingDialog size="sm"/>);
  } else if (!accessRoleData.Administrator && !accessRoleData.OpseraAdministrator) {
    return (<AccessDeniedDialog roleData={accessRoleData}/>);
  } else {
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
            <div className="mt-1">
              <Button variant="primary" size="sm"
                      onClick={() => {
                        createUser();
                      }}>
                <FontAwesomeIcon icon={faPlus} className="mr-1"/>New User
              </Button>
            </div>
            <br/>
          </div>
        </div>

        <div className="full-height">
          {userList && <LdapUsersTable orgDomain={orgDomain} userData={userList}/>}
        </div>
        <NewLdapUserModal organizationName={organization.name} showModal={showCreateUserModal} setShowModal={setShowCreateUserModal} loadData={loadData}/>
      </div>
    );
  }

}


export default LdapUserManagement;