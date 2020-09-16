import React, {useContext, useState, useEffect} from "react";
import {AuthContext} from "../../../../contexts/AuthContext";
import {useParams} from "react-router-dom";
import LoadingDialog from "../../../common/status_notifications/loading";
import "../../../admin/accounts/accounts.css";
import BreadcrumbTrail from "../../../common/navigation/breadcrumbTrail";
import LdapGroupSummaryPanel from "./LdapGroupSummaryPanel";
import LdapGroupDetailPanel from "./LdapGroupDetailPanel";
import accountsActions from "../../../admin/accounts/accounts-actions";
import AccessDeniedDialog from "../../../common/status_notifications/accessDeniedInfo";
import {ldapGroupMetaData} from "../ldap-groups-metadata";
import Model from "../../../../core/data_model/model";
import {faUserFriends} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {DialogToastContext} from "../../../../contexts/DialogToastContext";

// TODO: Can we get an API Call to get role group names associated with an organization?
const roleGroups = ["Administrators", "PowerUsers", "Users"];

function LdapGroupDetailView() {
  const {groupName, orgDomain} = useParams();
  const toastContext = useContext(DialogToastContext);
  const [accessRoleData, setAccessRoleData] = useState({});
  const { getUserRecord, setAccessRoles, getAccessToken } = useContext(AuthContext);
  const [ldapOrganizationData, setLdapOrganizationData] = useState(undefined);
  const [ldapGroupData, setLdapGroupData] = useState(undefined);
  const [currentUserEmail, setCurrentUserEmail] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);
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

  // TODO: Can we get a getGroupOwnerEmail api with name, so we can cut off loading the group
  const getGroup = async () => {
    const user = await getUserRecord();
    const response = await accountsActions.getGroup(orgDomain, groupName, getAccessToken);
    setLdapGroupData(new Model(response.data, ldapGroupMetaData, false));
    let isOwner = user.email === response.data["ownerEmail"];

    if (isOwner) {
      setAuthorizedActions(["get_group_details", "update_group", "update_group_membership"]);
    }
  };

  const getOrganization = async (domain) => {
    if (domain != null) {
      const response = await accountsActions.getOrganizationAccountByDomain(domain, getAccessToken);
      let ldapOrganizationData = response.data;
      setLdapOrganizationData(ldapOrganizationData);
    }
  };

  const getRoles = async () => {
    const user = await getUserRecord();
    let {ldap} = user;
    setCurrentUserEmail(user.email);
    const userRoleAccess = await setAccessRoles(user);

    if (userRoleAccess) {
      setAccessRoleData(userRoleAccess);
      let authorizedActions;

      if (roleGroups.includes(groupName)) {
        authorizedActions = await accountsActions.getAllowedRoleGroupActions(userRoleAccess, ldap.organization, getUserRecord, getAccessToken);
        console.log("Authorized Role Group Actions: " + JSON.stringify(authorizedActions));
        setAuthorizedActions(authorizedActions);
      }
      else {
        authorizedActions = await accountsActions.getAllowedGroupActions(userRoleAccess, ldap.organization, getUserRecord, getAccessToken);
        console.log("Authorized Custom Group Actions: " + JSON.stringify(authorizedActions));
        setAuthorizedActions(authorizedActions);
      }

      if (authorizedActions.includes("get_group_details")) {
        await getOrganization(orgDomain);
        await getGroup();
      }
    }
  };

  if (!accessRoleData || isLoading) {
    return (<LoadingDialog size="sm"/>);
  }

  if (!authorizedActions.includes("get_group_details") && !isLoading) {
    return (<AccessDeniedDialog roleData={accessRoleData} />);
  }

    return (
      <>
        {ldapOrganizationData && ldapGroupData &&
        <div className="max-content-width">
          <BreadcrumbTrail destination="ldapGroupDetailView"/>
          <div className="content-container content-card-1 ml-2">
            <div className="pt-2 pl-2 content-block-header">
              <h6><FontAwesomeIcon icon={faUserFriends} fixedWidth className="mr-1" />Group Details [{ldapGroupData && ldapGroupData.name}]</h6>
            </div>
            <div className="detail-view-body">
              <div>
                <LdapGroupSummaryPanel ldapGroupData={ldapGroupData} domain={orgDomain}/>
              </div>
              <div>
                <LdapGroupDetailPanel orgDomain={orgDomain} ldapGroupData={ldapGroupData} ldapOrganizationData={ldapOrganizationData}
                                      currentUserEmail={currentUserEmail} setLdapGroupData={setLdapGroupData} loadData={getRoles} authorizedActions={authorizedActions}/>
              </div>
            </div>
            <div className="content-block-footer"/>
          </div>
        </div>
        }
      </>);
}

export default LdapGroupDetailView;