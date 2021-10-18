import React, {useContext, useState, useEffect, useRef} from "react";
import {useParams} from "react-router-dom";
import {DialogToastContext} from "contexts/DialogToastContext";
import Model from "core/data_model/model";
import {AuthContext} from "contexts/AuthContext";
import {ldapGroupMetaData} from "components/settings/ldap_groups/ldapGroup.metadata";
import accountsActions from "components/admin/accounts/accounts-actions";
import LoadingDialog from "components/common/status_notifications/loading";
import ActionBarContainer from "components/common/actions/ActionBarContainer";
import ActionBarBackButton from "components/common/actions/buttons/ActionBarBackButton";
import DetailScreenContainer from "components/common/panels/detail_view_container/DetailScreenContainer";
import axios from "axios";
import SiteRoleManagementSubNavigationBar from "components/settings/ldap_site_roles/SiteRoleManagementSubNavigationBar";
import SiteRoleDetailPanel from "components/settings/ldap_site_roles/details/SiteRoleDetailPanel";

// TODO: Can we get an API Call to get role group names associated with an organization?
const roleGroups = ["Administrators", "PowerUsers", "Users"];

function SiteRoleDetailView() {
  const {groupName, orgDomain} = useParams();
  const toastContext = useContext(DialogToastContext);
  const [accessRoleData, setAccessRoleData] = useState({});
  const { getUserRecord, setAccessRoles, getAccessToken } = useContext(AuthContext);
  const [ldapUsers, setLdapUsers] = useState([]);
  const [ldapGroupData, setLdapGroupData] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [authorizedActions, setAuthorizedActions] = useState([]);
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
  }, [groupName]);

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      await getRoles(cancelSource);
      setIsLoading(false);
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

  const getLdapUsers = async (cancelSource = cancelTokenSource) => {
    const response = await accountsActions.getLdapUsersWithDomainV2(getAccessToken, cancelSource, orgDomain);
    let ldapUsers = response?.data;

    if (isMounted.current === true && ldapUsers) {
      setLdapUsers(ldapUsers);
    }
  };

  const getRoles = async (cancelSource = cancelTokenSource) => {
    const user = await getUserRecord();
    const ldap = user?.ldap;
    const userRoleAccess = await setAccessRoles(user);

    if (userRoleAccess) {
      setAccessRoleData(userRoleAccess);
      let authorizedActions;

      authorizedActions = await accountsActions.getAllowedRoleGroupActions(userRoleAccess, ldap.organization, getUserRecord, getAccessToken);
      setAuthorizedActions(authorizedActions);

      if (authorizedActions.includes("get_group_details")) {
        await getLdapUsers(cancelSource);
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
            <ActionBarBackButton path={`/settings/${orgDomain}/site-roles`} />
          </div>
        </ActionBarContainer>
      );
    }
  };

  return (
    <DetailScreenContainer
      breadcrumbDestination={"ldapGroupDetailView"}
      metadata={ldapGroupMetaData}
      dataObject={ldapGroupData}
      isLoading={isLoading}
      navigationTabContainer={<SiteRoleManagementSubNavigationBar activeTab={"siteRoleViewer"}/>}
      actionBar={getActionBar()}
      accessDenied={!authorizedActions.includes("get_group_details") && !isLoading}
      detailPanel={
        <SiteRoleDetailPanel
          orgDomain={orgDomain}
          ldapGroupData={ldapGroupData}
          ldapUsers={ldapUsers}
          loadData={getRoles}
          authorizedActions={authorizedActions}
        />
      }
    />
  );
}

export default SiteRoleDetailView;