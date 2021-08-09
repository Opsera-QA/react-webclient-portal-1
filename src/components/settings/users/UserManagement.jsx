import React, {useState, useEffect, useContext, useRef} from "react";
import {AuthContext} from "contexts/AuthContext";
import {useHistory, useParams} from "react-router-dom";
import UsersTable from "components/settings/users/UsersTable";
import {DialogToastContext} from "contexts/DialogToastContext";
import accountsActions from "components/admin/accounts/accounts-actions";
import ScreenContainer from "components/common/panels/general/ScreenContainer";
import axios from "axios";
import {ROLE_LEVELS} from "components/common/helpers/role-helpers";

function UserManagement() {
  const history = useHistory();
  const {orgDomain} = useParams();
  const {getUserRecord, getAccessToken, setAccessRoles} = useContext(AuthContext);
  const [accessRoleData, setAccessRoleData] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [userList, setUserList] = useState([]);
  const toastContext = useContext(DialogToastContext);
  const [authorizedActions, setAuthorizedActions] = useState([]);
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

  const getUsersByDomain = async (ldapDomain, cancelSource = cancelTokenSource) => {
    try {
      let organizationResponse = await accountsActions.getOrganizationAccountByDomainV2(getAccessToken, cancelSource, ldapDomain);
      if (isMounted?.current === true && organizationResponse?.data?.users) {
        setUserList(organizationResponse?.data?.users);
      }
    } catch (error) {
      if (isMounted?.current === true) {
        toastContext.showLoadingErrorDialog(error);
        console.error(error);
      }
    }
  };

  const getRoles = async (cancelSource = cancelTokenSource) => {
    const user = await getUserRecord();
    const {ldap, groups} = user;
    const userRoleAccess = await setAccessRoles(user);

    if (isMounted.current === true && userRoleAccess) {
      setAccessRoleData(userRoleAccess);

      let authorizedActions = await accountsActions.getAllowedUserActions(userRoleAccess, ldap.organization, undefined, getUserRecord, getAccessToken);
      setAuthorizedActions(authorizedActions);

      if (userRoleAccess?.OpseraAdministrator) {
        if (orgDomain != null) {
          await getUsersByDomain(orgDomain, cancelSource);
        }
        else {
          history.push(`/settings/${ldap.domain}/users/`);
        }
      } else if (ldap?.organization != null && authorizedActions?.includes("get_users")) {
        history.push(`/settings/${ldap.domain}/users/`);
      }
    }
  };

  return (
    <ScreenContainer
      breadcrumbDestination={"ldapUserManagement"}
      isLoading={!accessRoleData}
      roleRequirement={ROLE_LEVELS.ADMINISTRATORS}
      accessRoleData={accessRoleData}
    >
      <UsersTable
        orgDomain={orgDomain}
        isLoading={isLoading}
        userData={userList}
        loadData={loadData}
        authorizedActions={authorizedActions}
      />
    </ScreenContainer>
  );
}


export default UserManagement;