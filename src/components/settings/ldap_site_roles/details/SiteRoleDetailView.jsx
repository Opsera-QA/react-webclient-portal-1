import React, {useEffect} from "react";
import {useHistory, useParams} from "react-router-dom";
import {ldapGroupMetaData} from "components/settings/ldap_groups/ldapGroup.metadata";
import ActionBarContainer from "components/common/actions/ActionBarContainer";
import ActionBarBackButton from "components/common/actions/buttons/ActionBarBackButton";
import DetailScreenContainer from "components/common/panels/detail_view_container/DetailScreenContainer";
import SiteRoleManagementSubNavigationBar from "components/settings/ldap_site_roles/SiteRoleManagementSubNavigationBar";
import SiteRoleDetailPanel from "components/settings/ldap_site_roles/details/SiteRoleDetailPanel";
import SiteRoleHelper from "@opsera/know-your-role/roles/helper/site/siteRole.helper";
import LdapSiteRoleGroupRoleHelper
  from "@opsera/know-your-role/roles/accounts/groups/role/ldapSiteRoleGroupRole.helper";
import useComponentStateReference from "hooks/useComponentStateReference";
import useGetLdapSiteRoleModelByNameForDomain from "hooks/ldap/site_roles/useGetLdapSiteRoleModelByNameForDomain";

// TODO: Move to know-your-role
export const roleGroups = [
  SiteRoleHelper.SITE_ROLE_GROUP_NAMES.ADMINISTRATORS,
  SiteRoleHelper.SITE_ROLE_GROUP_NAMES.POWER_USERS,
  SiteRoleHelper.SITE_ROLE_GROUP_NAMES.USERS,
  SiteRoleHelper.SITE_ROLE_GROUP_NAMES.AUDITORS,
  SiteRoleHelper.SITE_ROLE_GROUP_NAMES.SECURITY_MANAGERS,
];

export default function SiteRoleDetailView() {
  const history = useHistory();
  const {groupName, orgDomain} = useParams();
  const {
    userData,
    isOpseraAdministrator,
  } = useComponentStateReference();
  const {
    isLoading,
    error,
    siteRoleModel,
    loadData,
  } = useGetLdapSiteRoleModelByNameForDomain(orgDomain, groupName);

  useEffect(() => {
    if (LdapSiteRoleGroupRoleHelper.canGetSiteRoleGroup(userData) === true) {
      const userDomain = userData?.ldap?.domain;

      if (groupName.startsWith("_dept")) {
        history.push(`/settings/${orgDomain}/departments/details/${groupName}`);
        return;
      }

      if (!roleGroups.includes(groupName)) {
        history.push(`/settings/${orgDomain}/groups/details/${groupName}`);
        return;
      }

      if (isOpseraAdministrator !== true && orgDomain !== userDomain) {
        history.push(`/settings/${userDomain}/site-roles/details/${groupName}`);
        return;
      }
    }
  }, [groupName]);

  const getActionBar = () => {
    return (
      <ActionBarContainer>
        <div>
          <ActionBarBackButton path={`/settings/${orgDomain}/site-roles`}/>
        </div>
      </ActionBarContainer>
    );
  };

  if (LdapSiteRoleGroupRoleHelper.canGetSiteRoleGroup(userData) !== true) {
    return null;
  }

  return (
    <DetailScreenContainer
      breadcrumbDestination={"ldapSiteRoleDetailView"}
      metadata={ldapGroupMetaData}
      dataObject={siteRoleModel}
      isLoading={isLoading}
      navigationTabContainer={<SiteRoleManagementSubNavigationBar activeTab={"siteRoleViewer"}/>}
      actionBar={getActionBar()}
      detailPanel={
        <SiteRoleDetailPanel
          orgDomain={orgDomain}
          ldapGroupData={siteRoleModel}
          loadData={loadData}
          isLoading={isLoading}
        />
      }
    />
  );
}
