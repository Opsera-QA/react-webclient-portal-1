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
import {faUser, faUserFriends} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {DialogToastContext} from "../../../../contexts/DialogToastContext";
import DetailViewContainer from "../../../common/panels/detail_view_container/DetailViewContainer";
import LdapUserSummaryPanel from "../../ldap_users/users_detail_view/LdapUserSummaryPanel";
import LdapUserDetailPanel from "../../ldap_users/users_detail_view/LdapUserDetailPanel";

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
  const [canDelete, setCanDelete] = useState(false);

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
      let authorizedActions = ["get_group_details", "update_group", "update_group_membership"];

      if (!roleGroups.includes(groupName) && !groupName.startsWith("_dept")) {
        authorizedActions.push("delete_group");
      }

      setAuthorizedActions(authorizedActions);
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
        setAuthorizedActions(authorizedActions);
      }
      else {
        authorizedActions = await accountsActions.getAllowedGroupActions(userRoleAccess, ldap.organization, getUserRecord, getAccessToken);
        setAuthorizedActions(authorizedActions);

        if (!groupName.startsWith("_dept")) {
          setCanDelete(authorizedActions.includes("delete_group"));
        }
      }

      if (authorizedActions.includes("get_group_details")) {
        await getOrganization(orgDomain);
        await getGroup();
      }
    }
  };

  if (!accessRoleData) {
    return (<LoadingDialog size="sm"/>);
  }

  if (!authorizedActions.includes("get_group_details") && !isLoading) {
    return (<AccessDeniedDialog roleData={accessRoleData} />);
  }

    return (
      <DetailViewContainer
        breadcrumbDestination={"ldapGroupDetailView"}
        title={ldapGroupData != null ? `Group Details [${ldapGroupData && ldapGroupData.name}]` : undefined}
        titleIcon={faUserFriends}
        isLoading={isLoading}
        summaryPanel={<LdapGroupSummaryPanel ldapGroupData={ldapGroupData} domain={orgDomain} canDelete={canDelete}/>}
        detailPanel={<LdapGroupDetailPanel orgDomain={orgDomain} ldapGroupData={ldapGroupData} ldapOrganizationData={ldapOrganizationData}
                                           currentUserEmail={currentUserEmail} setLdapGroupData={setLdapGroupData} loadData={getRoles} authorizedActions={authorizedActions}/>}
      />
    );
}

export default LdapGroupDetailView;