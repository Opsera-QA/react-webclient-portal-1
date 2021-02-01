import React, {useContext, useState, useEffect} from "react";
import {useHistory, useParams} from "react-router-dom";
import ToastContext from "react-bootstrap/cjs/ToastContext";
import ScreenContainer from "components/common/panels/general/ScreenContainer";
import {AuthContext} from "contexts/AuthContext";
import accountsActions from "components/admin/accounts/accounts-actions";
import LdapOrganizationAccountsTable
  from "components/admin/accounts/ldap/organization_accounts/LdapOrganizationAccountsTable";

function LdapOrganizationAccountManagement() {
  const history = useHistory();
  const { organizationName } = useParams();
  const [accessRoleData, setAccessRoleData] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const {getUserRecord, getAccessToken, setAccessRoles} = useContext(AuthContext);
  const [ldapOrganizationData, setLdapOrganizationData] = useState(undefined);
  const [organizationAccounts, setOrganizationAccounts] = useState(undefined);
  const [currentOrganizationName, setCurrentOrganizationName] = useState(undefined);
  const toastContext = useContext(ToastContext);
  const [authorizedActions, setAuthorizedActions] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setIsLoading(true);
      await getRoles();
    }
    catch (error) {
      toastContext.showLoadingErrorDialog(error);
    }
    finally {
      setIsLoading(false);
    }
  }

  const loadOrganizationByName = async (name) => {
    try {
      if (name != null) {
        const response = await accountsActions.getOrganizationByName(name, getAccessToken);
        setLdapOrganizationData(response?.data);
        setOrganizationAccounts(response?.data?.orgAccounts);
      }
    } catch (error) {
      toastContext.showLoadingErrorDialog(error.message);
      console.error(error.message);
    }
  };

  const getRoles = async () => {
    const user = await getUserRecord();
    const userRoleAccess = await setAccessRoles(user);
    const {ldap} = user;
    if (userRoleAccess) {
      setAccessRoleData(userRoleAccess);

      let authorizedActions = await accountsActions.getAllowedOrganizationAccountActions(userRoleAccess, ldap.organization, getUserRecord, getAccessToken);
      setAuthorizedActions(authorizedActions);

      if (userRoleAccess?.OpseraAdministrator) {
        if (organizationName != null) {
          setCurrentOrganizationName(organizationName);
          await loadOrganizationByName(organizationName);
        }
        else
        {
          history.push(`/admin/organization-accounts/${ldap.organization}`);
          setCurrentOrganizationName(ldap.organization);
          await loadOrganizationByName(ldap.organization);
        }
      } else if (ldap.organization != null && authorizedActions?.includes("get_organization_accounts")) {
        history.push(`/admin/organization-accounts/${ldap.organization}`);
        setCurrentOrganizationName(ldap.organization);
        await loadOrganizationByName(ldap.organization);
      }
    }
  };

  return (
    <ScreenContainer
      breadcrumbDestination={"ldapOrganizationAccountManagement"}
      isLoading={!accessRoleData}
      accessDenied={!authorizedActions.includes("get_organization_accounts")}
    >
      <LdapOrganizationAccountsTable
        isLoading={isLoading}
        authorizedActions={authorizedActions}
        ldapOrganizationData={ldapOrganizationData}
        ldapOrganizationAccounts={organizationAccounts}
        currentOrganizationName={currentOrganizationName}
        loadData={loadData}
      />
    </ScreenContainer>
  );
}

export default LdapOrganizationAccountManagement;

