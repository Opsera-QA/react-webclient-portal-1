import React, {useState, useEffect, useContext, useRef} from "react";
import Model from "core/data_model/model";
import {AuthContext} from "contexts/AuthContext";
import {DialogToastContext} from "contexts/DialogToastContext";
import accountsActions from "components/admin/accounts/accounts-actions";
import {ldapUserMetadata} from "components/settings/ldap_users/ldapUser.metadata";
import LdapUserDetailPanel from "components/settings/ldap_users/users_detail_view/LdapUserDetailPanel";
import LoadingDialog from "components/common/status_notifications/loading";
import axios from "axios";

function MyUserRecord() {
  const [accessRoleData, setAccessRoleData] = useState(undefined);
  const { getUserRecord, setAccessRoles, getAccessToken } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [ldapUserData, setLdapUserData] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [orgDomain, setOrgDomain] = useState(undefined);
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
  }, []);

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      await getRoles(cancelSource);
    }
    catch (error) {
      if (isMounted.current === true) {
        console.error(error);
        toastContext.showLoadingErrorDialog(error);
      }
    }
    finally {
      if (isMounted.current === true) {
        setIsLoading(false);
      }
    }
  };

  const getLdapUser = async (userEmail, cancelSource = cancelTokenSource) => {
    const response = await accountsActions.getUserByEmailV2(getAccessToken, cancelTokenSource, userEmail);

    if (isMounted.current === true && response?.data != null) {
      setLdapUserData(new Model(response.data, ldapUserMetadata, false));
    }
  };

  const getRoles = async (cancelSource = cancelTokenSource) => {
    const user = await getUserRecord();
    const userRoleAccess = await setAccessRoles(user);
    if (isMounted.current === true && userRoleAccess && user) {
      setAccessRoleData(userRoleAccess);
      let {ldap} = user;

      if (ldap?.domain)
      {
        setOrgDomain(ldap.domain);
        const newAuthorizedActions = await accountsActions.getAllowedUserActions(userRoleAccess, ldap.organization, user.email, getUserRecord, getAccessToken);
        setAuthorizedActions(newAuthorizedActions);

        if (newAuthorizedActions.includes("get_user_details")) {
          await getLdapUser(user.email, cancelSource);
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