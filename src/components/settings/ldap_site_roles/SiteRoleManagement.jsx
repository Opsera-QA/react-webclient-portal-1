import React, {useState, useEffect} from "react";
import {useHistory, useParams} from "react-router-dom";
import accountsActions from "components/admin/accounts/accounts-actions";
import ScreenContainer from "components/common/panels/general/ScreenContainer";
import {ROLE_LEVELS} from "components/common/helpers/role-helpers";
import SiteRoleManagementSubNavigationBar from "components/settings/ldap_site_roles/SiteRoleManagementSubNavigationBar";
import SiteRolesTable from "components/settings/ldap_site_roles/SiteRolesTable";
import SiteRolesHelpDocumentation from "../../common/help/documentation/settings/SiteRolesHelpDocumentation";
import H5FieldSubHeader from "components/common/fields/subheader/H5FieldSubHeader";
import CenteredContentWrapper from "components/common/wrapper/CenteredContentWrapper";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import useComponentStateReference from "hooks/useComponentStateReference";
import SiteRoleManagementPageLinkCards from "components/settings/ldap_site_roles/cards/SiteRoleManagementPageLinkCards";

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
      setIsLoading(true);
      await getRoleGroups();
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

  const getHelpComponent = () => {
      return (<SiteRolesHelpDocumentation/>);
  };

  if (isSaasUser === true) {
    return null;
  }

  return (
    <ScreenContainer
      isLoading={!accessRoleData}
      navigationTabContainer={<SiteRoleManagementSubNavigationBar activeTab={"siteRoles"} />}
      breadcrumbDestination={"ldapSiteRolesManagement"}
      pageDescription={"Site Roles determine a user’s level of accessibility. Manage Site Roles from this dashboard."}
      helpComponent={getHelpComponent()}
      accessRoleData={accessRoleData}
      roleRequirement={ROLE_LEVELS.ADMINISTRATORS}
    >
      <CenteredContentWrapper>
        <H5FieldSubHeader
          subheaderText={`
          If a user is not a member of one of these Site Roles, 
          they will have limited access to items that don't have RBAC applied.
        `}
        />
      </CenteredContentWrapper>
      <SiteRoleManagementPageLinkCards />
      <SiteRolesTable
        className={"mx-2"}
        isMounted={isMounted}
        isLoading={isLoading}
        siteRoles={siteRoles}
        loadData={loadData}
        orgDomain={orgDomain}
      />
    </ScreenContainer>
  );
}