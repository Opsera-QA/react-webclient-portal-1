import React, {useContext, useState, useEffect, useRef} from "react";
import {useHistory, useParams} from "react-router-dom";
import {DialogToastContext} from "contexts/DialogToastContext";
import Model from "core/data_model/model";
import {AuthContext} from "contexts/AuthContext";
import {ldapGroupMetaData} from "components/settings/ldap_groups/ldapGroup.metadata";
import accountsActions from "components/admin/accounts/accounts-actions";
import LoadingDialog from "components/common/status_notifications/loading";
import LdapGroupDetailPanel from "components/settings/ldap_groups/details/LdapGroupDetailPanel";
import ActionBarContainer from "components/common/actions/ActionBarContainer";
import ActionBarBackButton from "components/common/actions/buttons/ActionBarBackButton";
import ActionBarDeleteButton2 from "components/common/actions/buttons/ActionBarDeleteButton2";
import DetailScreenContainer from "components/common/panels/detail_view_container/DetailScreenContainer";
import axios from "axios";
import GroupManagementSubNavigationBar from "components/settings/ldap_groups/GroupManagementSubNavigationBar";

// TODO: Can we get an API Call to get role group names associated with an organization?
const roleGroups = ["Administrators", "PowerUsers", "Users"];

function LdapGroupDetailView() {
  const history = useHistory();
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
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;

    loadData(source).catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, []);

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      await getRoles(cancelSource);
    }
    catch (error) {
      if (isMounted.current === true && !error?.error?.message?.includes(404)) {
        console.error(error);
        toastContext.showLoadingErrorDialog(error);
      }
    }
    finally {
      if (isMounted.current === true) {
        setIsLoading(false);
      }
    }
  };

  const getGroup = async (cancelSource = cancelTokenSource) => {
    const user = await getUserRecord();
    const response = await accountsActions.getGroupV2(getAccessToken, cancelSource, orgDomain, groupName);

    if (isMounted.current === true && response?.data) {
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

  const getLdapUsers = async (domain, cancelSource = cancelTokenSource) => {
    if (domain != null) {
      const response = await accountsActions.getLdapUsersWithDomainV2(getAccessToken, cancelSource, domain);
      let ldapUsers = response?.data;

      if (isMounted.current === true && ldapUsers) {
        setLdapUsers(ldapUsers);
      }
    }
  };

  const getRoles = async (cancelSource = cancelTokenSource) => {
    const user = await getUserRecord();
    let {ldap} = user;
    setCurrentUserEmail(user.email);
    const userRoleAccess = await setAccessRoles(user);

    if (userRoleAccess) {
      setAccessRoleData(userRoleAccess);
      let authorizedActions;

      if (roleGroups.includes(groupName)) {
        history.push(`/settings/${orgDomain}/role-groups/details/${groupName}`);
        return;
      }

      authorizedActions = await accountsActions.getAllowedGroupActions(userRoleAccess, ldap.organization, getUserRecord, getAccessToken);
      setAuthorizedActions(authorizedActions);

      if (!groupName.startsWith("_dept")) {
        setCanDelete(authorizedActions.includes("delete_group"));
      }

      if (authorizedActions.includes("get_group_details")) {
        await getLdapUsers(orgDomain, cancelSource);
        await getGroup(cancelSource);
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
      metadata={ldapGroupMetaData}
      dataObject={ldapGroupData}
      isLoading={isLoading}
      navigationTabContainer={<GroupManagementSubNavigationBar activeTab={"groupViewer"} />}
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