import React, {useContext, useState, useEffect, useRef} from "react";
import {useHistory, useParams} from "react-router-dom";
import ToastContext from "react-bootstrap/cjs/ToastContext";
import ScreenContainer from "components/common/panels/general/ScreenContainer";
import {AuthContext} from "contexts/AuthContext";
import accountsActions from "components/admin/accounts/accounts-actions";
import LdapOrganizationAccountsTable
  from "components/admin/accounts/ldap/organization_accounts/LdapOrganizationAccountsTable";
import axios from "axios";
import {ROLE_LEVELS} from "components/common/helpers/role-helpers";

// TODO: If we ever support multiple administrators, we will need to remove the requirement to be an Opsera Administrator
function LdapOrganizationAccountManagement() {
  const history = useHistory();
  const { organizationName } = useParams();
  const [accessRoleData, setAccessRoleData] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const {getUserRecord, getAccessToken, setAccessRoles} = useContext(AuthContext);
  const [ldapOrganizationData, setLdapOrganizationData] = useState(undefined);
  const [organizationAccounts, setOrganizationAccounts] = useState(undefined);
  const toastContext = useContext(ToastContext);
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
  }, [organizationName]);

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      await getRoles(cancelSource);
    }
    catch (error) {
      if (isMounted?.current === true) {
        console.error(error);
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
        toastContext.showLoadingErrorDialog(error.message);
        console.error(error.message);
      }
    }
  };

  const getRoles = async (cancelSource = cancelTokenSource) => {
    const user = await getUserRecord();
    const userRoleAccess = await setAccessRoles(user);
    const {ldap} = user;

    if (isMounted?.current === true && userRoleAccess) {
      if (organizationName == null || (!userRoleAccess?.OpseraAdministrator && ldap?.organization !== organizationName)) {
        history.push(`/admin/organization-accounts/${ldap.organization}`);
      }

      setAccessRoleData(userRoleAccess);

      if (userRoleAccess?.OpseraAdministrator) {
        await loadOrganizationByName(organizationName, cancelSource);
      }
    }
  };

  return (
    <ScreenContainer
      breadcrumbDestination={"ldapOrganizationAccountManagement"}
      isLoading={!accessRoleData}
      roleRequirement={ROLE_LEVELS.OPSERA_ADMINISTRATORS}
      accessRoleData={accessRoleData}
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

