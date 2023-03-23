import React, {useState, useEffect} from "react";
import {useHistory, useParams} from "react-router-dom";
import accountsActions from "components/admin/accounts/accounts-actions";
import ScreenContainer from "components/common/panels/general/ScreenContainer";
import SiteRoleManagementSubNavigationBar from "components/settings/ldap_site_roles/SiteRoleManagementSubNavigationBar";
import SiteRolesHelpDocumentation from "../../common/help/documentation/settings/SiteRolesHelpDocumentation";
import CenteredContentWrapper from "components/common/wrapper/CenteredContentWrapper";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import useComponentStateReference from "hooks/useComponentStateReference";
import SiteRoleManagementPageLinkCards from "components/settings/ldap_site_roles/cards/SiteRoleManagementPageLinkCards";
import CenterLoadingIndicator from "components/common/loading/CenterLoadingIndicator";
import MessageFieldBase from "components/common/fields/text/MessageFieldBase";
import {faExclamationCircle} from "@fortawesome/pro-light-svg-icons";
import WarningMessageFieldBase from "components/common/fields/text/message/WarningMessageFieldBase";
import LdapSiteRoleGroupRoleHelper
  from "@opsera/know-your-role/roles/accounts/groups/role/ldapSiteRoleGroupRole.helper";
import useGetLdapSiteRolesForDomain from "hooks/ldap/site_roles/useGetLdapSiteRolesForDomain";

export default function SiteRoleManagement() {
  const history = useHistory();
  const {orgDomain} = useParams();
  const {
    accessRoleData,
    userData,
    isOpseraAdministrator,
  } = useComponentStateReference();
  const {
    isLoading,
    siteRoles,
    loadData,
    error,
  } = useGetLdapSiteRolesForDomain(orgDomain);

  useEffect(() => {
    const ldap = userData?.ldap;

    if (orgDomain == null || (ldap.domain !== orgDomain && isOpseraAdministrator !== true)) {
      history.push(`/settings/${ldap.domain}/site-roles`);
    }

  }, [orgDomain]);

  const getBody = () => {
    if (isLoading === true) {
      return (
        <CenterLoadingIndicator type={"Site Roles"} />
      );
    }

    if (siteRoles?.length === 0) {
      return (
        <WarningMessageFieldBase
          className={"mx-2"}
          message={"There was an error loading Site Roles."}
        />
      );
    }

    return  (
      <SiteRoleManagementPageLinkCards
        siteRoles={siteRoles}
      />
    );
  };

  if (LdapSiteRoleGroupRoleHelper.canGetSiteRoleGroups(userData) !== true) {
    return null;
  }

  return (
    <ScreenContainer
      isLoading={!accessRoleData}
      navigationTabContainer={<SiteRoleManagementSubNavigationBar activeTab={"siteRoles"} />}
      breadcrumbDestination={"ldapSiteRolesManagement"}
      helpComponent={<SiteRolesHelpDocumentation/>}
      error={error}
    >
      <CenteredContentWrapper>
        <MessageFieldBase
          icon={faExclamationCircle}
          message={`
          If a user is not a member of one of these Site Roles, 
          they will have limited access to items that don't have RBAC applied.
        `}
        />
      </CenteredContentWrapper>
      {getBody()}
    </ScreenContainer>
  );
}