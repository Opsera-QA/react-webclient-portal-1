import React, {useState, useEffect} from "react";
import {useHistory, useParams} from "react-router-dom";
import Model from "core/data_model/model";
import {ldapGroupMetaData} from "components/settings/ldap_groups/ldapGroup.metadata";
import accountsActions from "components/admin/accounts/accounts-actions";
import LdapGroupDetailPanel from "components/settings/ldap_groups/details/LdapGroupDetailPanel";
import ActionBarContainer from "components/common/actions/ActionBarContainer";
import ActionBarBackButton from "components/common/actions/buttons/ActionBarBackButton";
import ActionBarDeleteButton2 from "components/common/actions/buttons/ActionBarDeleteButton2";
import DetailScreenContainer from "components/common/panels/detail_view_container/DetailScreenContainer";
import GroupManagementSubNavigationBar from "components/settings/ldap_groups/GroupManagementSubNavigationBar";
import useComponentStateReference from "hooks/useComponentStateReference";

// TODO: Can we get an API Call to get role group names associated with an organization?
const roleGroups = ["Administrators", "PowerUsers", "Users"];

function LdapGroupDetailView() {
  const history = useHistory();
  const {groupName, orgDomain} = useParams();
  const [ldapGroupData, setLdapGroupData] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [canDelete, setCanDelete] = useState(false);
  const {
    accessRoleData,
    getAccessToken,
    toastContext,
    cancelTokenSource,
    userData,
    isMounted,
    isOpseraAdministrator,
    isSiteAdministrator,
    isPowerUser,
  } = useComponentStateReference();

  useEffect(() => {

    const userDomain = userData?.ldap?.domain;
    if (isOpseraAdministrator !== true && orgDomain !== userDomain) {
      history.push(`/settings/${orgDomain}/groups/details/${groupName}`);
      return;
    }

    if (roleGroups.includes(groupName)) {
      history.push(`/settings/${orgDomain}/site-roles/details/${groupName}`);
      return;
    }

    if (groupName.startsWith("_dept")) {
      history.push(`/settings/${orgDomain}/departments/details/${groupName}`);
      return;
    }

    loadData().catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });
  }, [userData]);

  const loadData = async () => {
    try {
      setIsLoading(true);
      if (
        accessRoleData?.OpseraAdministrator
        || accessRoleData?.Administrator
        || accessRoleData?.PowerUser
        || accessRoleData?.OrganizationOwner
        || accessRoleData?.OrganizationAccountOwner
      ) {
        await getGroup();
      }
    }
    catch (error) {
      if (isMounted.current === true && !error?.error?.message?.includes(404)) {
        toastContext.showLoadingErrorDialog(error);
      }
    }
    finally {
      if (isMounted.current === true) {
        setIsLoading(false);
      }
    }
  };

  const getGroup = async (cancelSource = cancelTokenSource, userRoleAccess) => {
    const response = await accountsActions.getGroupV2(getAccessToken, cancelTokenSource, orgDomain, groupName);

    if (isMounted.current === true && response?.data) {
      setLdapGroupData(new Model(response.data, ldapGroupMetaData, false));
      let isOwner = userData?.email === response.data["ownerEmail"];

      if (
        userRoleAccess?.OpseraAdministrator
        || userRoleAccess?.Administrator
        || userRoleAccess?.OrganizationOwner
        || userRoleAccess?.OrganizationAccountOwner
        || isOwner === true
      ) {
        setCanDelete(true);
      }
    }
  };

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

  if (
    isSiteAdministrator !== true
    && isOpseraAdministrator !== true
    && isPowerUser !== true
  ) {
    return null;
  }

  return (
    <DetailScreenContainer
      breadcrumbDestination={"ldapGroupDetailView"}
      metadata={ldapGroupMetaData}
      dataObject={ldapGroupData}
      isLoading={isLoading}
      navigationTabContainer={<GroupManagementSubNavigationBar activeTab={"groupViewer"} />}
      actionBar={getActionBar()}
      detailPanel={
        <LdapGroupDetailPanel
          orgDomain={orgDomain}
          ldapGroupData={ldapGroupData}
          currentUserEmail={userData?.email}
          setLdapGroupData={setLdapGroupData}
          loadData={loadData}
        />
      }
    />
  );
}

export default LdapGroupDetailView;