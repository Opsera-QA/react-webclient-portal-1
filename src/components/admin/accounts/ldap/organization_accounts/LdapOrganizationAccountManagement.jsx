import React, {useState, useEffect, useRef} from "react";
import {useHistory, useParams} from "react-router-dom";
import ScreenContainer from "components/common/panels/general/ScreenContainer";
import accountsActions from "components/admin/accounts/accounts-actions";
import LdapOrganizationAccountsTable
  from "components/admin/accounts/ldap/organization_accounts/LdapOrganizationAccountsTable";
import axios from "axios";
import {ROLE_LEVELS} from "components/common/helpers/role-helpers";
import LdapOrganizationAccountManagementSubNavigationBar
  from "components/admin/accounts/ldap/organization_accounts/LdapOrganizationAccountManagementSubNavigationBar";
import useComponentStateReference from "hooks/useComponentStateReference";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";

// TODO: If we ever support multiple administrators, we will need to remove the requirement to be an Opsera Administrator
function LdapOrganizationAccountManagement() {
  const history = useHistory();
  const { organizationName } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [ldapOrganizationData, setLdapOrganizationData] = useState(undefined);
  const [organizationAccounts, setOrganizationAccounts] = useState(undefined);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const {
    accessRoleData,
    getAccessToken,
    toastContext,
    isOpseraAdministrator,
    userData,
  } = useComponentStateReference();

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
  }, [organizationName]);

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);

      const ldapOrganization = DataParsingHelper.parseNestedString(userData, "ldap.organization");

      if (organizationName == null || (isOpseraAdministrator !== true && ldapOrganization !== organizationName)) {
        history.push(`/admin/organization-accounts/${ldapOrganization}`);
      }

      if (isOpseraAdministrator === true) {
        await loadOrganizationByName(organizationName, cancelSource);
      }
    }
    catch (error) {
      if (isMounted?.current === true) {
        toastContext.showLoadingErrorDialog(error);
      }
    }
    finally {
      if (isMounted?.current === true) {
        setIsLoading(false);
      }
    }
  };

  const loadOrganizationByName = async (name, cancelSource = cancelTokenSource) => {
    try {
      const response = await accountsActions.getOrganizationByNameV2(getAccessToken, cancelSource, name);
      const organization = response?.data;

      if (organization) {
        setLdapOrganizationData(organization);
        setOrganizationAccounts(organization?.orgAccounts);
      }
    } catch (error) {
      if (isMounted?.current === true) {
        toastContext.showLoadingErrorDialog(error);
      }
    }
  };

  return (
    <ScreenContainer
      breadcrumbDestination={"ldapOrganizationAccountManagement"}
      isLoading={!accessRoleData}
      roleRequirement={ROLE_LEVELS.OPSERA_ADMINISTRATORS}
      accessRoleData={accessRoleData}
      navigationTabContainer={
        <LdapOrganizationAccountManagementSubNavigationBar
          activeTab={"organizationAccounts"}
        />
      }
    >
      <LdapOrganizationAccountsTable
        isLoading={isLoading}
        ldapOrganizationData={ldapOrganizationData}
        ldapOrganizationAccounts={organizationAccounts}
        loadData={loadData}
      />
    </ScreenContainer>
  );
}

export default LdapOrganizationAccountManagement;

