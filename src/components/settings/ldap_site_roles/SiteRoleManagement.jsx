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

export default function SiteRoleManagement() {
  const history = useHistory();
  const {orgDomain} = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [siteRoles, setSiteRoles] = useState([]);
  const {
    accessRoleData,
    userData,
    cancelTokenSource,
    isMounted,
    toastContext,
    getAccessToken,
    isSaasUser,
    isOpseraAdministrator,
  } = useComponentStateReference();

  useEffect(() => {
    const ldap = userData?.ldap;

    if (orgDomain == null || (ldap.domain !== orgDomain && isOpseraAdministrator !== true)) {
      history.push(`/settings/${ldap.domain}/site-roles`);
    }

    loadData().catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });
  }, [orgDomain]);

  const loadData = async () => {
    try {
      setSiteRoles([]);

      if (LdapSiteRoleGroupRoleHelper.canGetSiteRoleGroups(userData) === true) {
        setIsLoading(true);
        await getRoleGroups();
      }
    }
    catch (error) {
      if (isMounted?.current === true) {
        toastContext.showLoadingErrorDialog(error);
      }
    }
    finally {
      if (isMounted?.current === true && orgDomain != null) {
        setIsLoading(false);
      }
    }
  };

  const getRoleGroups = async (cancelSource = cancelTokenSource) => {
    if (orgDomain != null) {
      const response = await accountsActions.getLdapRoleGroupsWithDomainV2(getAccessToken, cancelSource, orgDomain);
      const roleGroups = DataParsingHelper.parseArray(response?.data?.data, []);

      if (Array.isArray(roleGroups)) {
        setSiteRoles(roleGroups);
      }
    }
  };

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