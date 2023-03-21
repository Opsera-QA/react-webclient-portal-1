import React, {useState, useEffect} from "react";
import {useHistory, useParams} from "react-router-dom";
import Model from "core/data_model/model";
import {ldapGroupMetaData} from "components/settings/ldap_groups/ldapGroup.metadata";
import accountsActions from "components/admin/accounts/accounts-actions";
import LoadingDialog from "components/common/status_notifications/loading";
import ActionBarContainer from "components/common/actions/ActionBarContainer";
import ActionBarBackButton from "components/common/actions/buttons/ActionBarBackButton";
import DetailScreenContainer from "components/common/panels/detail_view_container/DetailScreenContainer";
import SiteRoleManagementSubNavigationBar from "components/settings/ldap_site_roles/SiteRoleManagementSubNavigationBar";
import SiteRoleDetailPanel from "components/settings/ldap_site_roles/details/SiteRoleDetailPanel";
import SiteRoleHelper from "@opsera/know-your-role/roles/helper/site/siteRole.helper";
import LdapSiteRoleGroupRoleHelper
  from "@opsera/know-your-role/roles/accounts/groups/role/ldapSiteRoleGroupRole.helper";
import useComponentStateReference from "hooks/useComponentStateReference";

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
  const [ldapGroupData, setLdapGroupData] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const {
    accessRoleData,
    cancelTokenSource,
    toastContext,
    isMounted,
    userData,
    getAccessToken,
    isOpseraAdministrator,
  } = useComponentStateReference();

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

      loadData().catch((error) => {
        if (isMounted?.current === true) {
          throw error;
        }
      });
    }
  }, [groupName]);

  const loadData = async () => {
    try {
      setIsLoading(true);
      await getSiteRole();
      setIsLoading(false);
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

  const getSiteRole = async () => {
    const response = await accountsActions.getGroupV2(getAccessToken, cancelTokenSource, orgDomain, groupName);

    if (isMounted.current === true && response?.data) {
      setLdapGroupData(new Model(response.data, ldapGroupMetaData, false));
    }
  };

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

  if (!accessRoleData) {
    return (<LoadingDialog size="sm"/>);
  }

  if (LdapSiteRoleGroupRoleHelper.canGetSiteRoleGroup(userData) !== true) {
    return null;
  }

  return (
    <DetailScreenContainer
      breadcrumbDestination={"ldapSiteRoleDetailView"}
      metadata={ldapGroupMetaData}
      dataObject={ldapGroupData}
      isLoading={isLoading && ldapGroupData == null}
      navigationTabContainer={<SiteRoleManagementSubNavigationBar activeTab={"siteRoleViewer"}/>}
      actionBar={getActionBar()}
      detailPanel={
        <SiteRoleDetailPanel
          orgDomain={orgDomain}
          ldapGroupData={ldapGroupData}
          loadData={loadData}
          isLoading={isLoading}
        />
      }
    />
  );
}
