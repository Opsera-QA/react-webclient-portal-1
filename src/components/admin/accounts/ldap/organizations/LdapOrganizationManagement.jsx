import React, {useContext, useState, useEffect, useRef} from "react";
import {useHistory} from "react-router-dom";
import ScreenContainer from "components/common/panels/general/ScreenContainer";
import accountsActions from "components/admin/accounts/accounts-actions";
import {DialogToastContext} from "contexts/DialogToastContext";
import {AuthContext} from "contexts/AuthContext";
import LdapOrganizationsTable from "components/admin/accounts/ldap/organizations/LdapOrganizationsTable";
import axios from "axios";
import {ROLE_LEVELS} from "components/common/helpers/role-helpers";

function LdapOrganizationManagement() {
  const [accessRoleData, setAccessRoleData] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const {getUserRecord, getAccessToken, setAccessRoles} = useContext(AuthContext);
  const [ldapOrganizationData, setLdapOrganizationData] = useState([]);
  const [authorizedActions, setAuthorizedActions] = useState(undefined);
  const history = useHistory();
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
    const user = await getUserRecord();
    const {ldap} = user;
    const userRoleAccess = await setAccessRoles(user);

    if (userRoleAccess) {
      setAccessRoleData(userRoleAccess);

      let authorizedActions = await accountsActions.getAllowedOrganizationActions(userRoleAccess, ldap?.organization, getUserRecord, getAccessToken);
      setAuthorizedActions(authorizedActions);

      if (userRoleAccess?.OpseraAdministrator) {
        await loadOrganizations(source);
      }
      else if (ldap?.organization != null && authorizedActions.includes("get_organization_details")) {
        history.push(`/admin/organizations/details/${ldap.organization}`);
      }
    }
  };

  const loadOrganizations = async (source = cancelTokenSource) => {
    try {
      const response = await accountsActions.getOrganizationsV2(getAccessToken, source);

      if (isMounted?.current === true) {
        setLdapOrganizationData(response?.data);
      }
    } catch (error) {
      if (isMounted?.current === true) {
        toastContext.showLoadingErrorDialog(error);
        console.error(error);
      }
    }
  };

  return (
    <ScreenContainer
      breadcrumbDestination={"ldapOrganizationManagement"}
      isLoading={!accessRoleData}
      roleRequirement={ROLE_LEVELS.OPSERA_ADMINISTRATORS}
      accessRoleData={accessRoleData}
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

