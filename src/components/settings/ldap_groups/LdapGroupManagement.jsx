import React, {useState, useEffect, useContext} from "react";
import {Button} from "react-bootstrap";
import {AuthContext} from "contexts/AuthContext";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import {useHistory, useParams} from "react-router-dom";
import LdapGroupsTable from "./LdapGroupsTable";
import NewLdapGroupModal from "./NewLdapGroupModal";
import LoadingDialog from "components/common/status_notifications/loading";
import AccessDeniedDialog from "components/common/status_notifications/accessDeniedInfo";
import BreadcrumbTrail from "components/common/navigation/breadcrumbTrail";
import accountsActions from "components/admin/accounts/accounts-actions";
import {DialogToastContext} from "contexts/DialogToastContext";
import {getOrganizationByDomain} from "components/admin/accounts/ldap/organizations/organization-functions";


function LdapGroupManagement() {
  const history = useHistory();
  const {orgDomain} = useParams();
  const [accessRoleData, setAccessRoleData] = useState(undefined);
  const {getUserRecord, setAccessRoles, getAccessToken} = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);
  const [groupList, setGroupList] = useState([]);
  const [ldapOrganizationData, setLdapOrganizationData] = useState();
  const [currentUserEmail, setCurrentUserEmail] = useState(undefined);
  const [showCreateGroupModal, setShowCreateGroupModal] = useState(false);
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
      setAuthorizedActions(authorizedActions);

      if (orgDomain != null && userRoleAccess.OpseraAdministrator) {
        await getGroupsByDomain(orgDomain);
      } else if (ldap.domain != null && authorizedActions.includes("get_groups")) {
        history.push(`/settings/${ldap.domain}/groups`);
        await getGroupsByDomain(ldap.domain);
      }
    }
  };

  const createGroup = () => {
    setShowCreateGroupModal(true);
  };

  if (!accessRoleData) {
    return (<LoadingDialog size="sm"/>);
  }

  if (!authorizedActions.includes("get_groups") && !isLoading) {
    return (<AccessDeniedDialog roleData={accessRoleData}/>);
  }

    return (
      <div>
          <BreadcrumbTrail destination={"ldapGroupManagement"} />
          <div className="justify-content-between mb-1 d-flex">
            <h5>Groups Management</h5>
            <div className="d-flex">
              {/*<div className="tableDropdown mr-2">*/}
              {/*  {accessRoleData.OpseraAdministrator && <LdapOrganizationSelectInput currentOrganizationDomain={currentOrganizationDomain} location={"groups"} />}*/}
              {/*</div>*/}
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
            <LdapGroupsTable isLoading={isLoading} groupData={groupList} orgDomain={orgDomain}/>
          </div>
          <NewLdapGroupModal loadData={loadData} authorizedActions={authorizedActions} orgDomain={orgDomain} showModal={showCreateGroupModal} currentUserEmail={currentUserEmail} setShowModal={setShowCreateGroupModal}/>
      </div>
    );
}


export default LdapGroupManagement;