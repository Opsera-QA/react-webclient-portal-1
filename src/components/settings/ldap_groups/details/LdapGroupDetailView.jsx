import React, {useEffect} from "react";
import {useHistory, useParams} from "react-router-dom";
import {ldapGroupMetaData} from "components/settings/ldap_groups/ldapGroup.metadata";
import LdapGroupDetailPanel from "components/settings/ldap_groups/details/LdapGroupDetailPanel";
import ActionBarContainer from "components/common/actions/ActionBarContainer";
import ActionBarBackButton from "components/common/actions/buttons/ActionBarBackButton";
import DetailScreenContainer from "components/common/panels/detail_view_container/DetailScreenContainer";
import GroupManagementSubNavigationBar from "components/settings/ldap_groups/GroupManagementSubNavigationBar";
import useComponentStateReference from "hooks/useComponentStateReference";
import {roleGroups} from "components/settings/ldap_site_roles/details/SiteRoleDetailView";
import LdapUserGroupRoleHelper from "@opsera/know-your-role/roles/accounts/groups/user/ldapUserGroupRole.helper";
import DeleteGroupActionBarButton from "components/settings/ldap_groups/DeleteGroupActionBarButton";
import useGetLdapGroupModelByNameForDomain from "hooks/ldap/groups/useGetLdapGroupModelByNameForDomain";

export default function LdapGroupDetailView() {
  const history = useHistory();
  const {groupName, orgDomain} = useParams();
  const {
    userData,
    isMounted,
    isOpseraAdministrator,
  } = useComponentStateReference();
  const {
    isLoading,
    groupModel,
    setGroupModel,
    error,
    loadData,
  } = useGetLdapGroupModelByNameForDomain(orgDomain, groupName,);

  useEffect(() => {
    const userDomain = userData?.ldap?.domain;

    if (roleGroups.includes(groupName)) {
      history.push(`/settings/${orgDomain}/site-roles/details/${groupName}`);
      return;
    }

    if (groupName.startsWith("_dept")) {
      history.push(`/settings/${orgDomain}/departments/details/${groupName}`);
      return;
    }

    if (isOpseraAdministrator !== true && orgDomain !== userDomain) {
      history.push(`/settings/${orgDomain}/groups/details/${groupName}`);
      return;
    }

    loadData().catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });
  }, [userData]);

  const getActionBar = () => {
    return (
      <ActionBarContainer>
        <div>
          <ActionBarBackButton path={`/settings/${orgDomain}/groups`}/>
        </div>
        <div>
          <DeleteGroupActionBarButton
            orgDomain={orgDomain}
            groupModel={groupModel}
          />
        </div>
      </ActionBarContainer>
    );
  };

  if (LdapUserGroupRoleHelper.canGetUserGroupsList(userData) !== true) {
    return null;
  }

  return (
    <DetailScreenContainer
      breadcrumbDestination={"ldapGroupDetailView"}
      metadata={ldapGroupMetaData}
      dataObject={groupModel}
      isLoading={isLoading}
      navigationTabContainer={<GroupManagementSubNavigationBar activeTab={"groupViewer"} />}
      actionBar={getActionBar()}
      detailPanel={
        <LdapGroupDetailPanel
          orgDomain={orgDomain}
          ldapGroupData={groupModel}
          setLdapGroupData={setGroupModel}
          loadData={loadData}
          isLoading={isLoading}
        />
      }
    />
  );
}
