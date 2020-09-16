import React, {useState, useEffect, useContext} from "react";
import {Button} from "react-bootstrap";
import {AuthContext} from "contexts/AuthContext";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import {Link, useHistory, useParams} from "react-router-dom";
import LdapGroupsTable from "./LdapGroupsTable";
import NewLdapGroupModal from "./NewLdapGroupModal";
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


function LdapGroupManagement() {
  const history = useHistory();
  const {orgDomain} = useParams();
  const [accessRoleData, setAccessRoleData] = useState(undefined);
  const {getUserRecord, setAccessRoles, getAccessToken} = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);
  const [groupList, setGroupList] = useState([]);
  const [currentOrganizationDomain, setCurrentOrganizationDomain] = useState("");
  const [organizationList, setOrganizationList] = useState(undefined);
  const [ldapOrganizationData, setLdapOrganizationData] = useState();
  const [currentUserEmail, setCurrentUserEmail] = useState(undefined);
  const [showCreateGroupModal, setShowCreateGroupModal] = useState(false);
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

  const getGroupsByEmail = async (email) => {
    let organization = await getOrganizationByEmail(email, getAccessToken);
    setLdapOrganizationData(organization);
    setGroupList(organization["groups"]);
  };

  const getGroupsByDomain = async (ldapDomain) => {
    if (ldapDomain != null) {
      try {
        let organization = await getOrganizationByDomain(ldapDomain, getAccessToken);
        setLdapOrganizationData(organization);
        setGroupList(organization["groups"]);
      } catch (error) {
        toastContext.showLoadingErrorDialog(error.message);
        console.error(error.message);
      }
    }
  };

  const getRoles = async () => {
    const user = await getUserRecord();
    const userRoleAccess = await setAccessRoles(user);
    const {ldap} = user;
    setCurrentUserEmail(user.email);

    if (userRoleAccess) {
      setAccessRoleData(userRoleAccess);

      let authorizedActions = await accountsActions.getAllowedGroupActions(userRoleAccess, ldap.organization, getUserRecord, getAccessToken);
      console.log("Authorized Actions: " + JSON.stringify(authorizedActions));
      setAuthorizedActions(authorizedActions);

      if (orgDomain != null && userRoleAccess.OpseraAdministrator) {
        setCurrentOrganizationDomain(orgDomain);
        await getGroupsByDomain(orgDomain);
      } else if (ldap.domain != null && authorizedActions.includes("get_groups")) {
        history.push(`/settings/${ldap.domain}/groups`);
        setCurrentOrganizationDomain(ldap.domain);
        await getGroupsByDomain(ldap.domain);
      }

      if (userRoleAccess.OpseraAdministrator) {
        try {
          const organizationList = await getOrganizationList(getAccessToken);
          setOrganizationList(organizationList);
        } catch (error) {
          toastContext.showLoadingErrorDialog(error.message);
          console.error(error.message);
        }
      }
    }

  };

  const createGroup = () => {
    setShowCreateGroupModal(true);
  };

  const handleOrganizationChange = async (selectedOption) => {
    setIsLoading(true)
    history.push(`/settings/${selectedOption.id}/groups`);
    setCurrentOrganizationDomain(selectedOption.id);
    await getGroupsByDomain(selectedOption.id);
    setIsLoading(false)
  };

  if (!accessRoleData) {
    return (<LoadingDialog size="sm"/>);
  }

  if (!authorizedActions.includes("get_groups") && !isLoading) {
    return (<AccessDeniedDialog roleData={accessRoleData}/>);
  }

    return (
      <div>
        <>
          <BreadcrumbTrail destination={"ldapGroupManagement"} />
          <div className="justify-content-between mb-1 d-flex">
            <h5>Groups Management</h5>
            <div className="d-flex">
              <div className="tableDropdown mr-2">
                {accessRoleData.OpseraAdministrator && organizationList && <DropdownList
                  data={organizationList}
                  value={currentOrganizationDomain}
                  valueField='id'
                  textField='text'
                  placeholder="Select an Organization Account"
                  groupBy={org => org["groupId"]}
                  onChange={handleOrganizationChange}
                />}
              </div>
              <div className="">
                {authorizedActions.includes("create_group") && <Button variant="primary" size="sm"
                        onClick={() => {
                          createGroup(ldapOrganizationData);
                        }}>
                  <FontAwesomeIcon icon={faPlus} className="mr-1"/>New Group
                </Button>}
              </div>
              <br/>
              <br/>
            </div>
          </div>

          <div className="full-height">
            {groupList && <LdapGroupsTable isLoading={isLoading} groupData={groupList} orgDomain={orgDomain}/>}
          </div>

          <NewLdapGroupModal loadData={loadData} ldapOrganizationData={ldapOrganizationData} showModal={showCreateGroupModal} currentUserEmail={currentUserEmail} setShowModal={setShowCreateGroupModal}/>
          </>
      </div>
    );
}


export default LdapGroupManagement;