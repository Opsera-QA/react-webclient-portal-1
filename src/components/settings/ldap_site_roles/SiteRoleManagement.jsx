import React, {useState, useEffect, useContext, useRef} from "react";
import {AuthContext} from "contexts/AuthContext";
import {useHistory, useParams} from "react-router-dom";
import accountsActions from "components/admin/accounts/accounts-actions";
import {DialogToastContext} from "contexts/DialogToastContext";
import ScreenContainer from "components/common/panels/general/ScreenContainer";
import {ROLE_LEVELS} from "components/common/helpers/role-helpers";
import axios from "axios";
import SiteRoleManagementSubNavigationBar from "components/settings/ldap_site_roles/SiteRoleManagementSubNavigationBar";
import SiteRolesTable from "components/settings/ldap_site_roles/SiteRolesTable";
import SiteRolesHelpDocumentation from "../../common/help/documentation/settings/SiteRolesHelpDocumentation";

function SiteRoleManagement() {
  const history = useHistory();
  const {orgDomain} = useParams();
  const [accessRoleData, setAccessRoleData] = useState(undefined);
  const {getUserRecord, setAccessRoles, getAccessToken} = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);
  const [siteRoles, setSiteRoles] = useState([]);
  const [siteRoleMetadata, setSiteRoleMetadata] = useState(undefined);
  const toastContext = useContext(DialogToastContext);
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
  }, [orgDomain]);

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      await getRoles(cancelSource);
    }
    catch (error) {
      if (isMounted?.current === true) {
        toastContext.showLoadingErrorDialog(error);
        console.error(error);
      }
    }
    finally {
      if (isMounted?.current === true && orgDomain != null) {
        setIsLoading(false);
      }
    }
  };

  const getRoles = async (cancelSource = cancelTokenSource) => {
    const user = await getUserRecord();
    const userRoleAccess = await setAccessRoles(user);
    const {ldap} = user;

    if (isMounted?.current === true && userRoleAccess) {
      if (orgDomain == null || (ldap?.domain !== orgDomain && !userRoleAccess?.OpseraAdministrator)) {
        history.push(`/settings/${ldap.domain}/site-roles`);
      }

      setAccessRoleData(userRoleAccess);

      if (
        userRoleAccess?.OpseraAdministrator
        || userRoleAccess?.Administrator
        || userRoleAccess?.OrganizationOwner
        || userRoleAccess?.OrganizationAccountOwner
      ) {
        await getRoleGroups(cancelSource);
      }
    }
  };

  const getRoleGroups = async (cancelSource = cancelTokenSource) => {
    if (orgDomain != null) {
      try {
        let response = await accountsActions.getLdapRoleGroupsWithDomainV2(getAccessToken, cancelSource, orgDomain);
        const roleGroups = response?.data?.data;

        if (Array.isArray(roleGroups)) {
          const metadata = response?.data?.metadata;
          setSiteRoleMetadata({...metadata});
          setSiteRoles(roleGroups);
        }
      } catch (error) {
        toastContext.showLoadingErrorDialog(error);
        console.error(error);
      }
    }
  };

  const getHelpComponent = () => {
    if (!isLoading) {
      return (<SiteRolesHelpDocumentation/>);
    }
  };

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
      <SiteRolesTable
        className={"mx-2"}
        isMounted={isMounted}
        isLoading={isLoading}
        siteRoles={siteRoles}
        loadData={loadData}
        siteRoleMetadata={siteRoleMetadata}
        orgDomain={orgDomain}
      />
    </ScreenContainer>
  );
}


export default SiteRoleManagement;