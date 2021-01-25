import React, {useContext, useState, useEffect} from "react";
import {useParams} from "react-router-dom";
import {faUserFriends} from "@fortawesome/pro-light-svg-icons";
import {DialogToastContext} from "contexts/DialogToastContext";
import Model from "core/data_model/model";
import {AuthContext} from "contexts/AuthContext";
import {ldapGroupMetaData} from "components/settings/ldap_groups/ldap-groups-metadata";
import accountsActions from "components/admin/accounts/accounts-actions";
import LoadingDialog from "components/common/status_notifications/loading";
import LdapGroupDetailPanel from "components/settings/ldap_groups/ldap_group_detail/LdapGroupDetailPanel";
import ActionBarContainer from "components/common/actions/ActionBarContainer";
import ActionBarBackButton from "components/common/actions/buttons/ActionBarBackButton";
import ActionBarDeleteButton2 from "components/common/actions/buttons/ActionBarDeleteButton2";
import DetailScreenContainer from "components/common/panels/detail_view_container/DetailScreenContainer";

// TODO: Can we get an API Call to get role group names associated with an organization?
const roleGroups = ["Administrators", "PowerUsers", "Users"];

function LdapGroupDetailView() {
  const {groupName, orgDomain} = useParams();
  const toastContext = useContext(DialogToastContext);
  const [accessRoleData, setAccessRoleData] = useState({});
  const { getUserRecord, setAccessRoles, getAccessToken } = useContext(AuthContext);
  const [ldapUsers, setLdapUsers] = useState([]);
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

  const getGroup = async () => {
    const user = await getUserRecord();
    const response = await accountsActions.getGroup(orgDomain, groupName, getAccessToken);

    if (response?.data) {
      setLdapGroupData(new Model(response.data, ldapGroupMetaData, false));
      let isOwner = user.email === response.data["ownerEmail"];

      if (isOwner) {
        let authorizedActions = ["get_group_details", "update_group", "update_group_membership"];

        if (!roleGroups.includes(groupName) && !groupName.startsWith("_dept")) {
          authorizedActions.push("delete_group");
        }

        setAuthorizedActions(authorizedActions);


      }
    }
  };

  const getLdapUsers = async (domain) => {
    if (domain != null) {
      const response = await accountsActions.getLdapUsersWithDomain(domain, getAccessToken);
      let ldapUsers = response?.data;

      if (ldapUsers) {
        setLdapUsers(ldapUsers);
      }
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
        await getLdapUsers(orgDomain);
        await getGroup();
      }
    }
  };

  if (!accessRoleData) {
    return (<LoadingDialog size="sm"/>);
  }

  const getActionBar = () => {
    if (ldapGroupData != null) {
      return (
        <ActionBarContainer>
          <div>
            <ActionBarBackButton path={`/settings/${orgDomain}/groups`} />
          </div>
          <div>
            {canDelete && <ActionBarDeleteButton2 relocationPath={`/settings/${orgDomain}/groups`} dataObject={ldapGroupData} handleDelete={deleteGroup}/>}
          </div>
        </ActionBarContainer>
      );
    }
  };

  const deleteGroup = () => {
    return accountsActions.deleteGroup(orgDomain, ldapGroupData, getAccessToken);
  };

  return (
    <DetailScreenContainer
      breadcrumbDestination={"ldapGroupDetailView"}
      title={ldapGroupData != null ? `Group Details [${ldapGroupData && ldapGroupData.name}]` : undefined}
      managementViewLink={`/settings/${orgDomain}/groups`}
      managementTitle={"Groups"}
      managementViewIcon={faUserFriends}
      type={"Group"}
      titleIcon={faUserFriends}
      dataObject={ldapGroupData}
      isLoading={isLoading}
      actionBar={getActionBar()}
      accessDenied={!authorizedActions.includes("get_group_details") && !isLoading}
      detailPanel={
        <LdapGroupDetailPanel
          orgDomain={orgDomain}
          ldapGroupData={ldapGroupData}
          ldapUsers={ldapUsers}
          currentUserEmail={currentUserEmail}
          setLdapGroupData={setLdapGroupData}
          loadData={getRoles}
          authorizedActions={authorizedActions}
        />
      }
    />
  );
}

export default LdapGroupDetailView;