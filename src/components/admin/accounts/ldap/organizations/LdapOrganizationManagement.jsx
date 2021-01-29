import React, {useContext, useState, useEffect} from "react";
import {useHistory} from "react-router-dom";
import ScreenContainer from "components/common/panels/general/ScreenContainer";
import accountsActions from "components/admin/accounts/accounts-actions";
import {DialogToastContext} from "contexts/DialogToastContext";
import {AuthContext} from "contexts/AuthContext";
import LoadingDialog from "components/common/status_notifications/loading";
import LdapOrganizationsTable from "components/admin/accounts/ldap/organizations/LdapOrganizationsTable";

function LdapOrganizationManagement() {
  const [accessRoleData, setAccessRoleData] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const {getUserRecord, getAccessToken, setAccessRoles} = useContext(AuthContext);
  const [ldapOrganizationData, setLdapOrganizationData] = useState([]);
  const [authorizedActions, setAuthorizedActions] = useState(undefined);
  const history = useHistory();
  const toastContext = useContext(DialogToastContext);

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

  const loadOrganizations = async () => {
    try {
      const response = await accountsActions.getOrganizations(getAccessToken);
      setLdapOrganizationData(response?.data);
    } catch (error) {
      toastContext.showLoadingErrorDialog(error);
      console.error(error);
    }
  };

  const getRoles = async () => {
    const user = await getUserRecord();
    const {ldap} = user;
    const userRoleAccess = await setAccessRoles(user);
    if (userRoleAccess) {
      setAccessRoleData(userRoleAccess);

      let authorizedActions = await accountsActions.getAllowedOrganizationActions(userRoleAccess, ldap.organization, getUserRecord, getAccessToken);
      setAuthorizedActions(authorizedActions);

      if (userRoleAccess?.OpseraAdministrator) {
        await loadOrganizations();
      }
      else if (ldap.organization != null && authorizedActions.includes("get_organization_details")) {
        history.push(`/admin/organizations/details/${ldap.organization}`);
      }
    }
  };

  if (!accessRoleData) {
    return (<LoadingDialog size="sm"/>);
  }

  return (
    <ScreenContainer
      breadcrumbDestination={"ldapOrganizationManagement"}
      accessDenied={!accessRoleData?.OpseraAdministrator}
      isLoading={isLoading}
    >
      <LdapOrganizationsTable
        isLoading={isLoading}
        data={ldapOrganizationData}
        loadData={loadData}
        authorizedActions={authorizedActions}
      />
    </ScreenContainer>
  );
}

export default LdapOrganizationManagement;

