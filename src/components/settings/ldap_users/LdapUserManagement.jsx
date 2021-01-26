import React, {useState, useEffect, useContext} from "react";
import {AuthContext} from "contexts/AuthContext";
import {useHistory, useParams} from "react-router-dom";
import LdapUsersTable from "./LdapUsersTable";
import LoadingDialog from "components/common/status_notifications/loading";
import {getOrganizationByDomain} from "components/admin/accounts/ldap/organizations/organization-functions";
import {DialogToastContext} from "contexts/DialogToastContext";
import accountsActions from "components/admin/accounts/accounts-actions";
import ScreenContainer from "components/common/panels/general/ScreenContainer";

function LdapUserManagement() {
  const history = useHistory();
  const {orgDomain} = useParams();
  const {getUserRecord, getAccessToken, setAccessRoles} = useContext(AuthContext);
  const [accessRoleData, setAccessRoleData] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [userList, setUserList] = useState([]);
  const toastContext = useContext(DialogToastContext);
  const [authorizedActions, setAuthorizedActions] = useState([]);

  useEffect(() => {
    loadData();
  }, [orgDomain]);

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

  const getUsersByDomain = async (ldapDomain) => {
    try {
      let organization = await getOrganizationByDomain(ldapDomain, getAccessToken);
      setUserList(organization["users"]);
    } catch (error) {
      toastContext.showLoadingErrorDialog(error);
      console.error(error);
    }
  };

  const getRoles = async () => {
    const user = await getUserRecord();
    const {ldap, groups} = user;
    const userRoleAccess = await setAccessRoles(user);

    if (userRoleAccess) {
      setAccessRoleData(userRoleAccess);

      let authorizedActions = await accountsActions.getAllowedUserActions(userRoleAccess, ldap.organization, undefined, getUserRecord, getAccessToken);
      setAuthorizedActions(authorizedActions);

      if (userRoleAccess?.OpseraAdministrator) {
        if (orgDomain != null) {
          await getUsersByDomain(orgDomain);
        }
        else {
          history.push(`/settings/${ldap.domain}/users/`);
          await getUsersByDomain(ldap.domain);
        }
      } else if (ldap?.organization != null && authorizedActions?.includes("get_users")) {
        history.push(`/settings/${ldap.domain}/users/`);
        await getUsersByDomain(ldap.domain);
      }
    }
  };

  if (!accessRoleData) {
    return (<LoadingDialog size="sm"/>);
  }

  return (
    <ScreenContainer
      breadcrumbDestination={"ldapUserManagement"}
      isLoading={isLoading}
      accessDenied={!authorizedActions?.includes("get_users")}
    >
      <LdapUsersTable
        orgDomain={orgDomain}
        isLoading={isLoading}
        userData={userList}
        loadData={loadData}
        authorizedActions={authorizedActions}
      />
    </ScreenContainer>
  );
}


export default LdapUserManagement;