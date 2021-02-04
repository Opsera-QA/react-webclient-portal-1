import React, { useState, useEffect, useContext } from "react";
import Model from "core/data_model/model";
import {AuthContext} from "contexts/AuthContext";
import {DialogToastContext} from "contexts/DialogToastContext";
import accountsActions from "components/admin/accounts/accounts-actions";
import {ldapUsersMetaData} from "components/settings/ldap_users/ldap-users-metadata";
import LdapUserDetailPanel from "components/settings/ldap_users/users_detail_view/LdapUserDetailPanel";
import LoadingDialog from "components/common/status_notifications/loading";

function MyUserRecord() {
  const [accessRoleData, setAccessRoleData] = useState(undefined);
  const { getUserRecord, setAccessRoles, getAccessToken } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [ldapUserData, setLdapUserData] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [orgDomain, setOrgDomain] = useState(undefined);
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

  const getLdapUser = async (userEmail) => {
    const response = await accountsActions.getUserByEmail(userEmail, getAccessToken);

    if (response?.data != null) {
      setLdapUserData(new Model(response.data, ldapUsersMetaData, false));
    }
  };

  const getRoles = async () => {
    const user = await getUserRecord();
    const userRoleAccess = await setAccessRoles(user);
    if (userRoleAccess && user) {
      setAccessRoleData(userRoleAccess);
      let {ldap} = user;

      if (ldap?.domain)
      {
        setOrgDomain(ldap.domain);
        const newAuthorizedActions = await accountsActions.getAllowedUserActions(userRoleAccess, ldap.organization, user.email, getUserRecord, getAccessToken);
        setAuthorizedActions(newAuthorizedActions);

        if (newAuthorizedActions.includes("get_user_details")) {
          await getLdapUser(user.email);
        }
      }
    }
  };

  if (isLoading) {
    return (<LoadingDialog size={"sm"} message="Loading User Record" />);
  }

  return (
    <LdapUserDetailPanel
      setLdapUserData={setLdapUserData}
      orgDomain={orgDomain}
      ldapUserData={ldapUserData}
      authorizedActions={authorizedActions}
      hideSettings={true}
    />
  );
}

export default MyUserRecord;