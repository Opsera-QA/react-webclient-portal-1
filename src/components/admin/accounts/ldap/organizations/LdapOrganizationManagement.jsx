import React, {useContext, useState, useEffect, useRef} from "react";
import ScreenContainer from "components/common/panels/general/ScreenContainer";
import accountsActions from "components/admin/accounts/accounts-actions";
import {DialogToastContext} from "contexts/DialogToastContext";
import {AuthContext} from "contexts/AuthContext";
import LdapOrganizationsTable from "components/admin/accounts/ldap/organizations/LdapOrganizationsTable";
import axios from "axios";
import {ROLE_LEVELS} from "components/common/helpers/role-helpers";
import LdapOrganizationManagementSubNavigationBar
  from "components/admin/accounts/ldap/organizations/LdapOrganizationManagementSubNavigationBar";

function LdapOrganizationManagement() {
  const [accessRoleData, setAccessRoleData] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const {getAccessRoleData, getAccessToken} = useContext(AuthContext);
  const [organizations, setOrganizations] = useState([]);
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
  }, []);

  const loadData = async (source = cancelTokenSource) => {
    try {
      setIsLoading(true);
      await getRoles(source);
    }
    catch (error) {
      if (isMounted?.current === true) {
        toastContext.showLoadingErrorDialog(error);
        console.error(error);
      }
    }
    finally {
      if (isMounted?.current === true) {
        setIsLoading(false);
      }
    }
  };

  const getRoles = async (source = cancelTokenSource) => {
    const userRoleAccess = await getAccessRoleData();

    if (userRoleAccess) {
      setAccessRoleData(userRoleAccess);

      if (userRoleAccess?.OpseraAdministrator) {
        await loadOrganizations(source);
      }
    }
  };

  const loadOrganizations = async (source = cancelTokenSource) => {
    const response = await accountsActions.getOrganizationsV2(getAccessToken, source);
    const organizations = response?.data;

    if (isMounted?.current === true && Array.isArray(organizations)) {
      setOrganizations(organizations);
    }
  };

  return (
    <ScreenContainer
      breadcrumbDestination={"ldapOrganizationManagement"}
      isLoading={!accessRoleData}
      roleRequirement={ROLE_LEVELS.OPSERA_ADMINISTRATORS}
      accessRoleData={accessRoleData}
      navigationTabContainer={
        <LdapOrganizationManagementSubNavigationBar
          activeTab={"organizations"}
        />
      }
    >
      <LdapOrganizationsTable
        isMounted={isMounted}
        isLoading={isLoading}
        organizations={organizations}
        loadData={loadData}
      />
    </ScreenContainer>
  );
}

export default LdapOrganizationManagement;

